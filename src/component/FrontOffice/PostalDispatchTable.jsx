import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Styled Components (unchanged)
const Wrapper = styled.div`
  width: 90%;
  margin: 20px auto;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

const PostalDispatchTable = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://api.edspride.in/postal/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        var filData = data.filter(data => data.Category === "Dispatch")
        var saveData = (filData.reverse());
        setTasks(saveData); 
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const totalPages = Math.ceil(tasks.length / itemsPerPage);
  const currentData = tasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
            <HeaderCell>Sender</HeaderCell>
            <HeaderCell>Category</HeaderCell>
            <HeaderCell>Date</HeaderCell>
            <HeaderCell>Item</HeaderCell>
            <HeaderCell>No of unit</HeaderCell>
            <HeaderCell>Reference no</HeaderCell>
            <HeaderCell>Address</HeaderCell>
            <HeaderCell>Receiver</HeaderCell>
            <HeaderCell>Remark</HeaderCell>
          </tr>
        </TableHeader>
        <TableBody>
          {currentData.map(task => (
            <tr key={task._id}>
              <BodyCell>{task.Name}</BodyCell>
              <BodyCell>{task.Category}</BodyCell>
              <BodyCell>{task.Date.split("-").reverse().join("-")}</BodyCell>
              <BodyCell>{task.Item}</BodyCell>
              <BodyCell>{task.UnitNo}</BodyCell>
              <BodyCell>{task.ReferenceNo}</BodyCell>
              <BodyCell>{task.Address}</BodyCell>
              <BodyCell>{task.FromWhom}</BodyCell>
              <BodyCell>{task.Remark}</BodyCell>
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

export default PostalDispatchTable;
