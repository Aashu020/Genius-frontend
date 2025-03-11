import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Navbar";
import AdmissionSidebar from "./AdmissionSidebar";
import Sidebar from "../Sidebar";
import RequireSymbol from "../RequireSymbol";

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

const Step = styled(Link)`
  background-color: ${(props) => (props.active ? "#8a2be2" : "#4a0e8f")};
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
  text-decoration: none; /* Remove underline */

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 7px;
    width: 40%;
  }
`;

const StepContent = styled.span`
  margin-left: 5px;
`;

const FamilyDetail = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    StudentName: "",
    DOB: "",
    Gender: "",
    Religion: "",
    BloodGroup: "",
    Category: "",
    Height: "",
    Weight: "",
    AadharNumber: "",
    MobileNo: "",
    Email: "",
    Address: "",
    City: "",
    Area: "",
    Pincode: "",
    AdmissionDate: "",
    Stream: "",
    AdmissionInClass: "",
    ClassName: "",
    House: "",
    Section: "",
    FeeCategory: "",
    RollNo: "",
    LastSchoolAttended: "",
    IdentificationMark: "",
    SourceOfAdmission: "",
    TransportNeeded: false,
    Route: "",
    FeeDiscount: "",
    BankName: "",
    BankAccountNumber: "",
    IFSC: "",
    Disability: false,
    DisabilityName: "",
    Discount: "",
    Orphan: false,
    FatherDetail: {
      Name: "",
      Qualification: "",
      Occupation: "",
      AnnualIncome: "",
      AadharNumber: "",
      MobileNo: "",
      EmailId: "",
    },
    MotherDetails: {
      Name: "",
      Qualification: "",
      Occupation: "",
      AnnualIncome: "",
      AadharNumber: "",
      MobileNo: "",
      EmailId: "",
    },
    EmergencyContact: {
      Name: "",
      MobileNo: "",
      Relation: "",
    },
  });
  const [errors, setErrors] = useState({});


  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem('studentData')) || {};
    console.log(existingData)
    setFormData(existingData);
  }, [])

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   // Update top-level properties if necessary (not applicable here as all inputs are nested)

  //   setFormData({ ...formData, [name]: value });

  // };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      // Handle file inputs
      setFormData(prevData => ({
        ...prevData,
        Document: {
          ...prevData.Document,
          [name]: files[0], // Store the first file selected
        },
      }));
    } else if (name.includes('.')) {
      // Handle nested objects
      const keys = name.split('.');
      setFormData(prevData => ({
        ...prevData,
        [keys[0]]: {
          ...prevData[keys[0]],
          [keys[1]]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      // Handle regular inputs
      setFormData(prevData => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };



  const handleSubmit = () => {
    e.preventDefault();
  }

  const goBack = () =>{
    const role = localStorage.getItem("Role");
    if(role=="Superadmin" || role=="Admin"){
      navigate(`/admin/addstudent`);
    } else{
      navigate(`/employee/addstudent`);
    }
  }

  const handleSaveAndNext = () => {


    // Retrieve existing data from local storage
    const existingData = JSON.parse(localStorage.getItem('studentData')) || {};

    // Merge existing data with the current form data
    const updatedData = { ...existingData, ...formData };

    // Save merged data back to local storage
    localStorage.setItem('studentData', JSON.stringify(updatedData));

    // Navigate to the next step
    alert('Data saved! Navigate to the next step.');
    const role = localStorage.getItem("Role");
    if(role=="Superadmin" || role=="Admin"){
      navigate(`/admin/document`);
    } else{
      navigate(`/employee/document`);
    }
  };


  return (
    <>

      <MainDashboard>
        <FormContainer>
          <Title>Add Student</Title>
          <RequireSymbol />
          <StepIndicatorContainer>
            <Step>
              <StepContent>Student Details</StepContent>
            </Step>
            <Step active>
              <StepContent>Family Details</StepContent>
            </Step>
            <Step>
              <StepContent>Documents</StepContent>
            </Step>
          </StepIndicatorContainer>

          <Form onSubmit={handleSubmit}>
            <Heading>Father's Details</Heading>

            <Main>
              <InputContainer>
                <Label>Name</Label>
                <Input type="text"
                  name="FatherDetail.Name"
                  value={formData.FatherDetail?.Name}
                  onChange={handleChange}
                  placeholder="Father's name" />
              </InputContainer>

              <InputContainer>
                <Label2>Qualification</Label2>
                <Input type="text"
                  name="FatherDetail.Qualification"
                  value={formData.FatherDetail?.Qualification}
                  onChange={handleChange}
                  placeholder="Qualification" />
              </InputContainer>

              <InputContainer>
                <Label2>Occupation</Label2>
                <Input type="text"
                  name="FatherDetail.Occupation"
                  value={formData.FatherDetail?.Occupation}
                  onChange={handleChange}
                  placeholder="Occupation" />
              </InputContainer>

              <InputContainer>
                <Label2>Annual Income</Label2>
                <Input type="text"
                  name="FatherDetail.AnnualIncome"
                  value={formData.FatherDetail?.AnnualIncome}
                  onChange={handleChange}
                  placeholder="eg: 2,00,000" />
              </InputContainer>

              <InputContainer>
                <Label>Contact No.</Label>
                <Input type="text"
                  name="FatherDetail.MobileNo"
                  value={formData.FatherDetail?.MobileNo}
                  onChange={handleChange}
                  placeholder="Contact No." />
              </InputContainer>

              <InputContainer>
                <Label2>Email</Label2>
                <Input type="text"
                  name="FatherDetail.EmailId"
                  value={formData.FatherDetail?.EmailId}
                  onChange={handleChange}
                  placeholder="Email" />
              </InputContainer>

              <InputContainer>
                <Label2>Aadhar Card Number</Label2>
                <Input type="text"
                  name="FatherDetail.AadharNumber"
                  value={formData.FatherDetail?.AadharNumber}
                  onChange={handleChange}
                  placeholder="Aadhar Card Number" />
              </InputContainer>
            </Main>

            {/* Mother's Details */}

            <Heading>Mother's Details</Heading>
            <Main>
              <InputContainer>
                <Label>Name</Label>
                <Input type="text"
                  name="MotherDetails.Name"
                  value={formData.MotherDetails?.Name}
                  onChange={handleChange}
                  placeholder="Mother's name" />

              </InputContainer>

              <InputContainer>
                <Label2>Qualification</Label2>
                <Input type="text"
                  name="MotherDetails.Qualification"
                  value={formData.MotherDetails?.Qualification}
                  onChange={handleChange}
                  placeholder="Qualification" />
              </InputContainer>

              <InputContainer>
                <Label2>Occupation</Label2>
                <Input type="text"
                  name="MotherDetails.Occupation"
                  value={formData.MotherDetails?.Occupation}
                  onChange={handleChange}
                  placeholder="Occupation" />
              </InputContainer>

              <InputContainer>
                <Label2>Annual Income</Label2>
                <Input type="text"
                  name="MotherDetails.AnnualIncome"
                  value={formData.MotherDetails?.AnnualIncome}
                  onChange={handleChange}
                  placeholder="eg: 2,00,000" />
              </InputContainer>

              <InputContainer>
                <Label>Contact No.</Label>
                <Input type="text"
                  name="MotherDetails.MobileNo"
                  value={formData.MotherDetails?.MobileNo}
                  onChange={handleChange}
                  placeholder="Contact No." />

                {errors.MotherDetails?.MobileNo && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.MotherDetails?.MobileNo}
                  </div>
                )}
              </InputContainer>

              <InputContainer>
                <Label2>Email</Label2>
                <Input type="text"
                  name="MotherDetails.EmailId"
                  value={formData.MotherDetails?.EmailId}
                  onChange={handleChange}
                  placeholder="Email" />
              </InputContainer>

              <InputContainer>
                <Label2>Aadhar Card Number</Label2>
                <Input type="text"
                  name="MotherDetails.AadharNumber"
                  value={formData.MotherDetails?.AadharNumber}
                  onChange={handleChange}
                  placeholder="Aadhar Card Number" />
              </InputContainer>
            </Main>

            {/* Emergency Contact */}

            <Heading>Emergency Contact</Heading>
            <Main>
              <InputContainer>
                <Label2>Name</Label2>
                <Input type="text"
                  name="EmergencyContact.Name"
                  value={formData.EmergencyContact?.Name}
                  onChange={handleChange}
                  placeholder="Name" />
              </InputContainer>

              <InputContainer>
                <Label2>Relation to Student</Label2>
                <Input type="text"
                  name="EmergencyContact.Relation"
                  value={formData.EmergencyContact?.Relation}
                  onChange={handleChange}
                  placeholder="Relation" />
              </InputContainer>

              <InputContainer>
                <Label2>Contact No.</Label2>
                <Input type="text"
                  name="EmergencyContact.MobileNo"
                  value={formData.EmergencyContact?.MobileNo}
                  onChange={handleChange}
                  placeholder="Contact No." />
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
              <SubmitButton onClick={goBack}>Previous</SubmitButton>
              <SubmitButton onClick={handleSaveAndNext}>Save & Next</SubmitButton>
              {/* <SubmitButton onClick={handleSaveAndNext}>Save & Next</SubmitButton> */}
            </div>
          </Form>
        </FormContainer>
      </MainDashboard>

    </>
  );
};

export default FamilyDetail;