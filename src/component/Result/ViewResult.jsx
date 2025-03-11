import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import white from '../../assets/Images/white.png'
// Styled components
const MarksheetContainer = styled.div`
    width: 800px;
    margin: 20px auto;
    border: 2px solid #333;
    padding: 24px;
    display: flex;
    font-family: Arial, sans-serif;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    justify-content: space-between;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

const Logo = styled.img`
  height: 80px;
`;

const Title = styled.h2`
  color: #4a4a4a;
`;

const StudentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

const InfoBox = styled.div`
  border: 1px solid #333;
  padding: 10px;
  width: 32%;
  font-size: 14px;
  background-color: #fff;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  text-align: center;
  font-size: 14px;

  th {
    border: 1px solid #333;
    padding: 8px;
    background-color: #e6e6e6;
    font-weight: bold;
  }

  td {
    border: 1px solid #333;
    padding: 10px;
  }
`;

const Footer = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  font-size: 14px;
`;

const Signatures = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
`;

const SignatureBox = styled.div`
    width: 30%;
    /* border-bottom: 1px solid #333; */
    text-align: center;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
`;

// Missing styled components for PhotoContainer and Photo
const PhotoContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Photo = styled.img`
  width: 115px;
  background-color: gray;
`;

const ViewResult = () => {
  const { studentId } = useParams();  // Getting studentId from the URL parameter
  const location = useLocation(); // Accessing location state
  const { examId } = location.state || {}; // Retrieving examId from state (with fallback)
  const [school, setSchool] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [student, setStudent] = useState(null);
  const [academic, SetAcademic] = useState(null);

  // Fetch result data based on studentId and examId
  useEffect(() => {
    if (!examId || !studentId) return; // Ensure we have both examId and studentId before fetching data

    const fetchResultData = async () => {
      try {
        const response = await axios.get(`https://api.edspride.in/result/get/one/${examId}/${studentId}`);
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student result data:", error);
      }
    };

    fetchResultData();
  }, [examId, studentId]);  // Re-run if examId or studentId changes

  useEffect(() => {
    if (!examId || !studentId) return; // Ensure we have both examId and studentId before fetching data

    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`https://api.edspride.in/student/get/${studentId}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [examId, studentId]);

  useEffect(() => {
    axios
      .get("https://api.edspride.in/schoolsetup/all")
      .then((response) => {
        if (response.data.length > 0) {
          setSchool(response.data[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://api.edspride.in/academic-year-info/active")
      .then((response) => {
        SetAcademic(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!studentData || !student || !school || !academic) {
    return <div>Loading...</div>; // Show loading until data is fetched
  }

  // Calculate results
  const calculateResults = () => {
    let totalObtained = 0;
    let totalMax = 0;

    // Calculate total obtained marks and total max marks
    studentData.Subjects.forEach(subject => {
      totalObtained += subject.ObtainedMarks || 0;
      totalMax += subject.MaxMarks || 0;
    });

    // Calculate percentage
    const percentage = (totalObtained / totalMax) * 100;

    return {
      totalObtained,
      totalMax,
      percentage: percentage.toFixed(2),  // Show percentage up to two decimal points
      result: percentage >= 35 ? 'PASS' : 'FAIL'  // You can modify the condition as per your grading rules
    };
  };

  const { totalObtained, totalMax, percentage, result } = calculateResults();

  return (
    <MarksheetContainer>
      <Header>
        <Logo style={{ height: "80px" }} src={`https://api.edspride.in/uploads/${school?.SchoolLogo.replace(/^uploads\//, '')}`} alt="School Logo" />
        <Title>{school?.SchoolName}</Title>
        <p>{school?.EmailId} | {school?.PhoneNo}</p>
        <p>{school?.Website}</p>
        <p style={{ fontSize: "16px" }}>
          Session: {academic.StartYear}-{academic.EndYear} | Exam: {studentData.ExamName}
        </p>
      </Header>

      <StudentInfo>
        <InfoBox>
          <p><strong>STUDENT NAME:</strong> {studentData.StudentName}</p>
          <p><strong>FATHER'S NAME:</strong> {student?.FatherDetail?.Name}</p>
          <p><strong>MOTHER'S NAME:</strong> {student?.MotherDetails?.Name}</p>
          <p><strong>DOB:</strong> {student.DOB}</p>
        </InfoBox>
        <InfoBox>
          <p><strong>CLASS:</strong> {studentData.ClassName} | <strong>SEC:</strong> {studentData.Section}</p>
          <p><strong>Admission No:</strong> {studentData.StudentId} | <strong>ROLL No.:</strong> {studentData.RollNo}</p>
        </InfoBox>
        <InfoBox>
          <PhotoContainer>
            <Photo src={`https://api.edspride.in/uploads/${student?.Document?.StudentPhoto}`} alt="Student" />
          </PhotoContainer>
          <p><strong>Result Date:</strong> {studentData.ResultDate}</p>
        </InfoBox>
      </StudentInfo>

      {/* Subject and Marks Table */}
      <Table>
        <thead>
          <tr>
            <th>SUBJECT</th>
            <th>MAX MARKS</th>
            <th>MARKS OBTAINED</th>
            <th>GRADE</th>
          </tr>
        </thead>
        <tbody>
          {studentData.Subjects.map((subject, index) => (
            <tr key={index}>
              <td>{subject.SubjectName}</td>
              <td>{subject.MaxMarks}</td>
              <td>{subject.ObtainedMarks}</td>
              <td>{subject.Grade}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Footer with Grand Total, Percentage, and Result */}
      <Footer>
        <div><strong>GRAND TOTAL:</strong> {totalObtained}/{totalMax}</div>
        <div><strong>PERCENTAGE:</strong> {percentage}%</div>
        <div><strong>RESULT:</strong> {result}</div>
      </Footer>

      <Signatures>
        <SignatureBox> <Logo style={{ height: "80px" }} src={white} alt="School Logo" />PARENT SIGN</SignatureBox>
        <SignatureBox> <Logo style={{ height: "80px" }} src={white} alt="School Logo" />CLASS TEACHER SIGN</SignatureBox>
        
        <SignatureBox>
        <Logo style={{ height: "80px" }} src={`https://api.edspride.in/uploads/${school?.PrincipleSign.replace(/^uploads\//, '')}`} alt="Signature" />
        PRINCIPAL SIGN</SignatureBox>
      </Signatures>
    </MarksheetContainer>
  );
};

export default ViewResult;
