import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: 50px auto;
  background-color: #f9f9f9;
  overflow-x: auto;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
`;

const Tab = styled.button`
  background-color: ${(props) => (props.active ? "#688AF6" : "#222D78")};
  color: white;
  border: none;
  border-radius: 8px;
  width: -webkit-fill-available;
  padding: 10px 30px;
  font-size: 16px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    background-color: #6c8cf1;
  }
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 10px;
  }
`;

const Table = styled.table`
  width: 100%;
  /* border-collapse: collapse; */
 
`;

const TableHead = styled.thead`
  background-color: #f4f4f4;
`;

const TableRow = styled.tr`
  background-color: #fff;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableHeader = styled.th`
  padding: 15px;
  text-align: left;
  font-size: 14px;
  color: #666;
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 5px;
  }
  @media (max-width: 376px) {
    font-size: 8px;
    padding: 2px;
  }
`;

const TableData = styled.td`
  padding: 15px;
  text-align: left;
  font-size: 14px;
  color: #333;
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 5px;
  }
  @media (max-width: 376px) {
    font-size: 8px;
    padding: 2px;
  }
`;

const ActionButton = styled.button`
  padding: 8px 20px;
  border-radius: 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
  @media (max-width: 480px) {
    font-size: 9px;
    padding: 5px;
    width: 46px;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid #e0e0e0;
  background-color: #fff;
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 5px;
  }
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

  &:hover {
    background-color: ${(props) => (props.disabled ? "#fff" : "#f0f0f0")};
  }
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 5px;
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
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const LeavingStudentTable = () => {
  const [activeTab, setActiveTab] = useState("entry");
  const [visitorData, setVisitorData] = useState([]);
  const [entryData, setEntryData] = useState([]);
  const [exitData, setExitData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("https://api.edspride.in/student-leaving/all")
      .then((response) => {
        setVisitorData(response.data);
        setEntryData(response.data.filter(item => item.Time && !item.TimeOfLeaving));
        setExitData(response.data.filter(item => item.Time && item.TimeOfLeaving));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const totalPages = Math.ceil(
    (activeTab === "entry" ? entryData.length : exitData.length) / itemsPerPage
  );

  const currentData = (activeTab === "entry" ? entryData : exitData).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleMarkOut = (item) => {
    setEntryData((prev) => prev.filter(entry => entry._id !== item._id));
    setExitData((prev) => [
      ...prev,
      { ...item, TimeOfLeaving: new Date().toLocaleTimeString() }
    ]);
  };

  const handleRowsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <Container>
      <Tabs>
        <Tab active={activeTab === "entry"} onClick={() => setActiveTab("entry")}>
          Entry List
        </Tab>
        <Tab active={activeTab === "exit"} onClick={() => setActiveTab("exit")}>
          Exit List
        </Tab>
      </Tabs>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Time</TableHeader>
            <TableHeader>Class</TableHeader>
            <TableHeader>Section</TableHeader>
            <TableHeader>Purpose</TableHeader>
            <TableHeader>Leaving With</TableHeader>
            <TableHeader>Relation</TableHeader>
            <TableHeader>Approved By</TableHeader>
            <TableHeader>Time of Leaving</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((item) => (
              <TableRow key={item._id}>
                <TableData>{item.Name}</TableData>
                <TableData>{item.Date}</TableData>
                <TableData>{item.Time}</TableData>
                <TableData>{item.Class}</TableData>
                <TableData>{item.Section}</TableData>
                <TableData>{item.Purpose}</TableData>
                <TableData>{item.LeavingWith}</TableData>
                <TableData>{item.Relation}</TableData>
                <TableData>{item.ApprovedBy}</TableData>
                <TableData>{item.TimeOfLeaving || "N/A"}</TableData>
                
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableData colSpan="11">No data available</TableData>
            </TableRow>
          )}
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
    </Container>
  );
};

export default LeavingStudentTable;
