import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-dropdown-select';
import DatePicker from 'react-datepicker'; // Correct import for DatePicker
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components'; // Import styled-components

// Define your API endpoints (replace with actual URLs)
const studentApiUrl = 'http://localhost:8007/student/all'; // Replace with actual student API
const feeApiUrl = 'http://localhost:8007/fee-data/all'; // Replace with actual fee API

import {
    Container, Heading, FilterWrapper, Table, TableHeader, TableRow, TableData, TotalPaidFee,
    DateRangeWrapper, DateInput, DropdownWrapper, DropdownContainer
  } from './Outerstyle2';

// Main Component
const StudentFeeTable = () => {
    const [students, setStudents] = useState([]);
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [update, setUpdate] = useState([]);

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
                axios.post("http://localhost:8007/student/create-fee-data-for-all-students");
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

    // Get unique filter options from the combined data
    const classNameOptions = Array.from(new Set(combinedData.map(student => student.ClassName)))
        .map(option => ({ label: option || 'No Class', value: option || 'No Class' }));

    const sectionOptions = Array.from(new Set(combinedData.map(student => student.Section)))
        .map(option => ({ label: option || 'No Section', value: option || 'No Section' }));

    const genderOptions = Array.from(new Set(combinedData.map(student => student.Gender)))
        .map(option => ({ label: option || 'No Gender', value: option || 'No Gender' }));

    const houseOptions = Array.from(new Set(combinedData.map(student => student.House)))
        .map(option => ({ label: option || 'No House', value: option || 'No House' }));

    const modeOptions = Array.from(new Set(combinedData.flatMap(student =>
        student.feeDetails?.Payments?.map(payment => payment.PaymentMode)
    ))).map(mode => ({ label: mode || 'No Mode', value: mode || 'No Mode' }));

    // Extract unique months from fee payment dates
    const monthOptions = Array.from(new Set(combinedData.flatMap(student =>
        student.feeDetails?.Payments?.map(payment => {
            const paymentDate = new Date(payment.Date);
            return paymentDate.toLocaleString('default', { month: 'long' }); // Extract month name
        })
    ))).map(month => ({ label: month, value: month }));

    // Apply filters based on dropdown selection
    useEffect(() => {
        let filtered = combinedData;

        // Apply filters for Class Name, Section, Gender, House, Payment Mode, Month, Date, Date Range
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

    return (
        <Container>
          <Heading>Student Fee Details</Heading>
          {filteredData.length > 0 && (
            <TotalPaidFee>
              <strong>Total Paid Fee for Selected Filters: </strong>
              <span>{totalPaidFee.toFixed(2)}</span>
            </TotalPaidFee>
          )}
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
            <DateInput
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a Date"
            />
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
          <Table>
            <thead>
              <tr>
                <TableHeader>Student Name</TableHeader>
                <TableHeader>Student ID</TableHeader>
                <TableHeader>Class Name</TableHeader>
                <TableHeader>Section</TableHeader>
                <TableHeader>House</TableHeader>
                <TableHeader>Father's Name</TableHeader>
                <TableHeader>Total Fee</TableHeader>
                <TableHeader>Paid Amount</TableHeader>
                <TableHeader>Remaining Fee</TableHeader>
                <TableHeader>Fee Payment Dates</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map(student => (
                  <TableRow key={student._id}>
                    <TableData>{getSafeValue(student.StudentName)}</TableData>
                    <TableData>{getSafeValue(student.StudentId)}</TableData>
                    <TableData>{getSafeValue(student.ClassName)}</TableData>
                    <TableData>{getSafeValue(student.Section)}</TableData>
                    <TableData>{getSafeValue(student.House)}</TableData>
                    <TableData>{getSafeValue(student.FatherName)}</TableData>
                    <TableData>{getSafeValue(student.feeDetails?.TotalFee)}</TableData>
                    <TableData>{getSafeValue(student.feeDetails?.Payments?.reduce((sum, payment) => sum + payment.PaidAmount, 0), 0)}</TableData>
                    <TableData>{getSafeValue(student.feeDetails?.RemainingFee)}</TableData>
                    <TableData>{getSafeValue(student.feeDetails?.Payments?.map(payment => new Date(payment.Date).toLocaleDateString()).join(', '), 'No Data')}</TableData>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableData colSpan="10">No data available for the selected filters.</TableData>
                </TableRow>
              )}
            </tbody>
          </Table>
        </Container>
      );
};

export default StudentFeeTable;
