import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Container3, Tabs, Tab, Table, TableHead, TableRow, TableHeader,
  TableData, StatusButton, ActionButton, PaginationContainer,
  PaginationInfo, PaginationButton, RowsPerPageDropdown
} from './FrontOfficeStyles1';
import  baseURL from '../utils/Url'; 
const EntryExitTable = () => {
  const [activeTab, setActiveTab] = useState("entry");
  const [visitorData, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get(`${baseURL}/visitor/all`)
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
      const response = await axios.put(`${baseURL}/visitor/${id}/outtime`);
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
    <Container3>
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
    </Container3>
  );
};

export default EntryExitTable;
