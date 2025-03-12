import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-dropdown-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Container1, H2, FilterWrapper, Table1, TableHeader, TableRow1, TableData1, TotalPaidFee, DateInput, DropdownWrapper, DateRangeWrapper, DropdownContainer, ButtonWrapper, Button } from "./FeeStyles";


// Define your API endpoints (replace with actual URLs)
const studentApiUrl = 'https://api.edspride.in/student/all';
const feeApiUrl = 'https://api.edspride.in/fee-data/all';

// Utility function to handle null/undefined values
const getSafeValue = (value, fallback = 'No Data') => {
    return value !== undefined && value !== null ? value : fallback;
};

const FeeRemaining = () => {
    const [students, setStudents] = useState([]);
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [update, setUpdate] = useState('');

    // Dropdown select states
    const [selectedClassName, setSelectedClassName] = useState([]);
    const [selectedSection, setSelectedSection] = useState([]);
    const [selectedGender, setSelectedGender] = useState([]);
    const [selectedHouse, setSelectedHouse] = useState([]);
    const [selectedMode, setSelectedMode] = useState([]);
    const [selectedMonths, setSelectedMonths] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]);

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

    // Filter data based on RemainingFee > 0
    const filteredCombinedData = combinedData.filter(student => student.feeDetails?.RemainingFee > 0 || student.feeDetails?.Balance > 0 );

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

    const monthOptions = Array.from(new Set(filteredCombinedData.flatMap(student =>
        student.feeDetails?.Payments?.map(payment => {
            const paymentDate = new Date(payment.Date);
            return paymentDate.toLocaleString('default', { month: 'long' });
        })
    ))).map(month => ({ label: month, value: month }));

    // Apply filters based on dropdown selection
    useEffect(() => {
        let filtered = filteredCombinedData;

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
    }, [selectedClassName, selectedSection, selectedGender, selectedHouse, selectedMode, selectedMonths, selectedDate, selectedDateRange, filteredCombinedData]);

    // Calculate Total Paid Fee
    const calculateTotalRemainingFee = (data) => {
        return data.reduce((total, student) => {
            const remainingFee = student.feeDetails?.RemainingFee || 0;
            return total + remainingFee;
        }, 0);
    };

    const totalRemainingFee = calculateTotalRemainingFee(filteredData);

    if (loading) {
        return <div>Loading...</div>;
    }

    const exportToPDF = () => {
        // Create a new jsPDF instance with landscape orientation
        const doc = new jsPDF('landscape', 'pt', 'a4'); // 'landscape', 'pt' for points, 'a4' for A4 size
        doc.setFont('Arial', 'normal');
        doc.setFontSize(12);
        doc.text('Fee Remaining Report', 14, 10);
    
        const headers = ['Student Name', 'Gender', 'Class Name', 'Section', 'House', 'Total Fee', 'Paid Amount', 'Remaining Fee'];
        const data = filteredData.map(student => [
            student.StudentName,
            student.Gender,  // Assuming you want to include Gender
            student.ClassName,
            student.Section,
            student.House,
            student.feeDetails?.TotalFee,
            student.feeDetails?.Payments?.reduce((sum, payment) => sum + payment.PaidAmount, 0),
            student.feeDetails?.RemainingFee,
        ]);
    
        // Add total row at the bottom of the table
        const totals = calculateTotals(filteredData);
        data.push([
            'Total', '', '', '', '',
            totals.totalFee.toFixed(2),
            totals.paidAmount.toFixed(2),
            totals.remainingFee.toFixed(2),
        ]);
    
        // Create table in PDF
        doc.autoTable({
            head: [headers],
            body: data,
            startY: 20,
            theme: 'grid',
            styles: { fontSize: 10, cellPadding: 2 },
        });
    
        // Save the PDF with the specified name
        doc.save('FeeRemainingReport.pdf');
    };
    


    // Export to Excel
    const exportToExcel = () => {
        const headers = ['Student Name', 'Student ID', 'Class Name', 'Section', 'House', 'Total Fee', 'Paid Amount', 'Remaining Fee'];
        const data = filteredData.map(student => ({
            'Student Name': student.StudentName,
            'Student ID': student.StudentId,
            'Class Name': student.ClassName,
            'Section': student.Section,
            'House': student.House,
            // 'Father\'s Name': student.FatherName,
            'Total Fee': student.feeDetails?.TotalFee,
            'Paid Amount': student.feeDetails?.Payments?.reduce((sum, payment) => sum + payment.PaidAmount, 0),
            'Remaining Fee': student.feeDetails?.RemainingFee,
            // 'Fee Payment Dates': student.feeDetails?.Payments?.map(payment => new Date(payment.Date).toLocaleDateString()).join(', '),
        }));

        // Add total row at the bottom of the data
        const totals = calculateTotals(filteredData);
        data.push({
            'Student Name': 'Total',
            'Student ID': '',
            'Class Name': '',
            'Section': '',
            'House': '',
            // 'Father\'s Name': '',
            'Total Fee': totals.totalFee.toFixed(2),
            'Paid Amount': totals.paidAmount.toFixed(2),
            'Remaining Fee': totals.remainingFee.toFixed(2),
            // 'Fee Payment Dates': ''
        });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Fee Remaining Data');
        XLSX.writeFile(workbook, 'FeeRemainingReport.xlsx');
    };


    const calculateTotals = (data) => {
        return data.reduce((totals, student) => {
            const totalFee = student.feeDetails?.TotalFee || 0;
            const paidAmount = student.feeDetails?.Payments?.reduce((sum, payment) => sum + payment.PaidAmount, 0) || 0;
            const remainingFee = student.feeDetails?.RemainingFee || 0;

            totals.totalFee += totalFee;
            totals.paidAmount += paidAmount;
            totals.remainingFee += remainingFee;

            return totals;
        }, { totalFee: 0, paidAmount: 0, remainingFee: 0 });
    };

    const totals = calculateTotals(filteredData);


    return (
        <Container1>
            <H2>Fee Remaining Details</H2>

            <FilterWrapper>
                <DropdownWrapper>
                    <DropdownContainer>
                        <Select
                            options={classNameOptions}
                            values={selectedClassName}
                            onChange={setSelectedClassName}
                            placeholder="Select Class"
                            multi
                        />
                    </DropdownContainer>
                    <DropdownContainer>
                        <Select
                            options={sectionOptions}
                            values={selectedSection}
                            onChange={setSelectedSection}
                            placeholder="Select Section"
                            multi
                        />
                    </DropdownContainer>
                    <DropdownContainer>
                        <Select
                            options={genderOptions}
                            values={selectedGender}
                            onChange={setSelectedGender}
                            placeholder="Select Gender"
                            multi
                        />
                    </DropdownContainer>
                </DropdownWrapper>
                <DropdownWrapper>
                    <DropdownContainer>
                        <Select
                            options={houseOptions}
                            values={selectedHouse}
                            onChange={setSelectedHouse}
                            placeholder="Select House"
                            multi
                        />
                    </DropdownContainer>
                    <DropdownContainer>
                        <Select
                            options={modeOptions}
                            values={selectedMode}
                            onChange={setSelectedMode}
                            placeholder="Select Mode"
                            multi
                        />
                    </DropdownContainer>
                    <DropdownContainer>
                        <Select
                            options={monthOptions}
                            values={selectedMonths}
                            onChange={setSelectedMonths}
                            placeholder="Select Month"
                            multi
                        />
                    </DropdownContainer>
                </DropdownWrapper>

                <DateInput
                    selected={selectedDate}
                    onChange={setSelectedDate}
                    placeholderText="Select Date"
                />

                <DateRangeWrapper>
                    <span>From: </span>
                    <DateInput
                        selected={selectedDateRange[0]}
                        onChange={date => setSelectedDateRange([date, selectedDateRange[1]])}
                        selectsStart
                        startDate={selectedDateRange[0]}
                        endDate={selectedDateRange[1]}
                        placeholderText="Start Date"
                    />
                    <span> To: </span>
                    <DateInput
                        selected={selectedDateRange[1]}
                        onChange={date => setSelectedDateRange([selectedDateRange[0], date])}
                        selectsEnd
                        startDate={selectedDateRange[0]}
                        endDate={selectedDateRange[1]}
                        minDate={selectedDateRange[0]}
                        placeholderText="End Date"
                    />
                </DateRangeWrapper>

            </FilterWrapper>
            <ButtonWrapper>
                <Button primary onClick={exportToPDF}>
                    Download PDF
                </Button>
                <Button onClick={exportToExcel}>
                    Download Excel
                </Button>
            </ButtonWrapper>

            <TotalPaidFee>Total Remaining Fee: ₹{totalRemainingFee.toFixed(2)}</TotalPaidFee>

            <div style={{ height: "60vh", overflowY: "auto" }}>
                <Table1>
                    <thead>
                        <tr>
                            <TableHeader>Student Name</TableHeader>
                            <TableHeader>Gender</TableHeader>
                            <TableHeader>Class Name</TableHeader>
                            <TableHeader>Section</TableHeader>
                            <TableHeader>House</TableHeader>
                            {/* <TableHeader>Father's Name</TableHeader> */}
                            <TableHeader>Total Fee</TableHeader>
                            <TableHeader>Paid Amount</TableHeader>
                            <TableHeader>Remaining Fee</TableHeader>
                            {/* <TableHeader>Fee Payment Dates</TableHeader> */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map(student => (
                                <TableRow1 key={student._id}>
                                    <TableData1>{getSafeValue(student.StudentName)}</TableData1>
                                    <TableData1>{getSafeValue(student.Gender)}</TableData1>
                                    <TableData1>{getSafeValue(student.ClassName)}</TableData1>
                                    <TableData1>{getSafeValue(student.Section)}</TableData1>
                                    <TableData1>{getSafeValue(student.House)}</TableData1>
                                    {/* <TableData>{getSafeValue(student.FatherName)}</TableData> */}
                                    <TableData1>{getSafeValue(student.feeDetails?.TotalFee)}</TableData1>
                                    <TableData1>
                                        {getSafeValue(student.feeDetails?.Payments?.reduce((sum, payment) => sum + payment.PaidAmount, 0), 0)}
                                    </TableData1>
                                    <TableData1>{getSafeValue(student.feeDetails?.RemainingFee)}</TableData1>
                                    {/* <TableData>
                                        {getSafeValue(
                                            student.feeDetails?.Payments?.map(payment => new Date(payment.Date).toLocaleDateString()).join(', '),
                                            'No Data'
                                        )}
                                    </TableData> */}
                                </TableRow1>
                            ))
                        ) : (
                            <TableRow1>
                                <TableData1 colSpan="10">No data available for the selected filters.</TableData1>
                            </TableRow1>
                        )}

                        {/* Add the totals row at the bottom of the table */}
                        <TableRow1>
                            <TableData1 colSpan="5" style={{ textAlign: 'right' }}>Total</TableData1>
                            <TableData1>{totals.totalFee.toFixed(2)}</TableData1>
                            <TableData1>{totals.paidAmount.toFixed(2)}</TableData1>
                            <TableData1>{totals.remainingFee.toFixed(2)}</TableData1>
                            {/* <TableData></TableData> */}
                        </TableRow1>
                    </tbody>
                </Table1>
            </div>
        </Container1>
    );
};

export default FeeRemaining;
