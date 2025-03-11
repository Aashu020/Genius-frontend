import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
`;

const FileInput = styled.input`
  margin-bottom: 20px;
  display: block;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
`;

const SubmitButton = styled.button`
  display: block;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

const TableContainer = styled.div`
  max-height: 500px;
  overflow-y: auto;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Th = styled.th`
  padding: 10px;
  text-align: left;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const ResponseContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const CellContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StaffBulkUpload = () => {
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

    // Map Excel data to Staff model structure
    const mapToStaffModel = (row) => {
        return {
            EmployeeId: row['Employee ID'] || '',
            Name: row['Name'] || '',
            DOB: formatDate(row['DOB']) || '',
            DOJ: formatDate(row['DOJ']) || '', // Format DOJ
            Gender: row['Gender'] || '',
            Role: row['Role'] || '',
            Department: row['Department'] || '',
            Email: row['Email'] || '',
            MobileNo: row['Mobile No'] || '',
            Address: row['Address'] || '',
            Qualification: row['Qualification'] || '',
            Experience: row['Experience'] || '',
            Salary: row['Salary'] || '',
            BloodGroup: row['Blood Group'] || '',
            MaritalStatus: row['Marital Status'] || '',
            LanguageKnown: row['Language Known'] || '',
            EmergencyContact: {
                Name: row['Emergency Contact Name'] || '',
                MobileNo: row['Emergency Contact Mobile'] || '',
            },
            LastSchool: row['Last School'] || '',
            ReferredBy: row['Referred By'] || '',
            ReferredContact: row['Referred Contact'] || '',
            AadharNo: row['AadharNo'] || '',
            PanNo: row['PanNo'] || '',
            JobGrade: row['Job Grade'] || '',  // Add Job Grade here
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

            // Map Excel data to Staff model format
            const formattedData = jsonData.map((row) => mapToStaffModel(row));

            // Update state with the formatted data
            setJsonData(formattedData);
        };

        reader.readAsBinaryString(file);
    };

    // Handle download
    const handleDownload = () => {
        // Define the staff template data, including the new Job Grade field
        const staffData = [
            {
                "Employee ID": "EMP2024110001",
                "Name": "John Doe",
                "DOB": "15-05-1985",
                "DOJ": "01-06-2020",  // Add DOJ here
                "Gender": "Male",
                "Role": "Teacher",
                "Department": "Academic",
                "Email": "johndoe@example.com",
                "Mobile No": "9876543210",
                "Address": "123 Main St, Springfield",
                "Qualification": "MBA",
                "Experience": "10 Years",
                "Salary": "75000",
                "Blood Group": "O+",
                "Marital Status": "Married",
                "Language Known": "English, Hindi",
                "Emergency Contact Name": "Jane Doe",
                "Emergency Contact Mobile": "9876543211",
                "Last School": "Springfield High",
                "Referred By": "Michael Smith",
                "Referred Contact": "9876543222",
                "AadharNo": "1234-5678-9876",
                "PanNo": "ABCDE1234F",
                "Job Grade": "A1", // Add Job Grade here
            },
        ];

        // Convert JSON data to sheet
        const ws = XLSX.utils.json_to_sheet(staffData);

        // Create a new workbook and append the sheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Staff Data');

        // Write the Excel file and trigger download
        XLSX.writeFile(wb, 'staff_template_with_job_grade.xlsx');
    };

    // Handle submit and send data to server
    const handleSubmit = async () => {
        console.log(jsonData);
        try {
            // Send the data to the server
            const response = await fetch('https://api.edspride.in/bulk/save-staff', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });

            const result = await response.json();

            // Store the response data for displaying it
            setResponseData(result);
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
                                        {header === "EmergencyContact" ? (
                                            row.EmergencyContact ? (
                                                <CellContent>
                                                    <p><strong>Name:</strong> {row.EmergencyContact.Name}</p>
                                                    <p><strong>Mobile No:</strong> {row.EmergencyContact.MobileNo}</p>
                                                </CellContent>
                                            ) : (
                                                "No emergency contact data"
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
                            <strong>{result.staffId}</strong>: {result.message} ({result.status})
                        </li>
                    ))}
                </ul>
            </ResponseContainer>
        );
    };

    return (
        <Container>
            <Title>Staff Bulk Upload</Title>
            <FileInput type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />
            {renderTable()}
            <SubmitButton onClick={handleSubmit}>Submit Data</SubmitButton>
            <SubmitButton style={{ backgroundColor: "blue" }} onClick={handleDownload}>Download Template</SubmitButton>
            {renderResponse()}
        </Container>
    );
};

export default StaffBulkUpload;
