import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import axios from 'axios';

// Register the required chart.js components
Chart.register(ArcElement, Tooltip, Legend);

// Styled Components
const Container = styled.div`
  /* display: flex;
  justify-content: space-between; */
  width: 30vw;
  margin: 20px auto;
  @media (max-width:768px){
    flex-direction:column;
    gap:2rem;
    align-items: center;
  }
`;

const Card = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* width: 50%; */
  text-align: center;
  @media (max-width:480px){
   width: 80%;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title1 = styled.h4`
  font-size: 20px;
  color: #1a237e;
`;

const Section = styled.div`
  display: flex;
  gap: 5px;
  button {
    border-radius: 5px;
    border: 0.5px solid;
    background-color: transparent;
    padding: 2px 8px;
    color: black;
  }
`;

const Subtitle = styled.p`
  font-size: 12px;
  color: #666;
`;

const DynamicCharts = () => {
  const [totalFee, setTotalFee] = useState(0);
  const [remainingFee, setRemainingFee] = useState(0);

  useEffect(() => {
    // Fetch the fee data from the API
    const fetchFeeData = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/fee-data/all");
        // setStudents(response.data); // Assuming the response is an array of student fee data

        // Calculate totalFee and remainingFee by iterating over the response data
        const total = response.data.reduce((sum, student) => sum + student.TotalFee, 0);
        const remaining = response.data.reduce((sum, student) => sum + student.RemainingFee, 0);

        setTotalFee(total);
        setRemainingFee(remaining);

        // Log the calculated total and remaining fees
        console.log("Total Fee:", total);
        console.log("Remaining Fee:", remaining);
      } catch (error) {
        console.error("Error fetching fee data:", error);
      }
    };

    fetchFeeData();
  }, []);

  const totalFeePaid = totalFee - remainingFee;

  // Fee Received Doughnut chart data
  const doughnutData = {
    labels: ['Fee Remaining', 'Fee Paid'],
    datasets: [
      {
        label: 'Fee Status',
        data: [remainingFee, totalFeePaid],
        backgroundColor: ['#688AF6', '#FC858F'],
        hoverOffset: 4,
      },
    ],
  };

  // Function to download CSV
  const downloadCSV = (data, filename) => {
    const csvData = data.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${filename}.csv`);
  };

  // Function to download Excel
  const downloadExcel = (data, filename) => {
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
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

  const doughnutColumns = ['Label', 'Value'];
  const doughnutRows = doughnutData.labels.map((label, index) => [label, doughnutData.datasets[0].data[index]]);

  return (
    <Container>
      {/* Fee Received Chart */}
      <Card>
        <TitleWrapper>
          <Title1>Fee Status</Title1>
          <Section>
            <button onClick={() => downloadPDF('Fee Status', doughnutColumns, doughnutRows)}>PDF</button>
            <button className='blue' onClick={() => downloadCSV([doughnutColumns, ...doughnutRows], 'Fee_Status')}>CSV</button>
            <button className='green' onClick={() => downloadExcel([doughnutColumns, ...doughnutRows], 'Fee_Status')}>Excel</button>
          </Section>
        </TitleWrapper>
        <Doughnut data={doughnutData} />
        <Subtitle>
          <span style={{ color: '#64b5f6' }}>●</span> Fee Remaining &nbsp;&nbsp;
          <span style={{ color: '#f06292' }}>●</span> Fee Paid
        </Subtitle>
      </Card>
    </Container>
  );
};

export default DynamicCharts;
