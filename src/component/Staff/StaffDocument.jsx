import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
        const response = await axios.get("http://localhost:8007/class/all");
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
            `http://localhost:8007/class/get/${selectedClass}`
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
          const response = await axios.get(`http://localhost:8007/class/get/${selectedClass}/${selectedSection}`);
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

  const handleClassChange = async (e) => {
    const classId = e.target.value;
    setSelectedClass(classId);
    setSelectedSection(""); // Reset section when class changes
    setSubjects([]); // Clear subjects when class changes
    setError((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.selectedClass;
      return newErrors;
    });

    // Fetch sections and subjects for the selected class
    if (classId) {
      try {
        const response = await axios.get(`http://localhost:8007/class/get/${classId}`);
        setSections(response.data.Section || []);
        setSubjects(response.data.Subjects || []); // Set subjects based on class data
      } catch (error) {
        console.error("Error fetching class details:", error);
      }
    } else {
      setSections([]);
    }
  };


  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    setError((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.selectedSection;
      return newErrors;
    });
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const toggleSubjectDropdown = () => {
    setIsSubjectDropdownOpen((prev) => !prev);
  };

  const clearSubjectSelections = () => {
    setSelectedSubjects([]);
  };
  

  const toggleClassDropdown = () => {
    setIsClassDropdownOpen((prev) => !prev);
  };


  const clearClassSelections = () => {
    setSelectedClass("");
    setSections([]);
    setSubjects("");
  };


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
        await axios.post("http://localhost:8007/staff/add", formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        toast.success("Form Submitted Successfully!");
        localStorage.removeItem('staffData');
        const role = localStorage.getItem("Role");
        navigate(`/${role}/allstaff`);
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

            {/* <Heading>Teaching Assignment</Heading>
            <Main>
              <InputContainer>
                <Label>Select Class</Label>
                <div onClick={toggleClassDropdown}>
                  <div style={{
                    padding: "15px 20px",
                    border: "2px solid #7d3cff",
                    borderRadius: "30px",
                    backgroundColor: "#f4f6fc",
                    fontWeight: "bold",
                  }}>
                    {selectedClass ? selectedClass : "Select Class"}
                  </div>
                </div>
                {isClassDropdownOpen && (
                  <CheckboxContainer>
                    {classes.map((cls) => (
                      <Checkbox key={cls.ClassId}>
                        <input
                          type="checkbox"
                          value={cls.ClassId}
                          checked={selectedClass === cls.ClassId}
                          onChange={handleClassChange}
                          name="Class"
                          style={{
                            paddingRight: "5px",
                          }}
                        />
                        &nbsp;{cls.Class}
                      </Checkbox>
                    ))} 
                  </CheckboxContainer>
                )}
                {error.selectedClass && <ErrorMessage>{error.selectedClass}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Select Section</Label>
                <Select
                  value={selectedSection}
                  onChange={handleSectionChange}
                  disabled={!selectedClass}
                >
                  <option value="">Select Section</option>
                  {sections.map((section, index) => (
                    <option key={index} value={section}>
                      {section}
                    </option>
                  ))}
                </Select>
                {error.selectedSection && <ErrorMessage>{error.selectedSection}</ErrorMessage>}
              </InputContainer>
              <InputContainer>
                <Label>Select Subjects</Label>
                <div onClick={toggleSubjectDropdown}>
                  <div style={{
                    padding: "15px 20px",
                    border: "2px solid #7d3cff",
                    borderRadius: "30px",
                    backgroundColor: "#f4f6fc",
                    fontWeight: "bold",
                  }}>
                    {selectedSubjects.length > 0 ? selectedSubjects.join(", ") : "Select Subjects"}
                  </div>
                </div>
                {isSubjectDropdownOpen && (
                  <CheckboxContainer>
                    {subjects.map((subject) => (
                      <Checkbox key={subject._id}>
                        <input
                          type="checkbox"
                          value={subject.Subject}
                          checked={selectedSubjects.includes(subject.Subject)}
                          onChange={() => handleSubjectChange(subject.Subject)}
                        />
                        &nbsp;{subject.Subject}
                      </Checkbox>
                    ))}
                  </CheckboxContainer>
                )}
              </InputContainer>




            </Main> */}

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
