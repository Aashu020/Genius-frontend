import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {   MainDashboard,
  Title,
  Form,
  Heading,
  Section,
  Main,
  FormContainer,
  InputContainer,
  Label,
  Select,
  Input,
  SubmitButton,
  TableContainer,
  Table,
  TdAction,
  SmallButton,} from './ConsolidateStyle';

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
          const response = await axios.get(`http://localhost:8007/class/get/${selectedClass}`);
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
        const response = await axios.get("http://localhost:8007/exam/all");
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
          const response = await axios.get("http://localhost:8007/result/all", {
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

