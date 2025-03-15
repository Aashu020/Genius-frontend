import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import  baseURL from '../utils/Url'; 
const Container = styled.div`
  padding: 20px;
  width: 85%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
  height: calc(100vh - 100px);
  overflow-y: auto;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;

`;

const DateRangeContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
  margin-bottom: 10px;
`;

const DateFieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
 
 

  
  @media (min-width: 480px) {
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }
`;

const DateLabel = styled.label`
  font-weight: 500;
  margin-bottom: 3px;
  
  @media (min-width: 480px) {
    margin-bottom: 0;
    min-width: 40px;
  }
`;

const DateInput = styled.input`
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  
  @media (min-width: 480px) {
    width: auto;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  margin-top: 8px;
  
  @media (min-width: 480px) {
    justify-content: flex-start;
  }
`;

const Button = styled.button`
  padding: 8px 12px;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
  min-width: 80px;
  font-size: 14px;
  
  &:hover {
    background-color: darkslategray;
  }
  
  @media (min-width: 480px) {
    flex: 0 0 auto;
  }
`;

const SchoolHeader = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 14px;
  img {
    max-width: 100%;
    height: auto;
    max-height: 80px;
  }
`;

const TableContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 20px;
  overflow-x: auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TableWrapper = styled.div`
  width: 48%;
  overflow-x: auto;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Table = styled.table`
  width: 100%;
  min-width: 300px;
  border-collapse: collapse;
`;

const Th = styled.th`
  border-bottom: 1px solid #ccc;
  padding: 8px;
  text-align: left;
  background-color: #f0f0f0;
`;

const Td = styled.td`
  border-bottom: 1px solid #ccc;
  padding: 8px;
`;

const TotalRow = styled.tr`
  font-weight: bold;
`;

const ProfitContainer = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const PrintButton = styled(Button)`
  display: block;
  margin: 20px auto;
  width: 100%;
  max-width: 200px;
`;

const Ledger = () => {
  const printRef = useRef();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [school, setSchool] = useState(null);

  useEffect(() => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    setStartDate(firstDayOfMonth.toISOString().split('T')[0]);
    setEndDate(lastDayOfMonth.toISOString().split('T')[0]);

    fetchData(firstDayOfMonth.toISOString().split('T')[0], lastDayOfMonth.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    axios
      .get(`${baseURL}/schoolsetup/all`)
      .then((response) => {
        if (response.data.length > 0) {
          setSchool(response.data[0])
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }, [])

  const fetchData = async (start, end) => {
    try {
      const response = await axios.get(`${baseURL}/revenue/all`);
      const filteredData = response.data.filter(item => {
        const date = new Date(item.Date);
        return date >= new Date(start) && date <= new Date(end);
      });
      setExpenses(filteredData.filter(item => item.Type === 'Expense'));
      setIncomes(filteredData.filter(item => item.Type === 'Income'));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    fetchData(newStartDate, newEndDate);
  };

  const handleClear = () => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    setStartDate(firstDayOfMonth.toISOString().split('T')[0]);
    setEndDate(lastDayOfMonth.toISOString().split('T')[0]);
    fetchData(firstDayOfMonth.toISOString().split('T')[0], lastDayOfMonth.toISOString().split('T')[0]);
  };

  const handlePrint = () => {
    const input = printRef.current;
    const padding = 10;
  
    html2canvas(input, {
      scale: 2,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * padding;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      // Add the main content image
      pdf.addImage(imgData, 'PNG', padding, padding, pdfWidth, pdfHeight);
      
      // Extract and add the school logo image
      if (school?.SchoolLogo) {
        const logoImg = new Image();
        logoImg.src = `${baseURL}/uploads/${school.SchoolLogo}`;
        logoImg.onload = () => {
          const logoWidth = 10; // Adjust as necessary
          const logoHeight = 10; // Adjust as necessary
          const logoX = (pdfWidth - logoWidth) / 2 + padding; // Centered
          const logoY = padding; // Adjust based on your layout
    
          pdf.addImage(logoImg, 'PNG', logoX, logoY, logoWidth, logoHeight);
          pdf.save('ledger.pdf');
        };
        logoImg.onerror = () => {
          pdf.save('ledger.pdf');
        };
      } else {
        pdf.save('ledger.pdf');
      }
    });
  };

  return (
    <MainDashboard>
      <Container>
        <Header>
          <DateRangeContainer>
            <DateFieldGroup>
              <DateLabel>From:</DateLabel>
              <DateInput
                type="date"
                value={startDate}
                onChange={e => handleDateChange(e.target.value, endDate)}
              />
            </DateFieldGroup>
            
            <DateFieldGroup>
              <DateLabel>To:</DateLabel>
              <DateInput
                type="date"
                value={endDate}
                onChange={e => handleDateChange(startDate, e.target.value)}
              />
            </DateFieldGroup>
            
            <ButtonGroup>
              <Button onClick={() => fetchData(startDate, endDate)}>Search</Button>
              <Button onClick={handleClear}>Clear</Button>
            </ButtonGroup>
          </DateRangeContainer>
        </Header>

        <div ref={printRef}>
          <SchoolHeader>
            {school?.SchoolLogo && (
              <img 
                src={`${baseURL}/uploads/${school?.SchoolLogo.replace(/^uploads\//, '')}`}
                alt="School Logo" 
              />
            )}
            <h2>{school?.SchoolName}</h2>
            <p>{school?.EmailId} | {school?.PhoneNo} </p>
            <p>{school?.Website}</p>
            <p>{`${startDate.split("-").reverse().join("-")} to ${endDate.split("-").reverse().join("-")}`}</p>
          </SchoolHeader>

          <TableContainer>
            <TableWrapper>
              <Table>
                <thead>
                  <tr>
                    <Th>Expenses</Th>
                    <Th align="right">Amount</Th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.length > 0 ? (
                    expenses.map(expense => (
                      <tr key={expense._id}>
                        <Td>{expense.Label}</Td>
                        <Td align="right">₹ {expense.Amount}</Td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <Td colSpan="2" style={{ textAlign: 'center' }}>No expenses found</Td>
                    </tr>
                  )}
                  <TotalRow>
                    <Td>Total</Td>
                    <Td align="right">₹ {expenses.reduce((total, exp) => total + exp.Amount, 0)}</Td>
                  </TotalRow>
                </tbody>
              </Table>
            </TableWrapper>

            <TableWrapper>
              <Table>
                <thead>
                  <tr>
                    <Th>Incomes</Th>
                    <Th align="right">Amount</Th>
                  </tr>
                </thead>
                <tbody>
                  {incomes.length > 0 ? (
                    incomes.map(income => (
                      <tr key={income._id}>
                        <Td>{income.Label}</Td>
                        <Td align="right">₹ {income.Amount}</Td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <Td colSpan="2" style={{ textAlign: 'center' }}>No incomes found</Td>
                    </tr>
                  )}
                  <TotalRow>
                    <Td>Total</Td>
                    <Td align="right">₹ {incomes.reduce((total, inc) => total + inc.Amount, 0)}</Td>
                  </TotalRow>
                </tbody>
              </Table>
            </TableWrapper>
          </TableContainer>

          <ProfitContainer>
            <p>Profit</p>
            <p>₹ {incomes.reduce((total, inc) => total + inc.Amount, 0) - expenses.reduce((total, exp) => total + exp.Amount, 0)}</p>
          </ProfitContainer>
        </div>

        <PrintButton onClick={handlePrint}>Print</PrintButton>
      </Container>
    </MainDashboard>
  );
};

export default Ledger;