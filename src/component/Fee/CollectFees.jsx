import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
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

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
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
  padding: 20px;
  border-radius: 10px;
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

  @media (max-width: 480px) {
    width: 100%;
    font-size: 12px;
    padding: 5px;
  }
`;

const CollectFees = () => {
  var navigate = useNavigate();
  const [student, setStudent] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState([]); // Initialize as an empty array
  const [errors, setErrors] = useState({});
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);

  // Fetch classes on initial load
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/class/all");
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

  // Fetch students based on selected class and section
  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedClass && selectedSection) {
        try {
          const response = await axios.get("https://api.edspride.in/student/all", {
            params: { classId: selectedClass, section: selectedSection },
          });
          // console.log('Students Response:', response.data);

          // Ensure response is an array
          if (Array.isArray(response.data)) {
            console.log(selectedClass, selectedSection)
            console.log(response.data[response.data.length - 1])
            var filData = response.data.filter(data => data.Section === selectedSection && data.AdmissionInClass === selectedClass)
            setStudents(filData);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!student) newErrors.student = "Student name is required.";
    if (!selectedClass) newErrors.selectedClass = "Class is required.";
    if (!selectedSection) newErrors.selectedSection = "Section is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      var payload = {
        ClassId: selectedClass,
        StudentId: student
      }
      try {
        await axios.post("https://api.edspride.in/fee-data/create", payload);
        toast.success("Fee slab added successfully.");
        const role = localStorage.getItem("Role");
        if (role == "Superadmin" || role == "Admin") {
          navigate(`/admin/payment`, { state: { student } });
        } else {
          navigate(`/employee/payment`, { state: { student } });
        }
        setStudent("");
        setSelectedClass("");
        setSelectedSection("");
      } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message || "Error");
      }

      // Submit form
      // alert("Form Submitted successfully!");
    }
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.selectedClass;
      return newErrors;
    });
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.selectedSection;
      return newErrors;
    });
  };

  return (
    <MainDashboard>
      <ToastContainer />
      <FormContainer>
        <Title>Collect Fee for Single Student</Title>
        <Form onSubmit={handleSubmit}>
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
                value={student}
                onChange={(e) => setStudent(e.target.value)}
                disabled={!selectedClass || !selectedSection}
              >
                <option value="">Select Student</option>
                {Array.isArray(students) && students.length > 0 ? (
                  students.map((stu) => (
                    <option key={stu.StudentId} value={stu.StudentId}>
                      {stu.StudentName}
                    </option>
                  ))
                ) : (
                  <option value="">No students available</option>
                )}
              </Select>
              {errors.student && <ErrorMessage>{errors.student}</ErrorMessage>}
            </InputContainer>
          </Main>

          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <SubmitButton type="submit">Submit</SubmitButton>
          </div>
        </Form>
      </FormContainer>
    </MainDashboard>
  );
};

export default CollectFees;
