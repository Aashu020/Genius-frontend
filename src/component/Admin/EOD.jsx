import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page, Text, Image, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import styled from 'styled-components';

// Styled component for the container
const ReportContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;

  h1 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
  }

  @media (max-width: 468px) {
    padding: 10px;
    h1 {
      font-size: 18px;
      margin-bottom: 10px;
    }
  }

  @media (min-width: 469px) and (max-width: 768px) {
    padding: 15px;
    h1 {
      font-size: 20px;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 18px;
    h1 {
      font-size: 22px;
    }
  }
`;

const ResponsivePDFViewer = styled(PDFViewer)`
  width: 80vw;
  height: 80vh;

  @media (max-width: 468px) {
    width: 100vw;
    height: 70vh;
  }

  @media (min-width: 469px) and (max-width: 768px) {
    width: 90vw;
    height: 75vh;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 85vw;
    height: 80vh;
  }

  @media (min-width: 1200px) {
    width: 75vw;
    height: 85vh;
  }
`;

const SchoolReport = () => {
  const [school, setSchool] = useState(null);
  const [totalFee, setTotalFee] = useState(0);
  const [remainingFee, setRemainingFee] = useState(0);
  const [paidFee, setPaidFee] = useState(0);
  const [classWiseFees, setClassWiseFees] = useState({});
  const [studentCount, setStudentCount] = useState(0);
  const [todayStudentAttendance, setTodayStudentAttendance] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [todayStaffAttendance, setTodayStaffAttendance] = useState(0);
  const [staffTable, setStaffTable] = useState([]);
  const [receipt, setReceipt] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [homeworkData, setHomeworkData] = useState([]);
  const [classAttendance, setClassAttendance] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8007/schoolsetup/all')
      .then((response) => {
        if (response.data.length > 0) {
          setSchool(response.data[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const getClassWiseAttendance = async () => {
      try {
        const response = await fetch('http://localhost:8007/student-attendance/all');
        const data = await response.json();
        const todayDate = new Date().toISOString().split('T')[0];

        const todayData = data.filter((item) => item.Date === todayDate);

        const classWiseCounts = todayData.reduce((acc, curr) => {
          const classKey = `${curr.Class}-${curr.Section}`;
          if (!acc[classKey]) {
            acc[classKey] = { present: 0, absent: 0, leave: 0 };
          }

          curr.Attendance.forEach((attendance) => {
            if (attendance.Status === 'Present') acc[classKey].present += 1;
            else if (attendance.Status === 'Absent') acc[classKey].absent += 1;
            else if (attendance.Status === 'Leave') acc[classKey].leave += 1;
          });

          return acc;
        }, {});

        setClassAttendance(classWiseCounts);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    getClassWiseAttendance();
  }, []);

  function calculateAttendanceForToday(attendanceData) {
    const today = new Date().toISOString().split('T')[0];
    let presentCount = 0;
    let absentCount = 0;
    let leaveCount = 0;

    attendanceData.forEach((record) => {
      if (record.Date === today) {
        record.Attendance.forEach((student) => {
          switch (student.Status) {
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
      }
    });

    return {
      present: presentCount,
      absent: absentCount,
      leave: leaveCount,
      totalCount: presentCount + absentCount + leaveCount,
    };
  }

  useEffect(() => {
    const fetchCombinedData = async () => {
      try {
        const [
          studentResponse,
          staffResponse,
          feeResponse,
          studentAttendanceResponse,
          staffAttendanceResponse,
          feeReceiptResponse,
          revenueResponse,
          homeworkResponse,
        ] = await Promise.all([
          axios.get('http://localhost:8007/student/all'),
          axios.get('http://localhost:8007/staff/all'),
          axios.get('http://localhost:8007/fee-data/all'),
          axios.get('http://localhost:8007/student-attendance/all'),
          axios.get('http://localhost:8007/staff-attendance/all'),
          axios.get('http://localhost:8007/fee-receipt/all'),
          axios.get('http://localhost:8007/revenue/all'),
          axios.get('http://localhost:8007/homework/all'),
        ]);

        const studentData = studentResponse.data;
        setStudentCount(studentData.length);
        const staffData = staffResponse.data;
        setStaffCount(staffData.length);
        const feeData = feeResponse.data;
        const attendanceForToday = calculateAttendanceForToday(studentAttendanceResponse.data);
        setTodayStudentAttendance(attendanceForToday);
        const attendanceForTodayStaff = calculateAttendanceForToday(staffAttendanceResponse.data);
        const filteredData = staffAttendanceResponse.data
          .filter((item) => item.Date === new Date().toISOString().split('T')[0])
          .flatMap((item) =>
            item.Attendance.map((att) => ({
              date: item.Date,
              day: new Date(item.Date).toLocaleDateString('en-US', { weekday: 'long' }),
              employeeId: att.EmployeeId,
              status: att.Status,
              role: att.Role,
              name: att.EmployeeName,
            }))
          );
        setStaffTable(filteredData);
        setTodayStaffAttendance(attendanceForTodayStaff);
        const feeReceiptData = feeReceiptResponse.data.filter(
          (val) => val.Date === new Date().toISOString().split('T')[0].split('-').reverse().join('-')
        );
        setReceipt(feeReceiptData);
        const rev = revenueResponse.data.filter(
          (val) => val.Date === new Date().toISOString().split('T')[0] && val.Type === 'Expense'
        );
        setRevenueData(rev);
        const home = homeworkResponse.data.filter(
          (val) => val.Date === new Date().toISOString().split('T')[0]
        );
        setHomeworkData(home);

        const combinedData = studentData.map((student) => {
          const fee = feeData.find((f) => f.StudentId === student.StudentId) || {};
          return { ...student, ...fee };
        });

        const total = combinedData.reduce((sum, student) => sum + (student.TotalFee || 0), 0);
        const remaining = combinedData.reduce((sum, student) => sum + (student.RemainingFee || 0), 0);
        const paid = total - remaining;

        setTotalFee(total);
        setRemainingFee(remaining);
        setPaidFee(paid);

        const feesByClass = combinedData.reduce((acc, student) => {
          const className = student.ClassName || 'Unknown Class';
          if (!acc[className]) {
            acc[className] = { total: 0, remaining: 0, paid: 0 };
          }
          acc[className].total += student.TotalFee || 0;
          acc[className].remaining += student.RemainingFee || 0;
          acc[className].paid += (student.TotalFee || 0) - (student.RemainingFee || 0);
          return acc;
        }, {});

        setClassWiseFees(feesByClass);
      } catch (error) {
        console.error('Error fetching combined data:', error);
      }
    };

    fetchCombinedData();
  }, []);

  const MyDocument = ({
    school,
    totalFee,
    remainingFee,
    paidFee,
    classWiseFees,
    staffTable,
    receipt,
    revenueData,
    homeworkData,
    classAttendance,
  }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {school?.SchoolLogo && (
            <Image
              src={`http://localhost:8007/uploads/${school?.SchoolLogo.replace(/^uploads\//, '')}`}
              style={styles.logo}
            />
          )}
          <View style={styles.schoolInfo}>
            <Text style={styles.schoolName}>{school?.SchoolName}</Text>
            <Text style={styles.detailText}>Address: {school?.Address}</Text>
            <Text style={styles.detailText}>Phone: {school?.PhoneNo} | Email: {school?.EmailId}</Text>
            <Text style={styles.detailText}>Website: {school?.Website}</Text>
          </View>
        </View>
        <View style={styles.today}>
          <Text style={styles.todayTitle}>
            DAILY REPORT DATE: {new Date().toISOString().split('T')[0].split('-').reverse().join('-')}
          </Text>
        </View>

        <View style={styles.feeRow}>
          <View style={styles.feeBoxTotal}>
            <Text style={styles.feeText}>Total Fee: {totalFee}</Text>
          </View>
          <View style={styles.feeBoxRemaining}>
            <Text style={styles.feeText}>Remaining Fee: {remainingFee}</Text>
          </View>
          <View style={styles.feeBoxPaid}>
            <Text style={styles.feeText}>Paid Fee: {paidFee}</Text>
          </View>
        </View>

        <View style={styles.classWiseContainer}>
          <Text style={styles.sectionHeader}>Class-Wise Fee Details</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Class</Text>
              <Text style={styles.tableHeaderText}>Total Fee</Text>
              <Text style={styles.tableHeaderText}>Remaining Fee</Text>
              <Text style={styles.tableHeaderText}>Paid Fee</Text>
            </View>
            {Object.entries(classWiseFees).map(([className, fees]) => (
              <View key={className} style={styles.tableRow}>
                <Text style={styles.tableCell}>{className}</Text>
                <Text style={styles.tableCell}>{fees.total}</Text>
                <Text style={styles.tableCell}>{fees.remaining}</Text>
                <Text style={styles.tableCell}>{fees.paid}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.classWiseContainer}>
          <Text style={styles.sectionHeader}>Today Attendance</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Attendance</Text>
              <Text style={styles.tableHeaderText}>Present</Text>
              <Text style={styles.tableHeaderText}>Absent</Text>
              <Text style={styles.tableHeaderText}>Leave</Text>
              <Text style={styles.tableHeaderText}>N/A</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Student</Text>
              <Text style={styles.tableCell}>{todayStudentAttendance.present}</Text>
              <Text style={styles.tableCell}>{todayStudentAttendance.absent}</Text>
              <Text style={styles.tableCell}>{todayStudentAttendance.leave}</Text>
              <Text style={styles.tableCell}>{studentCount - todayStudentAttendance.totalCount}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Staff</Text>
              <Text style={styles.tableCell}>{todayStaffAttendance.present}</Text>
              <Text style={styles.tableCell}>{todayStaffAttendance.absent}</Text>
              <Text style={styles.tableCell}>{todayStaffAttendance.leave}</Text>
              <Text style={styles.tableCell}>{staffCount - todayStaffAttendance.totalCount}</Text>
            </View>
          </View>
        </View>

        <View style={styles.classWiseContainer}>
          <Text style={styles.sectionHeader}>Today's Attendance Class Wise</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Class-Section</Text>
              <Text style={styles.tableHeaderText}>Present</Text>
              <Text style={styles.tableHeaderText}>Absent</Text>
              <Text style={styles.tableHeaderText}>Leave</Text>
            </View>
            {classAttendance &&
              Object.keys(classAttendance).map((classKey) => (
                <View key={classKey} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{classKey}</Text>
                  <Text style={styles.tableCell}>{classAttendance[classKey].present}</Text>
                  <Text style={styles.tableCell}>{classAttendance[classKey].absent}</Text>
                  <Text style={styles.tableCell}>{classAttendance[classKey].leave}</Text>
                </View>
              ))}
          </View>
        </View>

        <View style={styles.classWiseContainer}>
          <Text style={styles.sectionHeader}>Staff Attendance for Today</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Employee ID</Text>
              <Text style={styles.tableHeaderText}>Name</Text>
              <Text style={styles.tableHeaderText}>Role</Text>
              <Text style={styles.tableHeaderText}>Status</Text>
            </View>
            {staffTable?.map((attendance) => (
              <View key={attendance.employeeId} style={styles.tableRow}>
                <Text style={styles.tableCell}>{attendance.employeeId}</Text>
                <Text style={styles.tableCell}>{attendance.name}</Text>
                <Text style={styles.tableCell}>{attendance.role}</Text>
                <Text style={styles.tableCell}>{attendance.status}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.classWiseContainer}>
          <Text style={styles.sectionHeader}>Today's Fee Payment</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Student Id</Text>
              <Text style={styles.tableHeaderText}>Student Name</Text>
              <Text style={styles.tableHeaderText}>Class</Text>
              <Text style={styles.tableHeaderText}>Paid Amount</Text>
              <Text style={styles.tableHeaderText}>Receipt Id</Text>
            </View>
            {receipt?.map((data) => (
              <View key={data.ReceiptId} style={styles.tableRow}>
                <Text style={styles.tableCell}>{data.StudentId}</Text>
                <Text style={styles.tableCell}>{data.StudentName}</Text>
                <Text style={styles.tableCell}>{data.Class}</Text>
                <Text style={styles.tableCell}>{data.Amount}</Text>
                <Text style={styles.tableCell}>{data.ReceiptId}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.classWiseContainer}>
          <Text style={styles.sectionHeader}>Today's Expense Data</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Label</Text>
              <Text style={styles.tableHeaderText}>Name</Text>
              <Text style={styles.tableHeaderText}>Payment Mode</Text>
              <Text style={styles.tableHeaderText}>Amount</Text>
            </View>
            {revenueData?.map((data) => (
              <View key={data.ReceiptId} style={styles.tableRow}>
                <Text style={styles.tableCell}>{data.Label}</Text>
                <Text style={styles.tableCell}>{data.Name}</Text>
                <Text style={styles.tableCell}>{data.PaymentMode}</Text>
                <Text style={styles.tableCell}>{data.Amount}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.classWiseContainer}>
          <Text style={styles.sectionHeader}>Today's Homework</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Class</Text>
              <Text style={styles.tableHeaderText}>Section</Text>
              <Text style={styles.tableHeaderText}>Subject</Text>
              <Text style={styles.tableHeaderText}>Title</Text>
              <Text style={styles.tableHeaderText}>Chapter</Text>
            </View>
            {homeworkData?.map((data) => (
              <View key={data.ReceiptId} style={styles.tableRow}>
                <Text style={styles.tableCell}>{data.Class}</Text>
                <Text style={styles.tableCell}>{data.Section}</Text>
                <Text style={styles.tableCell}>{data.Subject}</Text>
                <Text style={styles.tableCell}>{data.Title}</Text>
                <Text style={styles.tableCell}>{data.Chapter}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <ReportContainer>
      <h1>School EOD Report</h1>
      {school ? (
        <ResponsivePDFViewer>
          <MyDocument
            school={school}
            totalFee={totalFee}
            remainingFee={remainingFee}
            paidFee={paidFee}
            classWiseFees={classWiseFees}
            staffTable={staffTable}
            receipt={receipt}
            revenueData={revenueData}
            homeworkData={homeworkData}
            classAttendance={classAttendance}
          />
        </ResponsivePDFViewer>
      ) : (
        <p>Loading school data...</p>
      )}
    </ReportContainer>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 20, // Reduced padding for smaller screens
    fontFamily: 'Helvetica',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    flexShrink: 1,
  },
  logo: {
    width: 80, // Reduced for smaller layouts
    height: 80,
    marginRight: 15,
  },
  schoolInfo: {
    flex: 1,
    textAlign: 'center',
  },
  schoolName: {
    fontSize: 18, // Slightly smaller base size
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 10, // Smaller for compactness
    marginTop: 2,
  },
  today: {
    backgroundColor: '#e6edff',
    padding: 5,
    textAlign: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    marginBottom: 15,
  },
  todayTitle: {
    fontSize: 12, // Adjusted for responsiveness
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexWrap: 'wrap', // Allow wrapping on smaller screens
  },
  feeBoxTotal: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 8,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    minWidth: 100, // Ensure it doesn’t collapse too small
  },
  feeBoxRemaining: {
    flex: 1,
    backgroundColor: '#f5f5dc',
    padding: 8,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    minWidth: 100,
  },
  feeBoxPaid: {
    flex: 1,
    backgroundColor: '#e6ffe6',
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    minWidth: 100,
  },
  feeText: {
    fontSize: 12, // Adjusted for smaller screens
    fontWeight: 'bold',
    textAlign: 'center',
  },
  classWiseContainer: {
    marginTop: 15,
    width: '100%',
  },
  sectionHeader: {
    fontSize: 14, // Smaller base size
    fontWeight: 'bold',
    marginBottom: 8,
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    flexShrink: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f8ff',
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 10, // Smaller for compact tables
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
    flexWrap: 'wrap', // Allow wrapping if needed
  },
  tableCell: {
    flex: 1,
    fontSize: 10, // Smaller for compact tables
    padding: 5,
    textAlign: 'center',
    minWidth: 50, // Prevent collapsing too small
  },
});

export default SchoolReport;