import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MainDashboard = styled.div`
  flex: 1;
   height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
  padding: 20px;
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    br {
      display: none;
    }
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
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
const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;
const Select = styled.select`
  width: 96%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    height: 38px;
    width: 90%;
    font-size: 12px;
    padding: 10px 12px;
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

  @media (max-width: 768px) {
    width: 100%;
    font-size: 12px;
    padding: 5px;
  }
`;


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

      <MainDashboard>
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

              {/* <InputContainer>
                <Label>Select Month</Label>
                <Select value={selectMonth} onChange={(e) => setSelectMonth(e.target.value)}>
                  <option value="">Select Month</option>
                  <option value="jan">January</option>
                  <option value="feb">February</option>
                  <option value="march">March</option>
                  <option value="april">April</option>
                  <option value="may">May</option>
                  <option value="june">June</option>
                  <option value="july">July</option>
                  <option value="august">August</option>
                  <option value="september">September</option>
                  <option value="october">October</option>
                  <option value="november">November</option>
                  <option value="december">December</option>
                </Select>
                {errors.selectMonth && <ErrorMessage>{errors.selectMonth}</ErrorMessage>}
              </InputContainer> */}

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

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <SubmitButton type="submit">Submit</SubmitButton>
            </div>
          </Form>
        </FormContainer>
      </MainDashboard>

    </>
  );
};

export default GenerateSalary;
