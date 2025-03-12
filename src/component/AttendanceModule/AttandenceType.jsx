import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Importing Toastify
import 'react-toastify/dist/ReactToastify.css'; // Importing toast styles

// Styled Components (no changes)

const MainDashboard = styled.div`
  flex: 1;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
  padding: 20px;;
    align-items: center;
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
  grid-template-columns: repeat(2, 1fr);
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
  width: 80%;
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

const StatusButtonP = styled.button`
  background-color: #4caf50;
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

const StatusButtonA = styled.button`
  background-color: #f44336;
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

const StatusButtonL = styled.button`
  background-color: #2196f3;
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

const AttendenceType = () => {
  const [allStaff, setAllStaff] = useState([]); // All staff data
  const [filteredStaff, setFilteredStaff] = useState([]); // Filtered staff based on department
  const [selectedDate, setSelectedDate] = useState("");
  const [departments, setDepartments] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [formData, setFormData] = useState({ Department: "" });
  const [errors, setErrors] = useState({});
  const [statusSelection, setStatusSelection] = useState({}); // Track selected statuses

  // Fetch departments once when the component mounts
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:8007/department/all");
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  // Fetch all staff data
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get("http://localhost:8007/staff/all");
        console.log("Fetched Staff Data:", response.data); // Debugging
        setAllStaff(response.data);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };

    fetchStaff();
  }, []);

  // Filter staff based on selected department
  useEffect(() => {
    console.log("Department selected:", formData.Department); // Debugging
    if (formData.Department) {
      const filtered = allStaff.filter(
        (staff) => staff.Department === formData.Department
      );
      console.log("Filtered Staff:", filtered); // Debugging
      setFilteredStaff(filtered);
    } else {
      setFilteredStaff([]); // Clear staff if no department is selected
    }
  }, [formData.Department, allStaff]); // Runs when formData.Department changes or allStaff is fetched

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  useEffect(() => {
    const initialStatus = {};
    filteredStaff.forEach((employee) => {
      initialStatus[employee.EmployeeId] = "Present"; // Set default status to "Present"
    });
    setStatusSelection(initialStatus);
  }, [filteredStaff]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (value === "") {
      setErrors((prev) => ({ ...prev, [name]: `${name} is required` }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleStatusChange = (employeeId, status) => {
    setAttendanceData((prev) => ({
      ...prev,
      [employeeId]: { ...prev[employeeId], Status: status }, // Update status for the specific employee
    }));
  };


  useEffect(() => {
    const initialAttendance = {};
    filteredStaff.forEach((employee) => {
      initialAttendance[employee.EmployeeId] = { Status: "Present", Name: employee.Name, Role: employee.Role }; // Set default status to "Present" and store the name
    });
    setAttendanceData(initialAttendance); // Update attendanceData directly
  }, [filteredStaff]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !formData.Department) {
      alert("Please fill in all required fields");
      return;
    }

    const attendanceToSubmit = {
      Date: selectedDate,
      Role: formData.Department, // Assuming Role is the same as Department
      Attendance: Object.keys(attendanceData).map((employeeId) => ({
        EmployeeId: employeeId,
        EmployeeName: attendanceData[employeeId].Name.trim(), // Include employee name
        Status: attendanceData[employeeId].Status, // Include status
        Role: attendanceData[employeeId].Role,
      })),
    };

    console.log(attendanceToSubmit); // Ensure you're sending correct data

    try {
      const response = await axios.post(
        "http://localhost:8007/staff-attendance/add",
        attendanceToSubmit
      );
      console.log("Attendance submitted:", response.data);
      // Reset form state after submission if needed
      setSelectedDate("");
      setFormData({ Department: "" });
      setAttendanceData({});
      setStatusSelection({});
      toast.success("Attendance submitted successfully!"); // Show success toast
    } catch (error) {
      // console.log(error.response.data.message)
      console.error("Error submitting attendance:", error);
      toast.error(error.response.data.message || "Error submitting attendance. Please try again."); // Show error toast
    }
  };



  const today = new Date().toISOString().split("T")[0];

  return (
    <MainDashboard>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Title>Choose Employee Attendance</Title>
      <Main>
        <InputContainer>
          <Label>Select Date</Label>
          <Input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            max={today}
          />
        </InputContainer>

        <InputContainer>
          <Label>Department</Label>
          <Select
            name="Department"
            value={formData.Department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.DepartmentId} value={dept.DepartmentName}>
                {dept.DepartmentName}
              </option>
            ))}
          </Select>
          {errors.Department && <p style={{ color: "red" }}>{errors.Department}</p>}
        </InputContainer>
      </Main>

      {filteredStaff.length > 0 && (
        <Wrapper>
          <StyledTable>
            <TableHeader>
              <tr>
                <HeaderCell>Employee</HeaderCell>
                <HeaderCell>Department</HeaderCell>
                <HeaderCell>Role</HeaderCell>
                <HeaderCell>Status</HeaderCell>
              </tr>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((employee) => (
                <tr key={employee.EmployeeId}>
                  <BodyCell>{employee.Name}</BodyCell>
                  <BodyCell>{employee.Department}</BodyCell>
                  <BodyCell>{employee.Role}</BodyCell>
                  <BodyCell>
                    <StatusContainer>
                      <StatusButtonP
                        onClick={() => handleStatusChange(employee.EmployeeId, "Present")}
                        style={{
                          backgroundColor: attendanceData[employee.EmployeeId]?.Status === "Present" ? "#4caf50" : "#e0e0e0",
                        }}
                      >
                        P
                      </StatusButtonP>
                      <StatusButtonA
                        onClick={() => handleStatusChange(employee.EmployeeId, "Absent")}
                        style={{
                          backgroundColor: attendanceData[employee.EmployeeId]?.Status === "Absent" ? "#f44336" : "#e0e0e0",
                        }}
                      >
                        A
                      </StatusButtonA>
                      <StatusButtonL
                        onClick={() => handleStatusChange(employee.EmployeeId, "Leave")}
                        style={{
                          backgroundColor: attendanceData[employee.EmployeeId]?.Status === "Leave" ? "#2196f3" : "#e0e0e0",
                        }}
                      >
                        L
                      </StatusButtonL>

                    </StatusContainer>
                  </BodyCell>
                </tr>
              ))}
            </TableBody>
          </StyledTable>
        </Wrapper>
      )}

      {filteredStaff.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <SubmitButton onClick={handleSubmit}>Submit Attendance</SubmitButton>
        </div>

      )}
    </MainDashboard>
  );
};

export default AttendenceType;