import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Styled Components
const Wrapper = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 20px;
  @media (max-width: 480px) {
    width: 100%;
    margin: 0;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 20px;
  color: #1a237e;
  margin-bottom: 20px;
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const TableHead = styled.thead`
  background-color: #f0f0f0;
`;

const HeadCell = styled.th`
  padding: 12px 15px;
  text-align: left;
  color: #666;
  font-weight: bold;
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 8px 8px;
  }
`;

const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const BodyCell = styled.td`
  padding: 12px 15px;
  text-align: left;
  font-size: 16px;
  color: #333;
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 8px 8px;
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 480px) {
    height: 2rem;
    width: 2rem;
    padding: 1px 0;
  }
`;

const AbsentStudentList = () => {
  const [absentStudents, setAbsentStudents] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for fetching
  const [error, setError] = useState(null); // Error state for handling errors

  useEffect(() => {
    const fetchAbsentStudents = async () => {
      try {
        console.log("Fetching attendance data...");

        // Fetching attendance data
        const attendanceResponse = await fetch("https://api.edspride.in/student-attendance/all");
        if (!attendanceResponse.ok) {
          throw new Error("Failed to fetch attendance data");
        }

        const attendanceData = await attendanceResponse.json();
        console.log("Attendance data fetched:", attendanceData); // Log the data to check its structure

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split("T")[0];

        // Loop through attendanceData and apply Class/Section before filtering
        const absentStudentsList = attendanceData
          .filter(entry => entry.Date === today) // Check if the Date matches today
          .flatMap(entry =>
            entry.Attendance.map(student => ({
              name: student.StudentName,
              rollNo: student.RollNo,
              status: student.Status,
              class: entry.Class, // Fetch class and section from the main attendance entry
              section: entry.Section,
              image: student?.Document?.StudentPhoto
                ? `https://api.edspride.in/uploads/${student.Document.StudentPhoto}`
                : "https://via.placeholder.com/40", // Default image if no student photo
            }))
          );

        console.log("All students data:", absentStudentsList); // Log to see all students before filtering

        // Filter for only absent students
        const absentStudentsFiltered = absentStudentsList.filter(student => student.status === "Absent");

        setAbsentStudents(absentStudentsFiltered); // Set state with only absent students
      } catch (error) {
        setError("Error fetching absent students data");
        console.error("Error fetching absent students:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched or error occurs
      }
    };

    fetchAbsentStudents();
  }, []); // Empty dependency array ensures this runs once on component mount

  // Loading state
  if (loading) {
    return <Wrapper>Loading absent students...</Wrapper>;
  }

  // Error state
  if (error) {
    return <Wrapper>{error}</Wrapper>;
  }

  return (
    <Wrapper>
      <HeaderTitle>Today's Absent Students</HeaderTitle>
      <StyledTable>
        <TableHead>
          <tr>
            <HeadCell>Profile Picture</HeadCell>
            <HeadCell>Name</HeadCell>
            <HeadCell>Roll No.</HeadCell>
            <HeadCell>Class</HeadCell>
            <HeadCell>Section</HeadCell>
          </tr>
        </TableHead>
        <TableBody>
          {absentStudents.length === 0 ? (
            <tr>
              <BodyCell colSpan="5" style={{ textAlign: "center" }}>
                No absent students today.
              </BodyCell>
            </tr>
          ) : (
            absentStudents.map((student, index) => (
              <tr key={index}>
                <BodyCell>
                  <ProfileImage src={student.image} alt="Student" />
                </BodyCell>
                <BodyCell>{student.name}</BodyCell>
                <BodyCell>{student.rollNo}</BodyCell>
                <BodyCell>{student.class}</BodyCell> {/* Display class */}
                <BodyCell>{student.section}</BodyCell> {/* Display section */}
              </tr>
            ))
          )}
        </TableBody>
      </StyledTable>
    </Wrapper>
  );
};

export default AbsentStudentList;
