import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { FaFilePdf, FaFileExcel, FaPrint } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
`;

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

const CheckboxContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  padding: 10px;
`;

const Checkbox = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
`;

const ClearButton = styled.button`
  width: 100px;
  padding: 5px;
  background-color: red;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: darkred;
  }
`;

const TimetableWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #0073e6;
  color: white;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
  font-weight: bold;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`;

const Heading1 = styled.h2`
  text-align: center;
  margin-top: 20px;
`;

const Timetable = ({ classId, section }) => {
  const [timetableData, setTimetableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      console.log(`Fetching timetable for classId: ${classId}, section: ${section}`);
      try {
        const response = await axios.get(`https://api.edspride.in/timetable/get/${classId + section}`);
        console.log("Timetable data received:", response.data);
        setTimetableData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching timetable:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (classId && section) {
      fetchTimetable();
    }
  }, [classId, section]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const maxPeriods = timetableData.Days.reduce((max, day) => {
    return Math.max(max, day.Lectures.length);
  }, 0);

  // Function to download as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    let pdfContent = `Class Timetable for ${classId} - Section ${section}\n\n`;

    timetableData.Days.forEach((day) => {
      pdfContent += `${day.Day}\n`;
      day.Lectures.forEach((lecture) => {
        pdfContent += `Period: ${lecture.Period}, Subject: ${lecture.Subject}, Teacher: ${lecture.TeacherName}\n`;
      });
      pdfContent += '\n';
    });

    doc.text(pdfContent, 10, 10);
    doc.save("timetable.pdf");
  };

  // Function to download as Excel
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      timetableData.Days.flatMap(day =>
        day.Lectures.map(lecture => ({
          Day: day.Day,
          Period: lecture.Period,
          Subject: lecture.Subject,
          Teacher: lecture.TeacherName,
        }))
      )
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Timetable");
    XLSX.writeFile(workbook, "timetable.xlsx");
  };

  // Function to print the timetable
  const printTimetable = () => {
    window.print();
  };

  return (
    <TimetableWrapper>
      <Heading1>
        Class Timetable for {classId} - Section {section}
      </Heading1>
      <div>
        <button onClick={downloadPDF}><FaFilePdf /> Download PDF</button>
        <button onClick={downloadExcel}><FaFileExcel /> Download Excel</button>
        <button onClick={printTimetable}><FaPrint /> Print</button>
      </div>
      <Table>
        <thead>
          <tr>
            <Th>Period</Th>
            {timetableData.Days.map((day, idx) => (
              <Th key={idx}>{day.Day}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(maxPeriods).keys()].map((periodIdx) => (
            <tr key={periodIdx}>
              <Td>{`Period ${periodIdx + 1}`}</Td>
              {timetableData.Days.map((day, dayIdx) => {
                const lecture = day.Lectures[periodIdx];
                return (
                  <Td key={dayIdx}>
                    {lecture ? (
                      <>
                        <div><strong>Subject:</strong> {lecture.Subject}</div>
                        <div><strong>Teacher:</strong> {lecture.TeacherName}</div>
                      </>
                    ) : (
                      <div>No Lecture</div>
                    )}
                  </Td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </TimetableWrapper>
  );
};





const CreateTimeTable = () => {
  const [formData, setFormData] = useState({
    Class: "",
    Section: "",
    Period: "",
    Subject: "",
    Teacher: "",
  });

  const [selectedDays, setSelectedDays] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/class/all");
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    const fetchPeriods = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/period/all");
        setPeriods(response.data);
      } catch (error) {
        console.error("Error fetching periods:", error);
      }
    };

    const fetchStaff = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/staff/all");
        setStaff(response.data);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };

    fetchClasses();
    fetchPeriods();
    fetchStaff();
  }, []);

  useEffect(() => {
    const selectedClass = classes.find(c => c.ClassId === formData.Class);
    if (selectedClass) {
      setSections(selectedClass.Section || []);
      setSubjects(selectedClass.Subjects || []);
    } else {
      setSections([]);
      setSubjects([]);
    }
  }, [formData.Class, classes]);

  useEffect(() => {
    if (formData.Subject) {
      const filtered = staff.filter(s =>
        s.TeachingSubject.includes(formData.Subject) && s.Role === "Teacher"
      );
      setFilteredStaff(filtered);
    } else {
      setFilteredStaff([]);
    }
  }, [formData.Subject, staff]);

  const handleDayChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "Days") {
      if (checked) {
        setSelectedDays((prev) => [...prev, value]);
      } else {
        setSelectedDays((prev) => prev.filter((day) => day !== value));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (name === "Teacher") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        TeacherName: filteredStaff.find(data => data.EmployeeId === value)?.Name
      }));
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const clearSelections = () => {
    setSelectedDays([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://api.edspride.in/timetable/add", {
        ClassID: formData.Class,
        Class: formData.Class,
        Section: formData.Section,
        Days: selectedDays.map(day => ({
          Day: day,
          Lectures: [] // Initialize with an empty array; we'll fill this later
        })),
      });
      console.log("First form submitted:", response.data);
      alert("First form submitted successfully!");
    } catch (error) {
      console.error("Error submitting timetable:", error);
    }
  };

  const handleSecondSubmit = async (e) => {
    e.preventDefault();

    const dayToUpdate = selectedDays.map(day => ({
      Day: day,
      Lectures: [{
        Period: formData.Period,
        Subject: formData.Subject,
        TeacherId: formData.Teacher,
        TeacherName: filteredStaff.find(staff => staff.EmployeeId === formData.Teacher)?.Name,
      }]
    }));

    try {
      const response = await axios.post("https://api.edspride.in/timetable/add", {
        ClassID: formData.Class,
        Class: formData.Class,
        Section: formData.Section,
        Days: dayToUpdate,
      });
      console.log("Second form submitted:", response.data);
      alert("Second form submitted successfully!");
    } catch (error) {
      console.error("Error submitting timetable:", error);
    }
  };

  return (
    <>
      <MainDashboard>
        <FormContainer>
          <Title>Create Time Table</Title>
          <Form onSubmit={handleSubmit}>
            <div style={{ border: "0.5px solid black", padding: "30px" }}>
              <Section>
                <Heading>Details</Heading>
              </Section>
              <Main>
                <InputContainer>
                  <Label>Select Class</Label>
                  <Select
                    name="Class"
                    value={formData.Class}
                    onChange={handleDayChange}
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
                  <Select
                    name="Section"
                    value={formData.Section}
                    onChange={handleDayChange}
                  >
                    <option value="">Select Section</option>
                    {sections.map((sectionItem) => (
                      <option key={sectionItem._id} value={sectionItem}>
                        {sectionItem}
                      </option>
                    ))}
                  </Select>
                </InputContainer>

                <InputContainer>
                  <Label>Select Days</Label>
                  <div onClick={toggleDropdown}>
                    <div style={{
                      padding: "15px 20px",
                      border: "2px solid #7d3cff",
                      borderRadius: "30px",
                      backgroundColor: "#f4f6fc",
                      fontWeight: "bold",
                    }}>
                      {selectedDays.length > 0
                        ? selectedDays.join(", ")
                        : "Select Days"}
                    </div>
                  </div>
                  {isDropdownOpen && (
                    <CheckboxContainer>
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                        <Checkbox key={day}>
                          <input
                            type="checkbox"
                            value={day}
                            checked={selectedDays.includes(day)}
                            onChange={handleDayChange}
                            name="Days"
                          />
                          {day}
                        </Checkbox>
                      ))}
                      <ClearButton type="button" onClick={clearSelections}>
                        Clear
                      </ClearButton>
                    </CheckboxContainer>
                  )}
                </InputContainer>
              </Main>
              <div style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}>
                <SubmitButton type="submit">Save</SubmitButton>
              </div>
            </div>
          </Form>

          <br />
          <Form onSubmit={handleSecondSubmit}>
            <div style={{ border: "0.5px solid black", padding: "30px" }}>
              <Section>
                <Heading>Details</Heading>
                <Heading>Add Period +</Heading>
              </Section>

              <Main>
                <InputContainer>
                  <Label>Period</Label>
                  <Select
                    name="Period"
                    value={formData.Period}
                    onChange={handleDayChange}
                  >
                    <option value="">Select Period</option>
                    {periods.map((period) => (
                      <option key={period._id} value={period.Title}>
                        {period.Title}
                      </option>
                    ))}
                  </Select>
                </InputContainer>

                <InputContainer>
                  <Label>Select Subject</Label>
                  <Select
                    name="Subject"
                    value={formData.Subject}
                    onChange={handleDayChange}
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subjectItem) => (
                      <option key={subjectItem._id} value={subjectItem.Subject}>
                        {subjectItem.Subject}
                      </option>
                    ))}
                  </Select>
                </InputContainer>

                <InputContainer>
                  <Label>Select Teacher</Label>
                  <Select
                    name="Teacher"
                    value={formData.Teacher}
                    onChange={handleDayChange}
                  >
                    <option value="">Select Teacher</option>
                    {filteredStaff.map(staffMember => (
                      <option key={staffMember._id} value={staffMember.EmployeeId}>
                        {staffMember.Name}
                      </option>
                    ))}
                  </Select>
                </InputContainer>
              </Main>
              <div style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}>
                <SubmitButton type="submit">Save</SubmitButton>
              </div>
            </div>
          </Form>
        </FormContainer>
        {formData.Class && formData.Section && (
          <Timetable classId={formData.Class} section={formData.Section} />
        )}
      </MainDashboard>
    </>
  );
};

export default CreateTimeTable;
