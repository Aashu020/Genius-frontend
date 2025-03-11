import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  margin-bottom: 30px;
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
  @media (max-width: 480px) {
    font-size: 12px;
    height: 30px;
    width: 50%;
    margin-bottom: 30px;
    margin-top: 20px;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
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

// Table Section
const TableContainer = styled.div`
  margin-top: 40px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  font-size: 16px;
  text-align: left;

  th,
  td {
    padding: 12px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f6fc;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const TdAction = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SmallButton = styled.button`
  background: #ef5350;
  border: none;
  padding: 5px 10px;
  color: white;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  margin-left: 5px;

  &:hover {
    background: #d32f2f;
  }
`;


const Consolidated = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    Class: "",
    Section: "",
  });
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [exams, setExams] = useState([]);
  const [examId, setExamId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedClassName, setSelectedClassName] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const navigate = useNavigate(); // Use navigate for navigation

  // Fetch available classes when component mounts
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
          const response = await axios.get(`https://api.edspride.in/class/get/${selectedClass}`);
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

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    const selectedClass = classes.find((cls) => cls.ClassId === e.target.value);
    setSelectedClassName(selectedClass ? selectedClass.Class : "");
  };

  const handleSectionChange = (e) => setSelectedSection(e.target.value);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    if(name === "Exam"){
      var exam = exams.find(val => val.ExamName === value);
      setExamId(exam.ExamId)
    }
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Type) newErrors.Type = "Type is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    alert("Submitted");
  };

  // Fetch exams
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/exam/all");
        setExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };
    fetchExams();
  }, []);

  // Fetch subjects based on selected class, section, and exam
  useEffect(() => {
    const fetchSubjects = async () => {
      if (selectedClass && selectedSection && formData.Exam) {
        try {
          const response = await axios.get("https://api.edspride.in/result/all", {
            params: {
              ClassId: selectedClass,
              Section: selectedSection,
              ExamName: formData.Exam,
            },
          });

          // Assume response contains subjects and student results
          var filData = response.data.filter(val => val.ClassId === selectedClass && val.Section === selectedSection && val.ExamName === formData.Exam);
          // console.log(filData);
          const fetchedSubjects = filData.length > 0 ? filData[0].Subjects : [];
          setSubjects(fetchedSubjects);
          setResults(filData);
        } catch (error) {
          console.error("Error fetching subjects and results:", error);
        }
      }
    };

    fetchSubjects();
  }, [selectedClass, selectedSection, formData.Exam]);

  // Function to navigate to the ViewResult page
  const handleViewResult = (studentId, examId) => {
    const role = localStorage.getItem("Role")
    if (role == "Superadmin" || role == "Admin") {
      navigate(`/admin/viewresult/${studentId}`, { state: { examId } }); // Navigate to /view-result/{studentId}
    } else {
      navigate(`/employee/viewresult/${studentId}`, { state: { examId } }); // Navigate to /view-result/{studentId}
    }
  };

  return (
    <MainDashboard>
      <FormContainer>
        <Title>Consolidate Mark list</Title>
        <Form onSubmit={handleSubmit}>
          <Main>
            <InputContainer>
              <Label>Select Class</Label>
              <Select
                name="Class"
                value={selectedClass}
                onChange={handleClassChange}
              >
                <option value="">Select Class</option>
                {classes.map((classItem) => (
                  <option key={classItem._id} value={classItem.ClassId}>
                    {classItem.Class}
                  </option>
                ))}
              </Select>
            </InputContainer>

            <InputContainer>
              <Label>Select Section</Label>
              <Select value={selectedSection} onChange={handleSectionChange} disabled={!selectedClass}>
                <option value="">Select Section</option>
                {sections.map((section, index) => (
                  <option key={index} value={section}>
                    {section}
                  </option>
                ))}
              </Select>
            </InputContainer>

            <InputContainer>
              <Label>Select Exam</Label>
              <Select
                name="Exam"
                value={formData.Exam}
                onChange={handleChange}
              >
                <option value="">Select Exam</option>
                {exams.map((exam) => (
                  <option key={exam._id} value={exam.ExamName}>
                    {exam.ExamName}
                  </option>
                ))}
              </Select>
            </InputContainer>
          </Main>

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <SubmitButton type="submit">Search</SubmitButton>
          </div>
        </Form>
      </FormContainer>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Adm No.</th>
              <th>Roll No.</th>
              <th>Student Name</th>
              {subjects.map((subject) => (
                <th key={subject._id}>{subject.SubjectName}</th>
              ))}
              <th>Total Marks</th>
              <th>Result</th>
              <th>Actions</th> {/* Add Actions column */}
            </tr>
          </thead>
          <tbody>
            {results.map((student) => {
              const totalMarks = student.Subjects.reduce((acc, subject) => acc + subject.ObtainedMarks, 0);
              const totalMaxMarks = student.Subjects.reduce((acc, subject) => acc + subject.MaxMarks, 0);
              const percentage = ((totalMarks / totalMaxMarks) * 100).toFixed(2);

              return (
                <tr key={student.ResultId}>
                  <td>{student.StudentId}</td>
                  <td>{student.RollNo}</td>
                  <td>{student.StudentName}</td>
                  {subjects.map((subject) => {
                    const subjectMarks = student.Subjects.find(s => s.SubjectName === subject.SubjectName);
                    return <td key={subject._id}>{subjectMarks ? subjectMarks.ObtainedMarks : 0}</td>;
                  })}
                  <td>{totalMarks}/{totalMaxMarks}</td>
                  <td>{percentage}%</td>
                  <TdAction>
                    {/* View button for each student */}
                    <SmallButton onClick={() => handleViewResult(student.StudentId, examId)}>View</SmallButton>
                  </TdAction>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </TableContainer>
    </MainDashboard>
  );
};

export default Consolidated;

