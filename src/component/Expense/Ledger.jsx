import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
  width: 80%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;
const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
  height: calc(100vh - 100px);
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DateRange = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  padding: 8px;
  margin: 0 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background-color: darkslategray;
  }
`;

const SchoolHeader = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 14px;
`;

const TableContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 48%;
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
  margin: 0 auto;
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
      .get("http://localhost:8007/schoolsetup/all")
      .then((response) => {
        // console.log(response.data);
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
      const response = await axios.get('http://localhost:8007/revenue/all');
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
      const logoImg = new Image();
      logoImg.src = `http://localhost:8007/uploads/${school?.SchoolLogo}`;
      logoImg.onload = () => {
        const logoWidth = 10; // Adjust as necessary
        const logoHeight = 10; // Adjust as necessary
        const logoX = (pdfWidth - logoWidth) / 2 + padding; // Centered
        const logoY = padding; // Adjust based on your layout
  
        pdf.addImage(logoImg, 'PNG', logoX, logoY, logoWidth, logoHeight);
        pdf.save('ledger.pdf');
      };
    });
  };
  

  return (
    <MainDashboard>
      <Container>
        <Header>
          <DateRange>
            <label>From</label>
            <Input
              type="date"
              value={startDate}
              onChange={e => handleDateChange(e.target.value, endDate)}
            />
            <label>To</label>
            <Input
              type="date"
              value={endDate}
              onChange={e => handleDateChange(startDate, e.target.value)}
            />
          </DateRange>
          <div>
            <Button onClick={() => fetchData(startDate, endDate)}>Search</Button>
            <Button onClick={() => {
              const today = new Date();
              const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
              const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

              setStartDate(firstDayOfMonth.toISOString().split('T')[0]);
              setEndDate(lastDayOfMonth.toISOString().split('T')[0]);
              fetchData(firstDayOfMonth.toISOString().split('T')[0], lastDayOfMonth.toISOString().split('T')[0]);
            }}>
              Clear
            </Button>
          </div>
        </Header>

        <div ref={printRef}>
          <SchoolHeader>
            <img style={{height:"80px"}} src={`http://localhost:8007/uploads/${school?.SchoolLogo.replace(/^uploads\//, '')}`} alt="" />
            <h2>{school?.SchoolName}</h2>
            <p>{school?.EmailId} | {school?.PhoneNo} </p>
            <p>{school?.Website}</p>
            <p>{`${startDate.split("-").reverse().join("-")} to ${endDate.split("-").reverse().join("-")}`}</p>
          </SchoolHeader>

          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <Th colSpan="2">Expenses</Th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(expense => (
                  <tr key={expense._id}>
                    <Td>{expense.Label}</Td>
                    <Td align="right">₹ {expense.Amount}</Td>
                  </tr>
                ))}
                <TotalRow>
                  <Td>Total</Td>
                  <Td align="right">₹ {expenses.reduce((total, exp) => total + exp.Amount, 0)}</Td>
                </TotalRow>
              </tbody>
            </Table>

            <Table>
              <thead>
                <tr>
                  <Th colSpan="2">Incomes</Th>
                </tr>
              </thead>
              <tbody>
                {incomes.map(income => (
                  <tr key={income._id}>
                    <Td>{income.Label}</Td>
                    <Td align="right">₹ {income.Amount}</Td>
                  </tr>
                ))}
                <TotalRow>
                  <Td>Total</Td>
                  <Td align="right">₹ {incomes.reduce((total, inc) => total + inc.Amount, 0)}</Td>
                </TotalRow>
              </tbody>
            </Table>
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
