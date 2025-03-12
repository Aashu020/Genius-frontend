import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MainDashboard,
  Title,
  Form,
  Main,
  InputContainer,
  Label,
  Input,
  Select,
  Wrapper,
  StyledTable,
  TableHeader,
  HeaderCell,
  TableBody,
  BodyCell,
  StatusContainer,
  StatusButtonP,
  StatusButtonA,
  StatusButtonL,
  SubmitButton,
} from "../AttendanceModule/AttendanceTStyle";

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
        const response = await axios.get("https://api.edspride.in/department/all");
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
        const response = await axios.get("https://api.edspride.in/staff/all");
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
        "https://api.edspride.in/staff-attendance/add",
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
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <SubmitButton onClick={handleSubmit}>Submit Attendance</SubmitButton>
        </div>
      )}
    </MainDashboard>
  );
};

export default AttendenceType;