import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-dropdown-select';
import DatePicker from 'react-datepicker'; // Correct import for DatePicker
import "react-datepicker/dist/react-datepicker.css";
// import styled from 'styled-components'; // Import styled-components
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
    Container1, Heading, FilterWrapper, Table, TableHeader, TableRow, TableData, TotalPaidFee, DateRangeWrapper, 
    DatePickerWrapper, DateInput, DropdownWrapper, DropdownContainer, ButtonWrapper, Button 
  } from "./FeeStyles";
  

// Define your API endpoints (replace with actual URLs)
const studentApiUrl = 'https://api.edspride.in/student/all'; // Replace with actual student API
const feeApiUrl = 'https://api.edspride.in/fee-data/all'; // Replace with actual fee API


// Main Component
const FeePaid = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [update, setUpdate] = useState('');

    // Dropdown select states
    const [selectedClassName, setSelectedClassName] = useState([]);
    const [selectedSection, setSelectedSection] = useState([]);
    const [selectedGender, setSelectedGender] = useState([]);
    const [selectedHouse, setSelectedHouse] = useState([]); // Added House filter state
    const [selectedMode, setSelectedMode] = useState([]); // Added Payment Mode filter state
    const [selectedMonths, setSelectedMonths] = useState([]); // Added Months filter state
    const [selectedDate, setSelectedDate] = useState(null); // New filter for Date
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]); // New filter for Date Range

    useEffect(() => {
        const create = async () => {
            try {
                axios.post("https://api.edspride.in/student/create-fee-data-for-all-students");
                setUpdate("Yes");
            } catch (error) {
                console.error(error);
            }
        };

        create();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studentsResponse, feeResponse] = await Promise.all([
                    axios.get(studentApiUrl),
                    axios.get(feeApiUrl),
                ]);
                setStudents(studentsResponse.data);
                setFees(feeResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [update]);

    // Combine student and fee data
    const combineStudentAndFeeData = (students, feeData) => {
        return students.map(student => {
            const feeInfo = feeData.find(fee => fee.StudentId === student.StudentId);
            if (feeInfo) {
                student.feeDetails = feeInfo; // Attach fee details to student
            }
            return student;
        });
    };

    // Get the combined data
    const combinedData = combineStudentAndFeeData(students, fees);

    // Apply the non-zero paid amount filter first
    const filteredCombinedData = combinedData.filter(student => {
        // Calculate the total paid amount for this student
        const totalPaid = student.feeDetails?.Payments?.reduce((sum, payment) => {
            return sum + (payment.PaidAmount || 0);
        }, 0) || 0; // Default to 0 if no payments

        return totalPaid > 0; // Keep only students with non-zero total paid amount
    });

    // Now, get unique filter options from the filtered data
    const classNameOptions = Array.from(new Set(filteredCombinedData.map(student => student.ClassName)))
        .map(option => ({ label: option || 'No Class', value: option || 'No Class' }));

    const sectionOptions = Array.from(new Set(filteredCombinedData.map(student => student.Section)))
        .map(option => ({ label: option || 'No Section', value: option || 'No Section' }));

    const genderOptions = Array.from(new Set(filteredCombinedData.map(student => student.Gender)))
        .map(option => ({ label: option || 'No Gender', value: option || 'No Gender' }));

    const houseOptions = Array.from(new Set(filteredCombinedData.map(student => student.House)))
        .map(option => ({ label: option || 'No House', value: option || 'No House' }));

    const modeOptions = Array.from(new Set(filteredCombinedData.flatMap(student =>
        student.feeDetails?.Payments?.map(payment => payment.PaymentMode)
    ))).map(mode => ({ label: mode || 'No Mode', value: mode || 'No Mode' }));

    // Extract unique months from fee payment dates
    const monthOptions = Array.from(new Set(filteredCombinedData.flatMap(student =>
        student.feeDetails?.Payments?.map(payment => {
            const paymentDate = new Date(payment.Date);
            return paymentDate.toLocaleString('default', { month: 'long' }); // Extract month name
        })
    ))).map(month => ({ label: month, value: month }));


    // Apply filters based on dropdown selection
    useEffect(() => {
        let filtered = combinedData;

        // **First**: Filter out students with zero total paid amount
        filtered = filtered.filter(student => {
            const totalPaid = student.feeDetails?.Payments?.reduce((sum, payment) => sum + (payment.PaidAmount || 0), 0) || 0;
            return totalPaid > 0;
        });

        // Apply additional filters for Class Name, Section, Gender, House, Payment Mode, Month, Date, Date Range
        if (selectedClassName.length > 0) {
            filtered = filtered.filter(student =>
                selectedClassName.some(option => student.ClassName === option.value)
            );
        }

        if (selectedSection.length > 0) {
            filtered = filtered.filter(student =>
                selectedSection.some(option => student.Section === option.value)
            );
        }

        if (selectedGender.length > 0) {
            filtered = filtered.filter(student =>
                selectedGender.some(option => student.Gender === option.value)
            );
        }

        if (selectedHouse.length > 0) {
            filtered = filtered.filter(student =>
                selectedHouse.some(option => student.House === option.value)
            );
        }

        if (selectedMode.length > 0) {
            filtered = filtered.filter(student =>
                student.feeDetails?.Payments?.some(payment =>
                    selectedMode.some(mode => mode.value === payment.PaymentMode)
                )
            );
        }

        if (selectedMonths.length > 0) {
            filtered = filtered.filter(student =>
                student.feeDetails?.Payments?.some(payment =>
                    selectedMonths.some(month => {
                        const paymentDate = new Date(payment.Date);
                        return paymentDate.toLocaleString('default', { month: 'long' }) === month.value;
                    })
                )
            );
        }

        if (selectedDate) {
            filtered = filtered.filter(student =>
                student.feeDetails?.Payments?.some(payment => {
                    const paymentDate = new Date(payment.Date);
                    return paymentDate.toDateString() === selectedDate.toDateString();
                })
            );
        }

        if (selectedDateRange[0] && selectedDateRange[1]) {
            filtered = filtered.filter(student =>
                student.feeDetails?.Payments?.some(payment => {
                    const paymentDate = new Date(payment.Date);
                    return paymentDate >= selectedDateRange[0] && paymentDate <= selectedDateRange[1];
                })
            );
        }

        // Set the filtered data for display
        setFilteredData(filtered);
    }, [selectedClassName, selectedSection, selectedGender, selectedHouse, selectedMode, selectedMonths, selectedDate, selectedDateRange, combinedData]);



    // Calculate Total Paid Fee
    const calculateTotalPaidFee = (data) => {
        return data.reduce((total, student) => {
            const paidAmount = student.feeDetails?.Payments?.reduce((sum, payment) => sum + (payment.PaidAmount || 0), 0) || 0;
            return total + paidAmount;
        }, 0);
    };

    const totalPaidFee = calculateTotalPaidFee(filteredData);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Fallback for undefined or null values
    const getSafeValue = (value, fallback = 'Not Available') => value ?? fallback;

    // Generate PDF
    const generatePDF = () => {
        const doc = new jsPDF('l'); // 'l' for landscape orientation
        const tableColumn = ["Student Name", "Gender", "Class Name", "Section", "House", "Total Fee", "Paid Amount", "Remaining Fee", "Payment Mode", "Payment Date"];
        const tableRows = [];
        let totalFee = 0;
        let totalPaid = 0;
        let totalRemaining = 0;

        filteredData.forEach(student => {
            const payments = student.feeDetails?.Payments || [];
            const studentTotalFee = student.feeDetails?.TotalFee || 0;
            const studentRemainingFee = student.feeDetails?.RemainingFee || 0;

            payments.sort((a, b) => new Date(b.Date) - new Date(a.Date)).forEach(payment => {
                const paymentData = [
                    getSafeValue(student.StudentName),
                    getSafeValue(student.Gender),
                    getSafeValue(student.ClassName),
                    getSafeValue(student.Section),
                    getSafeValue(student.House),
                    studentTotalFee.toFixed(2),
                    getSafeValue(payment.PaidAmount).toFixed(2),
                    studentRemainingFee.toFixed(2),
                    getSafeValue(payment.PaymentMode),
                    new Date(payment.Date).toLocaleDateString()
                ];
                tableRows.push(paymentData);

                // Accumulate totals
                totalFee += studentTotalFee;
                totalPaid += parseFloat(getSafeValue(payment.PaidAmount)) || 0;
                totalRemaining += studentRemainingFee;
            });
        });

        // Add rows to the PDF
        doc.autoTable(tableColumn, tableRows, { startY: 20 });

        // Add totals
        const totalData = [
            'Totals',
            '',
            '',
            '',
            '',
            totalFee.toFixed(2),
            totalPaid.toFixed(2),
            totalRemaining.toFixed(2),
            '',
            ''
        ];
        doc.autoTable({
            head: [['', '', '', '', '', 'Total Fee', 'Total Paid', 'Total Remaining', '', '']],
            body: [totalData],
            startY: doc.autoTable.previous.finalY + 10
        });

        doc.text("Payment Records", 14, 15);
        doc.save("payment_records.pdf");

    };


    // Generate Excel
    const generateExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet([]);
        const tableRows = [];
        let totalFee = 0;
        let totalPaid = 0;
        let totalRemaining = 0;

        // Add headers to the worksheet
        const headers = [
            "Student Name",
            "Gender",
            "Class Name",
            "Section",
            "House",
            "Total Fee",
            "Paid Amount",
            "Remaining Fee",
            "Payment Mode",
            "Payment Date"
        ];

        XLSX.utils.sheet_add_aoa(worksheet, [headers]);

        filteredData.forEach(student => {
            const payments = student.feeDetails?.Payments || [];
            const studentTotalFee = student.feeDetails?.TotalFee || 0;
            const studentRemainingFee = student.feeDetails?.RemainingFee || 0;

            payments.sort((a, b) => new Date(b.Date) - new Date(a.Date)).forEach(payment => {
                const paymentData = {
                    "Student Name": getSafeValue(student.StudentName),
                    "Gender": getSafeValue(student.Gender),
                    "Class Name": getSafeValue(student.ClassName),
                    "Section": getSafeValue(student.Section),
                    "House": getSafeValue(student.House),
                    "Total Fee": studentTotalFee.toFixed(2),
                    "Paid Amount": getSafeValue(payment.PaidAmount).toFixed(2),
                    "Remaining Fee": studentRemainingFee.toFixed(2),
                    "Payment Mode": getSafeValue(payment.PaymentMode),
                    "Payment Date": new Date(payment.Date).toLocaleDateString()
                };
                tableRows.push(paymentData);

                // Accumulate totals
                totalFee += studentTotalFee;
                totalPaid += parseFloat(getSafeValue(payment.PaidAmount)) || 0;
                totalRemaining += studentRemainingFee;
            });
        });

        XLSX.utils.sheet_add_json(worksheet, tableRows, { skipHeader: true, origin: -1 });

        // Append totals to worksheet
        const totalRow = [
            {
                "Student Name": "Totals",
                "Gender": "",
                "Class Name": "",
                "Section": "",
                "House": "",
                "Total Fee": totalFee.toFixed(2),
                "Paid Amount": totalPaid.toFixed(2),
                "Remaining Fee": totalRemaining.toFixed(2),
                "Payment Mode": "",
                "Payment Date": ""
            }
        ];

        XLSX.utils.sheet_add_json(worksheet, totalRow, { skipHeader: true, origin: -1 });

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");
        XLSX.writeFile(workbook, "payment_records.xlsx");
    };

    const goToReceipt = (studentId, receiptId, studentName, pendingFee, paymentMode, className, section) => {
        // console.log(data.StudentId, data.ReceiptId)
        const role = localStorage.getItem("Role")
        console.log(role)
        if (role.trim().toLowerCase() == "superadmin" || role.trim().toLowerCase() == "admin") {
            navigate(`/admin/fee-receipt`, {
                state: {
                    StudentId: studentId,
                    ReceiptId: receiptId,
                    Name: studentName,
                    Pending: pendingFee,
                    PaymentMode: paymentMode,
                    Class: className,
                    Section: section
                }
            })
        } else {
            navigate(`/employee/fee-receipt`, {
                state: {
                    StudentId: studentId,
                    ReceiptId: receiptId,
                    Name: studentName,
                    Pending: pendingFee,
                    PaymentMode: paymentMode,
                    Class: className,
                    Section: section
                }
            })
        }
    }

    const calculateTotalFees = (data) => {
        return data.reduce((totals, student) => {
            const totalFee = student.feeDetails?.TotalFee || 0;
            const paidAmount = student.feeDetails?.Payments?.reduce((sum, payment) => sum + (payment.PaidAmount || 0), 0) || 0;
            const remainingFee = student.feeDetails?.RemainingFee || 0;

            totals.totalFee += totalFee;
            totals.paidFee += paidAmount;
            totals.remainingFee += remainingFee;

            return totals;
        }, { totalFee: 0, paidFee: 0, remainingFee: 0 });
    };

    // Calculate the totals based on filtered data
    const totals = calculateTotalFees(filteredData);

    return (
        <Container1>
            <Heading>Paid Fee Details</Heading>

            {/* Total Paid Fee */}
            {/* {filteredData.length > 0 && (
                <TotalPaidFee>
                    <strong>Total Paid Fee for Selected Filters: </strong>
                    <span>{totalPaidFee.toFixed(2)}</span>
                </TotalPaidFee>
            )} */}

            {/* Dropdowns for filtering */}
            <FilterWrapper>
                <DropdownWrapper>
                    <DropdownContainer>
                        <Select
                            options={classNameOptions.length > 0 ? classNameOptions : [{ label: 'No options', value: '' }]}
                            values={selectedClassName}
                            onChange={setSelectedClassName}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Class Name"
                            multi
                        />
                    </DropdownContainer>
                    <DropdownContainer>
                        <Select
                            options={sectionOptions.length > 0 ? sectionOptions : [{ label: 'No options', value: '' }]}
                            values={selectedSection}
                            onChange={setSelectedSection}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Section"
                            multi
                        />
                    </DropdownContainer>
                    <DropdownContainer>
                        <Select
                            options={genderOptions.length > 0 ? genderOptions : [{ label: 'No options', value: '' }]}
                            values={selectedGender}
                            onChange={setSelectedGender}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Gender"
                            multi
                        />
                    </DropdownContainer>
                </DropdownWrapper>

                {/* Payment Mode, Month filters */}
                <DropdownWrapper>
                    <DropdownContainer>
                        <Select
                            options={houseOptions.length > 0 ? houseOptions : [{ label: 'No options', value: '' }]}
                            values={selectedHouse}
                            onChange={setSelectedHouse}
                            labelField="label"
                            valueField="value"
                            placeholder="Select House"
                            multi
                        />
                    </DropdownContainer>
                    <DropdownContainer>
                        <Select
                            options={modeOptions.length > 0 ? modeOptions : [{ label: 'No options', value: '' }]}
                            values={selectedMode}
                            onChange={setSelectedMode}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Payment Mode"
                            multi
                        />
                    </DropdownContainer>
                    <DropdownContainer>
                        <Select
                            options={monthOptions.length > 0 ? monthOptions : [{ label: 'No options', value: '' }]}
                            values={selectedMonths}
                            onChange={setSelectedMonths}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Payment Month"
                            multi
                        />
                    </DropdownContainer>
                </DropdownWrapper>

                {/* Date filter */}
                <DateInput
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a Date"
                />

                {/* Date Range filter */}
                <DateRangeWrapper>
                    <span>From: </span>
                    <DateInput
                        selected={selectedDateRange[0]}
                        onChange={date => setSelectedDateRange([date, selectedDateRange[1]])}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Start Date"
                    />
                    <span> To: </span>
                    <DateInput
                        selected={selectedDateRange[1]}
                        onChange={date => setSelectedDateRange([selectedDateRange[0], date])}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="End Date"
                    />
                </DateRangeWrapper>
            </FilterWrapper>
            <ButtonWrapper>
                <Button primary onClick={generatePDF}>
                    Download PDF
                </Button>
                <Button onClick={generateExcel}>
                    Download Excel
                </Button>
            </ButtonWrapper>

            <TotalPaidFee>Total Paid Fee: ₹{totalPaidFee.toFixed(2)}</TotalPaidFee>

            {/* Table */}
            <div style={{ height: "60vh", overflowY: "auto" }}>
                <Table>
                    <thead>
                        <tr>
                            <TableHeader>Student Name</TableHeader>
                            <TableHeader>Gender</TableHeader>
                            <TableHeader>Class Name</TableHeader>
                            <TableHeader>Section</TableHeader>
                            <TableHeader>House</TableHeader>
                            <TableHeader>Total Fee</TableHeader>
                            <TableHeader>Paid Amount</TableHeader>
                            <TableHeader>Remaining Fee</TableHeader>
                            <TableHeader>Payment Mode</TableHeader>
                            <TableHeader>Payment Date</TableHeader>
                            <TableHeader>Receipt Id</TableHeader>
                            <TableHeader>View</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.flatMap(student => {
                                // Retrieve the payments array
                                const payments = student.feeDetails?.Payments || [];

                                // Sort payments by Payment Date in descending order
                                const sortedPayments = payments.sort((a, b) => new Date(b.Date) - new Date(a.Date));

                                const totalFee = student.feeDetails?.TotalFee || 0;
                                const remainingFee = student.feeDetails?.RemainingFee || 0;

                                return sortedPayments.map((payment, index) => (
                                    <TableRow key={`${student.StudentId}-${index}`}>
                                        <TableData>{getSafeValue(student.StudentName)}</TableData>
                                        <TableData>{getSafeValue(student.Gender)}</TableData>
                                        <TableData>{getSafeValue(student.ClassName)}</TableData>
                                        <TableData>{getSafeValue(student.Section)}</TableData>
                                        <TableData>{getSafeValue(student.House)}</TableData>
                                        <TableData>{totalFee.toFixed(2)}</TableData>
                                        <TableData>{getSafeValue(payment.PaidAmount).toFixed(2)}</TableData>
                                        {/* <TableData>{remainingFee.toFixed(2)}</TableData> */}
                                        <TableData>{(payment?.Remain)?.toFixed(2) && (payment?.Remain)?.toFixed(2)}</TableData>
                                        <TableData>{getSafeValue(payment.PaymentMode)}</TableData>
                                        <TableData>{new Date(payment.Date).toLocaleDateString()}</TableData>
                                        <TableData>{payment.ReceiptId}</TableData>
                                        <TableData><Eye onClick={() => goToReceipt(student.StudentId, payment.ReceiptId, student.StudentName, payment?.Remain, payment.PaymentMode, student.ClassName, student.Section)}></Eye></TableData>
                                    </TableRow>
                                ));
                            })
                        ) : (
                            <TableRow>
                                <TableData colSpan="10">No data available for the selected filters.</TableData>
                            </TableRow>
                        )}

                        {/* Totals Row */}
                        {filteredData.length > 0 && (
                            <TableRow>
                                <TableData colSpan="5" style={{ textAlign: 'right' }}>Total:</TableData>
                                <TableData>{totals.totalFee.toFixed(2)}</TableData>
                                <TableData>{totals.paidFee.toFixed(2)}</TableData>
                                <TableData>{totals.remainingFee.toFixed(2)}</TableData>
                                <TableData colSpan="4"></TableData> {/* Empty cells for Payment Mode and Payment Date */}
                            </TableRow>
                        )}
                    </tbody>
                </Table>
            </div>

        </Container1>
    );
};

export default FeePaid;
