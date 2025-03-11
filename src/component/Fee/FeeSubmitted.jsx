import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MainDashboard = styled.div`
  flex: 1;
  height: calc(100vh - 100px);
  overflow-y: auto;
  padding: 20px;
`;

const FeeSubmittedWrapper = styled.div`
  max-width: 600px;
  width: 85%;
  margin: 40px auto;
  padding: 20px;
  background-color: #f3f4f6;
  border-radius: 8px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #2b2d7b;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
    font-size: 14px;
  }

  th {
    background-color: #f0f0f0;
    color: #555;
    font-weight: bold;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const FeeSubmitted = () => {
  const tableRef = useRef();
  const location = useLocation();
  const [paymentData, setPaymentData] = useState("");
  

  useEffect(()=>{
    const data = location.state.paymentData;
    setPaymentData(data);
  },[])

  const handleDownload = async () => {
    const tableElement = tableRef.current;
    const canvas = await html2canvas(tableElement);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const padding = 10; // 10mm padding
    const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * padding;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", padding, padding, pdfWidth, pdfHeight);
    pdf.save("FeeSlip.pdf");
  };

  return (
    <MainDashboard>
      <FeeSubmittedWrapper ref={tableRef}>
        <Title>Fee Submitted</Title>
        <Table>
          <tbody>
            <tr>
              <th>Registration/ID</th>
              <td>{paymentData?.StudentId}</td>
            </tr>
            <tr>
              <th>Class Name</th>
              <td>{paymentData?.Payments[0]?.Fee[0]?.Name}</td>
            </tr>
            <tr>
              <th>Fee Month</th>
              <td>{paymentData.Payments.map(p => p.Months.join(", ")).join(", ")}</td>
            </tr>
            <tr>
              <th>Total Amount</th>
              <td>{paymentData.TotalFee}</td>
            </tr>
            <tr>
              <th>Deposit</th>
              <td>{paymentData.TotalFee - paymentData.RemainingFee}</td>
            </tr>
            <tr>
              <th>Remaining Balance</th>
              <td>{paymentData.RemainingFee}</td>
            </tr>
          </tbody>
        </Table>
        <ButtonContainer>
          <Button onClick={handleDownload}>Download Slip</Button>
          <Button>Save Slip</Button>
          <Button>Print Slip</Button>
        </ButtonContainer>
      </FeeSubmittedWrapper>
    </MainDashboard>
  );
};

export default FeeSubmitted;
