import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { MainDashboard, Title, Form, Heading, Section ,Main, FormContainer, InputContainer,Label ,Input,Select,SubmitButton} from "./ConsolidateStyle";

// const MainDashboard = styled.div`
//     flex: 1;
//     padding: 20px;
//     height: calc(100vh - 100px);
//     overflow-y: auto;
//     background-color: #f9f9f9;
//   `;

// const Title = styled.h2`
//     color: #0d47a1;
//     text-align: center;
//     margin-bottom: 30px;
//     font-weight: bold;
//   `;

// const Form = styled.form`
//     width: 100%;
//     max-width: 1200px;
//     margin: 0 auto;
//   `;

// const Heading = styled.div`
//     width: 30%;
//     background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
//     color: white;
//     border-radius: 25px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 40px;
//     margin-bottom: 40px;
//     @media (max-width: 480px) {
//       font-size: 12px;
//       height: 30px;
//       width: 50%;
//       margin-bottom: 30px;
//       margin-top: 20px;
//     }
//   `;

// const Section = styled.div`
//     display: flex;
//     justify-content: space-between;
//   `;
// const Main = styled.div`
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     gap: 20px;
//   `;

// const FormContainer = styled.div`
//     background-color: white;
//     padding: 20px;
//     border-radius: 10px;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//     @media (max-width: 480px) {
//       padding: 10px;
//     }
//   `;

// const InputContainer = styled.div`
//     position: relative;
//     width: 100%;
//     margin-bottom: 20px;
//     @media (max-width: 480px) {
//       margin-bottom: 12px;
//     }
//   `;

// const Label = styled.span`
//     position: absolute;
//     top: -10px;
//     left: 20px;
//     background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
//     color: white;
//     padding: 2px 10px;
//     border-radius: 20px;
//     font-size: 12px;
//   `;

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

// const Input = styled.input`
//     width: 88%;
//     padding: 15px 20px;
//     border: 2px solid #7d3cff;
//     border-radius: 30px;
//     font-size: 16px;
//     color: #7a7a7a;
//     background-color: #f4f6fc;
//     font-weight: bold;
//     outline: none;
//     @media (max-width: 480px) {
//       height: 10px;
//       width: 80%;
//       font-size: 12px;
//       padding: 12px 18px;
//     }
//   `;
// const Select = styled.select`
//     width: 100%;
//     padding: 15px 20px;
//     border: 2px solid #7d3cff;
//     border-radius: 30px;
//     font-size: 16px;
//     color: #7a7a7a;
//     background-color: #f4f6fc;
//     font-weight: bold;
//     @media (max-width: 480px) {
//       height: 38px;
//       width: 94%;
//       font-size: 12px;
//       padding: 10px 12px;
//     }
//   `;
// const SubmitButton = styled.button`
//     width: 320px;
//     padding: 12px;
//     background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
//     border: none;
//     border-radius: 30px;
//     color: white;
//     font-size: 16px;
//     cursor: pointer;
//     font-weight: bold;
//     transition: background 0.3s;
//     margin-top: 20px;

//     &:hover {
//       background: linear-gradient(270deg, #1c2563 0%, #662acc 100%);
//     }

//     @media (max-width: 768px) {
//       width: 100%;
//       font-size: 12px;
//       padding: 5px;
//     }
//   `;

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




