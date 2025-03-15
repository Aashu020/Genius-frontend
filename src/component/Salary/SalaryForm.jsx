import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  baseURL from '../utils/Url'; 
import {
  Container, MainDashboard, Title, Form, FormContainer, InputContainer, Label,
  Input, Select, SubmitButton, Main, Heading, Section, EmployeeName, EmployeeID
} from "./SalayStyle";

const SalaryForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [allowanceTitles, setAllowanceTitles] = useState([]);
  const [deductionTitles, setDeductionTitles] = useState([]);
  const [allowanceValues, setAllowanceValues] = useState({});
  const [deductionValues, setDeductionValues] = useState({});
  const [absent, setAbsent] = useState("");
  const [leaveAllow, setLeaveAllow] = useState("");
  const [late, setLate] = useState(0);
  const [halfDay, setHalfDay] = useState(0);
  const [basicSalary, setBasicSalary] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [months, setMonths] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState({});
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [absentDays, setAbsentDays] = useState(0);
  const [leaveDays, setLeaveDays] = useState(0);
  const [presentDays, setPresentDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [pastData, setPastData] = useState(null);
  const [date, setDate] = useState('');
  const [remark, setRemark] = useState('');
  const [uniqueMonths, setUniqueMonths] = useState([]);


  const fetchData = async () => {
    const response = await axios.get(`${baseURL}/staff/get/${location.state.StaffId}`);
    setEmployee(response.data);
  };

  const fetchAttendanceData = async () => {
    const response = await axios.get(`${baseURL}/staff-attendance/all`);
    const roleAttendance = response.data.filter(data => data.Role === employee?.Department);
    setAttendanceData(roleAttendance);
  };

  const payrollPastData = async () => {
    try {
      const response = await axios.get(`${baseURL}/payroll-data/get/${location.state.StaffId}`);
      setPastData(response.data);
      // console.log(response.data);
      const monthsFromData = [...new Set(response.data.Payments.map(payment => payment.Month))];
      setUniqueMonths(monthsFromData);
    } catch (error) {
      console.error("Error fetching payroll data:", error);
    }
  };


  const fetchPayrollHeaders = async () => {
    const response = await axios.get(`${baseURL}/payroll-header/all`);
    const allowances = response.data.filter(item => item.Type === "Allowance");
    const deductions = response.data.filter(item => item.Type === "Deduction");
    setAllowanceTitles(allowances);
    setDeductionTitles(deductions);
  };

  const fetchAcademicYearInfo = async () => {
    const response = await axios.get(`${baseURL}/academic-year-info/active`);
    generateMonths(response.data);
  };

  const generateMonths = (data) => {
    const { StartYear, StartMonth, EndYear, EndMonth } = data;
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    let monthArray = [];
    let daysArray = {};
    let startMonthIndex = monthNames.indexOf(StartMonth);
    let endMonthIndex = monthNames.indexOf(EndMonth);

    for (let year = StartYear; year <= EndYear; year++) {
      for (let month = (year === StartYear ? startMonthIndex : 0); month <= (year === EndYear ? endMonthIndex : 11); month++) {
        const monthName = monthNames[month];
        monthArray.push(`${monthName} ${year}`);

        // Calculate the number of days in the month
        const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
        daysArray[`${monthName} ${year}`] = daysInCurrentMonth;
      }
    }

    setMonths(monthArray);
    setDaysInMonth(daysArray);
  };

  useEffect(() => {
    fetchData();
    fetchPayrollHeaders();
    fetchAcademicYearInfo();
    payrollPastData();
  }, []);

  useEffect(() => {
    if (employee) {
      fetchAttendanceData();
    }
  }, [employee]);

  useEffect(() => {
    if (selectedMonth) {
      const monthYear = selectedMonth.split(" ");
      const month = monthYear[0];
      const year = monthYear[1];

      const filtered = attendanceData.filter(attendance => {
        const attendanceDate = new Date(attendance.Date);
        return attendanceDate.getMonth() === new Date(`${month} 1, ${year}`).getMonth() &&
          attendanceDate.getFullYear() === parseInt(year);
      });

      setFilteredAttendance(filtered);
      console.log(filtered);
    } else {
      setFilteredAttendance(attendanceData);
    }
  }, [selectedMonth, attendanceData]);

  const handleAllowanceChange = (e, title) => {
    setAllowanceValues(prev => ({ ...prev, [title]: e.target.value }));
  };

  const handleDeductionChange = (e, title) => {
    setDeductionValues(prev => ({ ...prev, [title]: e.target.value }));
  };

  const totalChange = () => {
    var totalMinusDays = absentDays + ((leaveDays || 1) - 1) + (late * 0.25) + (halfDay * 0.5)
    // console.log(totalMinusDays);
    // console.log(daysInMonth[selectedMonth]);
    if (pastData === null) {
      const totalAllowance = Object.values(allowanceValues)
        .map(Number) // Convert string values to numbers
        .reduce((acc, curr) => acc + curr, 0); // Sum the values

      const totalDeduction = Object.values(deductionValues).map(Number).reduce((acc, curr) => acc + curr, 0);

      // console.log(totalAllowance);
      return ((presentDays * salaryPerDay) + (halfDay * (salaryPerDay * 0.5)) + (late * (salaryPerDay * 0.25)) + totalAllowance - totalDeduction).toFixed(2)
    } else {
      const totalAllowance = Object.values(allowanceValues)
        .map(Number) // Convert string values to numbers
        .reduce((acc, curr) => acc + curr, 0); // Sum the values

      const totalDeduction = Object.values(deductionValues).map(Number).reduce((acc, curr) => acc + curr, 0);
      return ((salaryPerDay * (daysInMonth[selectedMonth] - totalMinusDays)) + totalAllowance - totalDeduction).toFixed(2)
    }
  }

  // setInterval(() => {
  //   setTotalAmount(totalChange())
  // }, 1000)

  useEffect(() => {
    setTotalAmount(totalChange())
    // totalChange();
  }, [late, halfDay, presentDays, selectedMonth, allowanceValues, deductionValues, totalAmount])

  useEffect(() => {
    if (selectedMonth) {
      const monthYear = selectedMonth.split(" ");
      const month = monthYear[0];
      const year = monthYear[1];

      const filtered = attendanceData.filter(attendance => {
        const attendanceDate = new Date(attendance.Date);
        return attendanceDate.getMonth() === new Date(`${month} 1, ${year}`).getMonth() &&
          attendanceDate.getFullYear() === parseInt(year);
      });

      // Initialize counts
      let absentCount = 0;
      let leaveCount = 0;
      let presentCount = 0;

      // Calculate attendance statistics
      filtered.forEach(attendance => {
        attendance.Attendance.forEach(record => {
          if (record.Status === "Absent") {
            absentCount++;
          } else if (record.Status === "Leave") {
            leaveCount++;
          } else if (record.Status === "Present") {
            presentCount++;
          }
        });
      });

      // Set the attendance counts
      setAbsentDays(absentCount);
      setLeaveDays(leaveCount);
      setPresentDays(presentCount);

      setFilteredAttendance(filtered);
    } else {
      setFilteredAttendance(attendanceData);
    }
  }, [selectedMonth, attendanceData]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(allowanceValues)
    const formData = {
      EmployeeId: employee.EmployeeId,
      EmployeeName: employee?.Name,
      Payments: [{
        Month: selectedMonth,
        Salary: {
          Absent: absentDays,
          Leave: leaveDays,
          Half: halfDay,
          Late: late,
          Present: presentDays,
          BaseSalary: employee.Salary,
          PerDaySalary: salaryPerDay
        },
        Allowance: Object.entries(allowanceValues).map(([key, value]) => ({
          Title: key,
          Amount: Number(value)
        })),
        Deductions: Object.entries(deductionValues).map(([key, value]) => ({
          Title: key,
          Amount: Number(value)
        })),
        TotalSalary: totalAmount,
        Date: date,
        Remark: remark
      }]
    };
    console.log(formData)
    try {
      await axios.post(
        `${baseURL}/payroll-data/add`,
        formData
      );
      alert("Payment Added successfully!");
      const role = localStorage.getItem("Role");
      if (role == "Superadmin" || role == "Admin") {
        navigate("/admin/allsalary");
      } else {
        navigate("/employee/allsalary");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Error While Adding Payment!");
    }
  };


  const salary = Number(employee?.Salary);
  const salaryPerDay = selectedMonth ? (salary / (daysInMonth[selectedMonth] || 1)).toFixed(2) : 0;

  return (
    <MainDashboard>
      <FormContainer>
        <Title>Pay Salary Form</Title>
        <Section>
          <EmployeeName>
            <img src="" alt="" />
            <div>
              <h2>Employee Id: {location.state.StaffId} </h2>
              <p>Department: {location.state.Department}</p>
            </div>
          </EmployeeName>
          <EmployeeID>
            <h2>Employee Name: {employee?.Name} </h2>
          </EmployeeID>
        </Section>
        <Form onSubmit={handleSubmit}>
          <Main columns="repeat(2, 1fr)">
            <InputContainer>
              <Label>Absent</Label>
              <Input type="text" placeholder="Enter Days" value={absentDays} onChange={(e) => setAbsent(e.target.value)} readOnly />
            </InputContainer>
            <InputContainer>
              <Label>Leave</Label>
              <Input type="text" placeholder="Enter Days" value={leaveDays} onChange={(e) => setLeaveAllow(e.target.value)} readOnly />
            </InputContainer>
            <InputContainer>
              <Label>Late</Label>
              <Input type="text" placeholder="Enter Days" value={late} onChange={(e) => setLate(e.target.value)} />
            </InputContainer>
            <InputContainer>
              <Label>Half Day</Label>
              <Input type="text" placeholder="Enter Days" value={halfDay} onChange={(e) => setHalfDay(e.target.value)} />
            </InputContainer>
            <InputContainer>
              <Label>Present </Label>
              <Input type="text" placeholder="Enter Basic Salary" value={presentDays} onChange={(e) => setPresentDays(e.target.value)} />
            </InputContainer>
            <InputContainer>
              <Label>Select Month</Label>
              <Select onChange={(e) => setSelectedMonth(e.target.value)}>
                <option value="">Select Month</option>
                {months
                  .filter(month => !uniqueMonths.includes(month))
                  .map((month) => (
                    <option key={month} value={month}>{month}</option>
                  ))}
              </Select>
            </InputContainer>
            <InputContainer>
              <Label>Salary Per Day</Label>
              <Input type="text" value={salaryPerDay} readOnly />
            </InputContainer>
            <InputContainer>
              <Label>Total Basic Salary</Label>
              <Input type="text" value={employee?.Salary} placeholder="Salary" readOnly />
            </InputContainer>
          </Main>

          <Main columns="repeat(2, 1fr)">
            <Heading>Allowance</Heading>
            <Heading>Deduction</Heading>
            <div>
              {allowanceTitles.map(item => (
                <InputContainer key={item._id}>
                  <Label>{item.Title}</Label>
                  <Input
                    type="text"
                    placeholder={`Enter ${item.Title} Amount`}
                    value={allowanceValues[item.Title] || ''}
                    onChange={(e) => handleAllowanceChange(e, item.Title)}
                  />
                </InputContainer>
              ))}
            </div>
            <div>
              {deductionTitles.map(item => (
                <InputContainer key={item._id}>
                  <Label>{item.Title}</Label>
                  <Input
                    type="text"
                    placeholder={`Enter ${item.Title} Amount`}
                    value={deductionValues[item.Title] || ''}
                    onChange={(e) => handleDeductionChange(e, item.Title)}
                  />
                </InputContainer>
              ))}
            </div>
          </Main>
          <Main columns="repeat(2, 1fr)">
            <InputContainer>
              <Label>Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </InputContainer>
            <InputContainer>
              <Label>Remark</Label>
              <Input type="text" placeholder="Add Remark" value={remark} onChange={(e) => setRemark(e.target.value)} required />
            </InputContainer>
          </Main>

          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <SubmitButton>Final Salary Amount: ₹{totalAmount}</SubmitButton>
            <SubmitButton type="submit">Submit</SubmitButton>
          </div>
        </Form>
      </FormContainer>
    </MainDashboard>
  );
};

export default SalaryForm;