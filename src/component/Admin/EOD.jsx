import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page, Text, Image, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

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
        // Fetch school data
        axios
            .get('https://api.edspride.in/schoolsetup/all')
            .then((response) => {
                if (response.data.length > 0) {
                    setSchool(response.data[0]);
                    // console.log(response.data[0]);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        // Fetch and process the attendance data on component mount
        const getClassWiseAttendance = async () => {
            try {
                const response = await fetch('https://api.edspride.in/student-attendance/all');
                const data = await response.json();
                const todayDate = new Date().toISOString().split('T')[0]; // Get today’s date

                const todayData = data.filter(item => item.Date === todayDate);

                const classWiseCounts = todayData.reduce((acc, curr) => {
                    const classKey = `${curr.Class}-${curr.Section}`;
                    if (!acc[classKey]) {
                        acc[classKey] = { present: 0, absent: 0, leave: 0 };
                    }

                    curr.Attendance.forEach(attendance => {
                        if (attendance.Status === 'Present') {
                            acc[classKey].present += 1;
                        } else if (attendance.Status === 'Absent') {
                            acc[classKey].absent += 1;
                        } else if (attendance.Status === 'Leave') {
                            acc[classKey].leave += 1;
                        }
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
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        let presentCount = 0;
        let absentCount = 0;
        let leaveCount = 0;

        // Iterate through the attendance records
        attendanceData.forEach(record => {
            // Only process the records for today
            if (record.Date === today) {
                // Loop through each student's attendance
                record.Attendance.forEach(student => {
                    // Count the attendance status
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

        // Return the counts
        return {
            present: presentCount,
            absent: absentCount,
            leave: leaveCount,
            totalCount: presentCount + absentCount + leaveCount,
        };
    }

    useEffect(() => {
        // Fetch combined data of students and fees
        const fetchCombinedData = async () => {
            try {
                const [studentResponse, staffResponse, feeResponse, studentAttendanceResponse, staffAttendanceResponse, feeReceiptResponse, revenueResponse, homeworkResponse] = await Promise.all([
                    axios.get('https://api.edspride.in/student/all'),
                    axios.get('https://api.edspride.in/staff/all'),
                    axios.get('https://api.edspride.in/fee-data/all'),
                    axios.get('https://api.edspride.in/student-attendance/all'),
                    axios.get('https://api.edspride.in/staff-attendance/all'),
                    axios.get('https://api.edspride.in/fee-receipt/all'),
                    axios.get('https://api.edspride.in/revenue/all'),
                    axios.get('https://api.edspride.in/homework/all'),
                ]);

                const studentData = studentResponse.data;
                setStudentCount(studentData.length);
                const staffData = staffResponse.data;
                setStaffCount(staffData.length);
                const feeData = feeResponse.data;
                const attendanceForToday = calculateAttendanceForToday(studentAttendanceResponse.data);
                setTodayStudentAttendance(attendanceForToday);
                const attendanceForTodayStaff = calculateAttendanceForToday(staffAttendanceResponse.data);
                // console.log(staffAttendanceResponse.data)
                const filteredData = staffAttendanceResponse.data
                    .filter(item => item.Date === new Date().toISOString().split("T")[0])  // Filtering by selected date
                    .flatMap(item =>
                        item.Attendance.map(att => ({
                            date: item.Date,
                            day: new Date(item.Date).toLocaleDateString('en-US', { weekday: 'long' }),
                            employeeId: att.EmployeeId, // This should contain the employee ID
                            status: att.Status,
                            role: att.Role, // The role of the employee
                            name: att.EmployeeName, // This should contain the staff name
                        }))
                    );
                setStaffTable(filteredData)
                setTodayStaffAttendance(attendanceForTodayStaff);
                const feeReceiptData = feeReceiptResponse.data.filter(val => val.Date === new Date().toISOString().split("T")[0].split("-").reverse().join("-"));
                setReceipt(feeReceiptData)
                var rev = revenueResponse.data.filter(val => val.Date === new Date().toISOString().split("T")[0] && val.Type === "Expense")
                setRevenueData(rev)
                var home = homeworkResponse.data.filter(val => val.Date === new Date().toISOString().split("T")[0])
                setHomeworkData(home)

                // Combine data by student ID
                const combinedData = studentData.map(student => {
                    const fee = feeData.find(f => f.StudentId === student.StudentId) || {};
                    console.log(feeData)
                    console.log(student.StudentId)
                    return { ...student, ...fee };
                });

                // Calculate overall total, remaining, and paid fees
                console.log(combinedData)
                const total = combinedData.reduce((sum, student) => sum + (student.TotalFee || 0), 0);
                const remaining = combinedData.reduce((sum, student) => sum + (student.RemainingFee || 0), 0);
                const paid = total - remaining;

                setTotalFee(total);
                setRemainingFee(remaining);
                setPaidFee(paid);



                // Calculate class-wise fees
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

    // PDF Document component
    // Inside MyDocument component
    const MyDocument = ({ school, totalFee, remainingFee, paidFee, classWiseFees, staffTable, receipt, revenueData, homeworkData, classAttendance }) => (
        <Document>
            <Page style={styles.page}>
                {/* Header with school logo and info */}
                <View style={styles.header}>
                    {school?.SchoolLogo && (
                        <Image
                            src={`https://api.edspride.in/uploads/${school?.SchoolLogo.replace(/^uploads\//, '')}`}
                            style={styles.logo}
                            alt="School Logo"
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
                    <Text style={styles.todayTitle}>DAILY REPORT DATE : {new Date().toISOString().split("T")[0].split("-").reverse().join("-")}</Text>
                </View>

                {/* Overall Fee Summary */}
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

                {/* Class-Wise Fee Table */}
                <View style={styles.classWiseContainer}>
                    <Text style={styles.sectionHeader}>Class-Wise Fee Details</Text>
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Class</Text>
                            <Text style={styles.tableHeaderText}>Total Fee</Text>
                            <Text style={styles.tableHeaderText}>Remaining Fee</Text>
                            <Text style={styles.tableHeaderText}>Paid Fee</Text>
                        </View>
                        {Object?.entries(classWiseFees).map(([className, fees]) => (
                            <View key={className} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{className}</Text>
                                <Text style={styles.tableCell}>{fees.total}</Text>
                                <Text style={styles.tableCell}>{fees.remaining}</Text>
                                <Text style={styles.tableCell}>{fees.paid}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Today Attendance */}
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
                    <Text style={styles.sectionHeader}>Todays Attendance Class Wise</Text>
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Class-Section</Text>
                            <Text style={styles.tableHeaderText}>Present</Text>
                            <Text style={styles.tableHeaderText}>Absent</Text>
                            <Text style={styles.tableHeaderText}>Leave</Text>
                            {/* <Text style={styles.tableHeaderText}>Chapter</Text> */}
                            {/* <Text style={styles.tableHeaderText}>Date</Text> */}
                        </View>
                        {classAttendance && Object.keys(classAttendance)?.map(classKey => (
                            <View key={classKey.ReceiptId} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{classKey}</Text>
                                <Text style={styles.tableCell}>{classAttendance[classKey].present}</Text>
                                <Text style={styles.tableCell}>{classAttendance[classKey].absent}</Text>
                                <Text style={styles.tableCell}>{classAttendance[classKey].leave}</Text>
                                {/* <Text style={styles.tableCell}>{data.Chapter}</Text> */}
                                {/* <Text style={styles.tableCell}>{data.Date.split("-").reverse().join("-")}</Text> */}
                            </View>
                        ))}
                    </View>
                </View>

                {/* Staff Attendance Table */}
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
                    <Text style={styles.sectionHeader}>Todays Fee Payment</Text>
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Student Id</Text>
                            <Text style={styles.tableHeaderText}>student Name</Text>
                            <Text style={styles.tableHeaderText}>Class</Text>
                            <Text style={styles.tableHeaderText}>Paid Amount</Text>
                            {/* <Text style={styles.tableHeaderText}>Mode</Text> */}
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
                    <Text style={styles.sectionHeader}>Todays Expense Data</Text>
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Label</Text>
                            <Text style={styles.tableHeaderText}>Name</Text>
                            <Text style={styles.tableHeaderText}>Payment Mode</Text>
                            <Text style={styles.tableHeaderText}>Amount</Text>
                            {/* <Text style={styles.tableHeaderText}>Mode</Text> */}
                            {/* <Text style={styles.tableHeaderText}>Date</Text> */}
                        </View>
                        {revenueData?.map((data) => (
                            <View key={data.ReceiptId} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{data.Label}</Text>
                                <Text style={styles.tableCell}>{data.Name}</Text>
                                <Text style={styles.tableCell}>{data.PaymentMode}</Text>
                                <Text style={styles.tableCell}>{data.Amount}</Text>
                                {/* <Text style={styles.tableCell}>{data.Date.split("-").reverse().join("-")}</Text> */}
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.classWiseContainer}>
                    <Text style={styles.sectionHeader}>Todays Homework</Text>
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Class</Text>
                            <Text style={styles.tableHeaderText}>Section</Text>
                            <Text style={styles.tableHeaderText}>Subject</Text>
                            <Text style={styles.tableHeaderText}>Title</Text>
                            <Text style={styles.tableHeaderText}>Chapter</Text>
                            {/* <Text style={styles.tableHeaderText}>Date</Text> */}
                        </View>
                        {homeworkData?.map((data) => (
                            <View key={data.ReceiptId} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{data.Class}</Text>
                                <Text style={styles.tableCell}>{data.Section}</Text>
                                <Text style={styles.tableCell}>{data.Subject}</Text>
                                <Text style={styles.tableCell}>{data.Title}</Text>
                                <Text style={styles.tableCell}>{data.Chapter}</Text>
                                {/* <Text style={styles.tableCell}>{data.Date.split("-").reverse().join("-")}</Text> */}
                            </View>
                        ))}
                    </View>
                </View>

            </Page>
        </Document>
    );

    return (
        <div>
            <h1>School EOD Report</h1>
            {school ? (
                // Pass staffTable to MyDocument when rendering PDF
                <PDFViewer style={{ width: '80vw', height: '80vh' }}>
                    <MyDocument
                        school={school}
                        totalFee={totalFee}
                        remainingFee={remainingFee}
                        paidFee={paidFee}
                        classWiseFees={classWiseFees}
                        staffTable={staffTable} // Pass staffTable here
                        receipt={receipt} // Pass staffTable here
                        revenueData={revenueData} // Pass staffTable here
                        homeworkData={homeworkData} // Pass staffTable here
                        classAttendance={classAttendance} // Pass staffTable here
                    />
                </PDFViewer>
            ) : (
                <p>Loading school data...</p>
            )}
        </div>
    );
};

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
    schoolInfo: {
        flex: 1,
        textAlign: 'center',
    },
    schoolName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    detailText: {
        fontSize: 12,
    },
    feeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    feeBoxTotal: {
        flex: 1,
        backgroundColor: '#f0f8ff',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#dcdcdc',
    },
    feeBoxRemaining: {
        flex: 1,
        backgroundColor: '#f5f5dc',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#dcdcdc',
    },
    feeBoxPaid: {
        flex: 1,
        backgroundColor: '#e6ffe6',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#dcdcdc',
    },
    today: {
        flex: 1,
        backgroundColor: '#e6edff',
        padding: 2,
        textAlign: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#dcdcdc',
    },
    todayTitle: {
        fontSize: 14
    },
    feeText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    classWiseContainer: {
        marginTop: 20,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    table: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#dcdcdc',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f0f8ff',
        borderBottomWidth: 1,
        borderColor: '#dcdcdc',
    },
    tableHeaderText: {
        flex: 1,
        fontSize: 12,
        fontWeight: 'bold',
        padding: 5,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#dcdcdc',
    },
    tableCell: {
        flex: 1,
        fontSize: 12,
        padding: 5,
        textAlign: 'center',
    },
});

export default SchoolReport;