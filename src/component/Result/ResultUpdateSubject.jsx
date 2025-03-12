import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      <h2>Save Subject Marks</h2>
      <form onSubmit={handleSubmit}>
        {/* Exam Selection */}
        <div>
          <label>Exam:</label>
          <select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)} required>
            <option value="">Select Exam</option>
            {exams.map((exam) => (
              <option key={exam.ExamId} value={exam.ExamId}>{exam.ExamName}</option>
            ))}
          </select>
        </div>

        {/* Class Selection */}
        <div>
          <label>Class:</label>
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} required>
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.ClassId} value={cls.ClassId}>{cls.Class}</option>
            ))}
          </select>
        </div>

        {/* Section Selection */}
        <div>
          <label>Section:</label>
          <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} required>
            <option value="">Select Section</option>
            {sections.map((section) => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
        </div>

        {/* Subject Selection */}
        <div>
          <label>Subject:</label>
          <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} required>
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.SubjectId} value={subject.SubjectId}>{subject.Subject}</option>
            ))}
          </select>
        </div>

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
          <label>Min Marks:</label>
          <input
            type="number"
            value={minMarks}
            onChange={(e) => handleMarksChange(e, "minMarks")}
            readOnly={!isEditable}
          />
          <br />
          <label>Max Marks:</label>
          <input
            type="number"
            value={maxMarks}
            onChange={(e) => handleMarksChange(e, "maxMarks")}
            readOnly={!isEditable}
          />
        </div>

        {/* Student Marks Entry Table */}
        <h3>Subject Marks</h3>
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Roll No</th>
              <th>Obtained Marks</th>
              <th>Practical Marks</th>
              {/* <th>Total Marks</th> */}
              <th>Grade</th>
              <th>Min Marks</th>
              <th>Max Marks</th>
            </tr>
          </thead>
          <tbody>
            {subjectMarks.map((student, index) => (
              <tr key={index}>
                <td>{student.studentName}</td>
                <td>{student.rollNo}</td>
                <td>
                  <input
                    type="number"
                    name="obtainedMarks"
                    value={student.obtainedMarks}
                    onChange={(e) => handleSubjectMarksChange(index, e)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="practicalMarks"
                    value={student.practicalMarks}
                    onChange={(e) => handleSubjectMarksChange(index, e)}
                  />
                </td>
                {/* <td>
                  <input
                    type="number"
                    name="totalMarks"
                    value={student.totalMarks}
                    onChange={(e) => handleSubjectMarksChange(index, e)}
                    required
                  />
                </td> */}
                <td>
                  <input
                    type="text"
                    name="grade"
                    value={student.grade}
                    onChange={(e) => handleSubjectMarksChange(index, e)}
                  />
                </td>
                <td>{student.minMarks}</td>
                <td>{student.maxMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="submit">Save Marks</button>
      </form>
    </div>
  );
};

export default SubjectWise;