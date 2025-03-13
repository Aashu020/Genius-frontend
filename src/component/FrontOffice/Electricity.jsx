import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Edit, Trash2 } from "lucide-react";
import {
  Container2, MainDashboard, Title, Form, Heading, Main, FormContainer,
  InputContainer, Label, Input, SubmitButton, Table, Th, Td, Td1,
  EditButton, DeleteButton, PaginationContainer, PaginationInfo,
  PaginationButton, RowsPerPageDropdown
} from './FrontOfficeStyles1';


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