const StudentWise = () => {
  const [student, setStudent] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentRollNo, setStudentRollNo] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedClassName, setSelectedClassName] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedExamName, setSelectedExamName] = useState("");
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);
  const [minMarks, setMinMarks] = useState(0);
  const [maxMarks, setMaxMarks] = useState(0);
  const [isMarksEditable, setIsMarksEditable] = useState(false);
  const [formData, setFormData] = useState({
    Subjects: [],
    Result: 0,
  });

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

  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedClass && selectedSection) {
        try {
          const response = await axios.get("http://localhost:8007/student/all", {
            params: { classId: selectedClass, section: selectedSection },
          });
          const filteredData = response.data.filter(
            (data) => data.Section === selectedSection && data.AdmissionInClass === selectedClass
          );
          setStudents(filteredData);
        } catch (error) {
          console.error("Error fetching students:", error);
          setStudents([]);
        }
      } else {
        setStudents([]);
      }
    };
    fetchStudents();
  }, [selectedClass, selectedSection]);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (selectedClass) {
        try {
          const response = await axios.get(`http://localhost:8007/class/get/${selectedClass}`);
          setSubjects(response.data.Subjects || []);
          setFormData((prevData) => ({
            ...prevData,
            Subjects: response.data.Subjects.map((subject) => ({
              SubjectName: subject.Subject,
              MinMarks: minMarks,
              MaxMarks: maxMarks,
              ObtainedMarks: 0,
              Practical: 0,
              TotalMarks: 0,
              Grade: "",
            })),
          }));
        } catch (error) {
          console.error("Error fetching subjects:", error);
        }
      }
    };
    fetchSubjects();
  }, [selectedClass, minMarks, maxMarks]);

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

  useEffect(() => {
    const fetchExamDetails = async () => {
      if (selectedExam) {
        try {
          const response = await axios.get(`http://localhost:8007/exam/get/${selectedExam}`);
          const examData = response.data;
          setMinMarks(examData.TheorypassingMarks || 0);
          setMaxMarks(examData.TheoryMaxMarks || 0);
          setSelectedExamName(examData.ExamName);
        } catch (error) {
          console.error("Error fetching exam details:", error);
        }
      }
    };
    fetchExamDetails();
  }, [selectedExam]);

  useEffect(() => {
    const fetchResultData = async () => {
      if (selectedClass && selectedSection && selectedExam && student) {
        try {
          // Fetch the result data for the student and exam
          const response = await axios.get(`http://localhost:8007/result/get/one/${selectedExam}/${student}`);
          const resultData = response.data;
  
          if (resultData) {
            console.log(formData);
            console.log(resultData);
  
            // Assuming resultData.Subjects contains the marks, grade, and practical data for each subject
            setFormData((prevData) => {
              const updatedSubjects = prevData.Subjects.map((subject) => {
                // Find the corresponding subject from resultData
                const resultSubject = resultData.Subjects.find(
                  (resultSubject) => resultSubject.SubjectName.trim() === subject.SubjectName.trim()
                );
  
                // If the subject exists in resultData, update it, otherwise retain the existing subject
                if (resultSubject) {
                  return {
                    ...subject, // Keep the original data
                    ObtainedMarks: resultSubject.ObtainedMarks, // Set obtained marks from resultData
                    Practical: resultSubject.Practical, // Set practical marks from resultData
                    Grade: resultSubject.Grade, // Set grade from resultData
                    MinMarks: resultSubject.MinMarks || subject.MinMarks, // MinMarks from resultData or keep the previous one
                    MaxMarks: resultSubject.MaxMarks || subject.MaxMarks, // MaxMarks from resultData or keep the previous one
                  };
                }
  
                // If the subject doesn't exist in resultData, return the original subject without changes
                return subject;
              });
  
              return {
                ...prevData,
                Subjects: updatedSubjects, // Update the Subjects array
              };
            });
          }
        } catch (error) {
          console.error("Error fetching result data:", error);
        }
      }
    };
  
    fetchResultData();
  }, [selectedClass, selectedSection, selectedExam, student]);
    // Trigger when these values change




  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    const selectedClass = classes.find((cls) => cls.ClassId === e.target.value);
    setSelectedClassName(selectedClass ? selectedClass.Class : "");
  };

  const handleSectionChange = (e) => setSelectedSection(e.target.value);
  const handleExamChange = (e) => setSelectedExam(e.target.value);
  const handleStudentChange = (e) => {
    const selectedStudent = students.find((stu) => stu.StudentId === e.target.value);
    setStudentRollNo(selectedStudent.RollNo)
    setStudent(e.target.value);
    setStudentName(selectedStudent ? selectedStudent.StudentName : "");
  };

  const handleMarksChange = (index, field, value) => {
    if (field === "ObtainedMarks" && value > formData.Subjects[index].MaxMarks) {
      alert("Obtained Marks cannot be greater than Max Marks.");
      return;
    }

    setFormData((prevData) => {
      const updatedSubjects = [...prevData.Subjects];
      updatedSubjects[index][field] = value;
      return { ...prevData, Subjects: updatedSubjects };
    });
  };

  const handleGradeChange = (index, value) => {
    setFormData((prevData) => {
      const updatedSubjects = [...prevData.Subjects];
      updatedSubjects[index].Grade = value;
      return { ...prevData, Subjects: updatedSubjects };
    });
  };

  const handleEditMarksToggle = () => {
    setIsMarksEditable(!isMarksEditable);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClass || !selectedSection || !selectedExam || !student) {
      alert("Please select all required fields.");
      return;
    }

    const resultData = {
      ...formData,
      StudentId: student,
      StudentName: studentName,
      RollNo: studentRollNo,
      ClassId: selectedClass,
      ClassName: selectedClassName,
      Section: selectedSection,
      ExamId: selectedExam,
      ExamName: selectedExamName,
      Result: formData.Subjects.reduce((acc, subject) => acc + (subject.ObtainedMarks || 0), 0),
    };

    try {
      await axios.post("http://localhost:8007/result/add", resultData);
      alert("Result saved successfully!");
    } catch (error) {
      console.error("Error saving result", error);
      alert("Failed to save result.");
    }
  };

  return (
    <MainDashboard>
      <FormContainer>
        <Title>Result Update Student Wise</Title>
        <Form onSubmit={handleSubmit}>
          <Main>
            <InputContainer>
              <Label>Select Exam</Label>
              <Select value={selectedExam} onChange={handleExamChange}>
                <option value="">Select Exam</option>
                {exams.map((exam) => (
                  <option key={exam.ExamId} value={exam.ExamId}>
                    {exam.ExamName}
                  </option>
                ))}
              </Select>
            </InputContainer>

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
              <Label>Select Student</Label>
              <Select value={student} onChange={handleStudentChange} disabled={!selectedClass || !selectedSection}>
                <option value="">Select Student</option>
                {students.map((stu) => (
                  <option key={stu.StudentId} value={stu.StudentId}>
                    {stu.StudentName}
                  </option>
                ))}
              </Select>
            </InputContainer>
          </Main>


          <Heading>Enter Subject Marks</Heading>

          <label>
            <input
              type="checkbox"
              checked={isMarksEditable}
              onChange={handleEditMarksToggle}
            />
            Enable Max/Min Marks Editing
          </label>

          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <Th>Subject Name</Th>
                  <Th>Min Marks</Th>
                  <Th>Max Marks</Th>
                  <Th>Obtained Marks</Th>
                  <Th>Practical Marks</Th>
                  <Th>Grade</Th>
                </tr>
              </thead>
              <tbody>
                {formData.Subjects.map((subject, index) => (
                  <tr key={index}>
                    <Td>{subject.SubjectName}</Td>

                    <Td>
                      <Input2
                        type="number"
                        value={subject.MinMarks}  // Min Marks should come from initial state or result fetch
                        readOnly={!isMarksEditable}
                        onChange={(e) => handleMarksChange(index, "MinMarks", parseInt(e.target.value, 10))}
                      />
                    </Td>

                    <Td>
                      <Input2
                        type="number"
                        value={subject.MaxMarks}  // Max Marks should come from initial state or result fetch
                        readOnly={!isMarksEditable}
                        onChange={(e) => handleMarksChange(index, "MaxMarks", parseInt(e.target.value, 10))}
                      />
                    </Td>

                    <Td>
                      <Input2
                        type="number"
                        value={subject.ObtainedMarks}  // Display the fetched obtained marks
                        onChange={(e) => handleMarksChange(index, "ObtainedMarks", parseInt(e.target.value, 10))}
                      />
                    </Td>

                    <Td>
                      <Input2
                        type="number"
                        value={subject.Practical}  // Display the fetched practical marks
                        onChange={(e) => handleMarksChange(index, "Practical", parseInt(e.target.value, 10))}
                      />
                    </Td>

                    <Td>
                      <Input2
                        type="text"
                        value={subject.Grade}  // Display the fetched grade
                        onChange={(e) => handleGradeChange(index, e.target.value)}
                      />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>


          <Button type="submit">Save Result</Button></Form>

      </FormContainer>
    </MainDashboard>

  );
};




export default StudentWise;