import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Edit, Trash2, Eye } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// Your existing styled components (no changes needed)

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

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Table = styled.table`
  width: 70%;
  border-collapse: collapse;
  margin-top: 30px;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Td1 = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 1rem;
`;

const EditButton = styled.div`
  background-color: #209a16bf;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ViewButton = styled.div`
  background-color: #2c3e50;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const YesButton = styled.button`
  margin: 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: green;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const NoButton = styled.button`
  margin: 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: red;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const TableItem = styled.div`
  background-color: #e0e0e0;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  @media (max-width: 480px) {
    font-size: 8px;
    padding: 5px;
  }
`;

const TableItem1 = styled.div`
  background-color: #64b5f6;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  font-size: 10px;
  font-weight: bold;
  color: white;
  @media (max-width: 480px) {
    font-size: 8px;
    padding: 5px;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  margin: auto;
  margin-top: 20px;
  @media (max-width: 480px) {
    width: 100%;
    margin: 0;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 20px;
    margin-right: 20px;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const DropdownWrapper = styled.div`
  display: flex;
  gap: 10px;

  select {
    padding: 4px;
    font-size: 16px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
    select {
      font-size: 10px;
    }
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

const Table1 = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #fff;
  grid-gap: 2px;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (max-width: 480px) {
    grid-template-columns: repeat(7, 1fr);
    font-size: 6px;
  }
`;

const TableHeader = styled.div`
  background-color: #64b5f6;
  text-align: center;
  padding: 10px;
  font-weight: bold;
  border-radius: 5px;
  color: white;
font-size: 12px;
  @media (max-width: 480px) {
    padding: 5px;
  }
`;

// Styled components
const TimetableContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.numColumns}, 1fr);
  gap: 1px;
  border: 1px solid #ccc;
  background-color: #e0e0e0;
  width: 80%;
  margin: 2rem 0;
`;

const Header = styled.div`
  grid-column: span ${props => props.numColumns};
  background-color: #6da8e5;
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  font-size: 1.2em;
`;

const RowHeader = styled.div`
  background-color: #d1d1d1;
  color: black;
  font-weight: bold;
  text-align: center;
  padding: 8px;
`;

const SubjectCell = styled.div`
  text-align: center;
  padding: 8px;
  color: black;
  font-weight: bold;
`;

const PeriodCell = styled.div`
  text-align: center;
  padding: 8px;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
