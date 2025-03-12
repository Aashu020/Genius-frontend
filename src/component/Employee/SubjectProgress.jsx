import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import styled from "styled-components";
import {
  Container, LeftSection, RightSection, Button, ProgressContainer,
  ProgressBar, SubjectName, Progress, ProgressInner, ChartContainer,
  TitleWrapper, Section, Select, Option
} from "../Employee/SubjectStyle";

Chart.register(ArcElement, Tooltip, Legend);

const CLASSES_API_URL = "https://api.edspride.in/class/all";
const HOMEWORK_API_URL = "https://api.edspride.in/homework/all";
const ATTENDANCE_API_URL = "https://api.edspride.in/staff-attendance/all";

const SubjectProgress = () => {
  const [classesData, setClassesData] = useState([]);
  const [homeworkData, setHomeworkData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [progress, setProgress] = useState({});
  const [attendanceData, setAttendanceData] = useState({
    labels: ["Present", "Absent", "Leave"],
    datasets: [
      {
        label: "Attendance",
        data: [0, 0, 0], // Default data
        backgroundColor: ["#688AF6", "#FC858F", "#0D47A1"],
        hoverOffset: 4,
      },
    ],
  });
  const [employeeId, setEmployeeId] = useState(null);

  useEffect(() => {
    // Get the Employee ID from localStorage
    const storedEmployeeId = localStorage.getItem("Id");
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
        console.error("Error fetching attendance data:", error);
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
            case "Present":
              presentCount += 1;
              break;
            case "Absent":
              absentCount += 1;
              break;
            case "Leave":
              leaveCount += 1;
              break;
            default:
              break;
          }
        }
      }
    });

    return {
      labels: ["Present", "Absent", "Leave"],
      datasets: [
        {
          label: "Attendance",
          data: [presentCount, absentCount, leaveCount],
          backgroundColor: ["#688AF6", "#FC858F", "#0D47A1"],
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
        console.error("Error fetching classes data:", error);
      }
    };

    const fetchHomeworkData = async () => {
      try {
        const response = await fetch(HOMEWORK_API_URL);
        const data = await response.json();
        setHomeworkData(data);
      } catch (error) {
        console.error("Error fetching homework data:", error);
      }
    };

    fetchClassesData();
    fetchHomeworkData();
  }, []);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedSection("");
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
    const csvData = data.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${filename}.csv`);
  };

  const downloadExcel = (data, filename) => {
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
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
                    "Attendance Report",
                    ["Status", "Count"],
                    [
                      ["Present", attendanceData.datasets[0].data[0]],
                      ["Absent", attendanceData.datasets[0].data[1]],
                      ["Leave", attendanceData.datasets[0].data[2]],
                    ]
                  )
                }
              >
                PDF
              </Button>
              <Button
                onClick={() =>
                  downloadCSV(
                    [
                      ["Status", "Count"],
                      ["Present", attendanceData.datasets[0].data[0]],
                      ["Absent", attendanceData.datasets[0].data[1]],
                      ["Leave", attendanceData.datasets[0].data[2]],
                    ],
                    "attendance"
                  )
                }
              >
                CSV
              </Button>
              <Button
                onClick={() =>
                  downloadExcel(
                    [
                      ["Status", "Count"],
                      ["Present", attendanceData.datasets[0].data[0]],
                      ["Absent", attendanceData.datasets[0].data[1]],
                      ["Leave", attendanceData.datasets[0].data[2]],
                    ],
                    "attendance"
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

export default SubjectProgress;