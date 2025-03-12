import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useLocation } from 'react-router-dom';

const SlipContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: auto;
  padding: 20px;
  border: 1px solid #000;
  font-family: Arial, sans-serif;
  margin-bottom: 20px;
`;

const HeaderSection = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

const SubHeaderSection = styled.div`
  text-align: center;
  font-size: 14px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid #000;
  padding-bottom: 5px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const Label = styled.div`
  width: 45%;
  font-weight: bold;
`;

const Value = styled.div`
  width: 45%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  th, td {
    min-width: 100px;
    border: 1px solid #000;
    padding: 8px;
    text-align: center;
  }
`;

const TableHeader = styled.th`
  border: 1px solid #000;
  padding: 8px;
  text-align: center;
  font-weight: bold;
`;

const TableCell = styled.td`
  border: 1px solid #000;
  padding: 8px;
  text-align: center;
`;

const PrintButton = styled.button`
  padding: 10px 20px;
  height: 50px;
  margin: 20px 0;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

const PayrollSlip = () => {
  const location = useLocation();
    const [payrollData, setPayrollData] = useState(null);
    const [staffData, setStaffData] = useState(null);
    const [school, setSchool] = useState(null);
    const  [payrollSlip, setPayrollSlip] = useState([]);

    const slipRefs = useRef([]);

    useEffect(() => {
      axios
        .get("http://localhost:8007/schoolsetup/all")
        .then((response) => {
          // console.log(response.data);
          if (response.data.length > 0) {
            // setPresent(true);
            setSchool(response.data[0])
            // console.log(response.data[0])
          }
        })
        .catch((error) => {
          console.error(error);
        })
    }, [])

    useEffect(() => {
        const fetchPayrollData = async () => {
            try {
                const payrollResponse = await axios.get(`http://localhost:8007/payroll-data/get/${location.state.EmployeeId}`);
                var filData = payrollResponse.data.Payments.filter(val => val.SlipId === location.state.SlipId)
                // console.log(filData)
                setPayrollSlip(filData)
                setPayrollData(payrollResponse.data);
                const staffResponse = await axios.get(`http://localhost:8007/staff/get/${location.state.EmployeeId}`);
                setStaffData(staffResponse.data);
            } catch (error) {
                console.error("Error fetching payroll or staff data:", error);
            }
        };

        fetchPayrollData();
    }, []);

    const handlePrint = async () => {
        const pdf = new jsPDF('p', 'pt', 'a4');

        for (let i = 0; i < slipRefs.current.length; i++) {
            const element = slipRefs.current[i];
            const canvas = await html2canvas(element, { useCORS: true });

            if (!canvas) {
                console.error('Error generating canvas from the element');
                return;
            }

            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 575; // PDF width
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 10;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            if (i < slipRefs.current.length - 1) {
                pdf.addPage();
            }
        }

        // Trigger download of the PDF
        pdf.save('payroll_slips.pdf');
    };

    if (!payrollData || !staffData) {
        return <div>Loading...</div>;
    }

    const { Payments } = payrollData;

    return (
        <>
            {payrollSlip?.map((payment, index) => (
                <SlipContainer key={index} ref={(el) => (slipRefs.current[index] = el)}>
                    <HeaderSection>{school?.SchoolName}</HeaderSection>
                    <SubHeaderSection>
                    {school?.EmailId} | {school?.PhoneNo}<br/>{school?.Website}
                    </SubHeaderSection>
                    <SectionTitle>SALARY SLIP</SectionTitle>

                    <SectionTitle>Employee Detail</SectionTitle>
                    <Row>
                        <Label>Employee ID</Label><Value>{staffData.EmployeeId}</Value>
                    </Row>
                    <Row>
                        <Label>Name</Label><Value>{staffData.Name}</Value>
                    </Row>
                    <Row>
                        <Label>Gender</Label><Value>{staffData.Gender}</Value>
                    </Row>
                    <Row>
                        <Label>Date of Birth</Label><Value>{staffData.DOB}</Value>
                    </Row>
                    <Row>
                        <Label>Joining Date</Label><Value>{staffData.DOJ}</Value>
                    </Row>
                    <Row>
                        <Label>Department</Label><Value>{staffData.Department}</Value>
                    </Row>
                    <Row>
                        <Label>PAN Number</Label><Value>{staffData.PanNo}</Value>
                    </Row>
                    <Row>
                        <Label>PF Number</Label><Value>{staffData.PFNo}</Value>
                    </Row>
                    <Row>
                        <Label>Bank Name</Label><Value>{staffData.BankName}</Value>
                    </Row>
                    <Row>
                        <Label>Account Number</Label><Value>{staffData.AccountNumber}</Value>
                    </Row>
                    <SectionTitle>Emergency Contact</SectionTitle>
                    <Row>
                        <Label>Contact Name</Label><Value>{staffData.EmergencyContact?.Name}</Value>
                    </Row>
                    <Row>
                        <Label>Contact Number</Label><Value>{staffData.EmergencyContact?.MobileNo}</Value>
                    </Row>

                    <SectionTitle>Salary Month: {payment.Month}</SectionTitle>

                    <Table>
                        <thead>
                            <tr>
                                <TableHeader>Absent</TableHeader>
                                <TableHeader>Leave (Allow 1)</TableHeader>
                                <TableHeader>Late (1=0.25)</TableHeader>
                                <TableHeader>Half Day (1=0.5)</TableHeader>
                                <TableHeader>Present</TableHeader>
                                <TableHeader>Salary Days</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <TableCell>{payment.Salary?.Absent}</TableCell>
                                <TableCell>{payment.Salary?.Leave}</TableCell>
                                <TableCell>{payment.Salary?.Late} x 0.25 = {(payment.Salary?.Late * 0.25).toFixed(2)}</TableCell>
                                <TableCell>{payment.Salary?.Half} x 0.5 = {(payment.Salary?.Half * 0.5).toFixed(2)}</TableCell>
                                <TableCell>{payment.Salary?.Present}</TableCell>
                                <TableCell>30</TableCell>
                            </tr>
                        </tbody>
                    </Table>

                    <Row>
                        <Label>Basic Salary</Label><Value>{payment.Salary?.BaseSalary}</Value>
                    </Row>
                    <Row>
                        <Label>Salary Per Day</Label><Value>{payment.Salary?.PerDaySalary}</Value>
                    </Row>

                    <SectionTitle>Total Salary</SectionTitle>
                    <Row>
                        <Label>Total Basic Salary</Label><Value>{(payment.Salary?.PerDaySalary * 30).toFixed(2)}</Value>
                    </Row>

                    <SectionTitle>Total Deductions</SectionTitle>
                    <Table>
                        <thead>
                            <tr>
                                <TableHeader>Head</TableHeader>
                                <TableHeader>Amount</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {(Array.isArray(payment.Deductions) ? payment.Deductions : []).map((deduction, index) => (
                                <tr key={index}>
                                    <TableCell>{deduction.Title}</TableCell>
                                    <TableCell>{deduction.Amount}</TableCell>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <SectionTitle>Total Allowance</SectionTitle>
                    <Table>
                        <thead>
                            <tr>
                                <TableHeader>Head</TableHeader>
                                <TableHeader>Amount</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {(Array.isArray(payment.Allowance) ? payment.Allowance : []).map((deduction, index) => (
                                <tr key={index}>
                                    <TableCell>{deduction.Title}</TableCell>
                                    <TableCell>{deduction.Amount}</TableCell>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <SectionTitle>Final Salary</SectionTitle>
                    <Row>
                        <Label>Final Salary</Label><Value>{payment.TotalSalary}</Value>
                    </Row>
                    <br />
                    <Row>
                        <Label>Note: Salary information is confidential and should not to be shared with other employees.</Label>
                    </Row>
                </SlipContainer>
            ))}
            <PrintButton onClick={handlePrint}>Print All Slips</PrintButton>
        </>
    );
};

export default PayrollSlip;