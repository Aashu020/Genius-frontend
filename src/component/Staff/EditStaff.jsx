import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RequireSymbol from "../RequireSymbol";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import {
    MainDashboard,
    Title,
    Form,
    Heading,
    Main,
    FormContainer,
    InputContainer,
    InputContainer1,
    Label,
    Label2,
    Input,
    StyledInput,
    Select,
    SubmitButton,
    StepIndicatorContainer,
    Step,
    StepContent,
    SuggestionsList,
    SuggestionItem,
    Section,
  } from "./StaffStyle";


const EditStaff = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        FamilyDetail: {
            MiddleName: '',
            MobileNo: '',
            EmailId: ''
        },
        EmergencyContact: {
            Name: '',
            MobileNo: ''
        },
        _id: '',
        EmployeeId: '',
        Role: '',
        Department: '',
        Name: '',
        DOB: '',
        DOJ: '',
        Qualification:'',
        Gender: '',
        Category: '',
        LanguageKnown: [
            ''
        ],
        Nationality: '',
        MobileNo: '',
        Salary: '',
        BloodGroup: '',
        Email: '',
        JobGrade: '',
        Experience: '',
        LastSchool: '',
        ReferredName: '',
        ReferredContact: '',
        Transport: false,
        Route: '',
        Address: '',
        City: '',
        Area: '',
        Pincode: '',
        Religion: '',
        MaritalStatus: '',
        TeachingSubject: [
            ''
        ],
        Assign: [
            {
                Class: '',
                Subject: '',
                Section: '',
                _id: ''
            }
        ],
        AadharNo: '',
        PanNo: '',
        PFNo: '',
        BankName: '',
        AccountNumber: '',
        IFSCCode: '',
        HomeWorkPublish: false,
        ClassTeacher: false,
        Class: [
            ''
        ],
        Status: '',
        __v: 0
    });

    const [files, setFiles] = useState({
        Photo: null,
        QualificationCertificate: null,
        ExperienceLetter: null,
    });

    // Fetch student data on component mount
    useEffect(() => {
        if (location.state && location.state.Id) {
            const fetchStaff = async () => {
                try {
                    const response = await fetch(`http://localhost:8007/staff/get/${location.state.Id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log(data);
                    setFormData(data);
                } catch (error) {
                    console.error("Error fetching staff data:", error);
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchStaff();
        } else {
            console.error("Staff ID not provided.");
            setError("Staff ID not provided.");
            setLoading(false);
        }
    }, [location.state]);

    const formatDate = (dateString, name) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        
        // Check if the input is for a nested object (e.g., FamilyDetail.MiddleName)
        if (name.includes('.')) {
            const [parent, key] = name.split('.');
            setFormData((prevData) => ({
                ...prevData,
                [parent]: {
                    ...prevData[parent],
                    [key]: value,
                },
            }));
        } else {
            // Handle regular fields
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
        if (type === 'date') {
            const formattedValue = formatDate(value, name);
            console.log(formattedValue)
            setFormData(prevState => ({
                ...prevState,
                [name]: formattedValue  // Store formatted date (DD-MM-YYYY) for display
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new FormData object
        const formDataToSubmit = new FormData();

       
        Object.entries(formData).forEach(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
                // Stringify nested objects
                formDataToSubmit.append(key, JSON.stringify(value));
            } else {
                formDataToSubmit.append(key, value);
            }
        });

        // Append files if they exist
        if (files.Photo) formDataToSubmit.append('Photo', files.Photo);
        if (files.QualificationCertificate) formDataToSubmit.append('QualificationCertificate', files.QualificationCertificate);
        if (files.ExperienceLetter) formDataToSubmit.append('ExperienceLetter', files.ExperienceLetter);

        const staffId = location.state?.Id; // Optional chaining for safety

        if (!staffId) {
            console.error('Staff ID not provided.');
            return;
        }

        // Debug: log FormData
        for (const [key, value] of formDataToSubmit.entries()) {
            console.log(`${key}:`, value);
        }

        console.log(formData)

        try {
            const response = await axios.put(`http://localhost:8007/staff/update/${staffId}`, formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                alert('Staff data updated successfully!');
                const role = localStorage.getItem("Role");
                if (role == "Superadmin" || role == "Admin") {
                    navigate(`/admin/allstaff`);
                } else {
                    navigate(`/employee/allstaff`);
                }
            }
        } catch (error) {
            console.error('Error updating staff data:', error);
            setError('Failed to update staff data.');
        }
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        const { name, files: fileList } = e.target;

        setFiles((prevState) => ({
            ...prevState,
            [name]: fileList[0], // Only store the first file if multiple files are selected
        }));
    };




    



    const [classes, setClasses] = useState([]);
    const [houses, setHouses] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [sections, setSections] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [feeCategories, setFeeCategories] = useState([]);
    const [student, setStudent] = useState("");
    const [selectedClassS, setSelectedClassS] = useState("");
    const [selectedSectionS, setSelectedSectionS] = useState("");
    const [students, setStudents] = useState([]);
    const [sectionS, setSectionS] = useState([]);
    const [classeS, setClasseS] = useState([]);
    const [subjects, setSubjects] = useState([]);


    useEffect(() => {
        const fetchFeeCategories = async () => {
            try {
                const response = await fetch('http://localhost:8007/discount/all');
                const data = await response.json();
                setFeeCategories(data);
            } catch (error) {
                console.error('Error fetching fee categories:', error);
            }
        };

        fetchFeeCategories();
    }, []);
    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await axios.get("http://localhost:8007/route/all");
                setRoutes(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load routes.");
                setLoading(false);
            }
        };

        fetchRoutes();
    }, []);
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('http://localhost:8007/class/all');
                setClasses(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching classes:", error);
                toast.error("Error fetching classes. Please try again.");
            }
        };
        fetchClasses();
    }, []);
    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const response = await axios.get('http://localhost:8007/house/all');
                setHouses(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching classes:", error);
                toast.error("Error fetching classes. Please try again.");
            }
        };
        fetchHouses();
    }, []);
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
                const response = await axios.get(`http://localhost:8007/class/get/${classId}`);
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
        const fetchClasses = async () => {
            try {
                const response = await axios.get("http://localhost:8007/class/all");
                setClasseS(response.data);
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };
        fetchClasses();
    }, []);

    useEffect(() => {
        const fetchSections = async () => {
            if (selectedClassS) {
                try {
                    const response = await axios.get(
                        `http://localhost:8007/class/get/${selectedClassS}`
                    );
                    console.log('Sections Response:', response.data);
                    setSectionS(response.data.Section || []);
                } catch (error) {
                    console.error("Error fetching sections:", error);
                }
            } else {
                setSectionS([]);
            }
        };

        fetchSections();
    }, [selectedClassS]);

    // Fetch students based on selected class and section
    useEffect(() => {
        const fetchStudents = async () => {
            if (selectedClassS && selectedSectionS) {
                try {
                    const response = await axios.get("http://localhost:8007/student/all", {
                        params: { classId: selectedClassS, section: selectedSectionS },
                    });
                    console.log('Students Response:', response.data);

                    // Ensure response is an array
                    if (Array.isArray(response.data)) {
                        setStudents(response.data);
                    } else {
                        console.error('Expected an array, but received:', response.data);
                        setStudents([]); // Reset to an empty array if the response isn't as expected
                    }
                } catch (error) {
                    console.error("Error fetching students:", error);
                    setStudents([]); // Reset to an empty array in case of an error
                }
            } else {
                setStudents([]); // Reset students if class or section is not selected
            }
        };

        fetchStudents();
    }, [selectedClassS, selectedSectionS]);

    const handleClassChangeS = (e) => {
        setSelectedClassS(e.target.value);
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors.selectedClassS;
            return newErrors;
        });
    };

    const handleSectionChangeS = (e) => {
        setSelectedSectionS(e.target.value);
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors.selectedSectionS;
            return newErrors;
        });
    };

    const allstudent = (staff) => {
        const role = localStorage.getItem("Role");
        if (role == "Superadmin" || role == "Admin") {
            navigate(`/admin/allstaff`);
        } else {
            navigate(`/employee/allstaff`);
        }

    }
    const [errors, setErrors] = useState({});
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [jobGrades, setJobGrades] = useState([]);

    useEffect(() => {
        // Fetch all departments
        const fetchDepartments = async () => {
            const response = await fetch('http://localhost:8007/department/all');
            const data = await response.json();
            setDepartments(data);
        };

        const fetchJobGrades = async () => {
            const response = await fetch('http://localhost:8007/grade/all');
            const data = await response.json();
            setJobGrades(data); // Assuming data is an array of job grades
        };

        fetchDepartments();
        fetchJobGrades();
    }, []);

    return (
        <>

            <MainDashboard>
                <FormContainer>
                    <Title>Edit Staff</Title>
                    <RequireSymbol />
                    <StepIndicatorContainer>
                        <Step>
                            <StepContent>Staff Details</StepContent>
                        </Step>

                    </StepIndicatorContainer>

                    <Form onSubmit={handleSubmit}>

                        <Heading>Personal Information</Heading>
                        <Main>
                            <InputContainer>
                                <Label2>Employee ID</Label2>
                                <Input
                                    type="text"
                                    name="EmployeeId"
                                    value={formData.EmployeeId}
                                    onChange={handleChange}
                                    placeholder="Enter employee ID"
                                    disabled
                                />
                            </InputContainer>

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
                                <Label2>Qualification</Label2>
                                <Input type="text"
                                    name="Qualification"
                                    value={formData.Qualification}
                                    onChange={handleChange}
                                    placeholder="Qualification" />
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
                                <Label2>Role</Label2>
                                <Input
                                    type="text"
                                    name="Role"
                                    value={formData.Role}
                                    onChange={handleChange}
                                    placeholder="Enter role"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Job Grade</Label2>
                                <Input
                                    type="text"
                                    name="JobGrade"
                                    value={formData.JobGrade}
                                    onChange={handleChange}
                                    placeholder="Enter job grade"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Experience</Label2>
                                <Input
                                    type="text"
                                    name="Experience"
                                    value={formData.Experience}
                                    onChange={handleChange}
                                    placeholder="Enter experience"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Last School</Label2>
                                <Input
                                    type="text"
                                    name="LastSchool"
                                    value={formData.LastSchool}
                                    onChange={handleChange}
                                    placeholder="Enter last school attended"
                                />
                            </InputContainer>
                        </Main>
                        

                        {formData.Role.trim() === 'Teacher' && (
                            <>
                                <Heading>Assign Subjects</Heading>
                                <div>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        {formData.Assign.map((assign, index) => (
                                            <div key={index} style={{ display: "flex", gap: "10px" }}>
                                                <Main style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}>
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

                                                    <p>{assign.Class} {assign.Section} {assign.Subject}</p>

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
                                                </Main>

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


                        
                        {/* Special Condition */}
                        <Heading>Referral Information</Heading>
                        <Main>
                            <InputContainer>
                                <Label2>Referred Name</Label2>
                                <Input
                                    type="text"
                                    name="ReferredName"
                                    value={formData.ReferredName}
                                    onChange={handleChange}
                                    placeholder="Enter referred name"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Referred Contact</Label2>
                                <Input
                                    type="text"
                                    name="ReferredContact"
                                    value={formData.ReferredContact}
                                    onChange={handleChange}
                                    placeholder="Enter referred contact"
                                />
                            </InputContainer>
                        </Main>

                        {/* Special Condition */}
                        <Heading>Bank Details</Heading>
                        <Main>
                            <InputContainer>
                                <Label2>Aadhar No</Label2>
                                <Input
                                    type="text"
                                    name="AadharNo"
                                    value={formData.AadharNo}
                                    onChange={handleChange}
                                    placeholder="Enter Aadhar number"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Pan No</Label2>
                                <Input
                                    type="text"
                                    name="PanNo"
                                    value={formData.PanNo}
                                    onChange={handleChange}
                                    placeholder="Enter PAN number"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>PF No</Label2>
                                <Input
                                    type="text"
                                    name="PFNo"
                                    value={formData.PFNo}
                                    onChange={handleChange}
                                    placeholder="Enter PF number"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Bank Name</Label2>
                                <Input
                                    type="text"
                                    name="BankName"
                                    value={formData.BankName}
                                    onChange={handleChange}
                                    placeholder="Enter bank name"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Account Number</Label2>
                                <Input
                                    type="text"
                                    name="AccountNumber"
                                    value={formData.AccountNumber}
                                    onChange={handleChange}
                                    placeholder="Enter account number"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>IFSC Code</Label2>
                                <Input
                                    type="text"
                                    name="IFSCCode"
                                    value={formData.IFSCCode}
                                    onChange={handleChange}
                                    placeholder="Enter IFSC code"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Status</Label2>
                                <Input
                                    type="text"
                                    name="Status"
                                    value={formData.Status}
                                    onChange={handleChange}
                                    placeholder="Enter status"
                                />
                            </InputContainer>



                            <InputContainer>
                                <Label2>Transport</Label2>
                                <Select
                                    name="Transport"
                                    value={formData.Transport ? "Yes" : "No"}
                                    onChange={(e) => handleChange({ target: { name: 'Transport', value: e.target.value === "Yes" } })}
                                >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Select>
                            </InputContainer>

                        </Main>

                        {/* File Inputs */}
                        <Heading>Documents</Heading>
                        <Main>

                            <InputContainer>
                                <Label2>Photo</Label2>
                                <Input
                                    type="file"
                                    name="Photo"
                                    onChange={handleFileChange}
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Qualification Certificate</Label2>
                                <Input
                                    type="file"
                                    name="QualificationCertificate"
                                    onChange={handleFileChange}
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Experience Letter</Label2>
                                <Input
                                    type="file"
                                    name="ExperienceLetter"
                                    onChange={handleFileChange}
                                />
                            </InputContainer>
                        </Main>



                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                justifyContent: "center",
                            }}
                        >

                            <SubmitButton type="submit" onClick={handleSubmit}>
                                Update
                            </SubmitButton>
                        </div>
                    </Form>
                </FormContainer>
            </MainDashboard >

        </>
    );
};

export default EditStaff;