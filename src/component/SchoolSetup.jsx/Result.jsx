import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Container,
  Title2,
  Header,
  HeaderItem,
  TableContainer,
  Table,
  Th,
  Td,
  Input2,
  DeleteButton,
  Button,
} from "./SchoolSetup2Style";

const SubjectWise = () => {
  const [exams, setExams] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [minMarks, setMinMarks] = useState(0);
  const [maxMarks, setMaxMarks] = useState(100);
  const [isEditable, setIsEditable] = useState(false);
  const [subjectMarks, setSubjectMarks] = useState([]);

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

  useEffect(() => {
    if (selectedExam) {
      const selectedExamData = exams.find((exam) => exam.ExamId === selectedExam);
      if (selectedExamData) {
        setMinMarks(selectedExamData.TheorypassingMarks);
        setMaxMarks(selectedExamData.TheoryMaxMarks);
      }
    }
  }, [selectedExam, exams]);

  useEffect(() => {
    if (selectedExam) {
      const fetchClasses = async () => {
        try {
          const response = await axios.get("https://api.edspride.in/class/all");
          setClasses(response.data || []);
        } catch (error) {
          console.error("Error fetching classes:", error);
        }
      };
      fetchClasses();
    }
  }, [selectedExam]);

  useEffect(() => {
    if (selectedClass) {
      const fetchSections = async () => {
        try {
          const response = await axios.get(`https://api.edspride.in/class/get/${selectedClass}`);
          setSections(response.data.Section || []);
        } catch (error) {
          console.error("Error fetching sections:", error);
        }
      };
      fetchSections();
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedClass && selectedSection) {
      const fetchSubjects = async () => {
        try {
          const response = await axios.get(`https://api.edspride.in/class/get/${selectedClass}`);
          setSubjects(response.data.Subjects || []);
        } catch (error) {
          console.error("Error fetching subjects:", error);
        }
      };
      fetchSubjects();
    }
  }, [selectedClass, selectedSection]);

  useEffect(() => {
    if (selectedClass && selectedSection && selectedSubject) {
      const fetchStudents = async () => {
        try {
          const response = await axios.get("https://api.edspride.in/student/all");
          var filData = response.data.filter(data => data.Section === selectedSection && data.AdmissionInClass === selectedClass);

          const initialMarks = filData.map(student => ({
            studentId: student.StudentId,
            studentName: student.StudentName,
            rollNo: student.RollNo,
            section: selectedSection,
            obtainedMarks: 0,
            practicalMarks: 0,
            totalMarks: 0,
            grade: "",
            minMarks: minMarks,
            maxMarks: maxMarks
          }));

          setStudents(filData);
          setSubjectMarks(initialMarks);

          const subjectMarksResponse = await axios.get(
            `https://api.edspride.in/result/getSubjectWiseMarks?subjectName=${selectedSubject}&classId=${selectedClass}§ion=${selectedSection}`
          );

          const updatedMarks = initialMarks.map(student => {
            const subjectData = subjectMarksResponse.data.find(
              mark => mark.StudentId === student.studentId
            );
            if (subjectData) {
              return {
                ...student,
                obtainedMarks: subjectData.ObtainedMarks || 0,
                practicalMarks: subjectData.PracticalMarks || 0,
                totalMarks: subjectData.TotalMarks || 0,
                grade: subjectData.Grade || "",
                minMarks: subjectData.MinMarks || minMarks,
                maxMarks: subjectData.MaxMarks || maxMarks
              };
            }
            return student;
          });

          setSubjectMarks(updatedMarks);
        } catch (error) {
          console.error("Error fetching students or subject marks:", error);
        }
      };
      fetchStudents();
    }
  }, [selectedClass, selectedSection, selectedSubject, minMarks, maxMarks]);

  const handleSubjectMarksChange = (index, event) => {
    const values = [...subjectMarks];
    if (event.target.value > values[index]["maxMarks"]) {
      alert("Obtained Marks cannot be greater than Max Marks.");
      return;
    }
    values[index][event.target.name] = event.target.value;
    setSubjectMarks(values);
  };

  const handleCheckboxChange = () => {
    setIsEditable(!isEditable);
  };

  const handleMarksChange = (event, type) => {
    const value = event.target.value;
    if (type === "minMarks") {
      setMinMarks(value);
    } else if (type === "maxMarks") {
      setMaxMarks(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const subjectMarksSend = subjectMarks.map(student => ({
      studentId: student.studentId,
      studentName: student.studentName,
      rollNo: student.rollNo,
      section: selectedSection,
      obtainedMarks: student.obtainedMarks,
      practicalMarks: student.practicalMarks,
      totalMarks: student.totalMarks,
      grade: student.grade,
      minMarks: student.minMarks,
      maxMarks: student.maxMarks
    }));

    const data = {
      subjectName: selectedSubject,
      examId: selectedExam,
      examName: exams.find(exam => exam.ExamId === selectedExam)?.ExamName,
      classId: selectedClass,
      className: classes.find(cls => cls.ClassId === selectedClass)?.Class,
      subjectMarksSend
    };

    console.log("Data to be sent:", data);

    try {
      const response = await axios.post("https://api.edspride.in/result/saveSubjectMarks", data);
      console.log("Success:", response.data);
      alert("Marks saved successfully!");
    } catch (error) {
      console.error("Error saving marks:", error);
      alert("Error saving marks. Please try again.");
    }
  };

  return (
    <MainDashboard>
      <Title>Save Subject Marks</Title>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Heading>Subject Wise</Heading>
          <Main>
            <InputContainer>
              <Label>Exam:</Label>
              <Select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)} required>
                <option value="">Select Exam</option>
                {exams.map((exam) => (
                  <option key={exam.ExamId} value={exam.ExamId}>{exam.ExamName}</option>
                ))}
              </Select>
            </InputContainer>
            <InputContainer>
              <Label>Class:</Label>
              <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} required>
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls.ClassId} value={cls.ClassId}>{cls.Class}</option>
                ))}
              </Select>
            </InputContainer>
            <InputContainer>
              <Label>Section:</Label>
              <Select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} required>
                <option value="">Select Section</option>
                {sections.map((section) => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </Select>
            </InputContainer>
            <InputContainer>
              <Label>Subject:</Label>
              <Select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} required>
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject.SubjectId} value={subject.SubjectId}>{subject.Subject}</option>
                ))}
              </Select>
            </InputContainer>
          </Main>
        </Form>

        <div>
          <label>
            <input
              type="checkbox"
              checked={isEditable}
              onChange={handleCheckboxChange}
            />
            Enable Editing of Min/Max Marks
          </label>
          <br />
          <br />
          <Main>
            <InputContainer>
              <Label>Min Marks:</Label>
              <Input
                type="number"
                value={minMarks}
                onChange={(e) => handleMarksChange(e, "minMarks")}
                readOnly={!isEditable}
              />
            </InputContainer>
            <InputContainer>
              <Label>Max Marks:</Label>
              <Input
                type="number"
                value={maxMarks}
                onChange={(e) => handleMarksChange(e, "maxMarks")}
                readOnly={!isEditable}
              />
            </InputContainer>
          </Main>
        </div>

        <Title2>Subject Marks</Title2>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>Student Name</Th>
                <Th>Roll No</Th>
                <Th>Obtained Marks</Th>
                <Th>Practical Marks</Th>
                <Th>Grade</Th>
                <Th>Min Marks</Th>
                <Th>Max Marks</Th>
              </tr>
            </thead>
            <tbody>
              {subjectMarks.map((student, index) => (
                <tr key={index}>
                  <Td>{student.studentName}</Td>
                  <Td>{student.rollNo}</Td>
                  <Td>
                    <Input2
                      type="number"
                      name="obtainedMarks"
                      value={student.obtainedMarks}
                      onChange={(e) => handleSubjectMarksChange(index, e)}
                      required
                    />
                  </Td>
                  <Td>
                    <Input2
                      type="number"
                      name="practicalMarks"
                      value={student.practicalMarks}
                      onChange={(e) => handleSubjectMarksChange(index, e)}
                    />
                  </Td>
                  <Td>
                    <Input2
                      type="text"
                      name="grade"
                      value={student.grade}
                      onChange={(e) => handleSubjectMarksChange(index, e)}
                    />
                  </Td>
                  <Td>{student.minMarks}</Td>
                  <Td>{student.maxMarks}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Button onClick={handleSubmit}>Save Marks</Button>
        </div>
      </FormContainer>
    </MainDashboard>
  );
};

export default SubjectWise;