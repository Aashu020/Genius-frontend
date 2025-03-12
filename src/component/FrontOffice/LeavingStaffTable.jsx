import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import {
//   Wrapper, Table2, TableHeader, HeaderCell, TableBody, BodyCell,
//   PaginationContainer, PaginationInfo, PaginationButton, RowsPerPageDropdown
// } from './FrontOfficeStyles1';

// Styled Components with updated constant names
const Wrapper = styled.div`
  width: 90%;
  margin: 20px auto;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  font-family: "Arial", sans-serif;
  @media (max-width: 468px) {
    width: 100%;
    padding: 0;
    
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 468px) {
    width: 95%;
    margin: 0px auto;
  }
`;

const TableHeader = styled.thead`
  color: black;
  font-weight: bolder;
`;

const HeaderCell = styled.th`
  padding: 12px;
  text-align: left;
  font-size: 14px;
  color: #666;
  font-weight: bold;
  border-bottom: 1px solid #e0e0e0;
  @media (max-width: 468px) {
    padding: 5px;
    font-size: 10px;
  }
`;

const TableBody = styled.tbody`
  color: black;
`;

const BodyCell = styled.td`
  padding: 12px;
  text-align: left;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
  @media (max-width: 468px) {
    padding: 5px;
    font-size: 10px;
  }
`;


const PaginationContainer = styled.div`
  display: flex;
  justify-content: end; 
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid #e0e0e0;
  background-color: #fff;
  @media (max-width:480px){
    font-size: 10px;
    padding: 5px;
  }
  @media (max-width:376px){
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
  display: flex;
  flex-direction: column;

  
  &:hover {
    background-color: ${(props) => (props.disabled ? "#fff" : "#f0f0f0")};
  }
  @media (max-width:480px){
    font-size: 10px;
    padding: 5px;
  }
  @media (max-width:376px){
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
  @media (max-width:480px){
    font-size: 10px;
  }
  @media (max-width:376px){
    font-size: 8px;
    padding: 2px;
  }

`;


const LeavingStaffTable = () => {
  const [staffData, setStaffDta] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8007/staff-leaving/all")
      .then((response) => {
        setStaffDta(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  // ****************************

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(staffData.length / itemsPerPage);

  const currentData = staffData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    <Wrapper>
      <StyledTable>
        <TableHeader>
          <tr>
            <HeaderCell>Employee Name</HeaderCell>
            <HeaderCell>Department</HeaderCell>
            <HeaderCell>Purpose</HeaderCell>
            <HeaderCell>Back</HeaderCell>
            <HeaderCell>Time of back</HeaderCell>
            <HeaderCell>Vehicle</HeaderCell>
            {/* <HeaderCell>Time</HeaderCell> */}
            <HeaderCell>Time of Leaving</HeaderCell>
            <HeaderCell>Approved by</HeaderCell>
          </tr>
        </TableHeader>
        <TableBody>
          {currentData.map((task) => (
            <tr key={task.id}>
              <BodyCell>{task.Name}</BodyCell>
              <BodyCell>{task.Department}</BodyCell>
              <BodyCell>{task.Purpose}</BodyCell>
              <BodyCell>{task.WillBack?"Yes":"No"}</BodyCell>
              <BodyCell>{task.TimeOfBack}</BodyCell>
              <BodyCell>{task.VehicleUsed}</BodyCell>
              {/* <BodyCell>{task.Time}</BodyCell> */}
              <BodyCell>{task.TimeOfLeaving}</BodyCell>
              <BodyCell>{task.ApprovedBy}</BodyCell>
            </tr>
          ))}
        </TableBody>
      </StyledTable>
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
    </Wrapper>
  );
};

export default LeavingStaffTable;