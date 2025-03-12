import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";


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

// -----------------------------------------------------

const Container = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
    min-height: 100vh;
    margin-top: 60px;
  `;

const Title2 = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: #2c2c6c;
    margin-bottom: 20px;
  `;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    color: #333;
    margin-bottom: 20px;
  `;

const HeaderItem = styled.div`
    margin-right: 20px;
    & span {
      font-weight: bold;
    }
  `;

const TableContainer = styled.div`
    overflow-x: auto;
  `;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    text-align: center;
  `;

const Th = styled.th`
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ccc;
    background-color: #f0f0f0;
    text-align: center;
  `;

const Td = styled.td`
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #ccc;
  `;

const Input2 = styled.input`
    width: 80%;
    padding: 8px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
  `;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 10%;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const Button = styled.button`
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
  `;



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
  const [isEditable, setIsEditable] = useState(false);  // Toggle for editability

  const [subjectMarks, setSubjectMarks] = useState([]);

  // Fetch Exams
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

  // Update min and max marks when selected exam changes
  useEffect(() => {
    if (selectedExam) {
      const selectedExamData = exams.find((exam) => exam.ExamId === selectedExam);
      if (selectedExamData) {
        setMinMarks(selectedExamData.TheorypassingMarks);
        setMaxMarks(selectedExamData.TheoryMaxMarks);
      }
    }
  }, [selectedExam, exams]);

  // Fetch Classes based on Exam
  useEffect(() => {
    if (selectedExam) {
      const fetchClasses = async () => {
        try {
          const response = await axios.get("http://localhost:8007/class/all");
          setClasses(response.data || []);
        } catch (error) {
          console.error("Error fetching classes:", error);
        }
      };
      fetchClasses();
    }
  }, [selectedExam]);

  // Fetch Sections based on Class
  useEffect(() => {
    if (selectedClass) {
      const fetchSections = async () => {
        try {
          const response = await axios.get(`http://localhost:8007/class/get/${selectedClass}`);
          setSections(response.data.Section || []);
        } catch (error) {
          console.error("Error fetching sections:", error);
        }
      };
      fetchSections();
    }
  }, [selectedClass]);

  // Fetch Subjects based on Class and Section
  useEffect(() => {
    if (selectedClass && selectedSection) {
      const fetchSubjects = async () => {
        try {
          const response = await axios.get(`http://localhost:8007/class/get/${selectedClass}`);
          setSubjects(response.data.Subjects || []);
        } catch (error) {
          console.error("Error fetching subjects:", error);
        }
      };
      fetchSubjects();
    }
  }, [selectedClass, selectedSection]);

  // Fetch Students and Subject Marks
  useEffect(() => {
    if (selectedClass && selectedSection && selectedSubject) {
      const fetchStudents = async () => {
        try {
          const response = await axios.get("http://localhost:8007/student/all");
          var filData = response.data.filter(data => data.Section === selectedSection && data.AdmissionInClass === selectedClass);

          // Initialize subjectMarks for each student
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

          // Now, fetch subject-wise marks for the selected subject, class, and section
          const subjectMarksResponse = await axios.get(
            `http://localhost:8007/result/getSubjectWiseMarks?subjectName=${selectedSubject}&classId=${selectedClass}&section=${selectedSection}`
          );

          // Update subjectMarks if data exists
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
            return student; // If no data for this student, return as is
          });

          setSubjectMarks(updatedMarks);
        } catch (error) {
          console.error("Error fetching students or subject marks:", error);
        }
      };
      fetchStudents();
    }
  }, [selectedClass, selectedSection, selectedSubject, minMarks, maxMarks]);

  // Handle changes for Subject Marks
  const handleSubjectMarksChange = (index, event) => {
    const values = [...subjectMarks];
    console.log(event.target.value, values[index]["maxMarks"])
    if (event.target.value > values[index]["maxMarks"]) {
      alert("Obtained Marks cannot be greater than Max Marks.");
      return;
    }
    // if(values[in])
    values[index][event.target.name] = event.target.value;
    setSubjectMarks(values);
  };

  // Handle checkbox toggle for editability of min and max marks
  const handleCheckboxChange = () => {
    setIsEditable(!isEditable);
  };

  // Handle Min/Max Marks changes independently
  const handleMarksChange = (event, type) => {
    const value = event.target.value;
    if (type === "minMarks") {
      setMinMarks(value);
    } else if (type === "maxMarks") {
      setMaxMarks(value);
    }
  };

  // Handle Submit
  const handleSubmit = async (event) => {
    console.log(1)
    event.preventDefault();

    // Create the subjectMarks array in the format expected by the backend
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

    // Prepare the payload to send to the backend
    const data = {
      subjectName: selectedSubject,  // Assuming selectedSubject is the subject name
      examId: selectedExam,
      examName: exams.find(exam => exam.ExamId === selectedExam)?.ExamName,  // Extract examName from exams list
      classId: selectedClass,
      className: classes.find(cls => cls.ClassId === selectedClass)?.Class,  // Extract className from classes list
      subjectMarksSend
    };

    console.log("Data to be sent:", data);  // Log the data for debugging

    try {
      const response = await axios.post("http://localhost:8007/result/saveSubjectMarks", data);
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
        {/* Exam Selection */}
        <Form onSubmit={handleSubmit} >
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

        {/* Min and Max Marks Inputs and Checkbox */}
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

        {/* Student Marks Entry Table */}
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
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button onClick={handleSubmit}>Save Marks</Button>
        </div>
      </FormContainer>
    </MainDashboard>
  );
};

export default SubjectWise;