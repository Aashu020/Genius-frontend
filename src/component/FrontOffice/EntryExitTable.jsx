import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Styled components...
const Container1 = styled.div`
  width: 100%;
  margin: 50px auto;
  background-color: #f9f9f9;
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
  border-collapse: collapse;
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


const StatusButton = styled.button`
  padding: 5px 15px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.status === "CHECKED IN"
      ? "#e0e7ff"
      : props.status === "WAITING"
      ? "#f8d7da"
      : "#e2e3e5"};
  color: ${(props) =>
    props.status === "CHECKED IN"
      ? "#1e40af"
      : props.status === "WAITING"
      ? "#a94442"
      : "#737373"};
  border: none;
  font-weight: bold;
  font-size: 12px;
  @media (max-width: 480px) {
    font-size: 9px;
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
  @media (max-width: 376px) {
    font-size: 8px;
    padding: 2px;
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
  @media (max-width: 376px) {
    font-size: 8px;
    padding: 2px;
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
  font-size: 14px;


  &:hover {
    background-color: ${(props) => (props.disabled ? "#fff" : "#f0f0f0")};
  }
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 5px;
  }
  @media (max-width: 376px) {
    font-size: 8px;
    padding: 2px;
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
  @media (max-width: 376px) {
    font-size: 8px;
    padding: 2px;
  }
`;


const EntryExitTable = () => {
  const [activeTab, setActiveTab] = useState("entry");
  const [visitorData, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:8007/visitor/all")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const totalPages = Math.ceil(visitorData.length / itemsPerPage);
  const currentData = visitorData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleMarkOut = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8007/visitor/${id}/outtime`);
      // Update the local state with the new data
      setData((prevData) =>
        prevData.map((item) =>
          item._id === id
            ? { ...item, outTime: response.data.visitor.OutTime, status: "COMPLETED" }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating out time:", error);
    }
  };

  return (
    <Container1>
      <Tabs>
        <Tab active={activeTab === "entry"} onClick={() => setActiveTab("entry")}>
          Entry List
        </Tab>
        <Tab active={activeTab === "exit"} onClick={() => setActiveTab("exit")}>
          Exit List
        </Tab>
      </Tabs>

      {activeTab === "entry" && (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>No of Visitor</TableHeader>
              <TableHeader>Purpose</TableHeader>
              <TableHeader>Contact Details</TableHeader>
              <TableHeader>IN time</TableHeader>
              <TableHeader>OUT time</TableHeader>
              <TableHeader>Action</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {currentData.map((item) => (
              <TableRow key={item._id}>
                <TableData>{item.Name}</TableData>
                <TableData>{item.TotalVisitorNo}</TableData>
                <TableData>{item.Purpose}</TableData>
                <TableData>{item.MobileNo}</TableData>
                <TableData>{item.InTime}</TableData>
                <TableData>{item.OutTime}</TableData>
                <TableData>
                  <ActionButton onClick={() => handleMarkOut(item._id)}>
                    {item.status === "PENDING" ? "MARK DONE ✅" : "MARK OUT ✅"}
                  </ActionButton>
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}

      {activeTab === "exit" && (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>No of Visitor</TableHeader>
              <TableHeader>Purpose</TableHeader>
              <TableHeader>Contact Details</TableHeader>
              <TableHeader>IN time</TableHeader>
              <TableHeader>OUT time</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {currentData.map((item) => (
              <TableRow key={item._id}>
                <TableData>{item.Name}</TableData>
                <TableData>{item.TotalVisitorNo}</TableData>
                <TableData>{item.Purpose}</TableData>
                <TableData>{item.MobileNo}</TableData>
                <TableData>{item.InTime}</TableData>
                <TableData>{item.OutTime}</TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}

      <PaginationContainer>
        <PaginationInfo>
          Rows per page:
          <RowsPerPageDropdown>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </RowsPerPageDropdown>
          1-{totalPages} of {visitorData.length}
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
    </Container1>
  );
};

export default EntryExitTable;
