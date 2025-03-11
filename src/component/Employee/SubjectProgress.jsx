import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

Chart.register(ArcElement, Tooltip, Legend);

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 98%;
  margin: 20px auto;
  @media (max-width: 468px) {
    display: block;
  }
`;

const LeftSection = styled.div`
  width: 50%;
  @media (max-width: 468px) {
    width: 100%;
  }
`;

const RightSection = styled.div`
  width: 40%;
  @media (max-width: 468px) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const Button = styled.button`
  background-color: transparent;
  color: ${(props) => (props.color === 'red' ? '#d32f2f' : '#388e3c')};
  border: 1px solid ${(props) => (props.color === 'red' ? '#d32f2f' : '#388e3c')};
  padding: 8px 16px;
  font-size: 14px;
  margin-right: 10px;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: none;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) => (props.color === 'red' ? '#d32f2f' : '#388e3c')};
    color: white;
  }

  @media (max-width: 468px) {
    padding: 5px 10px;
    font-size: 12px;
    margin: 5px 0;
    height: 30px;
    width: 45%;
  }
`;


const ProgressContainer = styled.div`
  margin-top: 30px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  h2 {
    margin-bottom: 15px;
    font-size: 20px;
    color: #0d47a1;
  }
`;

const ProgressBar = styled.div`
  margin-bottom: 20px;
`;

const SubjectName = styled.div`
  font-size: 16px;
  color: #1a237e;
  margin-bottom: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Progress = styled.div`
  background-color: #e3f2fd;
  border-radius: 10px;
  overflow: hidden;
  height: 8px;
