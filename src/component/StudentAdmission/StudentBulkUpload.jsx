import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import styled from 'styled-components';
// import test from "../../assets/file/student.xlsx"
import {FileInput,SubmitButton1,Td,ImageCell,ResponseContainer,CellContent} from "./StudentAdmission"
import { Title, TableContainer, Table, Th} from "../Subject/SubjectStyle"


// Styled Components
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const StudentBulkUpload = () => {
    const [jsonData, setJsonData] = useState([]);
    const [responseData, setResponseData] = useState(null);

    // Format dates from Excel number format to DD-MM-YYYY
const formatDate = (excelDate) => {
    if (typeof excelDate === 'number') {
        const date = new Date((excelDate - (25567 + 2)) * 86400 * 1000); // Convert Excel date to JavaScript date
        return `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
    }
    return excelDate; // Return as-is if not a number
};

// Map Excel data to Mongoose model structure
const mapToMongooseModel = (row) => {
    return {
        StudentName: row['Student Name'] || '',
        StudentId: row['Student Reg No'] || '',
        DOB: formatDate(row['DOB']) || '', // Format DOB
        Gender: row['Gender'] || '',
        Religion: row['Religion'] || '',
        BloodGroup: row['Blood Group'] || '',
        Category: row['Category'] || '',
        Height: row['Height'] || '',
        Weight: row['Weight'] || '',
        AadharNumber: row['Aadhar Number'] || '',
        MobileNo: row['Contact No'] || '',
        House: row['House'] || '',
        Email: row['Email'] || '',
        Address: row['Address'] || '',
        City: row['City'] || '',
        Area: row['Area'] || '',
        Pincode: row['Pincode'] || '',
        AdmissionDate: formatDate(row['Admission Date']) || '', // Format Admission Date
        Stream: row['Stream'] || '',
        AdmissionInClass: row['Admission In Class'] || '',
        Section: row['Section'] || '',
        ClassName: row['Admission In Class'] || '',
        FeeCategory: row['Fee Category'] || '',
        RollNo: row['RollNo'] || '',
        LastSchoolAttended: row['Last School Attended'] || '',
        IdentificationMark: row['Identification Mark'] || '',
        SourceOfAdmission: row['Source Of Admission'] || '',
        TransportNeeded: row['Transport Needed'] === 'Yes',
        Route: row['Route'] || '',
        FeeDiscount: row['Fee Discount'] || '',
        BankName: row['Bank Name'] || '',
        BankAccountNumber: row['Bank Account Number'] || '',
        IFSC: row['IFSC'] || '',
        Disability: row['Disability'] === 'Yes',
        DisabilityName: row['DisabilityName'] || '',
        Discount: row['Fee Discount'] || '',
        Orphan: row['Orphan'] === 'Yes',
        SiblingStatus: row['Sibling'] === 'Yes',
        Sibling: {
            Id: row['Sibling Id'] || '',
            Status: row['Sibling Status'] === 'Yes',
        },
        Subject: row['Subjects'] ? row['Subjects'].split(',') : [],
        FatherDetail: {
            Name: row['Father Name'] || '',
            Qualification: row['Father Qualification'] || '',
            Occupation: row['Father Occupation'] || '',
            AnnualIncome: row['Father Annual Income'] || '',
            AadharNumber: row['Father Aadhar Number'] || '',
            MobileNo: row['Father Mobile No'] || '',
            EmailId: row['Father Email Id'] || '',
        },
        MotherDetails: {
            Name: row['Mother Name'] || '',
            Qualification: row['Mother Qualification'] || '',
            Occupation: row['Mother Occupation'] || '',
            AnnualIncome: row['Mother Annual Income'] || '',
            AadharNumber: row['Mother Aadhar Number'] || '',
            MobileNo: row['Mother Mobile No'] || '',
            EmailId: row['Mother Email Id'] || '',
        },
        EmergencyContact: {
            Name: row['Emergency Contact Name'] || '',
            Relation: row['Emergency Contact Relation'] || '',
            MobileNo: row['Emergency Contact Mobile'] || '',
        },
        Document: {
            StudentPhoto: row['Student Photo'] || '',
            Birth: row['Birth Certificate'] || '',
            Leaving: row['Leaving Certificate'] || '',
            FatherPhoto: row['Father Photo'] || '',
            MotherPhoto: row['Mother Photo'] || '',
        }
    };
};

    // Handle file input change
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = event.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });

            // Assuming you want to process the first sheet
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Convert sheet to JSON
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // Map Excel data to Mongoose model format
            const formattedData = jsonData.map((row) => mapToMongooseModel(row));

            // Update state with the formatted data
            setJsonData(formattedData);
        };

        reader.readAsBinaryString(file);
    };

    const handleDownload = () => {
        // Define the data
        const studentData = [
            {
                "Sr. No": 1,
                "Student Reg No": "STU2024110001",
                "Student Name": "Ashok Kumar",
                "DOB": "12-05-2008",
                "Gender": "Male",
                "Religion": "Hindu",
                "Blood Group": "B+",
                "Category": "General",
                "Height": "5 ft 2 in",
                "Weight": 29,
                "Aadhar Number": "9.87865E+11",
                "Address": "Dear Nathpura",
                "Contact No": "9878776565",
                "Email": "Ashok@gmail.com",
                "City": "Bathinda",
                "Area": "Local",
                "Pincode": 15100,
                "Admission Date": "12-05-2024",
                "Stream": "NA",
                "Admission In Class": "Class 3",
                "Section": "A",
                "House": "Red",
                "Fee Category": "General",
                "RollNo": 34,
                "Last School Attended": "Diksha Model School, Noida",
                "Identification Mark": "Cut on chin",
                "Source Of Admission": "FB",
                "Transport Needed": "YES",
                "Route": 3,
                "Fee Discount": 5,
                "Bank Name": "SBI",
                "Bank Account Number": "55564543432",
                "IFSC": "SBIN0050872",
                "Disability": "NA",
                "Orphan": "NA",
                "Father Name": "Rajesh Kumar",
                "Father Qualification": "Bsc",
                "Father Occupation": "Service",
                "Father Annual Income": 200000,
                "Father Aadhar Number": "890956517345",
                "Father Mobile No": "9878767654",
                "Father Email Id": "rajesh@gmail.com",
                "Mother Name": "Shivani Kumar",
                "Mother Qualification": "HSC",
                "Mother Occupation": "Housewife",
                "Mother Annual Income": "NA",
                "Mother Aadhar Number": "398173904518",
                "Mother Mobile No": "6234545671",
                "Mother Email Id": "Shivani@gmaill.com"
            },
        ];

        // Convert JSON data to sheet
        const ws = XLSX.utils.json_to_sheet(studentData);

        // Create a new workbook and append the sheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Student Data');

        // Write the Excel file and trigger download
        XLSX.writeFile(wb, 'student_template.xlsx');
    };

    // Handle submit and send data to server
    const handleSubmit = async () => {
        try {
            // Send the data to the server
            const response = await fetch('https://api.edspride.in/bulk/save-student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });

            const result = await response.json();

            // Store the response data for displaying it
            setResponseData(result);
            console.log(result);
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    // Render the table with the provided logic
    const renderTable = () => {
        if (jsonData.length === 0) {
            return <p>No data to display. Please upload an Excel file.</p>;
        }

        const headers = Object.keys(jsonData[0]); // Get the headers from the first row (keys)

        return (
            <TableContainer>
                <Table>
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <Th key={index}>{header}</Th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {jsonData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {headers.map((header, cellIndex) => (
                                    <Td key={cellIndex}>
                                        {header === "Sibling" ? (
                                            row.Sibling ? (
                                                <CellContent>
                                                    <div><strong>Id:</strong> {row.Sibling.Id}</div>
                                                    <div><strong>Status:</strong> {row.Sibling.Status ? "Yes" : "No"}</div>
                                                </CellContent>
                                            ) : (
                                                "No sibling data"
                                            )
                                        ) : header === "FatherDetail" ? (
                                            row.FatherDetail ? (
                                                <CellContent>
                                                    <p><strong>Name:</strong> {row.FatherDetail.Name}</p>
                                                    <p><strong>Qualification:</strong> {row.FatherDetail.Qualification}</p>
                                                    <p><strong>Occupation:</strong> {row.FatherDetail.Occupation}</p>
                                                    <p><strong>Annual Income:</strong> {row.FatherDetail.AnnualIncome}</p>
                                                    <p><strong>Aadhar Number:</strong> {row.FatherDetail.AadharNumber}</p>
                                                    <p><strong>Mobile No:</strong> {row.FatherDetail.MobileNo}</p>
                                                    <p><strong>Email:</strong> {row.FatherDetail.EmailId}</p>
                                                </CellContent>
                                            ) : (
                                                "No father data"
                                            )
                                        ) : header === "MotherDetails" ? (
                                            row.MotherDetails ? (
                                                <CellContent>
                                                    <p><strong>Name:</strong> {row.MotherDetails.Name}</p>
                                                    <p><strong>Qualification:</strong> {row.MotherDetails.Qualification}</p>
                                                    <p><strong>Occupation:</strong> {row.MotherDetails.Occupation}</p>
                                                    <p><strong>Annual Income:</strong> {row.MotherDetails.AnnualIncome}</p>
                                                    <p><strong>Aadhar Number:</strong> {row.MotherDetails.AadharNumber}</p>
                                                    <p><strong>Mobile No:</strong> {row.MotherDetails.MobileNo}</p>
                                                    <p><strong>Email:</strong> {row.MotherDetails.EmailId}</p>
                                                </CellContent>
                                            ) : (
                                                "No mother data"
                                            )
                                        ) : header === "EmergencyContact" ? (
                                            row.EmergencyContact ? (
                                                <CellContent>
                                                    <p><strong>Name:</strong> {row.EmergencyContact.Name}</p>
                                                    <p><strong>Relation:</strong> {row.EmergencyContact.Relation}</p>
                                                    <p><strong>Mobile No:</strong> {row.EmergencyContact.MobileNo}</p>
                                                </CellContent>
                                            ) : (
                                                "No emergency contact data"
                                            )
                                        ) : header === "Document" ? (
                                            row.Document ? (
                                                <CellContent>
                                                    {row.Document.StudentPhoto && <p><strong>Student Photo:</strong> <ImageCell src={row.Document.StudentPhoto} alt="Student" /></p>}
                                                    {row.Document.Birth && <p><strong>Birth Certificate:</strong> <ImageCell src={row.Document.Birth} alt="Birth Certificate" /></p>}
                                                    {row.Document.Leaving && <p><strong>Leaving Certificate:</strong> <ImageCell src={row.Document.Leaving} alt="Leaving Certificate" /></p>}
                                                    {row.Document.FatherPhoto && <p><strong>Father's Photo:</strong> <ImageCell src={row.Document.FatherPhoto} alt="Father's Photo" /></p>}
                                                    {row.Document.MotherPhoto && <p><strong>Mother's Photo:</strong> <ImageCell src={row.Document.MotherPhoto} alt="Mother's Photo" /></p>}
                                                </CellContent>
                                            ) : (
                                                "No document data"
                                            )
                                        ) : (
                                            row[header] // For other non-object fields, just display the value
                                        )}
                                    </Td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </TableContainer>
        );
    };

    const renderResponse = () => {
        if (!responseData) return null;

        return (
            <ResponseContainer>
                <h2>Submission Response</h2>
                <ul>
                    {responseData.results.map((result, index) => (
                        <li key={index}>
                            <strong>{result.studentId}</strong>: {result.message} ({result.status})
                        </li>
                    ))}
                </ul>
            </ResponseContainer>
        );
    };

    return (
        <Container>
            <Title>Excel File Upload and Display</Title>
            <FileInput type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />
            {renderTable()}
            <SubmitButton1 onClick={handleSubmit}>Submit Data</SubmitButton1>
            <SubmitButton1 style={{ backgroundColor: "blue" }} onClick={handleDownload}>Download Template</SubmitButton1>
            {renderResponse()}
        </Container>
    );
};

export default StudentBulkUpload;
