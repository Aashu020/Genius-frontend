import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

Chart.register(ArcElement, Tooltip, Legend);

// Styled Components (same as before)
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 98%;
  margin: 20px auto;
  @media (max-width: 468px) {
    display: block;
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

// const Button = styled.button`
//   background-color: ${(props) => (props.color === 'red' ? '#d32f2f' : '#388e3c')};
//   color: white;
//   border: none;
//   padding: 15px 30px;
//   font-size: 18px;
//   margin-right: 20px;
//   border-radius: 8px;
//   cursor: pointer;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   @media (max-width: 468px) {
//     padding: 5px 5px;
//     font-size: 12px;
//     margin: 0;
//     height: 30px;
//     width: 45%;
//   }
// `;

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

const AttendanceTitle = styled.h2`
  font-size: 20px;
  color: #1a237e;
  margin-bottom: 10px;
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

const SubjectProgress = () => {
  const [attendanceData, setAttendanceData] = useState({
    labels: ['Present', 'Absent', 'Leave'],
    datasets: [
      {
        label: 'Attendance',
        data: [0, 0, 0], // Default data values
        backgroundColor: ['#688AF6', '#FC858F', '#0D47A1'],
        hoverOffset: 4,
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const studentId = localStorage.getItem("Id"); // Retrieve studentId from localStorage

    if (studentId) {
      axios
        .get(`https://api.edspride.in/student-attendance/all`)
        .then((response) => {
          // Initialize counters for Present, Absent, Leave
          let presentCount = 0;
          let absentCount = 0;
          let leaveCount = 0;

          // Iterate through the API response and aggregate attendance
          response.data.forEach((attendanceRecord) => {
            // Filter attendance records for the specific student (using RollNo or StudentName)
            const studentAttendance = attendanceRecord.Attendance.filter(
              (entry) => entry?.StudentId === studentId // Replace with dynamic student name if needed
            );

            studentAttendance.forEach((entry) => {
              switch (entry.Status) {
                case 'Present':
                  presentCount++;
                  break;
                case 'Absent':
                  absentCount++;
                  break;
                case 'Leave':
                  leaveCount++;
                  break;
                default:
                  break;
              }
            });
          });

          // Update the chart data with the aggregated attendance count
          setAttendanceData({
            labels: ['Present', 'Absent', 'Leave'],
            datasets: [
              {
                label: 'Attendance',
                data: [presentCount, absentCount, leaveCount],
                backgroundColor: ['#688AF6', '#FC858F', '#0D47A1'],
                hoverOffset: 4,
              },
            ],
          });
        })
        .catch((err) => {
          setError("Error fetching attendance data");
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("Student ID not found in localStorage");
      setLoading(false);
    }
  }, []);

  // If loading, show loading message
  if (loading) {
    return <div>Loading attendance data...</div>;
  }

  // If there's an error, display the error message
  if (error) {
    return <div>{error}</div>;
  }

  // Mock data for PDF/CSV/Excel download
  const doughnutColumns = ['Status', 'Count'];
  const doughnutRows = [
    ['Present', attendanceData.datasets[0].data[0]],
    ['Absent', attendanceData.datasets[0].data[1]],
    ['Leave', attendanceData.datasets[0].data[2]],
  ];

  // Function to download CSV
  const downloadCSV = (data, filename) => {
    const csvData = data.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${filename}.csv`);
  };

  // Function to download Excel
  const downloadExcel = (data, filename) => {
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  // Function to download PDF
  const downloadPDF = (title, columns, rows) => {
    const doc = new jsPDF();
    doc.text(title, 20, 10);
    doc.autoTable({
      head: [columns],
      body: rows,
    });
    doc.save(`${title}.pdf`);
  };

  return (
    <Container>
      <RightSection>
        <ChartContainer>
          <TitleWrapper>
            <AttendanceTitle>Monthly Attendance</AttendanceTitle>
            <div>
              <Button onClick={() => downloadPDF('Attendance Data', doughnutColumns, doughnutRows)}>PDF</Button>
              <Button onClick={() => downloadCSV([doughnutColumns, ...doughnutRows], 'Attendance_Data')}>CSV</Button>
              <Button onClick={() => downloadExcel([doughnutColumns, ...doughnutRows], 'Attendance_Data')}>Excel</Button>
            </div>
          </TitleWrapper>
          <Doughnut data={attendanceData} />
        </ChartContainer>
      </RightSection>
    </Container>
  );
};

export default SubjectProgress;
