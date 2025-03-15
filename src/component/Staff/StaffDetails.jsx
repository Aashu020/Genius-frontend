import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import {
  MainDashboard,
  Title,
  FormContainer,
  Form,
  Heading,
  Main,
  InputContainer,
  Label,
  Label2,
  Input,
  Select,
  SubmitButton,
  StepIndicatorContainer,
  Step,
  StepContent,
} from "./StaffStyle";


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
            <Heading>Father's Details/Husband Details</Heading>

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
