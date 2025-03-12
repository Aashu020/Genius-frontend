import React, { useEffect, useState } from "react";
// import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorMessage,Heading,MainDashboard,Title,Form,Main,FormContainer,InputContainer,Label ,Input,Select,SubmitButton} from "./FeeStyles";

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
