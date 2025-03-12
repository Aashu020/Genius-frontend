import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import {
  MainDashboard,
  SubmitButton,
  Select,
  Title,
  Form,
  Heading,
  Main,
  FormContainer,
  InputContainer,
  Label,
  TableContainer,Table,TableHeader,TableCell,
  TableRow,SmallButton,AdmitCardContainer,DownloadButton,Logo,
  Title1,Header,InfoSection,
  InfoColumn,InfoRow,Value,PhotoSection,PhotoContainer,Photo,
  Footer,FooterText
} from "./StudentAdmission"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
// Styled Components (unchanged)

// const SubmitButton = styled.button`
//   width: 320px;
//   padding: 12px;
//   background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
//   border: none;
//   border-radius: 30px;
//   color: white;
//   font-size: 16px;
//   cursor: pointer;
//   font-weight: bold;
//   transition: background 0.3s;

//   &:hover {
//     background: linear-gradient(270deg, #1c2563 0%, #662acc 100%);
//   }
// `;

// Styled Components (You can use your previous styled components)

const AdmitCardFormat = ({ student, exam }) => {
  // State to store datesheet data (initialize as an empty array)
  const [datesheet, setDatesheet] = useState([]);
  const [error, setError] = useState(null);
  const [school, setSchool] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8007/schoolsetup/all")
      .then((response) => {
        // console.log(response.data);
        if (response.data.length > 0) {
          setSchool(response.data[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Fetch the datesheet data when the component is mounted
  useEffect(() => {
    const fetchDateSheet = async () => {
      console.log(exam)
      try {
        const response = await fetch(
          `http://localhost:8007/datesheet/all`
        );
        const data = await response.json();

        const filData = data.filter((item) => item.Exam === exam.ExamName);

        // Ensure the response is an array before updating the state
        if (Array.isArray(filData)) {
          // Filter the datesheet data by class (compare class name with student's class)
          const filteredDatesheet = filData.filter(
            (item) => item.Class.trim() === student.ClassName.trim()
          );
          setDatesheet(filteredDatesheet);
        } else {
          console.error("Received non-array datesheet data:", filData);
          setDatesheet([]); // Set to empty array if the data is not an array
        }
      } catch (error) {
        console.error("Error fetching datesheet:", error);
        setDatesheet([]); // Set to empty array in case of error
      }
    };

    fetchDateSheet();
  }, [exam.id, student.ClassName]);

  const generatePDF = () => {
    const doc = new jsPDF("landscape", "mm", "a4");


    doc.setFillColor(255, 255, 255); // White
    doc.rect(0, 0, 297, 210, "F"); // Full-page background

    // Add border around the document (mimicking the container's border)
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 277, 190); // Outer border

    // School Info (Left aligned, mimicking your styled divs)
    doc.setFontSize(18);
    doc.text("JBL PUBLIC SCHOOL", 20, 20); // School name, font-size 18px

    doc.setFontSize(12);
    doc.text("Dhingwas Pratapgarh, Pin Code: 230128", 20, 30); // Address, font-size 12px
    doc.text("M: +91-8922097701 | sushantshukla97@gmail.com", 20, 35); // Contact info

    // Student Info (Left side)
    doc.setFontSize(14);
    doc.text("Roll No: " + student.RollNo, 20, 50); // Roll No
    doc.text("Admission No: " + student.StudentId, 20, 60); // Admission No
    doc.text("Student Name: " + student.StudentName, 20, 70); // Student Name
    doc.text("Father's Name: " + student.FatherDetail.Name, 20, 80); // Father's Name
    doc.text("Mother's Name: " + student.MotherDetails.Name, 20, 90); // Mother's Name
    doc.text("Date of Birth: " + student.DOB, 20, 100); // Date of Birth
    doc.text(
      "Class / Sec: " + student.ClassName + " / " + student.Section,
      20,
      110
    ); // Class & Section

    // Exam Info (Right side, aligned centrally)
    doc.setFontSize(16);
    doc.text("Admit Card - " + exam.ExamName + " Exam", 160, 50);
    // Exam info

    // Placeholder for Photo (You can replace it with an actual image later)
    doc.setFontSize(12);
    doc.text("Photo Placeholder", 160, 80); // Placeholder for photo

    // Footer Section (Aligned towards bottom)
    doc.text("Principal", 160, 120); // Principal name
    doc.text("Seal", 190, 120); // Seal
    doc.text("Exam Controller", 210, 120); // Exam controller
    doc.text("Student Sign", 250, 120); // Student sign

    // Now, Render the Exam Datesheet in a Table in the PDF
    const startY = 130; // Start Y position for the table
    const lineHeight = 10; // Height of each line in the table
    let currentY = startY;

    // Column Headers for Datesheet
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Subject", 20, currentY); // Subject column header
    doc.text("Date", 90, currentY); // Date column header
    doc.text("Type of Exam", 160, currentY); // TypeOfExam column header
    doc.text("Class", 230, currentY); // Class column header
    currentY += lineHeight; // Move down for next row

    // Render each row from the fetched datesheet data
    doc.setFont("helvetica", "normal");
    console.log(datesheet)
    datesheet.forEach((item, index) => {
      if (currentY + lineHeight > 280) {
        // Create a new page if the content exceeds the page
        doc.addPage();
        currentY = 20; // Reset position for new page
      }

      doc.text("Heelo", 20, currentY); // Subject
      doc.text(item.Date, 90, currentY); // Date
      doc.text(item.TypeOfExam, 160, currentY); // Type of Exam
      doc.text(item.Class, 230, currentY); // Class
      currentY += lineHeight; // Move down for the next row
    });

    doc.save("admit_card.pdf");
  };

  return (
    <>

      <AdmitCardContainer>
        <Header>
          <Logo
            style={{ height: "80px" }}
            src={`http://localhost:8007/uploads/${school?.SchoolLogo.replace(
              /^uploads\//,
              ""
            )}`}
            alt="School Logo"
          />
          <Title1>{school?.SchoolName}</Title1>
          <p>
            {school?.EmailId} | {school?.PhoneNo}{" "}
          </p>
          <p>{school?.Website}</p>
        </Header>

        <InfoSection>
          <InfoColumn>
            <InfoRow>
              <div>Roll No.</div>
              <Value>{student.RollNo}</Value>
            </InfoRow>
            <InfoRow>
              <div>Admission No.</div>
              <Value>{student.StudentId}</Value>
            </InfoRow>
            <InfoRow>
              <div>Student Name</div>
              <Value>{student.StudentName}</Value>
            </InfoRow>
            <InfoRow>
              <div>Father's Name</div>
              <Value>{student.FatherDetail.Name}</Value>
            </InfoRow>
            <InfoRow>
              <div>Mother's Name</div>
              <Value>{student.MotherDetails.Name}</Value>
            </InfoRow>
          </InfoColumn>

          <InfoColumn>
            <InfoRow>
              <div style={{ fontWeight: "bold", textAlign: "center", flex: 1 }}>
                Admit Card - {exam.ExamName} Exam
              </div>
            </InfoRow>
            <InfoRow>
              <div>Date of Birth</div>
              <Value>{student.DOB}</Value>
            </InfoRow>
            <InfoRow>
              <div>Class / Sec</div>
              <Value>
                {student.ClassName} / {student.Section}
              </Value>
            </InfoRow>
            <PhotoSection>
              <PhotoContainer>
                <Photo
                  src={`http://localhost:8007/uploads/${student?.Document?.StudentPhoto}`}
                  alt="Student"
                />
              </PhotoContainer>
            </PhotoSection>
          </InfoColumn>
        </InfoSection>

        {/* Datesheet Table */}
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Date</th>
                <th>Type of Exam</th>
                <th>Class</th>
              </tr>
            </thead>
            <tbody>
              {datesheet.length > 0 ? (
                datesheet.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Subject}</td>
                    <td>{item.Date}</td>
                    <td>{item.TypeOfExam}</td>
                    <td>{item.Class}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No datesheet available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableContainer>

        <Footer>
          <FooterText>Principal</FooterText>
          <FooterText>Seal</FooterText>
          <FooterText>Exam Controller</FooterText>
          <FooterText>Student Sign</FooterText>
        </Footer>

        {/* Download Button */}
        <DownloadButton onClick={generatePDF}>Download pdf</DownloadButton>
      </AdmitCardContainer>
    </>
  );
};

// Main Component
const AdmitCard = () => {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [datesheet, setDatesheet] = useState([]);

  // Inside the AdmitCard component
  const [selectedStudents, setSelectedStudents] = useState([]);


  const [admitCardData, setAdmitCardData] = useState(null);

  const [selectedClassName, setSelectedClassName] = useState("");
  const [school, setSchool] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8007/schoolsetup/all")
      .then((response) => {
        // console.log(response.data);
        if (response.data.length > 0) {
          setSchool(response.data[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // Fetch classes, sections, and exams data
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
    const fetchDateSheet = async () => {
      console.log(selectedExam)
      try {
        const response = await fetch(
          `http://localhost:8007/datesheet/all`
        );
        const data = await response.json();

        const filData = data.filter((item) => item.Exam === selectedExam);

        // Ensure the response is an array before updating the state
        if (Array.isArray(filData)) {
          // Filter the datesheet data by class (compare class name with student's class)
          const filteredDatesheet = filData.filter(
            (item) => item.Class.trim() === selectedClassName.trim()
          );
          setDatesheet(filteredDatesheet);
        } else {
          console.error("Received non-array datesheet data:", filData);
          setDatesheet([]); // Set to empty array if the data is not an array
        }
      } catch (error) {
        console.error("Error fetching datesheet:", error);
        setDatesheet([]); // Set to empty array in case of error
      }
    };

    fetchDateSheet();
  }, [selectedExam, selectedClassName]);
  // ---------------------------


  useEffect(() => {
    const fetchSections = async () => {
      if (selectedClass) {
        try {
          const response = await axios.get(
            `http://localhost:8007/class/get/${selectedClass}`
          );
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
    const fetchStudents = async () => {
      if (selectedClass && selectedSection) {
        try {
          const response = await axios.get("http://localhost:8007/student/all");
          const filteredStudents = response.data.filter(
            (student) =>
              student.AdmissionInClass === selectedClass &&
              student.Section === selectedSection
          );
          setStudents(filteredStudents || []);
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      } else {
        setStudents([]);
      }
    };
    fetchStudents();
  }, [selectedClass, selectedSection]);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  const generateAdmitCard = () => {
    if (selectedStudent && selectedExam) {
      console.log(selectedExam)
      setAdmitCardData({
        student: selectedStudent,
        exam: selectedExam,
      });
    }
  };

  // Inside the AdmitCard component
  const handleCheckboxChange = (e, student) => {
    if (e.target.checked) {
      setSelectedStudents((prev) => [...prev, student]);
    } else {
      setSelectedStudents((prev) => prev.filter((s) => s._id !== student._id));
    }
  };

  // Inside the AdmitCard component
  const handleGenerateAdmitCards = () => {
    if (selectedStudents.length > 0 && selectedExam) {
      setAdmitCardData({
        students: selectedStudents,
        exam: exams.find((exam) => exam.ExamName === selectedExam),
      });
    }
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    const selectedClass = classes.find((cls) => cls.ClassId === e.target.value);
    setSelectedClassName(selectedClass ? selectedClass.Class : "");
  };

  const handleSectionChange = (e) => setSelectedSection(e.target.value);


  const handleDownloadSelectedPDF = () => {
    if (selectedStudents.length > 0 && selectedExam) {
      const doc = new jsPDF("landscape", "mm", "a4");

      selectedStudents.forEach((student, index) => {
        if (index > 0) doc.addPage(); // Add a new page for each student except the first

        doc.setFillColor(255, 255, 255); // White background
        doc.rect(0, 0, 297, 210, "F"); // Full-page background

        // Document borders and header information
        doc.setLineWidth(0.5);
        doc.rect(10, 10, 277, 190);
        doc.setFontSize(18);
        doc.text("JBL PUBLIC SCHOOL", 20, 20);
        doc.setFontSize(12);
        doc.text("Dhingwas Pratapgarh, Pin Code: 230128", 20, 30);
        doc.text("M: +91-8922097701 | sushantshukla97@gmail.com", 20, 35);

        // Student details
        doc.setFontSize(14);
        doc.text("Roll No: " + student.RollNo, 20, 50);
        doc.text("Admission No: " + student.StudentId, 20, 60);
        doc.text("Student Name: " + student.StudentName, 20, 70);
        doc.text("Father's Name: " + student.FatherDetail.Name, 20, 80);
        doc.text("Mother's Name: " + student.MotherDetails.Name, 20, 90);
        doc.text("Date of Birth: " + student.DOB, 20, 100);
        doc.text("Class / Sec: " + student.ClassName + " / " + student.Section, 20, 110);

        // Exam details
        doc.setFontSize(16);
        doc.text("Admit Card - " + selectedExam + " Exam", 160, 50);
        doc.setFontSize(12);
        doc.text("Photo Placeholder", 160, 80);

        // Footer
        doc.text("Principal", 160, 120); // Principal name
        doc.text("Seal", 190, 120); // Seal
        doc.text("Exam Controller", 210, 120); // Exam controller
        doc.text("Student Sign", 250, 120); // Student sign

        // Sample datesheet information (adjust as needed)
        const startY = 130;
        const lineHeight = 10;
        let currentY = startY;

        // Column headers for datesheet
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Subject", 20, currentY);
        doc.text("Date", 90, currentY);
        doc.text("Type of Exam", 160, currentY);
        doc.text("Class", 230, currentY);
        currentY += lineHeight;

        // Render datesheet rows for each subject
        datesheet.forEach((item) => {
          if (currentY + lineHeight > 280) {
            doc.addPage();
            currentY = 20;
          }
          doc.setFont("helvetica", "normal");
          doc.text(item.Subject, 20, currentY);
          doc.text(item.Date, 90, currentY);
          doc.text(item.TypeOfExam, 160, currentY);
          doc.text(item.Class, 230, currentY);
          currentY += lineHeight;
        });
      });

      doc.save("selected_students_admit_cards.pdf");
    }
  };


  return (
    <MainDashboard>
      <Title>Admit Card Generation</Title>
      <Form>
        <Heading>Select Exam and Class</Heading>

        <FormContainer>
          <Main>
            <InputContainer>
              <Label>Select Class</Label>
              <Select value={selectedClass} onChange={handleClassChange}>
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls.ClassId}>
                    {cls.Class}
                  </option>
                ))}
              </Select>
            </InputContainer>
            <InputContainer>
              <Label>Select Section</Label>
              <Select
                value={selectedSection}
                onChange={handleSectionChange}
                disabled={!selectedClass}
              >
                <option value="">Select Section</option>
                {sections.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </Select>
            </InputContainer>
            <InputContainer>
              <Label>Select Exam</Label>
              <Select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
              >
                <option value="">Select Exam</option>
                {exams.map((exam) => (
                  <option key={exam._id} value={exam.ExamName}>
                    {exam.ExamName}
                  </option>
                ))}
              </Select>
            </InputContainer>
            <SubmitButton type="button" onClick={generateAdmitCard}>
              Generate Admit Card
            </SubmitButton>
          </Main>
        </FormContainer>
      </Form>
      {students.length > 0 && (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>Select</TableHeader> {/* New Select Column */}
                <TableHeader>Roll No</TableHeader>
                <TableHeader>Student Name</TableHeader>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student)}
                      onChange={(e) => handleCheckboxChange(e, student)}
                    />
                  </TableCell>
                  <TableCell>{student.RollNo}</TableCell>
                  <TableCell>{student.StudentName}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
      {students.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <SmallButton
            onClick={handleGenerateAdmitCards}
            disabled={selectedStudents.length === 0 || !selectedExam}
          >
            Generate Admit Cards
          </SmallButton>
        </div>
      )}

      <DownloadButton onClick={handleDownloadSelectedPDF}>
        Download Selected Students PDF
      </DownloadButton>
      {admitCardData && (
        <div>
          {admitCardData.students.map((student) => (
            <AdmitCardFormat
              key={student._id}
              student={student}
              exam={admitCardData.exam}
            />
          ))}
        </div>
      )}

    </MainDashboard>
  );
};

export default AdmitCard;



// const Title = styled.h2`
//   color: #0d47a1;
//   text-align: center;
//   margin-bottom: 30px;
//   font-weight: bold;
// `;
