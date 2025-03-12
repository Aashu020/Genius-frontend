import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Edit, Trash2 } from "lucide-react";

const Container = styled.div`
  display: flex;
  height: calc(100vh - 35px);
  background-color: #f4f4f4;
`;

const MainDashboard = styled.div`
  flex: 1;
  height: calc(100vh - 100px);
  overflow-y: auto;
  padding: 20px;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
`;

const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.div`
  width: 30%;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-bottom: 40px;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.span`
  position: absolute;
  top: -10px;
  left: 20px;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
`;

const Input = styled.input`
  width: 88%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  outline: none;
`;

const SubmitButton = styled.button`
  width: 320px;
  padding: 12px;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  margin-top: 20px;

  &:hover {
    background: linear-gradient(270deg, #1c2563 0%, #662acc 100%);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Td1 = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 1rem;
`;

const EditButton = styled.div`
  cursor: pointer;
  background-color: #209a16bf;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
`;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: end; 
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid #e0e0e0;
  background-color: #fff;
`;

const PaginationInfo = styled.div`
  display: flex;
  align-items: center;
  color: #888;
`;

const PaginationButton = styled.button`
  background-color: #fff;
  color: ${(props) => (props.disabled ? "#ccc" : "#000")};
  border: none;
  padding: 5px 15px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 14px;
  
  &:hover {
    background-color: ${(props) => (props.disabled ? "#fff" : "#f0f0f0")};
  }
`;

const RowsPerPageDropdown = styled.select`
  margin: 0 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  font-size: 14px;
  cursor: pointer;
`;

const Electricity = () => {
  const [meterNo, setMeterNo] = useState("");
  const [editId, setEditId] = useState(null);
  const [reading7AM, setReading7AM] = useState(0);
  const [reading3PM, setReading3PM] = useState(0);
  const [reading7PM, setReading7PM] = useState(0);
  const [data, setData] = useState([]);
  const [totalReading, setTotalReading] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8007/electricity/all");
        setData(response.data.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const meterReadings = {
          MeterNo: meterNo,
          Reading: {
            ReadingAt7AM: Number(reading7AM),
            ReadingAt3PM: Number(reading3PM),
            ReadingAt7PM: Number(reading7PM),
            Total: Number(reading7AM) + Number(reading3PM) + Number(reading7PM),
          },
        };
        await axios.put(`http://localhost:8007/electricity/update/${editId}`, meterReadings);
        // Reset input fields
        setMeterNo("");
        setReading7AM("");
        setReading3PM("");
        setReading7PM("");
        setEditId(null);
      } else {
        const meterReadings = {
          Date: new Date().toISOString(),
          MeterNo: meterNo,
          Reading: {
            ReadingAt7AM: Number(reading7AM),
            ReadingAt3PM: Number(reading3PM),
            ReadingAt7PM: Number(reading7PM),
            Total: Number(reading7AM) + Number(reading3PM) + Number(reading7PM),
          },
        };
        await axios.post("http://localhost:8007/electricity/add", meterReadings);
        // Reset input fields
        setMeterNo("");
        setReading7AM("");
        setReading3PM("");
        setReading7PM("");
        setEditId(null);
      }
      // Re-fetch data
      const response = await axios.get("http://localhost:8007/electricity/all");
      setData(response.data);
    } catch (error) {
      console.error("Error adding meter reading:", error.response ? error.response.data : error.message);
    }
  };

  const editData = (data) => {
    setEditId(data._id);
    setMeterNo(data.MeterNo);
    setReading7AM(data.Reading?.ReadingAt7AM || 0);
    setReading3PM(data.Reading?.ReadingAt3PM || 0);
    setReading7PM(data.Reading?.ReadingAt7PM || 0);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleRowsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <MainDashboard>
      <FormContainer>
        <Title>Add Meter Readings</Title>
        <Form onSubmit={handleSubmit}>
          <Heading>Details</Heading>
          <Main>
            <InputContainer>
              <Label>MeterNo</Label>
              <Input
                type="text"
                placeholder="Enter Meter Number"
                value={meterNo}
                onChange={(e) => setMeterNo(e.target.value)}
              />
            </InputContainer>
          </Main>
          <Heading>Meter Timings</Heading>
          <Main>
            <InputContainer>
              <Label>Reading At 7AM</Label>
              <Input
                type="number"
                placeholder="Enter Reading"
                value={reading7AM}
                onChange={(e) => setReading7AM(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <Label>Reading At 3PM</Label>
              <Input
                type="number"
                placeholder="Enter Reading"
                value={reading3PM}
                onChange={(e) => setReading3PM(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <Label>Reading At 7PM</Label>
              <Input
                type="number"
                placeholder="Enter Reading"
                value={reading7PM}
                onChange={(e) => setReading7PM(e.target.value)}
              />
            </InputContainer>
          </Main>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <SubmitButton type="button" onClick={() => {}}>
              Total Reading: {Number(reading7AM) + Number(reading3PM) + Number(reading7PM)}
            </SubmitButton>
            <SubmitButton type="submit">Submit</SubmitButton>
          </div>
        </Form>

        <Table>
          <thead>
            <tr>
              <Th>Sr. No</Th>
              <Th>Meter No</Th>
              <Th>Reading</Th>
              <Th>Total Reading</Th>
              <Th>Time</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((reading, index) => {
              return (
                <tr key={reading._id}>
                  <Td>{(currentPage - 1) * itemsPerPage + index + 1}</Td>
                  <Td>{reading.MeterNo}</Td>
                  <Td>
                    Reading at 7AM: {reading.Reading?.ReadingAt7AM || 0},
                    Reading at 3PM: {reading.Reading?.ReadingAt3PM || 0},
                    Reading at 7PM: {reading.Reading?.ReadingAt7PM || 0}
                  </Td>
                  <Td>{reading.Reading?.ReadingAt7PM - reading.Reading?.ReadingAt7AM}</Td>
                  <Td>{new Date(reading.Date).toLocaleString()}</Td>
                  <Td1>
                    <EditButton onClick={() => editData(reading)}>
                      Edit
                      <Edit size={18} />
                    </EditButton>
                    <DeleteButton>
                      <Trash2 size={18} />
                    </DeleteButton>
                  </Td1>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <PaginationContainer>
          <PaginationInfo>
            Rows per page:
            <RowsPerPageDropdown onChange={handleRowsPerPageChange} value={itemsPerPage}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </RowsPerPageDropdown>
            {currentPage} of {totalPages}
          </PaginationInfo>

          <div>
            <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </PaginationButton>
            <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </PaginationButton>
          </div>
        </PaginationContainer>
      </FormContainer>
    </MainDashboard>
  );
};

export default Electricity;
