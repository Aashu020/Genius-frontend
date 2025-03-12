import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";
import { CSVLink } from "react-csv";
import "jspdf-autotable";

// Styled components
const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
`;

const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
`;

const TableContainer = styled.div`
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const TableButton = styled.button`
  margin-right: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const SearchInput = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
`;

const DatePicker = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-left: 10px;
`;

const headersStudent = [
  { label: "Date", key: "date" },
  { label: "Day", key: "day" },
  { label: "Student Name", key: "name" },
  { label: "Roll No", key: "rollNo" },
  { label: "Status", key: "status" },
  { label: "Class", key: "class" },
  { label: "Section", key: "section" },
];

const headersStaff = [
  { label: "Date", key: "date" },
  { label: "Day", key: "day" },
  { label: "Name", key: "name" },
  { label: "Employee ID", key: "employeeId" },
  { label: "Status", key: "status" },
  { label: "Role", key: "role" },
];

const columnsStudent = [
  { name: "DATE", selector: (row) => row.date.split("-").reverse().join("-"), sortable: true },
  { name: "DAY", selector: (row) => row.day, sortable: true },
  { name: "STUDENT NAME", selector: (row) => row.name, sortable: true },
  { name: "ROLL NO", selector: (row) => row.rollNo, sortable: true },
  { name: "STATUS", selector: (row) => row.status, sortable: true },
  { name: "CLASS", selector: (row) => row.class, sortable: true },
  { name: "SECTION", selector: (row) => row.section, sortable: true },
];

const columnsStaff = [
  { name: "DATE", selector: (row) => row.date.split("-").reverse().join("-"), sortable: true },
  { name: "DAY", selector: (row) => row.day, sortable: true },
  { name: "NAME", selector: (row) => row.name, sortable: true },
  { name: "EMPLOYEE ID", selector: (row) => row.employeeId, sortable: true },
  { name: "STATUS", selector: (row) => row.status, sortable: true },
  { name: "ROLE", selector: (row) => row.role, sortable: true },
];

// Component
const AttendanceTable = () => {
  const [studentData, setStudentData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [loadingStudent, setLoadingStudent] = useState(false);
  const [loadingStaff, setLoadingStaff] = useState(false);
  const [currentTable, setCurrentTable] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Default to today


  // Fetch student data based on the selected date
  const fetchStudentData = async (date) => {
    setLoadingStudent(true);
    try {
      const response = await fetch(`http://localhost:8007/student-attendance/all?date=${date}`);
      const result = await response.json();
  
      // Logging the result to check the data structure
      console.log('Student Data:', result);
  
      const filteredData = result
        .filter(item => item.Date === date)  // Filtering by selected date
        .flatMap(item => 
          item.Attendance.map(att => ({
            date: item.Date,
            day: new Date(item.Date).toLocaleDateString('en-US', { weekday: 'long' }),
            rollNo: att.RollNo,
            status: att.Status,
            class: item.Class,
            section: item.Section,
            name: att.StudentName, // This should contain the student's name
          }))
        );
  
      // Logging the mapped data to check if names are properly extracted
      console.log('Mapped Student Data:', filteredData);
  
      setStudentData(filteredData);
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoadingStudent(false);
    }
  };
  

  // Fetch staff data based on the selected date
  const fetchStaffData = async (date) => {
    console.log(date)
    setLoadingStaff(true);
    try {
      const response = await fetch(`http://localhost:8007/staff-attendance/all?date=${date}`);
      const result = await response.json();
  
      // Logging the result to check the data structure
      console.log('Staff Data:', result);
  
      const filteredData = result
        .filter(item => item.Date === date)  // Filtering by selected date
        .flatMap(item => 
          item.Attendance.map(att => ({
            date: item.Date,
            day: new Date(item.Date).toLocaleDateString('en-US', { weekday: 'long' }),
            employeeId: att.EmployeeId, // This should contain the employee ID
            status: att.Status,
            role: item.Role, // The role of the employee
            name: att.EmployeeName, // This should contain the staff name
          }))
        );
  
      // Logging the mapped data to check if names are properly extracted
      console.log('Mapped Staff Data:', filteredData);
  
      setStaffData(filteredData);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    } finally {
      setLoadingStaff(false);
    }
  };
  

  useEffect(() => {
    fetchStudentData(selectedDate);
    fetchStaffData(selectedDate);
  }, [selectedDate]);

  const exportPDF = (type) => {
    const doc = new jsPDF();
    const title = type === "student" ? "Student Attendance Report" : "Staff Attendance Report";
    doc.text(title, 20, 10);
    const body = type === "student"
      ? studentData.map(row => [row.date, row.day, row.rollNo, row.name, row.status, row.class, row.section])
      : staffData.map(row => [row.date, row.day, row.name, row.employeeId, row.status, row.role]);

    doc.autoTable({
      head: type === "student" ? [["DATE", "DAY", "ROLL NO", "STUDENT NAME", "STATUS", "CLASS", "SECTION"]] : [["DATE", "DAY", "NAME", "EMPLOYEE ID", "STATUS", "ROLE"]],
      body,
    });
    doc.save(`${title.toLowerCase().replace(" ", "_")}.pdf`);
  };

  // Search Function
  const filteredStudentData = studentData.filter((item) =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredStaffData = staffData.filter((item) =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  useEffect(()=>{

  })

  return (
    <MainDashboard>
      <ButtonContainer>
        <ButtonGroup>
          <TableButton onClick={() => { setCurrentTable("student"); fetchStudentData(selectedDate); }}>
            Student Attendance
          </TableButton>
          <TableButton onClick={() => { setCurrentTable("staff"); fetchStaffData(selectedDate); }}>
            Staff Attendance
          </TableButton>
          {currentTable === "student" && (
            <>
              <CSVLink data={studentData} headers={headersStudent} filename={"student_attendance_report.csv"}>
                <TableButton>Export Student CSV</TableButton>
              </CSVLink>
              <TableButton onClick={() => exportPDF("student")}>Export Student PDF</TableButton>
            </>
          )}
          {currentTable === "staff" && (
            <>
              <CSVLink data={staffData} headers={headersStaff} filename={"staff_attendance_report.csv"}>
                <TableButton>Export Staff CSV</TableButton>
              </CSVLink>
              <TableButton onClick={() => exportPDF("staff")}>Export Staff PDF</TableButton>
            </>
          )}
          <TableButton onClick={() => window.print()}>Print</TableButton>
        </ButtonGroup>
        <SearchInput
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DatePicker
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </ButtonContainer>
      {currentTable === "student" && (
        <TableContainer>
          {loadingStudent ? (
            <div>Loading Student Data...</div>
          ) : (
            <DataTable
              columns={columnsStudent}
              data={filteredStudentData}
              pagination
              highlightOnHover
              title="Student Attendance"
            />
          )}
        </TableContainer>
      )}
      {currentTable === "staff" && (
        <TableContainer>
          {loadingStaff ? (
            <div>Loading Staff Data...</div>
          ) : (
            <DataTable
              columns={columnsStaff}
              data={filteredStaffData}
              pagination
              highlightOnHover
              title="Staff Attendance"
            />
          )}
        </TableContainer>
      )}
    </MainDashboard>
  );
};

export default AttendanceTable;