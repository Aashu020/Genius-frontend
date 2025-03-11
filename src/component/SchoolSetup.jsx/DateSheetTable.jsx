import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

// Styled components for the table and dropdown
const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
`;

const Wrapper = styled.div`
  background-color: white;
  padding: 20px;
  margin-top: 50px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.div`
  width: 15%;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-bottom: 40px;
  position: absolute;
  right: 30px;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SubHeader = styled.h2`
  text-align: center;
  color: red;
  font-size: 20px;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-family: Arial, sans-serif;
  font-size: 14px;
`;

const TableHeader = styled.th`
  background-color: #ffeb3b;
  font-weight: bold;
  padding: 8px;
  border: 1px solid #000;
`;

const TableRow = styled.tr`
  border: 1px solid #000;
`;

const TableData = styled.td`
  padding: 8px;
  border: 1px solid #000;
`;

const FooterNote = styled.div`
  font-size: 12px;
  margin-top: 20px;
  text-align: left;
`;

const PrincipalSign = styled.div`
  margin-top: 30px;
  font-size: 14px;
  text-align: right;
`;

const Dropdown = styled.select`
  padding: 10px;
  margin: 20px auto;
  display: block;
  border-radius: 5px;
  font-size: 16px;
  width: 200px;
`;

// DateSheet component
const DateSheet = () => {
  const [examData, setExamData] = useState([]);
  const [classes, setClasses] = useState([]); // To store unique class names
  const [exams, setExams] = useState([]); // To store exam list
  const [selectedExam, setSelectedExam] = useState(""); // To store selected exam

  // Fetch exams list from the API
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/exam/all");
        console.log("Fetched exams:", response.data); // Debugging log
        setExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  // Fetch date sheet for the selected exam when the selected exam changes
  useEffect(() => {
    if (selectedExam) {
      const fetchDateSheetData = async () => {
        try {
          console.log(`Fetching data for exam: ${selectedExam}`); // Debugging log
          const response = await axios.get(
            `https://api.edspride.in/datesheet/getByExam/${selectedExam}`
          );
          console.log("Fetched date sheet data:", response.data); // Debugging log

          // Extract unique classes from the response data
          const uniqueClasses = [
            ...new Set(response.data.map((item) => item.Class)),
          ];
          setClasses(uniqueClasses);

          // Group the data by Date
          const groupedData = {};

          response.data.forEach((item) => {
            const dateKey = item.Date;
            const day = new Date(item.Date).toLocaleDateString("en-US", {
              weekday: "long",
            });

            // If the date doesn't exist in groupedData, create it
            if (!groupedData[dateKey]) {
              groupedData[dateKey] = {
                date: item.Date,
                day: day,
                subjects: {},
              };
            }

            // Add the subject to the correct class column
            if (!groupedData[dateKey].subjects[item.Class]) {
              groupedData[dateKey].subjects[item.Class] = [];
            }

            groupedData[dateKey].subjects[item.Class].push(item.Subject);
          });

          // Convert the grouped data into an array for rendering
          const formattedData = Object.values(groupedData);
          setExamData(formattedData);
        } catch (error) {
          console.error("Error fetching date sheet data:", error);
        }
      };

      fetchDateSheetData();
    }
  }, [selectedExam]);

  const handleExamChange = (event) => {
    const exam = event.target.value;
    console.log("Selected exam:", exam); // Debugging log
    setSelectedExam(exam); // Update selected exam
  };

  return (
    <MainDashboard>
      <Heading>Add +</Heading>
      <Wrapper>
        <Header>Saint G.S. Convent School, Tajoke</Header>
        <SubHeader>Date Sheet for Final Exam 2023</SubHeader>

        {/* Dropdown for selecting the exam */}
        <Dropdown value={selectedExam} onChange={handleExamChange}>
          <option value="">Select Exam</option>
          {exams.map((exam) => (
            <option key={exam._id} value={exam.ExamName}>
              {exam.ExamName}
            </option>
          ))}
        </Dropdown>

        {/* Render the table with the date sheet data */}
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Dates</TableHeader>
              <TableHeader>Days</TableHeader>
              {classes.map((className) => (
                <TableHeader key={className}>{className}</TableHeader>
              ))}
            </TableRow>
          </thead>
          <tbody>
            {examData.map((row, index) => (
              <TableRow key={index}>
                <TableData>{row.date.split("-").reverse().join("-")}</TableData>
                <TableData>{row.day}</TableData>
                {classes.map((className) => (
                  <TableData key={className}>
                    {/* Display subjects for the class */}
                    {row.subjects[className]
                      ? row.subjects[className].join(", ")
                      : ""}
                  </TableData>
                ))}
              </TableRow>
            ))}
          </tbody>
        </Table>

        <FooterNote>
          <p>Note:</p>
          <ul>
            <li>The exam will be held physically in school.</li>
            <li>No re-test will be conducted.</li>
            <li>Attendance is compulsory.</li>
            <li>Written + Oral exam will be taken on the same day.</li>
          </ul>
        </FooterNote>

        <PrincipalSign>
          Principal Sign <br />
          Date: {new Date().toISOString().split("T")[0].split("-").reverse().join("-")}
        </PrincipalSign>
      </Wrapper>
    </MainDashboard>
  );
};

export default DateSheet;
