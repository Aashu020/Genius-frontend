import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
  /* width: calc(100vw - 250px); */
  overflow-x: auto;
width: 100%;
`;

const MainDashboard = styled.div`
  flex: 1;
  padding: 50px;
  /* height: calc(100vh - 100px); */
  /* overflow-x: auto; */
  background-color: #f9f9f9;

`;

const TableContainer = styled.div`
  margin-top: 40px;
  overflow-x: auto;
 
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  font-size: 16px;
  text-align: left;

  th,
  td {
    padding: 12px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f6fc;
  }
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
`;
const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const Heading = styled.div`
  width: 30%;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-bottom: 40px;
  @media (max-width: 480px) {
    font-size: 12px;
    height: 30px;
    width: 50%;
    margin-bottom: 30px;
    margin-top: 20px;
  }
`;

const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
`;

const ExamTimeTable = () => {
    const [dateSheet, setDateSheet] = useState([]);
    const [loading, setLoading] = useState(true);
    const [studentClass, setStudentClass] = useState("");
    const [studentId, setStudentId] = useState(null);

    // Get the logged-in student's id from localStorage
    useEffect(() => {
        const id = localStorage.getItem("Id");
        console.log("Student ID from localStorage:", id); // Log the student ID
        if (id) {
            setStudentId(id);
        } else {
            console.error("Student ID not found in localStorage");
        }
    }, []);

    // Fetch student details (including class) from the API
    useEffect(() => {
        if (studentId) {
            const fetchStudentDetails = async () => {
                try {
                    const response = await fetch(`http://localhost:8007/student/get/${studentId}`);
                    const studentData = await response.json();
                    console.log("Student Data:", studentData); // Log the student data
                    if (studentData && studentData.ClassName) {
                        setStudentClass(studentData.ClassName); // Set the class of the student
                    } else {
                        console.error("No class information found for student");
                    }
                } catch (error) {
                    console.error("Error fetching student data:", error);
                }
            };

            fetchStudentDetails();
        }
    }, [studentId]);

    // Fetch Date Sheet Data based on student class and match class name
    useEffect(() => {
        if (!studentClass) return;
    
        const fetchDateSheet = async () => {
            try {
                const response = await fetch("http://localhost:8007/datesheet/all");
                const data = await response.json();
                console.log("Raw Data:", data);
                console.log("Student Class:", `"${studentClass}"`); // Show exact value
    
                const filteredDateSheet = data.filter(entry => {
                    const entryClass = String(entry.Class).trim().toLowerCase();
                    const targetClass = String(studentClass).trim().toLowerCase();
                    console.log(`Comparing: "${entryClass}" vs "${targetClass}"`);
                    return entryClass === targetClass;
                });
    
                console.log("Filtered Results:", filteredDateSheet);
                setDateSheet(filteredDateSheet);
            } catch (error) {
                console.error("Error fetching date sheet data:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchDateSheet();
    }, [studentClass]);
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <MainDashboard>
                {/* Date Sheet Table */}
                <Title>Date Sheet for Class {studentClass}</Title>
                {dateSheet.length > 0 ? (
                    <TableContainer>

                        <Table>
                            <thead>
                                <tr>
                                    <TableHeader>Exam</TableHeader>
                                    <TableHeader>Date</TableHeader>
                                    <TableHeader>Class</TableHeader>
                                    <TableHeader>Subject</TableHeader>
                                    <TableHeader>Type of Exam</TableHeader>
                                </tr>
                            </thead>
                            <tbody>
                                {dateSheet.map((entry, index) => (
                                    <tr key={index}>
                                        <TableCell>{entry.Exam}</TableCell>
                                        <TableCell>{entry.Date}</TableCell>
                                        <TableCell>{entry.Class}</TableCell>
                                        <TableCell>{entry.Subject}</TableCell>
                                        <TableCell>{entry.TypeOfExam}</TableCell>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </TableContainer>
                ) : (
                    <p>No data available for the Date Sheet.</p>
                )}
            </MainDashboard>
        </Container>
    );
};

export default ExamTimeTable;
