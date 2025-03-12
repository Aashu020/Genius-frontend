import React, { useState, useEffect } from "react";
import {
  Wrapper,
  StyledTable,
  StyledTableHeader,
  HeaderCell,
  TableBody,
  BodyCell,
  PaginationContainer,
  PaginationInfo,
  PaginationButton,
  RowsPerPageDropdown,
} from "./FrontOfficeStyle1";

const PostalRecievedTable = () => {
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
        var filData = data.filter(data => data.Category === "Recieved");
        var saveData = filData.reverse();
        setTasks(saveData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Wrapper>
      <StyledTable>
        <StyledTableHeader>
          <tr>
            <HeaderCell>Receiver</HeaderCell>
            <HeaderCell>Category</HeaderCell>
            <HeaderCell>Date</HeaderCell>
            <HeaderCell>Item</HeaderCell>
            <HeaderCell>No of unit</HeaderCell>
            <HeaderCell>Reference no</HeaderCell>
            <HeaderCell>Address</HeaderCell>
            <HeaderCell>Sender</HeaderCell>
            <HeaderCell>Remark</HeaderCell>
          </tr>
        </StyledTableHeader>
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

export default PostalRecievedTable;