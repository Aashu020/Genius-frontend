import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainDashboard = styled.div`
  flex: 1;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
  padding: 20px;
`;

const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  font-weight: bold;
`;

const Form = styled.form`
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.span`
  position: absolute;
  top: -10px;
  left: 20px;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
`;

const Input = styled.input`
  width: 88%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  outline: none;
`;

const Select = styled.select`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
`;

const Wrapper = styled.div`
  width: 97%;
  margin: 20px auto;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #fff;
`;

const HeaderCell = styled.th`
  padding: 12px;
  text-align: left;
  font-size: 14px;
  color: #666;
  font-weight: bold;
  border-bottom: 1px solid #e0e0e0;
`;

const TableBody = styled.tbody`
  color: black;
`;

const BodyCell = styled.td`
  padding: 12px;
  text-align: left;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
  vertical-align: middle;
`;

const StatusContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const StatusButtonP = styled.button.attrs({ type: 'button' })`
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 55%;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    opacity: 0.8;
  }
`;

const StatusButtonA = styled.button.attrs({ type: 'button' })`
  background-color: #F44336;
  color: white;
  border: none;
  border-radius: 55%;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    opacity: 0.8;
  }
`;

const StatusButtonL = styled.button.attrs({ type: 'button' })`
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 55%;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    opacity: 0.8;
  }
`;

const SubmitButton = styled.button`
  width: 320px;
  padding: 12px;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  margin-top: 20px;

  &:hover {
    background: linear-gradient(270deg, #1c2563 0%, #662acc 100%);
  }

  @media (max-width: 480px) {
    width: 100%;
    font-size: 12px;
    padding: 5px;
  }
`;

