import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RequireSymbol from "../RequireSymbol";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


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

const InputContainer1 = styled.div`
  position: relative;
  width: 35%;

  margin-bottom: 20px;
  datalist {
    background-color: blue;
  }
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled.input`
  width: 88%;
  padding: 12px 15px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
`;

const SuggestionsList = styled.ul`
  position: absolute;
  z-index: 999;
  background-color: white;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f4f4f4;
  }
`;


const EditStudent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [dateOfBirth, setDOB] = useState('');
    const [dateOfAdmission, setDOA] = useState('');
    const [formData, setFormData] = useState({
        StudentName: '',
        StudentId: '',
        DOB: '',
        Gender: '',
        Religion: '',
        BloodGroup: '',
        Category: '',
        Height: '',
        Weight: '',
        AadharNumber: '',
        MobileNo: '',
        Email: '',
        Address: '',
        City: '',
        Area: '',
        Pincode: '',
        AdmissionDate: '',
        Stream: '',
        AdmissionInClass: '',
        Section: '',
        FeeCategory: '',
        RollNo: '',
        LastSchoolAttended: '',
        IdentificationMark: '',
        SourceOfAdmission: '',
        TransportNeeded: '',
        Route: '',
        FeeDiscount: '',
        BankName: '',
        BankAccountNumber: '',
        IFSC: '',
        Disability: '',
        DisabilityName: '',
        Discount: '',
        Orphan: '',
        Subject: '',
        FatherDetail: {
            Name: '',
            Qualification: '',
            Occupation: '',
            AnnualIncome: '',
            AadharNumber: '',
            MobileNo: '',
            EmailId: ''
        },
        MotherDetails: {
            Name: '',
            Qualification: '',
            Occupation: '',
            AnnualIncome: '',
            AadharNumber: '',
            MobileNo: '',
            EmailId: ''
        },
        EmergencyContact: {
            Name: '',
            Relation: '',
            MobileNo: ''
        },
        Document: {
            StudentPhoto: null,
            Birth: null,
            Leaving: null,
            FatherPhoto: null,
            MotherPhoto: null
        }
    });

    const formatDate = (dateString, name) => {
        if (!dateString) return '';
        // name === "DOB" ? setDOB(dateString) : setDOA(dateString)
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    // Fetch student data on component mount
    useEffect(() => {
        if (location.state && location.state.Id) {
            const fetchStudent = async () => {
                try {
                    const response = await fetch(`https://api.edspride.in/student/get/${location.state.Id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log(data);

                    // Update formData while keeping Document as null
                    setFormData(prevData => ({
                        ...prevData,
                        ...data,
                        Document: {
                            StudentPhoto: null,
                            Birth: null,
                            Leaving: null,
                            FatherPhoto: null,
                            MotherPhoto: null
                        }
                    }));
                } catch (error) {
                    console.error("Error fetching student data:", error);
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchStudent();
        } else {
            console.error("Student ID not provided.");
            setError("Student ID not provided.");
            setLoading(false);
        }
    }, [location.state]);


    const handleChange = (e) => {
        const { name, value, files, type } = e.target;

        if (type === 'date') {
            const formattedValue = formatDate(value, name);
            setFormData(prevState => ({
                ...prevState,
                [name]: formattedValue 
            }));
        } else {

            // Check if the input is a file input
            if (e.target.type === 'file') {
                const file = files[0]; // Get the first file
                setFormData((prevData) => ({
                    ...prevData,
                    Document: {
                        ...prevData.Document,
                        [name.split('.')[1]]: file, // Update the specific file field
                    },
                }));
                return;
            }

            // Handle regular fields and nested objects
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
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new FormData object
        const formDataToSubmit = new FormData();

        // Function to append data to FormData without flattening
        const appendData = (data, parentKey = '') => {
            Object.keys(data).forEach((key) => {
                const value = data[key];
                const newKey = parentKey ? `${parentKey}[${key}]` : key;

                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    appendData(value, newKey); // Recursive call for nested objects
                } else if (value !== null && value !== '') {
                    // Only append non-null and non-empty string values
                    formDataToSubmit.append(newKey, value);
                }
            });
        };

        appendData(formData);

        // Handle file uploads separately
        const documents = formData.Document;
        if (documents) {
            Object.keys(documents).forEach((key) => {
                const file = documents[key];
                if (file) {
                    // Only append the file if it is selected (not null)
                    formDataToSubmit.append(`Document[${key}]`, file);
                }
            });
        }

        // Fetch StudentId from location
        const studentId = location.state?.Id; // Optional chaining for safety

        if (!studentId) {
            console.error('Student ID not provided.');
            return;
        }

        // Debug: log FormData
        for (const [key, value] of formDataToSubmit.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const response = await axios.put(`https://api.edspride.in/student/update/${studentId}`, formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                alert('Student data updated successfully!');
                navigate("/admin/allstudent");
            }
        } catch (error) {
            console.error('Error updating student data:', error);
            setError('Failed to update student data.');
        }
    };









    // Handle file input changes
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            Document: {
                ...prevData.Document,
                [name]: files[0] // Store the first uploaded file
            },
        }));
    };




    // CSS styles
    const styles = {
        inputContainer: {
            position: "relative",
            width: "100%",
            marginBottom: "20px",
        },
        input: {
            width: "88%",
            padding: "12px 15px",
            border: "2px solid #7d3cff",
            borderRadius: "30px",
            fontSize: "16px",
            color: "#7a7a7a",
            backgroundColor: "#f4f6fc",
            fontWeight: "bold",
        },
        suggestionsList: {
            position: "absolute",
            top: "100%",
            left: "0",
            right: "0",
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "5px",
            maxHeight: "150px",
            overflowY: "auto",
            zIndex: "1",
        },
        suggestionItem: {
            padding: "10px",
            cursor: "pointer",
        },
        suggestionItemHover: {
            backgroundColor: "#f4f4f4",
        },
    };



    const [classes, setClasses] = useState([]);
    const [houses, setHouses] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [sections, setSections] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState("");
    const [feeCategories, setFeeCategories] = useState([]);
    const [student, setStudent] = useState("");
    const [selectedClassS, setSelectedClassS] = useState("");
    const [selectedSectionS, setSelectedSectionS] = useState("");
    const [students, setStudents] = useState([]);
    const [sectionS, setSectionS] = useState([]);
    const [classeS, setClasseS] = useState([]);

    useEffect(() => {
        const fetchFeeCategories = async () => {
            try {
                const response = await fetch('https://api.edspride.in/discount/all');
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
                const response = await axios.get("https://api.edspride.in/route/all");
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
                const response = await axios.get('https://api.edspride.in/class/all');
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
                const response = await axios.get('https://api.edspride.in/house/all');
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
                        `https://api.edspride.in/class/get/${selectedClass}`
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



    const handleClassChange = async (e) => {
        const selectedClass = e.target.value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            AdmissionInClass: selectedClass, // Update AdmissionInClass
        }));

        // Clear previous errors
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors.AdmissionInClass;
            return newErrors;
        });

        // Fetch sections based on the selected class
        if (selectedClass) {
            try {
                const response = await axios.get(`https://api.edspride.in/class/get/${selectedClass}`);
                setSections(response.data.Section || []);
            } catch (error) {
                console.error("Error fetching sections:", error);
            }
        } else {
            setSections([]); // Reset sections if no class is selected
        }
    };

    const handleSectionChange = (e) => {
        const Section = e.target.value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            Section, // Update selectedSection
        }));

        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors.selectedSection; // Clear the error for section
            return newErrors;
        });
    };

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get("https://api.edspride.in/class/all");
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
                        `https://api.edspride.in/class/get/${selectedClassS}`
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
                    const response = await axios.get("https://api.edspride.in/student/all", {
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
        navigate("/admin/allstudent");

    }


    return (
        <>

            <MainDashboard>
                <FormContainer>
                    <Title>Edit Student</Title>
                    <RequireSymbol />
                    <StepIndicatorContainer>
                        <Step>
                            <StepContent>Student Details</StepContent>
                        </Step>
                    </StepIndicatorContainer>

                    <Form onSubmit={handleSubmit}>
                        <Heading>Personal Information</Heading>
                        <Main>
                            <InputContainer>
                                <Label>Student Name</Label>
                                <Input
                                    type="text"
                                    name="StudentName"
                                    value={formData.StudentName}
                                    onChange={handleChange}
                                    placeholder="Enter student name"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label>Student ID</Label>
                                <Input
                                    type="text"
                                    name="StudentId"
                                    value={formData.StudentId}
                                    onChange={handleChange}
                                    placeholder="Enter student ID"
                                    disabled
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label>DOB</Label>
                                <Input
                                    type="date"
                                    name="DOB"
                                    value={formData.DOB.split("-").reverse().join("-")}
                                    onChange={handleChange}
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label>Gender</Label>
                                <Select
                                    name="Gender"
                                    value={formData.Gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </Select>
                            </InputContainer>

                            <InputContainer>
                                <Label2>Religion</Label2>
                                <Input
                                    type="text"
                                    name="Religion"
                                    value={formData.Religion}
                                    onChange={handleChange}
                                    placeholder="Enter religion"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Blood Group</Label2>
                                <Select
                                    name="BloodGroup"
                                    value={formData.BloodGroup}
                                    onChange={handleChange}
                                >
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
                                <Input
                                    type="text"
                                    name="Category"
                                    value={formData.Category}
                                    onChange={handleChange}
                                    placeholder="Enter category"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Height</Label2>
                                <Input
                                    type="text"
                                    name="Height"
                                    value={formData.Height}
                                    onChange={handleChange}
                                    placeholder="Enter height"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Weight</Label2>
                                <Input
                                    type="text"
                                    name="Weight"
                                    value={formData.Weight}
                                    onChange={handleChange}
                                    placeholder="Enter weight"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Aadhar Number</Label2>
                                <Input
                                    type="text"
                                    name="AadharNumber"
                                    value={formData.AadharNumber}
                                    onChange={handleChange}
                                    placeholder="Enter Aadhar number"
                                    disabled
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    name="Email"
                                    value={formData.Email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                />
                            </InputContainer>
                        </Main>

                        <Heading>Contact Information</Heading>
                        <Main>
                            <InputContainer>
                                <Label>Mobile Number</Label>
                                <Input
                                    type="text"
                                    name="MobileNo"
                                    value={formData.MobileNo}
                                    onChange={handleChange}
                                    placeholder="Enter mobile number"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Address</Label2>
                                <Input
                                    type="text"
                                    name="Address"
                                    value={formData.Address}
                                    onChange={handleChange}
                                    placeholder="Enter address"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>City</Label2>
                                <Input
                                    type="text"
                                    name="City"
                                    value={formData.City}
                                    onChange={handleChange}
                                    placeholder="Enter city"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Area</Label2>
                                <Input
                                    type="text"
                                    name="Area"
                                    value={formData.Area}
                                    onChange={handleChange}
                                    placeholder="Enter area"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Pincode</Label2>
                                <Input
                                    type="text"
                                    name="Pincode"
                                    value={formData.Pincode}
                                    onChange={handleChange}
                                    placeholder="Enter pincode"
                                />
                            </InputContainer>
                        </Main>

                        {/* Admission Details */}

                        <Heading>Admission Details</Heading>
                        <Main>
                            <InputContainer>
                                <Label>Admission Date</Label>
                                <Input
                                    type="date"
                                    name="AdmissionDate"
                                    value={formData.AdmissionDate.split("-").reverse().join("-")}
                                    onChange={handleChange}
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Stream</Label2>
                                <Input
                                    type="text"
                                    name="Stream"
                                    value={formData.Stream}
                                    onChange={handleChange}
                                    placeholder="Enter stream"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label>Admission in class</Label>
                                <Select value={formData.AdmissionInClass} onChange={handleClassChange}>
                                    <option value="">Select Class</option>
                                    {classes.map((cls) => (
                                        <option key={cls.ClassId} value={cls.ClassId}>
                                            {cls.Class}
                                        </option>
                                    ))}
                                </Select>

                            </InputContainer>

                            <InputContainer>
                                <Label>Select Section</Label>
                                <Select
                                    name="Section"
                                    value={formData.Section}
                                    onChange={handleChange}
                                    disabled={!formData.AdmissionInClass}
                                >
                                    <option value="">Select Section</option>
                                    {sections.map((section, index) => (
                                        <option key={index} value={section}>
                                            {section}
                                        </option>
                                    ))}
                                </Select>

                            </InputContainer>
                            <InputContainer>
                                <Label>Select House</Label>
                                <Select
                                    name="House"
                                    value={formData.House}
                                    onChange={handleChange}>
                                    <option value="">Select House</option>
                                    {houses.map((house) => (
                                        <option key={house._id} value={house._id}>
                                            {house.HouseName}
                                        </option>
                                    ))}
                                </Select>

                            </InputContainer>

                            <InputContainer>
                                <Label>Fee Category</Label>
                                <Select
                                    name="FeeCategory"
                                    value={formData.FeeCategory}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select a fee category</option>
                                    {feeCategories.map((category) => (
                                        <option key={category.id} value={category.Title}>
                                            {category.Title}
                                        </option>
                                    ))}
                                </Select>

                            </InputContainer>

                            <InputContainer>
                                <Label2>Roll No.</Label2>
                                <Input
                                    type="text"
                                    name="RollNo"
                                    value={formData.RollNo}
                                    onChange={handleChange}
                                    placeholder="Roll No."
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Last School Attended</Label2>
                                <Input
                                    type="text"
                                    name="LastSchoolAttended"
                                    value={formData.LastSchoolAttended}
                                    onChange={handleChange}
                                    placeholder="Last School Attended"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Identification Mark</Label2>
                                <Input
                                    type="text"
                                    name="IdentificationMark"
                                    value={formData.IdentificationMark}
                                    onChange={handleChange}
                                    placeholder="Identification Mark"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Source of Admission</Label2>
                                <Input
                                    type="text"
                                    name="SourceOfAdmission"
                                    value={formData.SourceOfAdmission}
                                    onChange={handleChange}
                                    placeholder="Source of Admission"
                                />
                            </InputContainer>
                        </Main>

                        {/* Transport & Fee Details */}

                        <Heading>Transport and Fee Details</Heading>
                        <Main>

                            <InputContainer>
                                <Label2>Transport Needed</Label2>
                                <Select
                                    name="TransportNeeded"
                                    value={formData.TransportNeeded}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Select>
                            </InputContainer>

                            <InputContainer>
                                <Label2>Route</Label2>
                                <Input
                                    type="text"
                                    name="Route"
                                    value={formData.Route}
                                    onChange={handleChange}
                                    placeholder="Enter route"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Fee Discount</Label2>
                                <Input
                                    type="text"
                                    name="FeeDiscount"
                                    value={formData.FeeDiscount}
                                    onChange={handleChange}
                                    placeholder="Enter fee discount"
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
                                <Label2>Bank Account Number</Label2>
                                <Input
                                    type="text"
                                    name="BankAccountNumber"
                                    value={formData.BankAccountNumber}
                                    onChange={handleChange}
                                    placeholder="Enter bank account number"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>IFSC</Label2>
                                <Input
                                    type="text"
                                    name="IFSC"
                                    value={formData.IFSC}
                                    onChange={handleChange}
                                    placeholder="Enter IFSC code"
                                />
                            </InputContainer>

                        </Main>

                        {/* Special Condition */}
                        <Heading>Special Conditions</Heading>
                        <Main>

                            <InputContainer>
                                <Label2>Disability</Label2>
                                <Select
                                    name="Disability"
                                    value={formData.Disability}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Select>
                            </InputContainer>

                            <InputContainer>
                                <Label2>Which Disability</Label2>
                                <Input
                                    type="text"
                                    name="DisabilityName"
                                    value={formData.DisabilityName}
                                    onChange={handleChange}
                                    placeholder="Mention disability"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Discount</Label2>
                                <Input
                                    type="text"
                                    name="Discount"
                                    value={formData.Discount}
                                    onChange={handleChange}
                                    placeholder="Enter discount"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Orphan</Label2>
                                <Select
                                    name="Orphan"
                                    value={formData.Orphan}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Select>
                            </InputContainer>



                            {/* <InputContainer>
                                <Label2>Subject</Label2>
                                <Input
                                    type="text"
                                    name="Subject"
                                    value={formData.Subject}
                                    onChange={handleChange}
                                    placeholder="Enter subjects"
                                />
                            </InputContainer> */}
                        </Main>
                        <Heading>Father's Details</Heading>

                        <Main>
                            <InputContainer>
                                <Label>Father's Name</Label>
                                <Input
                                    type="text"
                                    name="FatherDetail.Name"
                                    value={formData.FatherDetail.Name}
                                    onChange={handleChange}
                                    placeholder="Enter father's name"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Father's Qualification</Label2>
                                <Input
                                    type="text"
                                    name="FatherDetail.Qualification"
                                    value={formData.FatherDetail.Qualification}
                                    onChange={handleChange}
                                    placeholder="Enter father's qualification"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Father's Occupation</Label2>
                                <Input
                                    type="text"
                                    name="FatherDetail.Occupation"
                                    value={formData.FatherDetail.Occupation}
                                    onChange={handleChange}
                                    placeholder="Enter father's occupation"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Father's Annual Income</Label2>
                                <Input
                                    type="text"
                                    name="FatherDetail.AnnualIncome"
                                    value={formData.FatherDetail.AnnualIncome}
                                    onChange={handleChange}
                                    placeholder="Enter father's annual income"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Father's Aadhar Number</Label2>
                                <Input
                                    type="text"
                                    name="FatherDetail.AadharNumber"
                                    value={formData.FatherDetail.AadharNumber}
                                    onChange={handleChange}
                                    placeholder="Enter father's Aadhar number"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label>Father's Mobile No</Label>
                                <Input
                                    type="text"
                                    name="FatherDetail.MobileNo"
                                    value={formData.FatherDetail.MobileNo}
                                    onChange={handleChange}
                                    placeholder="Enter father's mobile number"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Father's Email ID</Label2>
                                <Input
                                    type="email"
                                    name="FatherDetail.EmailId"
                                    value={formData.FatherDetail.EmailId}
                                    onChange={handleChange}
                                    placeholder="Enter father's email"
                                />
                            </InputContainer>
                        </Main>

                        {/* Mother's Details */}

                        <Heading>Mother's Details</Heading>
                        <Main>
                            <InputContainer>
                                <Label>Mother's Name</Label>
                                <Input
                                    type="text"
                                    name="MotherDetails.Name"
                                    value={formData.MotherDetails.Name}
                                    onChange={handleChange}
                                    placeholder="Enter mother's name"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Mother's Qualification</Label2>
                                <Input
                                    type="text"
                                    name="MotherDetails.Qualification"
                                    value={formData.MotherDetails.Qualification}
                                    onChange={handleChange}
                                    placeholder="Enter mother's qualification"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Mother's Occupation</Label2>
                                <Input
                                    type="text"
                                    name="MotherDetails.Occupation"
                                    value={formData.MotherDetails.Occupation}
                                    onChange={handleChange}
                                    placeholder="Enter mother's occupation"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Mother's Annual Income</Label2>
                                <Input
                                    type="text"
                                    name="MotherDetails.AnnualIncome"
                                    value={formData.MotherDetails.AnnualIncome}
                                    onChange={handleChange}
                                    placeholder="Enter mother's annual income"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Mother's Aadhar Number</Label2>
                                <Input
                                    type="text"
                                    name="MotherDetails.AadharNumber"
                                    value={formData.MotherDetails.AadharNumber}
                                    onChange={handleChange}
                                    placeholder="Enter mother's Aadhar number"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label>Mother's Mobile No</Label>
                                <Input
                                    type="text"
                                    name="MotherDetails.MobileNo"
                                    value={formData.MotherDetails.MobileNo}
                                    onChange={handleChange}
                                    placeholder="Enter mother's mobile number"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Mother's Email ID</Label2>
                                <Input
                                    type="email"
                                    name="MotherDetails.EmailId"
                                    value={formData.MotherDetails.EmailId}
                                    onChange={handleChange}
                                    placeholder="Enter mother's email"
                                />
                            </InputContainer>
                        </Main>

                        {/* Emergency Contact */}

                        <Heading>Emergency Contact</Heading>
                        <Main>
                            <InputContainer>
                                <Label2>Emergency Contact Name</Label2>
                                <Input
                                    type="text"
                                    name="EmergencyContact.Name"
                                    value={formData.EmergencyContact.Name}
                                    onChange={handleChange}
                                    placeholder="Enter emergency contact name"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Emergency Contact Relation</Label2>
                                <Input
                                    type="text"
                                    name="EmergencyContact.Relation"
                                    value={formData.EmergencyContact.Relation}
                                    onChange={handleChange}
                                    placeholder="Enter relation"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label2>Emergency Contact Mobile No</Label2>
                                <Input
                                    type="text"
                                    name="EmergencyContact.MobileNo"
                                    value={formData.EmergencyContact.MobileNo}
                                    onChange={handleChange}
                                    placeholder="Enter emergency contact mobile number"
                                />
                            </InputContainer>
                        </Main>

                        <Heading>Documents</Heading>
                        <Main>
                            <InputContainer>
                                <Label>Student Photo</Label>
                                <Input
                                    type="file"
                                    name="Document.StudentPhoto"
                                    onChange={handleChange}
                                    accept="image/*"
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label>Birth Certificate</Label>
                                <Input
                                    type="file"
                                    name="Document.Birth"
                                    onChange={handleChange}
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label>Leaving Certificate</Label>
                                <Input
                                    type="file"
                                    name="Document.Leaving"
                                    onChange={handleChange}
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

export default EditStudent;