`;

const ProgressInner = styled.div`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: #0d47a1;
`;

const ChartContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  @media (max-width: 468px) {
    width: 87%;
    margin-top: 20px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Section = styled.div`
  @media (max-width: 468px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  width: 45%;
`;

const Option = styled.option``;

const CLASSES_API_URL = 'https://api.edspride.in/class/all';
const HOMEWORK_API_URL = 'https://api.edspride.in/homework/all';
const ATTENDANCE_API_URL = 'https://api.edspride.in/staff-attendance/all';

const App = () => {
  const [classesData, setClassesData] = useState([]);
  const [homeworkData, setHomeworkData] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [progress, setProgress] = useState({});
  const [attendanceData, setAttendanceData] = useState({
    labels: ['Present', 'Absent', 'Leave'],
    datasets: [
      {
        label: 'Attendance',
        data: [0, 0, 0], // Default data
        backgroundColor: ['#688AF6', '#FC858F', '#0D47A1'],
        hoverOffset: 4,
      },
    ],
  });
  const [employeeId, setEmployeeId] = useState(null);

  useEffect(() => {
    // Get the Employee ID from localStorage
    const storedEmployeeId = localStorage.getItem('Id');
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
    }
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch(ATTENDANCE_API_URL);
        const data = await response.json();
        const currentMonthAttendance = processAttendanceData(data);
        setAttendanceData(currentMonthAttendance);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    if (employeeId) {
      fetchAttendanceData();
    }
  }, [employeeId]);

  // Function to filter and process attendance data for the current month
  const processAttendanceData = (data) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    let presentCount = 0;
    let absentCount = 0;
    let leaveCount = 0;

    data.forEach((entry) => {
      const entryDate = new Date(entry.Date);
      if (entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear) {
        const attendance = entry.Attendance.find(
          (att) => att.EmployeeId === employeeId
        );
        if (attendance) {
          switch (attendance.Status) {
            case 'Present':
              presentCount += 1;
              break;
            case 'Absent':
              absentCount += 1;
              break;
            case 'Leave':
              leaveCount += 1;
              break;
            default:
              break;
          }
        }
      }
    });

    return {
      labels: ['Present', 'Absent', 'Leave'],
      datasets: [
        {
          label: 'Attendance',
          data: [presentCount, absentCount, leaveCount],
          backgroundColor: ['#688AF6', '#FC858F', '#0D47A1'],
          hoverOffset: 4,
        },
      ],
    };
  };

  // Fetching classes and homework data
  useEffect(() => {
    const fetchClassesData = async () => {
      try {
        const response = await fetch(CLASSES_API_URL);
        const data = await response.json();
        setClassesData(data);
      } catch (error) {
        console.error('Error fetching classes data:', error);
      }
    };

    const fetchHomeworkData = async () => {
      try {
        const response = await fetch(HOMEWORK_API_URL);
        const data = await response.json();
        setHomeworkData(data);
      } catch (error) {
        console.error('Error fetching homework data:', error);
      }
    };

    fetchClassesData();
    fetchHomeworkData();
  }, []);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedSection('');
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const calculateProgress = (classId, section) => {
    const classData = classesData.find((cls) => cls.ClassId === classId);
    if (!classData) return {};

    const assignedHomework = homeworkData.filter(
      (homework) => homework.Class === classData.Class && homework.Section === section
    );

    let progressData = {};

    classData.Subjects.forEach((subject) => {
      const subjectProgress = { total: 0, completed: 0 };

      subject.Syllabus.forEach((chapter) => {
        subjectProgress.total += 1;

        assignedHomework.forEach((homework) => {
          if (homework.Chapter === chapter.Title) {
            subjectProgress.completed += 1;
          }
        });
      });

      progressData[subject.Subject] = (subjectProgress.completed / subjectProgress.total) * 100;
    });

    setProgress(progressData);
  };

  useEffect(() => {
    if (selectedClass && selectedSection) {
      calculateProgress(selectedClass, selectedSection);
    }
  }, [selectedClass, selectedSection]);

  const downloadCSV = (data, filename) => {
    const csvData = data.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${filename}.csv`);
  };

  const downloadExcel = (data, filename) => {
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  const downloadPDF = (title, columns, rows) => {
    const doc = new jsPDF();
    doc.text(title, 20, 10);
    doc.autoTable({
      head: [columns],
      body: rows,
    });
    doc.save(`${title}.pdf`);
  };

  const classOptions = classesData.map((cls) => (
    <Option key={cls.ClassId} value={cls.ClassId}>
      {cls.Class}
    </Option>
  ));

  const sectionOptions =
    selectedClass &&
    classesData
      .find((cls) => cls.ClassId === selectedClass)
      ?.Section.map((sec) => (
        <Option key={sec} value={sec}>
          {sec}
        </Option>
      ));

  return (
    <Container>
      <LeftSection>
        <Section>
          <Select onChange={handleClassChange} value={selectedClass}>
            <Option value="">Select Class</Option>
            {classOptions}
          </Select>

          {selectedClass && (
            <Select onChange={handleSectionChange} value={selectedSection}>
              <Option value="">Select Section</Option>
              {sectionOptions}
            </Select>
          )}
        </Section>

        <ProgressContainer>
          <h2>Subject Progress</h2>
          {selectedClass &&
            selectedSection &&
            classesData
              .find((cls) => cls.ClassId === selectedClass)
              ?.Subjects.map((subject) => {
                const progressPercentage = progress[subject.Subject] || 0;
                return (
                  <ProgressBar key={subject.Subject}>
                    <SubjectName>
                      <p>{subject.Subject}</p>
                      <p>{progressPercentage.toFixed(2)}%</p>
                    </SubjectName>
                    <Progress>
                      <ProgressInner width={progressPercentage} />
                    </Progress>
                  </ProgressBar>
                );
              })}
        </ProgressContainer>
      </LeftSection>

      <RightSection>
        <ChartContainer>
          <TitleWrapper>
            <h2>Current Month Attendance</h2>
            <div>
              <Button
                onClick={() =>
                  downloadPDF(
                    'Attendance Report',
                    ['Status', 'Count'],
                    [['Present', attendanceData.datasets[0].data[0]], ['Absent', attendanceData.datasets[0].data[1]], ['Leave', attendanceData.datasets[0].data[2]]]
                  )
                }
              >
                PDF
              </Button>
              <Button
                onClick={() =>
                  downloadCSV(
                    [['Status', 'Count'], ['Present', attendanceData.datasets[0].data[0]], ['Absent', attendanceData.datasets[0].data[1]], ['Leave', attendanceData.datasets[0].data[2]]],
                    'attendance'
                  )
                }
              >
                CSV
              </Button>
              <Button
                onClick={() =>
                  downloadExcel(
                    [['Status', 'Count'], ['Present', attendanceData.datasets[0].data[0]], ['Absent', attendanceData.datasets[0].data[1]], ['Leave', attendanceData.datasets[0].data[2]]],
                    'attendance'
                  )
                }
              >
                Excel
              </Button>
            </div>
          </TitleWrapper>
          <Doughnut data={attendanceData} />
        </ChartContainer>
      </RightSection>
    </Container>
  );
};

export default App;
