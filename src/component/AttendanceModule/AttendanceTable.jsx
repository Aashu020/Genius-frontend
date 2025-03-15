import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";
import { CSVLink } from "react-csv";
import "jspdf-autotable";
import baseURL from '../utils/Url'; //
// Breakpoints for responsiveness
const breakpoints = {
  mobile: '468px',
  tablet: '768px',
  desktop: '1024px',
  largeDesktop: '1200px',
};

// Styled components with responsive design
const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
  width: 100%;
  min-height: 100vh;
`;

const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
    height: calc(100vh - 80px);
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    padding: 15px;
    height: calc(100vh - 90px);
  }
  @media (min-width: ${breakpoints.largeDesktop}) {
    padding: 25px;
  }
`;

const TableContainer = styled.div`
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 5px;
    border-radius: 4px;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    padding: 8px;
  }
  @media (min-width: ${breakpoints.largeDesktop}) {
    padding: 15px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 15px;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  @media (max-width: ${breakpoints.mobile}) {
    justify-content: center;
    margin-bottom: 10px;
  }
`;

const TableButton = styled.button`
  margin-right: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  background-color: #fff;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 4px 8px;
    font-size: 12px;
    margin-right: 0;
    width: 100%;
    margin-bottom: 5px;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    padding: 5px 8px;
    font-size: 13px;
  }
  @media (min-width: ${breakpoints.largeDesktop}) {
    padding: 6px 12px;
    font-size: 15px;
  }
`;

const SearchInput = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
  font-size: 14px;
  width: 200px;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
    font-size: 12px;
    padding: 4px;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    width: 150px;
    font-size: 13px;
  }
  @media (min-width: ${breakpoints.largeDesktop}) {
    width: 250px;
    font-size: 15px;
  }
`;

const DatePicker = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-left: 10px;
  font-size: 14px;
  width: 150px;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    margin-left: 0;
    margin-bottom: 10px;
    font-size: 12px;
    padding: 4px;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    width: 120px;
    font-size: 13px;
  }
  @media (min-width: ${breakpoints.largeDesktop}) {
    width: 180px;
    font-size: 15px;
  }
`;

// Headers and columns remain unchanged
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
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  const fetchStudentData = async (date) => {
    setLoadingStudent(true);
    try {
      const response = await fetch(`${baseURL}/student-attendance/all?date=${date}`);
      const result = await response.json();
      const filteredData = result
        .filter((item) => item.Date === date)
        .flatMap((item) =>
          item.Attendance.map((att) => ({
            date: item.Date,
            day: new Date(item.Date).toLocaleDateString('en-US', { weekday: 'long' }),
            rollNo: att.RollNo,
            status: att.Status,
            class: item.Class,
            section: item.Section,
            name: att.StudentName,
          }))
        );
      setStudentData(filteredData);
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoadingStudent(false);
    }
  };

  const fetchStaffData = async (date) => {
    setLoadingStaff(true);
    try {
      const response = await fetch(`${baseURL}/staff-attendance/all?date=${date}`);
      const result = await response.json();
      const filteredData = result
        .filter((item) => item.Date === date)
        .flatMap((item) =>
          item.Attendance.map((att) => ({
            date: item.Date,
            day: new Date(item.Date).toLocaleDateString('en-US', { weekday: 'long' }),
            employeeId: att.EmployeeId,
            status: att.Status,
            role: item.Role,
            name: att.EmployeeName,
          }))
        );
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
    const body =
      type === "student"
        ? studentData.map((row) => [row.date, row.day, row.rollNo, row.name, row.status, row.class, row.section])
        : staffData.map((row) => [row.date, row.day, row.name, row.employeeId, row.status, row.role]);

    doc.autoTable({
      head: type === "student"
        ? [["DATE", "DAY", "ROLL NO", "STUDENT NAME", "STATUS", "CLASS", "SECTION"]]
        : [["DATE", "DAY", "NAME", "EMPLOYEE ID", "STATUS", "ROLE"]],
      body,
    });
    doc.save(`${title.toLowerCase().replace(" ", "_")}.pdf`);
  };

  const filteredStudentData = studentData.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredStaffData = staffData.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Container>
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
                responsive // Enable built-in responsiveness of react-data-table-component
                customStyles={{
                  table: {
                    style: {
                      minWidth: '100%',
                    },
                  },
                  headCells: {
                    style: {
                      fontSize: '14px',
                      '@media (max-width: 468px)': {
                        fontSize: '10px',
                        padding: '5px',
                      },
                    },
                  },
                  cells: {
                    style: {
                      fontSize: '12px',
                      '@media (max-width: 468px)': {
                        fontSize: '9px',
                        padding: '5px',
                      },
                    },
                  },
                }}
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
                responsive // Enable built-in responsiveness
                customStyles={{
                  table: {
                    style: {
                      minWidth: '100%',
                    },
                  },
                  headCells: {
                    style: {
                      fontSize: '14px',
                      '@media (max-width: 468px)': {
                        fontSize: '10px',
                        padding: '5px',
                      },
                    },
                  },
                  cells: {
                    style: {
                      fontSize: '12px',
                      '@media (max-width: 468px)': {
                        fontSize: '9px',
                        padding: '5px',
                      },
                    },
                  },
                }}
              />
            )}
          </TableContainer>
        )}
      </MainDashboard>
    </Container>
  );
};

export default AttendanceTable;