import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container, Tabs, Tab, Table, TableHead, TableRow, TableHeader,
  TableData, ActionButton, PaginationContainer, PaginationInfo,
  PaginationButton, RowsPerPageDropdown
} from './FrontOfficeStyles1';


const LeavingStudentTable = () => {
  const [activeTab, setActiveTab] = useState("entry");
  const [visitorData, setVisitorData] = useState([]);
  const [entryData, setEntryData] = useState([]);
  const [exitData, setExitData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:8007/student-leaving/all")
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
    <>
      <Container>
        <Tabs style={{display: "flex"}}>
        <Tab active={activeTab === "entry"} onClick={() => setActiveTab("entry")}>
          Entry List
        </Tab>
        <Tab active={activeTab === "exit"} onClick={() => setActiveTab("exit")}>
          Exit List
        </Tab>
      </Tabs>
      </Container>
    <Container>

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
    </>
  );
};

export default LeavingStudentTable;
