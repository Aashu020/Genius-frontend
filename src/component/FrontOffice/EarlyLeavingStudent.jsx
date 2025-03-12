import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import FrontOfficeSidebar from "./FrontOfficeSidebar";
import EntryExitTable from "./EntryExitTable";
import LeavingStaffTable from "./LeavingStaffTable";
import Sidebar from "../Sidebar";
import axios from "axios";
import LeavingStudentTable from "./LeavingStudentTable";

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

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  @media (max-width: 480px) {
    margin: 0;
  }
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
  cursor: pointer;

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
const InputContainer1 = styled.div`
  /* visibility: ${(props) => (props.show ? "visible" : "hidden")}; */
  display: ${(props) => (props.show ? "flex" : "none")};
  transition: visibility 0.3s, opacity 0.3s ease-in-out;

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

const PlusButton = styled.button`
  width: 35px;
  padding: 12px;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  margin-left: 10px;

  &:hover {
    background: linear-gradient(270deg, #1c2563 0%, #662acc 100%);
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
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

  @media (max-width: 480px) {
    width: 100%;
    font-size: 12px;
    padding: 5px;
  }
`;
const EarlyLeaving = () => {
  const [activeForm, setActiveForm] = useState("student"); // State to track active form
  const [showInput, setShowInput] = useState(false);

  const [formData, setFormData] = useState({
    Name: "",
    Class: "",
    Section: "",
    Purpose: "",
    LeavingWith: "",
    Relation: "",
    verifIedVisitorId: "",
    TimeOfLeaving: "",
    ApprovedBy: "",
  });

  const [staffData, setStaffData] = useState({
    Name: "",
    Department: "",
    Purpose: "",
    WillBack: "",
    TimeOfBack: "",
    VehicleUsed: "",
    TimeOfLeaving: "",
    ApprovedBy: "",
  });

  const [formErrors, setFormErrors] = useState({}); // State for errors
  const [staffErrors, setStaffErrors] = useState({}); // State for staff errors

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    setStaffData({
      ...staffData,
      [name]: value,
    });

    // Show input if the selected value is "true", otherwise hide it
    setShowInput(value === "true");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate only letters for Name and Leaving With fields
    if (name === "Name" || name === "LeavingWith") {
      const lettersOnly = /^[A-Za-z\s]*$/; // Regex for letters and spaces only
      if (!lettersOnly.test(value)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Only letters are allowed",
        }));
        return; // Prevents setting invalid value
      }
    }

    // Update state for both staff and student data
    setStaffData({
      ...staffData,
      [name]: value,
    });
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors on input change
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setStaffErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.Name) errors.Name = "Name is required";
    if (!data.Class) errors.Class = "Class is required";
    if (!data.Section) errors.Section = "Section is required";
    if (!data.Purpose) errors.Purpose = "Purpose of leaving is required";
    if (!data.LeavingWith) errors.LeavingWith = "Leaving with is required";
    if (!data.Relation) errors.Relation = "Relation is required";
    if (!data.verifIedVisitorId)
      errors.verifIedVisitorId = "Verified Visitor ID is required";
    if (!data.ApprovedBy) errors.ApprovedBy = "Approved by is required";

    // Validate that Name and LeavingWith fields contain only letters
    const lettersOnly = /^[A-Za-z\s]*$/;
    if (data.Name && !lettersOnly.test(data.Name)) {
      errors.Name = "Only letters are allowed";
    }
    if (data.LeavingWith && !lettersOnly.test(data.LeavingWith)) {
      errors.LeavingWith = "Only letters are allowed";
    }

    return errors;
  };

  const validateStaffForm = (data) => {
    const errors = {};
    if (!data.Name) errors.Name = "Name is required";
    if (!data.Department) errors.Department = "Department is required";
    if (!data.Purpose) errors.Purpose = "Purpose is required";
    if (!data.WillBack) errors.WillBack = "Will Back is required";
    if (!data.VehicleUsed) errors.VehicleUsed = "Vehicle Used is required";
    if (!data.TimeOfLeaving) errors.TimeOfLeaving = "Time of leaving is required";
    if (!data.ApprovedBy) errors.ApprovedBy = "Approved by is required";
    return errors;
  };

  const handleSubmitstudent = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors); // Set errors if any
    console.log(errors)
    console.log(formData)

    if (Object.keys(errors).length === 0) {
      console.log("Added")
      try {
        const response = await axios.post(
          "http://localhost:8007/student-leaving/add",
          formData
        );
        console.log(response.data);
        // Reset form and errors after successful submission
        alert("Student form submitted successfully!");
        setFormData({
          Name: "",
          Class: "",
          Section: "",
          Purpose: "",
          LeavingWith: "",
          Relation: "",
          verifIedVisitorId: "",
          TimeOfLeaving: "",
          ApprovedBy: "",
        });
        setFormErrors({});
        window.location.reload(false)
      } catch (error) {
        console.error("Error submitting student form:", error);
      }
    }
  };

  const handleSubmitstaff = async (e) => {
    e.preventDefault();
    const errors = validateStaffForm(staffData);
    setStaffErrors(errors); // Set errors if any

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8007/staff-leaving/add",
          staffData
        );
        console.log(response.data);
        alert("Staff form submitted successfully!");

        // Reset form and errors after successful submission
        setStaffData({
          Name: "",
          Department: "",
          Purpose: "",
          WillBack: "",
          TimeOfBack: "",
          VehicleUsed: "",
          TimeOfLeaving: "",
          ApprovedBy: "",
        });
        setStaffErrors({});
        window.location.reload(false)
      } catch (error) {
        console.error("Error submitting staff form:", error);
      }
    }
  };

  // -----------------------******************-------------------------
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString(); // This will return the time in HH:MM:SS format
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFormData((prevData) => ({
        ...prevData,
        TimeOfLeaving: getCurrentTime(),
      }));
      setStaffData((prevData) => ({
        ...prevData,
        TimeOfLeaving: getCurrentTime(),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Fetch all departments
    const fetchDepartments = async () => {
      const response = await fetch('http://localhost:8007/department/all');
      const data = await response.json();
      setDepartments(data);
    };
    fetchDepartments();
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
    const fetchSections = async () => {
      if (selectedClass) {
        try {
          const response = await axios.get(
            `http://localhost:8007/class/get/${selectedClass}`
          );
          console.log('Sections Response:', response.data); // Debugging output
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

  const [student, setStudent] = useState("");
  const [students, setStudents] = useState([]);


  // Fetch classes on initial load
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

  // Fetch students based on selected class and section
  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedClass && selectedSection) {
        try {
          const response = await axios.get("http://localhost:8007/student/all", {
            params: { classId: selectedClass, section: selectedSection },
          });
          console.log('Students Response:', response.data);

          // Ensure response is an array
          if (Array.isArray(response.data)) {
            var  students = response.data.filter((student) => student.AdmissionInClass ===  selectedClass && student.Section === selectedSection);
            setStudents(students)

            // setStudents(response.data);
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
  }, [selectedClass, selectedSection]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!student) newErrors.student = "Student name is required.";
    if (!selectedClass) newErrors.selectedClass = "Class is required.";
    if (!selectedSection) newErrors.selectedSection = "Section is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

      // Submit form
      // alert("Form Submitted successfully!");
      navigate("/admin/payment", { state: { student } });

      setStudent("");
      setSelectedClass("");
      setSelectedSection("");
    }
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.selectedClass;
      return newErrors;
    });
    var data = classes.find(val => val.ClassId === e.target.value)
    console.log(data.Class.trim())
    setFormData({
      ...formData,
      Class: data.Class.trim(),
    });
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.selectedSection;
      return newErrors;
    });
    setFormData({
      ...formData,
      Section: e.target.value,
    });
  };

  const [approvedByList, setApprovedByList] = useState([]);
  const [selectedApprovedBy, setSelectedApprovedBy] = useState('');
  const [newApprovedBy, setNewApprovedBy] = useState('');
  const [showInput1, setShowInput1] = useState(false);

  // Fetch existing approved by data from API
  const fetchApprovedByList = async () => {
    try {
      const response = await axios.get('http://localhost:8007/approvedby/all');
      setApprovedByList(response.data);
    } catch (error) {
      console.error('Error fetching approved by list:', error);
    }
  };

  useEffect(() => {
    fetchApprovedByList();
  }, []);

  const handleApprovedByChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleAddApprovedBy = async () => {
    if (!newApprovedBy) {
      setErrors((prev) => ({ ...prev, ApprovedBy: 'Name cannot be empty.' }));
      return;
    }

    try {
      // Send new approved by to API
      const response = await axios.post('http://localhost:8007/approvedby/add', {
        ApprovedByTitle: newApprovedBy,
      });

      // Update approved by state with the new approved by object
      setApprovedByList([...approvedByList, response.data]); // Assuming the API returns the new approved by object
      setFormData({ ...formData, ApprovedBy: newApprovedBy });
      setNewApprovedBy('');
      setShowInput(false);
      setErrors((prev) => ({ ...prev, ApprovedBy: '' })); // Clear any previous error
    } catch (error) {
      console.error('Error adding approved by:', error);
    }
  };
  const renderForm = () => {
    if (activeForm === "student") {
      return (
        <>
          <Form onSubmit={handleSubmitstudent}>
            <Main>


              <InputContainer>
                <Label>Select Class</Label>
                <Select value={selectedClass} onChange={handleClassChange}>
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls.ClassId} value={cls.ClassId}>
                      {cls.Class}
                    </option>
                  ))}
                </Select>
                {errors.selectedClass && <ErrorMessage>{errors.selectedClass}</ErrorMessage>}
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
                {errors.selectedSection && <ErrorMessage>{errors.selectedSection}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Select Student</Label>
                <Select
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  disabled={!selectedClass || !selectedSection}
                >
                  <option value="">Select Student</option>
                  {Array.isArray(students) && students.length > 0 ? (
                    students.map((stu) => (
                      <option key={stu.StudentId} value={stu.StudentName}>
                        {stu.StudentName}
                      </option>
                    ))
                  ) : (
                    <option value="">No students available</option>
                  )}
                </Select>
                {errors.student && <ErrorMessage>{errors.student}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Purpose of Leaving</Label>
                <Input
                  type="text"
                  name="Purpose"
                  placeholder="Enter Purpose"
                  value={formData.Purpose}
                  onChange={handleChange}
                />
                {formErrors.Purpose && (
                  <ErrorMessage>{formErrors.Purpose}</ErrorMessage>
                )}
              </InputContainer>
              <InputContainer>
                <Label>Leaving With</Label>
                <Input
                  type="text"
                  name="LeavingWith"
                  placeholder="Enter Name"
                  value={formData.LeavingWith}
                  onChange={handleChange}
                />
                {formErrors.LeavingWith && (
                  <ErrorMessage>{formErrors.LeavingWith}</ErrorMessage>
                )}
              </InputContainer>
              <InputContainer>
                <Label>Relation</Label>
                <Input
                  type="text"
                  name="Relation"
                  placeholder="Enter Relation"
                  value={formData.Relation}
                  onChange={handleChange}
                />
                {formErrors.Relation && (
                  <ErrorMessage>{formErrors.Relation}</ErrorMessage>
                )}
              </InputContainer>
              <InputContainer>
                <Label>Verified Visitor ID</Label>
                <Input
                  type="text"
                  name="verifIedVisitorId"
                  placeholder="Enter Verified Visitor ID"
                  value={formData.verifIedVisitorId}
                  onChange={handleChange}
                />
                {formErrors.verifIedVisitorId && (
                  <ErrorMessage>{formErrors.verifIedVisitorId}</ErrorMessage>
                )}
              </InputContainer>
              <InputContainer>
                <Label>Time of Leaving</Label>
                <Input
                  type="text"
                  name="TimeOfLeaving"
                  value={formData.TimeOfLeaving}
                  onChange={handleChange}
                />
                {formErrors.TimeOfLeaving && (
                  <ErrorMessage>{formErrors.TimeOfLeaving}</ErrorMessage>
                )}
              </InputContainer>
              <InputContainer>
                <Label>Approved By</Label>
                <Select
                  name="ApprovedBy"
                  value={selectedApprovedBy}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedApprovedBy(value);
                    setFormData({ ...formData, ApprovedBy: value });
                  }}
                >
                  <option value="" disabled>Select Approved By</option>
                  {approvedByList.map((approved) => (
                    <option key={approved._id} value={approved.ApprovedByTitle}>
                      {approved.ApprovedByTitle}
                    </option>
                  ))}
                </Select>
                <PlusButton type="button" onClick={() => setShowInput1(!showInput)}>
                  +
                </PlusButton>
                {errors.ApprovedBy && <ErrorMessage>{errors.ApprovedBy}</ErrorMessage>}
              </InputContainer>

              {showInput1 && (
                <InputContainer>
                  <Label>Add New Approved By</Label>
                  <Input
                    type="text"
                    placeholder="Enter New Name"
                    value={newApprovedBy}
                    onChange={(e) => setNewApprovedBy(e.target.value)}
                  />
                  <SubmitButton type="button" onClick={handleAddApprovedBy}>
                    Submit
                  </SubmitButton>
                  {errors.ApprovedBy && <ErrorMessage>{errors.ApprovedBy}</ErrorMessage>}
                </InputContainer>
              )}
            </Main>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <SubmitButton type="save">Save</SubmitButton>
              <SubmitButton type="submit">Print</SubmitButton>
            </div>
          </Form >
          <LeavingStudentTable />
        </>
      );
    } else if (activeForm === "staff") {
      return (
        <>
          <Form onSubmit={handleSubmitstaff}>
            <Main>
              <InputContainer>
                <Label>Name of the Employee</Label>
                <Input
                  type="text"
                  placeholder="Enter Name"
                  name="Name"
                  value={staffData.Name}
                  onChange={handleChange}
                />
                {staffErrors.Name && (
                  <ErrorMessage>{staffErrors.Name}</ErrorMessage>
                )}
              </InputContainer>
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
                {staffErrors.Department && (
                  <ErrorMessage>{staffErrors.Department}</ErrorMessage>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Purpose of Leaving</Label>
                <Input
                  type="text"
                  placeholder="Enter Reason"
                  name="Purpose"
                  value={staffData.Purpose}
                  onChange={handleChange}
                />
                {staffErrors.Purpose && (
                  <ErrorMessage>{staffErrors.Purpose}</ErrorMessage>
                )}
              </InputContainer>
              <InputContainer>
                <Label>Will be/Back</Label>

                <Select //******************************************* */
                  name="WillBack"
                  value={staffData.WillBack}
                  onChange={handleSelectChange}
                >
                  <option value="">Select</option>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </Select>
                {staffErrors.WillBack && (
                  <ErrorMessage>{staffErrors.WillBack}</ErrorMessage>
                )}
              </InputContainer>
              <InputContainer1 show={showInput}>
                <Label>Time of Will be/Back</Label>
                <Input
                  type="text"
                  placeholder="Time of back"
                  name="TimeOfBack"
                  value={staffData.TimeOfBack}
                  onChange={handleChange}
                />
              </InputContainer1>

              <InputContainer>
                <Label>Vehical Used</Label>
                <Select
                  name="VehicleUsed"
                  value={staffData.VehicleUsed}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </Select>
                {staffErrors.VehicleUsed && (
                  <ErrorMessage>{staffErrors.VehicleUsed}</ErrorMessage>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Time of leaving</Label>
                <Input
                  type="text"
                  placeholder="Enter Reason"
                  name="TimeOfLeaving"
                  value={staffData.TimeOfLeaving}
                  onChange={handleChange}
                />
                {staffErrors.TimeOfLeaving && (
                  <ErrorMessage>{staffErrors.TimeOfLeaving}</ErrorMessage>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Approved By</Label>
                <Input
                  type="text"
                  placeholder="Enter Reason"
                  name="ApprovedBy"
                  value={staffData.ApprovedBy}
                  onChange={handleChange}
                />
                {staffErrors.ApprovedBy && (
                  <ErrorMessage>{staffErrors.ApprovedBy}</ErrorMessage>
                )}
              </InputContainer>
              {/* Add more fields as per requirement */}
            </Main>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <SubmitButton type="submit">Save</SubmitButton>
              <SubmitButton type="print">Print</SubmitButton>
            </div>
          </Form>
          <LeavingStaffTable />
        </>
      );
    }
  };

  return (
    <>

      <MainDashboard>
        <FormContainer>
          <Title>Early Leaving</Title>

          <Section>
            <Heading onClick={() => setActiveForm("student")}>
              Student Details
            </Heading>
            <Heading onClick={() => setActiveForm("staff")}>
              Staff Details
            </Heading>
          </Section>

          {renderForm()}
        </FormContainer>
      </MainDashboard>

    </>
  );
};

export default EarlyLeaving;
