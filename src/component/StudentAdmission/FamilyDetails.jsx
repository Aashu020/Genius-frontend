import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Navbar";
import AdmissionSidebar from "./AdmissionSidebar";
import Sidebar from "../Sidebar";
import RequireSymbol from "../RequireSymbol";
import { Main,Container,Label,Step,StepContent,StepIndicatorContainer,Label2,Input,SubmitButton,MainDashboard,Title,Form,Heading,FormContainer,InputContainer} from "./StudentAdmission";


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