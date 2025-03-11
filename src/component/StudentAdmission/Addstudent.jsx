import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import RequireSymbol from "../RequireSymbol";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

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
  z-index: 999; /* Ensure it appears above other UI elements */
  background-color: white;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Adds a subtle shadow */
  border-radius: 4px; /* Rounded corners */
  margin-top: 5px; /* A little gap between the input and the dropdown */
  padding: 0; /* Remove padding to prevent unwanted spacing */
  list-style-type: none; /* Remove list bullet points */
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f4f4f4; /* Hover effect to highlight the item */
  }
  &:active {
    background-color: #e0e0e0; /* Active state to indicate selection */
  }
`;


const AddStudentdata = () => {
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
    Medium:"",
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
    EmergencyContact: {},
    Document: {},
  });
  const [dateOfBirth, setDOB] = useState('');

  const formatDate = (dateString, name) => {
    if (!dateString) return '';
    name==="DOB"?setDOB(dateString):setDOA(dateString)
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };


  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // console.log(value)

    // If the input is of type "date", format it
    if (type === 'date') {
      const formattedValue = formatDate(value,name);
      setFormData(prevState => ({
        ...prevState,
        [name]: formattedValue  // Store formatted date (DD-MM-YYYY) for display
      }));
    } else {
      if(name==="FeeCategory" && value!=="Genral"){
        var final = feeCategories.find(val => val.Title === value)
        console.log(final.Percentage)
        setFormData(prevState => ({
          ...prevState,
          FeeDiscount: final.Percentage  // Store formatted date (DD-MM-YYYY) for display
        }));
      }
      // For other types of fields, just update the value
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };




  const handleSaveAndNext = () => {
    // Save data in local storage
    localStorage.setItem("studentData", JSON.stringify(formData));

    // Navigate to the next step (you can adjust this part)
    alert("Data saved! Navigate to the next step.");
    const role = localStorage.getItem("Role");
    if(role=="Superadmin" || role=="Admin"){
      navigate(`/admin/familydetail`);
    } else{
      navigate(`/employee/familydetail`);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allOptions, setAllOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);


  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch('https://api.edspride.in/enquiry/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Enquiries fetched:', data); // Add this line
        setAllOptions(data);
      } catch (error) {
        console.error('Error fetching enquiries:', error);
      }
    };

    fetchEnquiries();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    const filtered = allOptions.filter(option =>
      option.RegistrationNo.includes(value)
    );

    setFilteredOptions(filtered);
    setShowSuggestions(value.length > 0 && filtered.length > 0);
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100);
  };

  const handleFocus = () => {
    if (searchQuery.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleOptionClick = async (option) => {
    setSelectedEnquiry(option);
    setSearchQuery(option.RegistrationNo);
    setShowSuggestions(false);

    // Map the enquiry fields to form fields
    setFormData((prevData) => ({
      ...prevData,
      StudentName: option.StudentName || "",       // From enquiry
      DOB: option.DOB || "",                       // From enquiry
      Gender: option.Gender || "",                 // From enquiry
      MobileNo: option.MobileNo || "",             // From enquiry
      Address: option.Address || "",                // From enquiry
      City: option.City || "",  
      Medium:option.City || "",                    // From enquiry
      Area: option.Area || "",                      // From enquiry
      Pincode: option.Pincode || "",
      AdmissionInClass: option.AdmissionInClass || "",
      ClassName: option.AdmissionClass,
      FatherDetail: {
        ...prevData.FatherDetail,
        Name: option.FatherName || "", // Replace with actual property for father's name
      },
      MotherDetails: {
        ...prevData.MotherDetails,
        Name: option.MotherName || "", // Replace with actual property for mother's name
      },
    }));
    var selectedClass = option.AdmissionInClass;

    try {
      const response = await axios.get(
        `https://api.edspride.in/class/get/${selectedClass}`
      );
      console.log('Sections Response:', response.data);
      setSections(response.data.Section || []);
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
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

  const [siblingStatus, setSiblingStatus] = useState("");

  // Handle change in the Select dropdown
  const handleSiblingChange = (e) => {
    setSiblingStatus(e.target.value);
  };

  const [classes, setClasses] = useState([]);
  const [houses, setHouses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [sections, setSections] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feeCategories, setFeeCategories] = useState([]);
  const [student, setStudent] = useState("");
  const [selectedClassS, setSelectedClassS] = useState("");
  const [admissionDate, setDOA] = useState("");
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
        console.log(selectedClass)
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

  const handleSubmit = (e) => {
    e.preventDefault();


    try {
      setFormData({}); // Clear the form
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Error adding student. Please try again.");
    }
  };

  const handleClassChange = async (e) => {
    const selectedClass = e.target.value;
    console.log(selectedClass);
    console.log(classes[0])
    var output = classes.find(value => value.ClassId === selectedClass);
    console.log(output.Class);

    setFormData((prevFormData) => ({
      ...prevFormData,
      AdmissionInClass: selectedClass,
      ClassName: output.Class,
    }));


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

  };

  const handleSectionChangeS = (e) => {
    setSelectedSectionS(e.target.value);

  };
  return (
    <>

      <MainDashboard>
        <FormContainer>
          <Title>Add Student</Title>
          <RequireSymbol />
          <StepIndicatorContainer>
            <Step active>
              <StepContent>Student Details</StepContent>
            </Step>
            <Step>
              <StepContent>Family Details</StepContent>
            </Step>
            <Step>
              <StepContent>Documents</StepContent>
            </Step>
          </StepIndicatorContainer>

          <Form onSubmit={handleSubmit}>
            <ToastContainer />
            <Section>
              <Heading>Personal Information</Heading>
              <InputContainer1>
                <Label>Search Enquiry</Label>
                <StyledInput
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
                {showSuggestions && filteredOptions.length > 0 && (
                  <SuggestionsList>
                    {filteredOptions.map((option, index) => (
                      <SuggestionItem
                        key={index}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option.RegistrationNo}
                      </SuggestionItem>
                    ))}
                  </SuggestionsList>
                )}
              </InputContainer1>
            </Section>

            <Main>
              <InputContainer>
                <Label>Student Name</Label>
                <StyledInput
                  type="text"
                  name="StudentName"
                  value={formData.StudentName}
                  onChange={handleChange}
                  placeholder="Enter student name"
                />
                {/* {errors.StudentName && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.StudentName}
                  </div>
                )} */}
              </InputContainer>

              <InputContainer>
                <Label>DOB</Label>
                <Input
                  type="date"
                  name="DOB"
                  value={dateOfBirth}
                  onChange={handleChange}
                  placeholder="Enter student DOB"
                />
                {/* {errors.DOB && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.DOB}
                  </div>
                )} */}
              </InputContainer>

              <InputContainer>
                <Label>Gender</Label>
                <Select
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
                {/* {errors.Gender && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.Gender}
                  </div>
                )} */}
              </InputContainer>

              <InputContainer>
                <Label2>Religion</Label2>
                <Input
                  type="text"
                  name="Religion"
                  value={formData.Religion}
                  onChange={handleChange}
                  placeholder="Religion"
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
                  placeholder="Category"
                />
              </InputContainer>

              <InputContainer>
                <Label2>Height</Label2>
                <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                  <Input
                    type="text"
                    placeholder="eg: (5 ft 7 in)"
                    min="1"
                    max="8"
                    name="Height"
                    value={formData.Height}
                    onChange={handleChange}
                  />
                </div>
              </InputContainer>

              <InputContainer>
                <Label2>Weight</Label2>
                <Input
                  type="text"
                  name="Weight"
                  value={formData.Weight}
                  onChange={handleChange}
                  placeholder="Weight in kg"
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
                  maxLength="12"
                />
                {/* {errors.AadharNumber && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.AadharNumber}
                  </div>
                )} */}
              </InputContainer>

              <InputContainer>
                <Label>Medium</Label>
                <Input
                  type="text"
                  name="Medium"
                  value={formData.Medium}
                  onChange={handleChange}
                  placeholder="Eg:- Semi, Semi-English"
                />
              </InputContainer>
              <InputContainer>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  placeholder="Email"
                />

                {/* {errors.Email && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.Email}
                  </div>
                )} */}
              </InputContainer>
            </Main>

            {/* Contact Info */}

            <Heading>Contact Information</Heading>
            <Main>
              <InputContainer>
                <Label>Mobile Number</Label>
                <Input
                  type="text"
                  name="MobileNo"
                  value={formData.MobileNo}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                  maxLength="10"
                />
                {/* {errors.MobileNo && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.MobileNo}
                  </div>
                )} */}
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
                  placeholder="City"
                />
              </InputContainer>

              <InputContainer>
                <Label2>Local/Outsider</Label2>
                <Input
                  type="text"
                  name="Area"
                  value={formData.Area}
                  onChange={handleChange}
                  placeholder="Enter Area"
                />
              </InputContainer>

              <InputContainer>
                <Label2>Pincode</Label2>
                <Input
                  type="text"
                  name="Pincode"
                  value={formData.Pincode}
                  onChange={handleChange}
                  placeholder="Enter Pincode"
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
                  value={admissionDate}
                  onChange={handleChange}
                  placeholder="Enter Admission Date"
                />
                {/* {errors.AdmissionDate && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.AdmissionDate}
                  </div>
                )} */}
              </InputContainer>

              <InputContainer>
                <Label2>Stream</Label2>
                <Input
                  type="text"
                  name="Stream"
                  value={formData.Stream}
                  onChange={handleChange}
                  placeholder="Enter Stream"
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
                {/* {errors.AdmissionInClass && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.AdmissionInClass}
                  </div>
                )} */}
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
                {/* {errors.selectedSection && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.selectedSection}
                  </div>
                )} */}
              </InputContainer>
              <InputContainer>
                <Label>Select House</Label>
                <Select
                  name="House"
                  value={formData.House}
                  onChange={handleChange}>
                  <option value="">Select House</option>
                  {houses.map((house) => (
                    <option key={house._id} value={house.HouseName}>
                      {house.HouseName}
                    </option>
                  ))}
                </Select>
                {/* {errors.house && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.selectedSection}
                  </div>
                )} */}
              </InputContainer>

              <InputContainer>
                <Label>Fee Category</Label>
                <Select
                  name="FeeCategory"
                  value={formData.FeeCategory}
                  onChange={handleChange}
                >
                  <option value="" >Select a fee category</option>
                  <option value="Genral">Genral</option>
                  {feeCategories.map((category) => (
                    <option key={category.id} value={category.Title}>
                      {category.Title}
                    </option>
                  ))}
                </Select>
                {/* {errors.FeeCategory && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.FeeCategory}
                  </div>
                )} */}
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
                  <option value="">Select Transport Needed</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Select>
              </InputContainer>

              {formData.TransportNeeded === "yes" && (
                <InputContainer>
                  <Label2>Route</Label2>

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

                </InputContainer>
              )}

              <InputContainer>
                <Label2>Fee discount (if any)</Label2>
                <Input
                  type="text"
                  name="FeeDiscount"
                  value={formData.FeeDiscount}
                  onChange={handleChange}
                  placeholder="mention fee discount (if any)"
                />
              </InputContainer>

              <InputContainer>
                <Label2>Bank Account Name</Label2>
                <Input
                  type="text"
                  name="BankName"
                  value={formData.BankName}
                  onChange={handleChange}
                  placeholder="Enter Bank Account Name"
                />
              </InputContainer>

              <InputContainer>
                <Label2>Bank Account Number</Label2>
                <Input
                  type="text"
                  name="BankAccountNumber"
                  value={formData.BankAccountNumber}
                  onChange={handleChange}
                  placeholder="Enter Bank Account Number"
                />
              </InputContainer>

              <InputContainer>
                <Label2>IFSC Code</Label2>
                <Input
                  type="text"
                  name="IFSC"
                  value={formData.IFSC}
                  onChange={handleChange}
                  placeholder="IFSC Code"
                />
              </InputContainer>
            </Main>

            {/* Special Condition */}
            {/* <Heading>Special Conditions</Heading>
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

              {formData.Disability === "yes" && (
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
              )}

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
            </Main> */}

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <SubmitButton type="submit">Save</SubmitButton>
              <SubmitButton type="submit" onClick={handleSaveAndNext}>
                Save & Next
              </SubmitButton>
            </div>
          </Form>
        </FormContainer>
      </MainDashboard>

    </>
  );
};

export default AddStudentdata;