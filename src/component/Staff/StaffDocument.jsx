import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import  baseURL from '../utils/Url'; 
import {
  MainDashboard,
  Title,
  Form,
  Heading,
  Main,
  FormContainer,
  InputContainer,
  Label,
  Label2,
  Input,
  Select,
  SubmitButton,
  StepIndicatorContainer,
  Step,
  StepContent,
  CheckboxContainer,
  Checkbox,
  ClearButton,
} from "./StaffStyle";
const StaffDocument = () => {
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
    const savedData = JSON.parse(localStorage.getItem('staffData'));
    setFormData(savedData);
  }, [])

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    if (name.startsWith("Documents.")) {
      const documentField = name.split("Documents.")[1]; // Extract the specific field name
      setFormData((prev) => ({
        ...prev,
        Documents: {
          ...prev.Documents,
          [documentField]: files[0], // Update the specific field
        },
      }));
    }
    else if (name.startsWith("Assign.")) {
      const assignField = name.split("Assign.")[1]; // Extract the specific field name
      setFormData((prev) => ({
        ...prev,
        Assign: {
          ...prev.Assign,
          [assignField]: value, // Update the specific field
        },
      }));
    }
    else {
      const { name, value } = e.target;
      // console.log(e.target.value)
      setFormData({ ...formData, [name]: value });
      console.log(value)
    }
  };


  const [selectedSection, setSelectedSection] = useState("");
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [error, setError] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  const [selectedClass, setSelectedClass] = useState("");
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);




  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${baseURL}/class/all`);
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  // Fetch sections based on selected class
  useEffect(() => {
    const fetchSections = async () => {
      if (selectedClass) {
        try {
          const response = await axios.get(
            `${baseURL}/class/get/${selectedClass}`
          );
          console.log('Sections Response:', response.data);
          setSections(response.data.Section || []);
        } catch (error) {
          console.error("Error fetching sections:", error);
        }
      } else {
        setSections([]);
      }
    };

    fetchSections();
  }, [selectedClass]);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (selectedClass && selectedSection) {
        try {
          const response = await axios.get(`${baseURL}/class/get/${selectedClass}/${selectedSection}`);
          setSubjects(response.data);
        } catch (error) {
          console.error("Error fetching subjects:", error);
        }
      } else {
        setSubjects([]); // Clear subjects if class or section is not selected
      }
    };

    fetchSubjects();
  }, [selectedClass, selectedSection]);



  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const savedData = localStorage.getItem('staffData');

    if (savedData) {
      console.log(formData);
      const studentData = JSON.parse(savedData);
      const formDataToSend = new FormData();
      console.log(formData)



      // Append all top-level form data to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          // Stringify nested objects
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      });

      // Append documents to FormData
      Object.entries(formData.Documents).forEach(([key, value]) => {
        if (value) {
          formDataToSend.append(key, value);
        }
      });

      try {
        await axios.post(`${baseURL}/staff/add`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        toast.success("Form Submitted Successfully!");
        localStorage.removeItem('staffData');
        const role = localStorage.getItem("Role");
        navigate(`/admin/allstaff`);
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
      navigate(`/admin/staffdetail`);
    } else{
      navigate(`/employee/staffdetail`);
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
            <Step>
              <StepContent>Family Details</StepContent>
            </Step>
            <Step active>
              <StepContent>Documents</StepContent>
            </Step>
          </StepIndicatorContainer>

          <Form >
            {/* Emergency Contact */}

            <Heading>Upload Documents</Heading>
            <Main>
              <InputContainer>
                <Label>Staff Photo</Label>
                <Input type="file"
                  name="Documents.Photo"
                  onChange={handleChange} />
              </InputContainer>

              <InputContainer>
                <Label>Qualification Certificate</Label>
                <Input type="file"
                  name="Documents.QualificationCertificate"
                  onChange={handleChange} />
              </InputContainer>

              <InputContainer>
                <Label>Experience letter from last school</Label>
                <Input type="file"
                  name="Documents.ExperienceLetter"
                  onChange={handleChange} />
              </InputContainer>
            </Main>
            <Heading>Bank Details</Heading>
            <Main>
              <InputContainer>
                <Label>Bank Account Name</Label>
                <Input type="text"
                  name="BankName"
                  value={formData.BankName}
                  onChange={handleChange}
                  placeholder="BankName" />
              </InputContainer>
              <InputContainer>
                <Label>Bank Account Number</Label>
                <Input type="text"
                  name="AccountNumber"
                  value={formData.AccountNumber}
                  onChange={handleChange}
                  placeholder="AccountNumber" />
              </InputContainer>
              <InputContainer>
                <Label>IFSC Code</Label>
                <Input type="text"
                  name="IFSCCode"
                  value={formData.IFSCCode}
                  onChange={handleChange}
                  placeholder="IFSCCode" />
              </InputContainer>
              <InputContainer>
                <Label>Aadhar Number</Label>
                <Input type="text"
                  name="AadharNo"
                  value={formData.AadharNo}
                  onChange={handleChange}
                  placeholder="AadharNo" />
              </InputContainer>
              <InputContainer>
                <Label>PAN Number</Label>
                <Input type="text"
                  name="PanNo"
                  value={formData.PanNo}
                  onChange={handleChange}
                  placeholder="PANNo" />
              </InputContainer>
              <InputContainer>
                <Label2>PF Number</Label2>
                <Input type="text"
                  name="PFNo"
                  value={formData.PFNo}
                  onChange={handleChange}
                  placeholder="PFNo" />
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
              <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
            </div>
          </Form>
        </FormContainer>
        <ToastContainer />
      </MainDashboard>

    </>
  );
};

export default StaffDocument;
