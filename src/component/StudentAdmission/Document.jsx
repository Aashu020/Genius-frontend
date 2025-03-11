import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import RequireSymbol from "../RequireSymbol";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



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
  //       await axios.post("https://api.edspride.in/student/add", formDataToSend, {
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
        await axios.post("https://api.edspride.in/student/add", formDataToSend, {
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
