import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import  baseURL from '../utils/Url'; 
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
import { ErrorMessage } from "../Enquiry/EnquiryStyles";

const AddStaff = () => {
  const navigate = useNavigate();
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
      ClassId: "",
      Class: "",
      Section: "",
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

  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [jobGrades, setJobGrades] = useState([]);

  useEffect(() => {
    // Fetch all departments
    const fetchDepartments = async () => {
      const response = await fetch(`${baseURL}/department/all`);
      const data = await response.json();
      setDepartments(data);
    };

    const fetchJobGrades = async () => {
      const response = await fetch(`${baseURL}/grade/all`);
      const data = await response.json();
      setJobGrades(data); // Assuming data is an array of job grades
    };

    fetchDepartments();
    fetchJobGrades();
  }, []);

  const formatDate = (dateString, name) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;


    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === 'Department') {
      const selectedDepartment = departments.find(dep => dep.DepartmentName === value);
      if (selectedDepartment) {
        setDesignations(selectedDepartment.Designation);
      } else {
        setDesignations([]);
      }
      // Reset the role when department changes
      setFormData((prevData) => ({ ...prevData, Role: '' }));
    }
    if (type === 'date') {
      const formattedValue = formatDate(value, name);
      setFormData(prevState => ({
        ...prevState,
        [name]: formattedValue  // Store formatted date (DD-MM-YYYY) for display
      }));
    }
  };

  const handleSaveAndNext = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Save data in local storage
    localStorage.setItem('staffData', JSON.stringify(formData));
    // Navigate to the next step
    alert('Data saved! Navigate to the next step.');
    const role = localStorage.getItem("Role");
    if (role == "Superadmin" || role == "Admin") {
      navigate(`/admin/staffdetail`);
    } else {
      navigate(`/employee/staffdetail`);
    }
  };

  const [student, setStudent] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);

 

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${baseURL}/class/all`);
        setClasses(response.data);
        console.log(response.data);
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


  const handleClassChange = async (e, index) => {
    const classId = e.target.value;
    const className = e.target.options[e.target.selectedIndex].text;

    const updatedAssign = [...formData.Assign];
    updatedAssign[index].ClassId = classId;
    updatedAssign[index].Class = className;

    setFormData({ ...formData, Assign: updatedAssign });

    // Reset section and subject if class changes
    updatedAssign[index].Section = "";
    updatedAssign[index].Subject = "";

    setSelectedClass(classId);
    setSelectedSection(""); // Reset section
    setSubjects([]); // Clear subjects
    setError((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.selectedClass;
      return newErrors;
    });

    if (classId) {
      try {
        const response = await axios.get(`${baseURL}/class/get/${classId}`);
        setSections(response.data.Section || []);
        setSubjects(response.data.Subjects || []);
      } catch (error) {
        console.error("Error fetching class details:", error);
      }
    } else {
      setSections([]);
    }
  };

  const handleSectionChange = (e, index) => {
    const section = e.target.value;
    const updatedAssign = [...formData.Assign];
    updatedAssign[index].Section = section;

    setFormData({ ...formData, Assign: updatedAssign });
    setSelectedSection(section);

    setError((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.selectedSection;
      return newErrors;
    });
  };

  const handleSubjectChange = (e, index) => {
    const subject = e.target.value;
    const updatedAssign = [...formData.Assign];
    updatedAssign[index].Subject = subject;

    setFormData({ ...formData, Assign: updatedAssign });
    setSelectedSubject(subject);
  };

  const addNewAssignment = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      Assign: [
        ...prevFormData.Assign,
        {
          Class: "",
          Section: "",
          Subject: "",
        },
      ],
    }));
  };

  const handleRemoveAssignment = (index) => {
    const updatedAssign = formData.Assign.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      Assign: updatedAssign,
    }));
  };

  // Function to get the available subjects excluding the selected ones
  const getAvailableSubjects = (index) => {
    const selectedSubjects = formData.Assign
      .filter((assign, i) => i !== index) // Exclude the current assignment
      .map((assign) => assign.Subject); // Get all selected subjects

    return subjects.filter((sub) => !selectedSubjects.includes(sub.Subject));
  };




  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get(`${baseURL}/route/all`);
        setRoutes(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load routes.");
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);



  return (
    <>
      <MainDashboard>
        <FormContainer>
          <Title>Add Staff</Title>

          <StepIndicatorContainer>
            <Step active>
              <StepContent>Employee Details</StepContent>
            </Step>
            <Step>
              <StepContent>Family Details</StepContent>
            </Step>
            <Step>
              <StepContent>Documents</StepContent>
            </Step>
          </StepIndicatorContainer>

          <Form onSubmit={handleSaveAndNext}>
            <Heading>Personal Information</Heading>

            <Main>
              <InputContainer>
                <Label>Name</Label>
                <Input type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  placeholder="Enter staff name" />
              </InputContainer>

              <InputContainer>
                <Label>DOB</Label>
                <Input type="date"
                  name="DOB"
                  value={formData.DOB.split("-").reverse().join("-")}
                  onChange={handleChange}
                  placeholder="Enter staff DOB"
                />
              </InputContainer>

              <InputContainer>
                <Label>Date of Joining</Label>
                <Input type="date"
                  name="DOJ"
                  value={formData.DOJ.split("-").reverse().join("-")}
                  onChange={handleChange}
                  placeholder="Enter staff DOJ"
                />
              </InputContainer>

              <InputContainer>
                <Label>Gender</Label>
                <Select
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </InputContainer>
              <InputContainer>
                <Label>Religion</Label>
                <Input type="text"
                  name="Religion"
                  value={formData.Religion}
                  onChange={handleChange}
                  placeholder="Religion" />
              </InputContainer>

              <InputContainer>
                <Label>Blood Group</Label>
                <Select
                  name="BloodGroup"
                  value={formData.BloodGroup}
                  onChange={handleChange}>
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </Select>
              </InputContainer>

              <InputContainer>
                <Label2>Category</Label2>
                <Input type="text"
                  name="Category"
                  value={formData.Category}
                  onChange={handleChange}
                  placeholder="Category" />
              </InputContainer>

              <InputContainer>
                <Label2>Language</Label2>
                <Input type="text"
                  name="LanguageKnown"
                  value={formData.LanguageKnown}
                  onChange={handleChange}
                  placeholder="LanguageKnown" />
              </InputContainer>

              <InputContainer>
                <Label>Email</Label>
                <Input type="text"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  placeholder="Email" />
              </InputContainer>
              <InputContainer>
                <Label>Marital Status</Label>
                <Select
                  name="MaritalStatus"
                  value={formData.MaritalStatus}
                  onChange={handleChange}
                >
                  <option value="">Select Marital Status</option>
                  <option value="Married">Married</option>
                  <option value="UnMarried">Un-Married</option>
                  <option value="Divorced">Divorced</option>
                </Select>
              </InputContainer>
            </Main>

            {/* Contact Info */}

            <Heading>Contact Information</Heading>
            <Main>
              <InputContainer>
                <Label>Mobile Number</Label>
                <Input type="text"
                  name="MobileNo"
                  value={formData.MobileNo}
                  onChange={handleChange}
                  placeholder="Enter contact number" />
              </InputContainer>
              <InputContainer>
                <Label>Email</Label>
                <Input type="text"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  placeholder="Last school name" />
              </InputContainer>
              <InputContainer>
                <Label>Address</Label>
                <Input type="text"
                  name="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  placeholder="Enter address" />
              </InputContainer>

              <InputContainer>
                <Label>City</Label>
                <Input type="text"
                  name="City"
                  value={formData.City}
                  onChange={handleChange}
                  placeholder="City" />
              </InputContainer>

              <InputContainer>
                <Label>Local/Outsider</Label>
                <Select
                  name="Area"
                  value={formData.Area}
                  onChange={handleChange}
                >
                  <option value="">Select Area</option>
                  <option value="local">Local</option>
                  <option value="outsider">Outsider</option>
                </Select>
              </InputContainer>

              <InputContainer>
                <Label>Pincode</Label>
                <Input type="text"
                  name="Pincode"
                  value={formData.Pincode}
                  onChange={handleChange}
                  placeholder="Enter address" />
              </InputContainer>
            </Main>

            <Heading>Educational Information</Heading>
            <Main>
              {/* Other input fields remain unchanged */}

              <InputContainer>
                <Label>Department</Label>
                <Select
                  name="Department"
                  value={formData.Department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department._id} value={department.DepartmentName}>
                      {department.DepartmentName}
                    </option>
                  ))}
                </Select>
                {errors.Department && <span style={{ color: "red" }}>{errors.Department}</span>}
              </InputContainer>

              <InputContainer>
                <Label>Employee Role</Label>
                <Select
                  name="Role"
                  value={formData.Role}
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  {designations.map((designation) => (
                    <option key={designation._id} value={designation.DesignationName}>
                      {designation.DesignationName}
                    </option>
                  ))}
                </Select>
                {errors.Role && <span style={{ color: "red" }}>{errors.Role}</span>}
              </InputContainer>

              <InputContainer>
                <Label>Job grade</Label>
                <Select
                  name="JobGrade"
                  value={formData.JobGrade}
                  onChange={handleChange}
                >
                  <option value="">Select Grade</option>
                  {jobGrades.map((grade) => (
                    <option key={grade._id} value={grade.GradeName}>
                      {grade.Title} {/* Adjust according to your API response */}
                    </option>
                  ))}
                </Select>
              </InputContainer>

              <InputContainer>
                <Label2>Prior Expireance</Label2>
                <Input type="text"
                  name="Experience"
                  value={formData.Experience}
                  onChange={handleChange}
                  placeholder="Experience" />
              </InputContainer>

              <InputContainer>
                <Label2>Last School Attended</Label2>
                <Input type="text"
                  name="LastSchool"
                  value={formData.LastSchool}
                  onChange={handleChange}
                  placeholder="Last School Attended" />
              </InputContainer>
            </Main>

            {/* Transport & Fee Details */}

            {formData.Role.trim() === 'Teacher' && (
              <>
                <Heading>Assign Subjects</Heading>
                <div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {formData.Assign.map((assign, index) => (
                      <div key={index} style={{ display: "flex", gap: "10px" }}>
                        <InputContainer>
                          <Label>Select Class</Label>
                          <Select
                            value={assign.ClassId}
                            onChange={(e) => handleClassChange(e, index)}
                          >
                            <option value="">Select Class</option>
                            {classes.map((val, index) => (
                              <option key={index} value={val.ClassId}>
                                {val.Class}
                              </option>
                            ))}
                          </Select>
                          {error.selectedClass && <ErrorMessage>{error.selectedClass}</ErrorMessage>}
                        </InputContainer>

                        <InputContainer>
                          <Label>Select Section</Label>
                          <Select
                            value={assign.Section}
                            onChange={(e) => handleSectionChange(e, index)}
                            disabled={!assign.Class}
                          >
                            <option value="">Select Section</option>
                            {sections.map((section, idx) => (
                              <option key={idx} value={section}>
                                {section}
                              </option>
                            ))}
                          </Select>
                          {error.selectedSection && <ErrorMessage>{error.selectedSection}</ErrorMessage>}
                        </InputContainer>

                        <InputContainer>
                          <Label>Select Subject</Label>
                          <Select
                            value={assign.Subject}
                            onChange={(e) => handleSubjectChange(e, index)}
                            disabled={!assign.Class}
                          >
                            <option value="">Select Subject</option>
                            {getAvailableSubjects(index).map((sub, idx) => (
                              <option key={idx} value={sub.Subject}>
                                {sub.Subject}
                              </option>
                            ))}
                          </Select>
                        </InputContainer>

                        {/* Remove Button */}
                        {formData.Assign.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveAssignment(index)}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              color: "white",
                              background: "linear-gradient(270deg, #222d78 0%, #7130e4 100%)",
                            }}
                          >
                            X
                          </button>
                        )}
                      </div>
                    ))}

                    {/* Add Button to add new Assign */}
                    <button
                      type="button"
                      style={{
                        color: "white",
                        padding: "5px",
                        borderRadius: "10px",
                        background: "linear-gradient(270deg, #222d78 0%, #7130e4 100%)",
                        marginBottom: "5px",
                      }}
                      onClick={addNewAssignment}
                    >
                      Add More Assign
                    </button>

                  </div>
                </div>
              </>
            )}

            <Heading>Salary</Heading>
            <Main>
              <InputContainer>
                <Label>Monthly Salary</Label>
                <Input type="text"
                  name="Salary"
                  value={formData.Salary}
                  onChange={handleChange}
                  placeholder="Enter Salary" />
              </InputContainer>
            </Main>

            {/* Special Condition */}
            <Heading>Referral Information</Heading>
            <Main>
              <InputContainer>
                <Label2>Name </Label2>
                <Input type="text"
                  name="ReferredName"
                  value={formData.ReferredName}
                  onChange={handleChange}
                  placeholder="Enter Referred Name" />
              </InputContainer>

              <InputContainer>
                <Label2>Contact </Label2>
                <Input type="text"
                  name="ReferredContact"
                  value={formData.ReferredContact}
                  onChange={handleChange}
                  placeholder="Enter Referred Contact" />
              </InputContainer>
            </Main>

            <Heading>Transport</Heading>
            <Main>
              <InputContainer>
                <Label2>Transport Needed</Label2>
                <Select
                  name="TransportNeeded"
                  value={formData.TransportNeeded}
                  onChange={handleChange}
                >
                  <option value="">Select Transport Needed</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Select>
              </InputContainer>

              {formData.TransportNeeded === "yes" && (
                <InputContainer>
                  <Label2>Route</Label2>
                  {loading ? (
                    <p>Loading routes...</p> // Display loading text
                  ) : error ? (
                    <p style={{ color: "red" }}>{error}</p> // Display error message
                  ) : (
                    <Select
                      name="Route"
                      value={formData.Route}
                      onChange={handleChange}
                    >
                      <option value="">Select Route</option>
                      {routes.map((route) => (
                        <option key={route._id} value={route.RouteName}>
                          {route.RouteName}
                        </option>
                      ))}
                    </Select>
                  )}
                </InputContainer>
              )}

            </Main>

            {/* <div style={{ display: "flex", gap: "10px", justifyContent:"center", marginLeft:"49px" }}> */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <SubmitButton type="submit">Save</SubmitButton>
              <SubmitButton type="save" onClick={handleSaveAndNext}>Save & Next</SubmitButton>
            </div>
          </Form>
        </FormContainer>
      </MainDashboard >

    </>
  );
};

export default AddStaff;