`;


// Main Component

const AllTimetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [timetableDetails, setTimetableDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [periods, setPeriods] = useState([]);
  const [totalPeriod, setTotalPeriod] = useState(0);
  const [subjectLectureCount, setSubjectLectureCount] = useState({});
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await fetch('https://api.edspride.in/timetable/all');
        const data = await response.json();
        setTimetable(data);
      } catch (error) {
        console.error('Error fetching timetable data:', error);
      }
    };
    fetchTimetable();
  }, []);

  useEffect(() => {
    const fetchPeriods = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/period/all");
        setPeriods(response.data);
      } catch (err) {
        console.error("Error fetching periods:", err);
      }
    };
    fetchPeriods();
  }, []);

  const handleView = async (id) => {
    try {
      const response = await fetch(`https://api.edspride.in/timetable/get/${id}`);
      const data = await response.json();
      if (response.ok) {
        setTimetableDetails(data);
        setCurrentId(id);

        // Extract subjects and calculate lecture counts
        const subjectList = [...new Set(data.Days.flatMap(day => day.Lectures.map(lecture => lecture.Subject)))];
        console.log(subjectList)
        setSubjects(subjectList);

        const lectureCount = calculateLectureCounts(data.Days);
        setSubjectLectureCount(lectureCount);

        // Calculate total periods
        const total = Object.values(lectureCount).reduce((acc, count) => acc + count, 0);
        setTotalPeriod(total);
      } else {
        console.error('Error fetching timetable details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching timetable details:', error);
    }
  };

  useEffect(() => {
    if (timetableDetails && timetableDetails.Days) {
      const subjectList = [];
      const subjectPeriodCount = {};

      // Loop through all days and their lectures to extract subjects and count periods
      timetableDetails.Days.forEach(day => {
        day.Lectures.forEach(lecture => {
          const subject = lecture.Subject;
          if (subject) {
            if (!subjectList.includes(subject)) {
              subjectList.push(subject);
            }
            // Count the periods for each subject
            subjectPeriodCount[subject] = (subjectPeriodCount[subject] || 0) + 1;
          }
        });
      });

      setSubjects(subjectList); // Save the subjects to state
      setSubjectLectureCount(subjectPeriodCount); // Save the period counts to state

      // Calculate the total periods for the timetable
      const total = Object.values(subjectPeriodCount).reduce((acc, count) => acc + count, 0);
      setTotalPeriod(total); // Set the total period count
    }
  }, [timetableDetails]); // Only re-run when timetableDetails changes


  const calculateLectureCounts = (days) => {
    const lectureCount = {};

    days.forEach(day => {
      day.Lectures.forEach(lecture => {
        if (lecture.Subject) {
          lectureCount[lecture.Subject] = (lectureCount[lecture.Subject] || 0) + 1;
        }
      });
    });

    return lectureCount;
  };

  const confirmDelete = () => {
    setShowModal(false);
    console.log('Timetable deleted:', currentId);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const downloadPDF = () => {
    const input = document.getElementById("timetable-details-container");
  
    // Assuming the selected timetable details are stored in `timetableDetails`
    const className = timetableDetails ? timetableDetails.Class : "Class not available"; // Fetch class from timetableDetails
    const section = timetableDetails ? timetableDetails.Section : "Section not available"; // Fetch section from timetableDetails
  
    // Use html2canvas to capture the HTML content as a canvas
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
  
      // Create a new jsPDF instance with landscape orientation
      const doc = new jsPDF("landscape", "mm", "a4");
  
      // Set the font size for the header text
      doc.setFontSize(14);  // Font size for class and section info
  
      // Add class and section text at the top of the PDF
      doc.text(`Class: ${className}`, 15, 10);  // Position at (15, 10)
      doc.text(`${section}`, 50, 10);  // Position at (15, 20)
  
      // Set the font size for the timetable (this can be adjusted separately)
      doc.setFontSize(12);  // Smaller font size for the timetable content
  
      // Add the image captured from the canvas to the PDF
      // A4 size in landscape: 297mm x 210mm
      // Set the position and size for the image (adjust if needed)
      doc.addImage(imgData, "PNG", 15, 30, 270, 170);
  
      // Dynamically generate the file name based on class and section
      const filename = `Timetable_${className}_${section}.pdf`.replace(/\s+/g, '_');  // Replaces spaces with underscores
  
      // Save the PDF with the dynamic filename
      doc.save(filename);
    });
  };
  
  
  


  const totalPeriods = Object.values(subjectLectureCount).reduce((a, b) => a + b, 0);

  return (
    <MainDashboard>
      <Title>All Timetable</Title>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Sr. No.</Th>
              <Th>Class</Th>
              <Th>Section</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {timetable.map((item, index) => (
              <tr key={item._id}>
                <Td>{index + 1}</Td>
                <Td>{item.Class}</Td>
                <Td>{item.Section}</Td>
                <Td1>
                  <ViewButton onClick={() => handleView(item._id)}>
                    <Eye size={18} />
                  </ViewButton>
                </Td1>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      {timetableDetails && currentId && (
        <TableContainer id="timetable-details-container">
          <Title>Timetable Details</Title>
          <Table1>
            <div style={{ gridColumn: 'span 7', textAlign: 'center', fontWeight: 'bold', padding: '10px', backgroundColor: '#e0e0e0' }}>
              Periods
            </div>
            {timetableDetails.Days?.[0]?.Lectures?.map((lecture, periodIndex) => (
              <div key={periodIndex} style={{ display: 'contents' }}>
                {!lecture.Period.includes('Period') && lecture.Period.trim() !== "" ? (
                  <TableItem1 style={{ gridColumn: 'span 7' }}>
                    {lecture.Period.trim()}<p>{(periods.find(val => val.Title.trim() === lecture.Period.trim())).StartTime} - {(periods.find(val => val.Title.trim() === lecture.Period.trim())).EndTime}</p>
                  </TableItem1>
                ) : (
                  <>
                    <TableHeader>{lecture.Period}<p>{(periods.find(val => val.Title.trim() === lecture.Period.trim())).StartTime} - {(periods.find(val => val.Title.trim() === lecture.Period.trim())).EndTime}</p></TableHeader>
                    {timetableDetails.Days.map((dayData, dayIndex) => {
                      const currentLecture = dayData.Lectures[periodIndex] || {};
                      return (
                        <TableItem key={dayIndex}>
                          <div>{currentLecture.Subject || 'N/A'}</div>
                          <div>{currentLecture.TeacherName || 'N/A'}</div>
                        </TableItem>
                      );
                    })}
                  </>
                )}
              </div>
            ))}
          </Table1>

          <TimetableContainer numColumns={subjects.length + 2}>
            {/* Header Row */}
            <Header numColumns={subjects.length + 2}>Class Timetable - Subject-wise Summary</Header>

            {/* Subjects Header Row */}
            <RowHeader>SUBJECTS</RowHeader>
            {subjects.map((subject, index) => (
              <SubjectCell key={index}>{subject}</SubjectCell>
            ))}
            <RowHeader>TOTAL</RowHeader>

            {/* Periods Row */}
            <RowHeader>NO OF PERIODS</RowHeader>
            {subjects.map((subject, index) => (
              <PeriodCell key={index}>{subjectLectureCount[subject] || 0}</PeriodCell>
            ))}
            <PeriodCell bold>{totalPeriods}</PeriodCell>
          </TimetableContainer>



        </TableContainer>
      )}
      <button onClick={downloadPDF} style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px' }}>
        Download PDF
      </button>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>Are you sure you want to delete this timetable entry?</h3>
            <div>
              <YesButton onClick={confirmDelete}>Yes</YesButton>
              <NoButton onClick={cancelDelete}>No</NoButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </MainDashboard>
  );
};

export default AllTimetable;