const StudentAttendance = () => {
  const [tasks, setTasks] = useState([]); // List of students
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [attendanceData, setAttendanceData] = useState({}); // Contains status and name for each student
  const [selectedDate, setSelectedDate] = useState({}); // Selected date for attendance
  const [statusSelection, setStatusSelection] = useState({}); // Track selected statuses for each student

  // Fetch available classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/class/all");
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  // Fetch sections based on selected class
  useEffect(() => {
    const fetchSections = async () => {
      if (selectedClass) {
        try {
          const response = await axios.get(`https://api.edspride.in/class/get/${selectedClass}`);
          setSections(response.data.Section || []);
        } catch (error) {
          console.error("Error fetching sections:", error);
        }
      } else {
        setSections([]);
      }
    };
    fetchSections();
  }, [selectedClass]);

  // Fetch students for the selected class and section, and set default attendance to "Present"
  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedClass && selectedSection) {
        try {
          const response = await axios.get("https://api.edspride.in/student/all");
          const filteredStudents = response.data.filter(student =>
            student.AdmissionInClass === selectedClass && student.Section === selectedSection
          );
          setTasks(filteredStudents);

          // Set default attendance status to "Present" and save student names
          const initialStatus = {};
          const attendanceInfo = {};

          filteredStudents.forEach(student => {
            initialStatus[student.StudentId] = "Present"; // Set default status to "Present"
            attendanceInfo[student.StudentId] = {
              Status: "Present", // Default status
              Name: student.StudentName, // Store the student's name
            };
          });

          setStatusSelection(initialStatus); // Set status selection
          setAttendanceData(attendanceInfo); // Set attendance data with names
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      } else {
        setTasks([]);
        setStatusSelection({});
        setAttendanceData({});
      }
    };
    fetchStudents();
  }, [selectedClass, selectedSection]);

  // Handle changing attendance status
  const handleStatusChange = (studentId, status) => {
    setStatusSelection((prev) => ({
      ...prev,
      [studentId]: status,
    }));

    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: {
        Status: status,
        Name: prev[studentId]?.Name || "", // Ensure the name is retained
      },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedClass || !selectedSection) {
      toast.error("Please fill in all required fields");
      return;
    }

    var className = classes.find(val => val.ClassId === selectedClass)
    console.log(className.Class)

    const attendanceToSubmit = {
      Date: selectedDate,
      Class: className.Class,
      Section: selectedSection,
      Attendance: tasks.map((task) => ({
        RollNo: task.RollNo, // Use RollNo from the tasks array (not the StudentId)
        StudentName: attendanceData[task.StudentId]?.Name, // Name is still stored by StudentId, so we use it here
        Status: attendanceData[task.StudentId]?.Status, // Status is linked by StudentId in attendanceData
        StudentId: task.StudentId,
      })),
    };

    console.log(attendanceToSubmit)

    try {
      const response = await axios.post('https://api.edspride.in/student-attendance/add', attendanceToSubmit);
      toast.success("Attendance submitted successfully!");
      setSelectedDate("");
      setSelectedClass("");
      setSelectedSection("");
      setAttendanceData({});
      setStatusSelection({});
      setTasks([]);
    } catch (error) {
      console.error("Error submitting attendance:", error);
      toast.error(error.response.data.message || "Error submitting attendance. Please try again.");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <MainDashboard>
      <ToastContainer />
      <Title>Choose Student Attendance Type</Title>
      <Form>
        <Main>
          <InputContainer>
            <Label>Select Date</Label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={today}
            />
          </InputContainer>

          <InputContainer>
            <Label>Select Class</Label>
            <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls.ClassId} value={cls.ClassId}>
                  {cls.Class}
                </option>
              ))}
            </Select>
          </InputContainer>

          <InputContainer>
            <Label>Select Section</Label>
            <Select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              disabled={!selectedClass}
            >
              <option value="">Select Section</option>
              {sections.map((section, index) => (
                <option key={index} value={section}>
                  {section}
                </option>
              ))}
            </Select>
          </InputContainer>
        </Main>

        <Wrapper>
          <StyledTable>
            <TableHeader>
              <tr>
                <HeaderCell>Id</HeaderCell>
                <HeaderCell>Student Name</HeaderCell>
                <HeaderCell>Father Name</HeaderCell>
                <HeaderCell>Roll No</HeaderCell>
                <HeaderCell>Current Status</HeaderCell>
              </tr>
            </TableHeader>
            <TableBody>
              {tasks && tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr key={task.StudentId}>
                    <BodyCell>{task.StudentId}</BodyCell>
                    <BodyCell>{task.StudentName}</BodyCell>
                    <BodyCell>{task.FatherDetail.Name}</BodyCell>
                    <BodyCell>{task.RollNo}</BodyCell>
                    <BodyCell>
                      <StatusContainer>
                        <StatusButtonP
                          onClick={() => handleStatusChange(task.StudentId, "Present")}
                          style={{
                            backgroundColor:
                              statusSelection[task.StudentId] === "Present"
                                ? "#4CAF50"
                                : "#e0e0e0",
                          }}
                        >
                          P
                        </StatusButtonP>
                        <StatusButtonA
                          onClick={() => handleStatusChange(task.StudentId, "Absent")}
                          style={{
                            backgroundColor:
                              statusSelection[task.StudentId] === "Absent"
                                ? "#F44336"
                                : "#e0e0e0",
                          }}
                        >
                          A
                        </StatusButtonA>
                        <StatusButtonL
                          onClick={() => handleStatusChange(task.StudentId, "Leave")}
                          style={{
                            backgroundColor:
                              statusSelection[task.StudentId] === "Leave"
                                ? "#2196F3"
                                : "#e0e0e0",
                          }}
                        >
                          L
                        </StatusButtonL>
                      </StatusContainer>
                    </BodyCell>
                  </tr>
                ))
              ) : (
                <tr>
                  <BodyCell colSpan={6} style={{ textAlign: "center" }}>
                    No students found
                  </BodyCell>
                </tr>
              )}
            </TableBody>
          </StyledTable>
        </Wrapper>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <SubmitButton onClick={handleSubmit}>Save+</SubmitButton>
        </div>
      </Form>
    </MainDashboard>
  );
};

export default StudentAttendance;
