import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  MainDashboard, Title, Form, FormContainer, InputContainer, Label, Select,
  SubmitButton, Main, ErrorMessage
} from "./SalayStyle";


const GenerateSalary = () => {
  const navigate = useNavigate();
  const [payrollSection, setPayrollSection] = useState("");
  // const [selectMonth, setSelectMonth] = useState("");
  const [departments, setDepartments] = useState([]);
  const [staff, setStaff] = useState([]);
  const [selectDepartment, setSelectDepartment] = useState('');
  const [selectStaff, setSelectStaff] = useState('');
  const [errors, setErrors] = useState({});


  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!payrollSection) newErrors.payrollSection = "Payroll Section is required";
    if (!selectDepartment) newErrors.selectDepartment = "Select Department is required";
    if (!selectStaff) newErrors.selectStaff = "Select Staff is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (payrollSection === "Salary") {
        const role = localStorage.getItem("Role");
        if (role == "Superadmin" || role == "Admin") {
          navigate(`/admin/salaryform`, { state: { Department: selectDepartment, StaffId: selectStaff } });
        } else {
          navigate(`/employee/salaryform`, { state: { Department: selectDepartment, StaffId: selectStaff } });
        }
      } else {
        alert("Coming Soon")
      }

      setPayrollSection("");
      setSelectDepartment("");
      setSelectStaff("");
    }
  };


  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('https://api.edspride.in/department/all');
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  // Fetch staff based on selected department
  useEffect(() => {
    const fetchStaff = async () => {
      if (selectDepartment) {
        try {
          const response = await fetch('https://api.edspride.in/staff/all');
          const data = await response.json();
          console.log(data)
          const filteredStaff = data.filter(staffMember => staffMember.Department.trim() === selectDepartment);
          console.log(selectDepartment)
          console.log(filteredStaff)
          setStaff(filteredStaff);
        } catch (error) {
          console.error('Error fetching staff:', error);
        }
      } else {
        setStaff([]); // Clear staff if no department is selected
      }
    };

    fetchStaff();
  }, [selectDepartment]);


  return (
    <>
      <MainDashboard bgColor="#f9f9f9">
        <FormContainer>
          <Title>Payroll Generate</Title>
          <Form onSubmit={handleSubmit}>
            <Main>
              <InputContainer>
                <Label>Payroll Section</Label>
                <Select value={payrollSection} onChange={(e) => setPayrollSection(e.target.value)}>
                  <option value="">Select Section</option>
                  <option value="Advance">Advance</option>
                  <option value="Bonus">Bonus</option>
                  <option value="Other">Other</option>
                  <option value="Income">Income</option>
                  <option value="Salary">Salary</option>
                  <option value="Vacation">Vacation</option>
                  <option value="Incentive">Incentive</option>
                </Select>
                {errors.payrollSection && <ErrorMessage>{errors.payrollSection}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Select Department</Label>
                <Select value={selectDepartment} onChange={(e) => setSelectDepartment(e.target.value)}>
                  <option value="">Select Department</option>
                  {departments.map(department => (
                    <option key={department.id} value={department.id}>
                      {department.DepartmentName}
                    </option>
                  ))}
                </Select>
                {errors.selectDepartment && <ErrorMessage>{errors.selectDepartment}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Select Staff</Label>
                <Select value={selectStaff} onChange={(e) => setSelectStaff(e.target.value)}>
                  <option value="">Select Staff</option>
                  {staff.map(staffMember => (
                    <option key={staffMember.id} value={staffMember.EmployeeId}>
                      {staffMember.Name}
                    </option>
                  ))}
                </Select>
                {errors.selectStaff && <ErrorMessage>{errors.selectStaff}</ErrorMessage>}
              </InputContainer>
            </Main>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <SubmitButton type="submit">Submit</SubmitButton>
            </div>
          </Form>
        </FormContainer>
      </MainDashboard>
    </>
  );
};

export default GenerateSalary;
