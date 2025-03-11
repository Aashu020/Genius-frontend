import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AdminNavbar from "../StudentAdmission/AdminNavbar";
import StaffSidebar from "./StaffSidebar";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const Container = styled.div`
  display: flex;
  
  background-color: #f4f4f4;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

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
`;

const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
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
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 12px;
    height: 30px;
    width: 50%;
    margin-bottom: 30px;
    margin-top: 20px;
  }
`;
const Heading1 = styled.div`
  width: 30%;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-bottom: 30px;
  font-weight: bold;

  @media (max-width: 768px) {
    width: 35%;
  }
  @media (max-width: 480px) {
    font-size: 12px;
    height: 30px;
    width: 65%;
    margin-bottom: 30px;
    margin-top: 20px;
  }
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
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
  @media (max-width: 480px) {
    height: 10px;
    width: 80%;
    font-size: 12px;
    padding: 12px 18px;
  }
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
  @media (max-width: 480px) {
    height: 38px;
    width: 94%;
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

const StepIndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  background-color: #f0f0f0;
  padding: 10px;
  margin-bottom: 30px;

  @media (max-width: 480px) {
    gap: 0.1rem;
  }
`;

const Step = styled.div`
  background-color: ${(props) => (props.active ? "#8a2be2" : "#4a0e8f")};
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 7px;
    width: 40%;
  }
`;

const StepContent = styled.span`
  margin-left: 5px;
`;
const Label2 = styled.span`
  position: absolute;
  top: -10px;
  left: 20px;
  background: linear-gradient(270deg, #6c6c6c 0%, #525252 100%);

  color: white;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
`;
const StaffDetail = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    Name: "",
    Role: "",
    Department: "",
    DOB: "",
    DOJ: "",
    Gender: "",
    Category: "",
    LanguageKnown: [],
    Nationality: "",
    MobileNo: "",
    Salary: "",
    BloodGroup: "",
    Email: "",
    JobGrade: "",
    Experience: "",
    LastSchool: "",
    ReferredName: "",
    ReferredContact: "",
    Transport: false,
    Route: "",
    Address: "",
    City: "",
    Area: "",
    Pincode: "",
    Religion: "",
    MaritalStatus: "",
    FamilyDetail: {
      MiddleName: "",
      MobileNo: "",
      EmailId: "",
    },
    EmergencyContact: {},
    Documents: {},
    TeachingSubject: "",
    Assign: [{
      Class: "",
      Section:"",
      Subject: "",
    }],
    AadharNo: "",
    PanNo: "",
    PFNo: "",
    BankName: "",
    AccountNumber: "",
    IFSCCode: "",
    HomeWorkPublish: false,
    ClassTeacher: false,
    Class: [],
    Status: "",
  });

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem('staffData')) || {};
    console.log(existingData)
    setFormData(existingData);
  }, [])
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update nested properties for Father's Details
    if (name.startsWith("FamilyDetail.")) {
      const familyField = name.split("FamilyDetail.")[1]; // Extract the specific field name
      setFormData((prev) => ({
        ...prev,
        FamilyDetail: {
          ...prev.FamilyDetail,
          [familyField]: value, // Update the specific field
        },
      }));
    }


    // Update nested properties for Emergency Contact
    else if (name.startsWith("EmergencyContact.")) {
      const emergencyField = name.split("EmergencyContact.")[1]; // Extract the specific field name
      setFormData((prev) => ({
        ...prev,
        EmergencyContact: {
          ...prev.EmergencyContact,
          [emergencyField]: value, // Update the specific field
        },
      }));
    }

    // Update top-level properties if necessary (not applicable here as all inputs are nested)
    else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSaveAndNext = () => {
    // Retrieve existing data from local storage
    const existingData = JSON.parse(localStorage.getItem('staffData')) || {};

    // Merge existing data with the current form data
    const updatedData = { ...existingData, ...formData };

    // Save merged data back to local storage
    localStorage.setItem('staffData', JSON.stringify(updatedData));

    // Navigate to the next step
    alert('Data saved! Navigate to the next step.');
    const role = localStorage.getItem("Role");
    if(role=="Superadmin" || role=="Admin"){
      navigate(`/admin/staffdocument`);
    } else{
      navigate(`/employee/staffdocument`);
    }
  };

  const goBack = () => {
    const role = localStorage.getItem("Role");
    if(role=="Superadmin" || role=="Admin"){
      navigate(`/admin/addstaff`);
    } else{
      navigate(`/employee/addstaff`);
    }
  }

  return (
    <>

      <MainDashboard>
        <FormContainer>
          <Title>Add Staff</Title>

          <StepIndicatorContainer>
            <Step>
              <StepContent>Employee Details</StepContent>
            </Step>
            <Step active>
              <StepContent>Family Details</StepContent>
            </Step>
            <Step>
              <StepContent>Documents</StepContent>
            </Step>
          </StepIndicatorContainer>

          <Form>
            <Heading1>Father's Details/Husband Details</Heading1>

            <Main>
              <InputContainer>
                <Label2>Name</Label2>
                <Input type="text"
                  name="FamilyDetail.MiddleName"
                  value={formData.FamilyDetail.MiddleName}
                  onChange={handleChange}
                  placeholder="Name" />
              </InputContainer>

              <InputContainer>
                <Label>Contact No.</Label>
                <Input type="text"
                  name="FamilyDetail.MobileNo"
                  value={formData.FamilyDetail.MobileNo}
                  onChange={handleChange}
                  placeholder="Contact No." />
              </InputContainer>

              <InputContainer>
                <Label2>Email</Label2>
                <Input type="text"
                  name="FamilyDetail.EmailId"
                  value={formData.FamilyDetail.EmailId}
                  onChange={handleChange}
                  placeholder="Email" />
              </InputContainer>
            </Main>

            {/* Emergency Contact */}

            <Heading>Emergency Contact</Heading>
            <Main>
              <InputContainer>
                <Label2>Name</Label2>
                <Input type="name"
                  name="EmergencyContact.Name"
                  value={formData.EmergencyContact.Name}
                  onChange={handleChange}
                  placeholder="Enter Name" />
              </InputContainer>

              <InputContainer>
                <Label>Contact No.</Label>
                <Input type="text"
                  name="EmergencyContact.MobileNo"
                  value={formData.EmergencyContact.MobileNo}
                  onChange={handleChange}
                  placeholder="Enter Contact No." />
              </InputContainer>
            </Main>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <SubmitButton onClick={goBack} >Previous</SubmitButton>
              {/* <SubmitButton type="submit">Save</SubmitButton> */}
              <SubmitButton onClick={handleSaveAndNext}>Save & Next</SubmitButton>
            </div>
          </Form>
        </FormContainer>
      </MainDashboard>

    </>
  );
};

export default StaffDetail;
