import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MainDashboard,
  Wrapper,
  Heading,
  Header,
  SubHeader,
  Table,
  TableHeader,
  TableRow,
  TableData,
  FooterNote,
  PrincipalSign,
  Dropdown,
} from "./SchoolSetup2Style";
import  baseURL from '../utils/Url'; 

const DateSheet = () => {
  const [examData, setExamData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`${baseURL}/exam/all`);
        console.log("Fetched exams:", response.data);
        setExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  useEffect(() => {
    if (selectedExam) {
      const fetchDateSheetData = async () => {
        try {
          console.log(`Fetching data for exam: ${selectedExam}`);
          const response = await axios.get(
            `${baseURL}/datesheet/getByExam/${selectedExam}`
          );
          console.log("Fetched date sheet data:", response.data);

          const uniqueClasses = [...new Set(response.data.map((item) => item.Class))];
          setClasses(uniqueClasses);

          const groupedData = {};
          response.data.forEach((item) => {
            const dateKey = item.Date;
            const day = new Date(item.Date).toLocaleDateString("en-US", {
              weekday: "long",
            });

            if (!groupedData[dateKey]) {
              groupedData[dateKey] = {
                date: item.Date,
                day: day,
                subjects: {},
              };
            }

            if (!groupedData[dateKey].subjects[item.Class]) {
              groupedData[dateKey].subjects[item.Class] = [];
            }

            groupedData[dateKey].subjects[item.Class].push(item.Subject);
          });

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
    console.log("Selected exam:", exam);
    setSelectedExam(exam);
  };

  return (
    <MainDashboard>
      <Heading>Add +</Heading>
      <Wrapper>
        <Header>Genius Classes</Header>
        {/* {exams.map = (exam) => {
          console.log("e",exam.AcademicYear)
        })} */}
        <SubHeader>Date Sheet for Final Exam {exams.map((exam)=>(
          exam.AcademicYear
        ))}</SubHeader>

        <Dropdown value={selectedExam} onChange={handleExamChange}>
          <option value="">Select Exam</option>
          {exams.map((exam) => (
            <option key={exam._id} value={exam.ExamName}>
              {console.log("exam",exam)}
              {exam.ExamName}
            </option>
          ))}
        </Dropdown>

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
                    {row.subjects[className] ? row.subjects[className].join(", ") : ""}
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