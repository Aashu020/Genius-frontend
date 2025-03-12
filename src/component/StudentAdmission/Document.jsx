import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import RequireSymbol from "../RequireSymbol";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { MainDashboard,Step,StepContent,SubmitButton,StepIndicatorContainer,FormContainer,Input,InputContainer,Label2, Title,Form,Heading,Main } from "./StudentAdmission";

const Document = () => {
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
    Medium:"",
    Address: "",
    City: "",
    Area: "",
    Pincode: "",
    AdmissionDate: "",
    Stream: "",
    AdmissionInClass: "",
    ClassName:"",
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
    Document: {
      StudentPhoto: null,
      Birth: null,
      Leaving: null,
      FatherPhoto: null,
      MotherPhoto: null,
    },
  });

  const handleChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      Document: {
        ...prev.Document,
        [name]: files[0], // Save the file object directly
      },
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const savedData = localStorage.getItem('studentData');

  //   if (savedData) {
  //     const studentData = JSON.parse(savedData);
  //     const formDataToSend = new FormData();

  //     // Append all top-level form data to FormData
  //     Object.entries(studentData).forEach(([key, value]) => {
  //       if (typeof value === 'object' && value !== null) {
  //         // Stringify nested objects
  //         formDataToSend.append(key, JSON.stringify(value));
  //       } else {
  //         formDataToSend.append(key, value);
  //       }
  //     });

  //     // Append documents to FormData
  //     Object.entries(formData.Document).forEach(([key, value]) => {
  //       if (value) {
  //         formDataToSend.append(key, value);
  //       }
  //     });

  //     try {
  //       await axios.post("http://localhost:8007/student/add", formDataToSend, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });

  //       alert("Form Submitted Successfully!");
  //       localStorage.removeItem('studentData'); // Clear local storage if needed
  //     } catch (error) {
  //       console.error("Error submitting form:", error);
  //       alert("Error submitting form. Please try again.");
  //     }
  //   } else {
  //     alert("No data found in local storage.");
  //   }
  // };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const savedData = localStorage.getItem('studentData');

    if (savedData) {
      const studentData = JSON.parse(savedData);
      console.log(studentData)
      const formDataToSend = new FormData();

      // Append all top-level form data to FormData
      Object.entries(studentData).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          // Stringify nested objects
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      });

      // Append documents to FormData
      Object.entries(formData.Document).forEach(([key, value]) => {
        if (value) {
          formDataToSend.append(key, value);
        }
      });

      try {
        await axios.post("http://localhost:8007/student/add", formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        toast.success("Form Submitted Successfully!");
        // navigate("/admin/allstudent");

        // // Clear local storage
        // localStorage.removeItem('studentData');

        // Reset form data
        setFormData({
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
          Medium:"",
          Email: "",
          Address: "",
          City: "",
          Area: "",
          Pincode: "",
          AdmissionDate: "",
          Stream: "",
          AdmissionInClass: "",
          House: "",
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
          Document: {
            StudentPhoto: null,
            Birth: null,
            Leaving: null,
            FatherPhoto: null,
            MotherPhoto: null,
          },
        });

      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error submitting form. Please try again.");
      }
    } else {
      alert("No data found in local storage.");
    }
  };

  const goBack = () =>{
    const role = localStorage.getItem("Role");
    if(role=="Superadmin" || role=="Admin"){
      navigate(`/admin/familydetail`);
    } else{
      navigate(`/employee/familydetail`);
    }
  }

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
            <Step>
              <StepContent>Family Details</StepContent>
            </Step>
            <Step active>
              <StepContent>Documents</StepContent>
            </Step>
          </StepIndicatorContainer>

          <Form onSubmit={handleSubmit}>
            <Heading>Upload Documents</Heading>
            <Main>
              <InputContainer>
                <Label2>Birth Certificate</Label2>
                <Input type="file"
                  name="Birth"
                  onChange={handleChange}
                />
              </InputContainer>

              <InputContainer>
                <Label2>Last school Transfer Certificate</Label2>
                <Input type="file"
                  name="Leaving"
                  onChange={handleChange}
                />
              </InputContainer>

              <InputContainer>
                <Label2>Student Photo Upload</Label2>
                <Input type="file"
                  name="StudentPhoto"
                  onChange={handleChange} />
              </InputContainer>

              <InputContainer>
                <Label2>Father Photo Upload</Label2>
                <Input type="file"
                  name="FatherPhoto"
                  onChange={handleChange}
                />
              </InputContainer>

              <InputContainer>
                <Label2>Mother Photo Upload</Label2>
                <Input type="file"
                  name="MotherPhoto"
                  onChange={handleChange} />
              </InputContainer>
            </Main>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <SubmitButton onClick={goBack}>Previous</SubmitButton>
              <SubmitButton type="submit">Submit</SubmitButton>
              {/* <SubmitButton>Submit</SubmitButton> */}
            </div>
          </Form>
        </FormContainer>
        <ToastContainer />
      </MainDashboard>

    </>
  );
};

export default Document;
