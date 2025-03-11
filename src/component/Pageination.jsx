import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for pagination
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const RowsPerPage = styled.div`
  display: flex;
  align-items: center;

  select {
    margin-left: 5px;
  }
`;

const PageNavigation = styled.div`
  display: flex;
  align-items: center;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => (props.disabled ? '#ccc' : '#000')};
  font-size: 16px;
  margin: 0 5px;

  &:hover {
    color: ${props => (props.disabled ? '#ccc' : '#000')};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const PaginationInfo = styled.span`
  margin-right: 10px;
`;

const Pagination = ({ totalRows, rowsPerPage, currentPage, setCurrentPage, setRowsPerPage }) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <PaginationWrapper>
      <RowsPerPage>
        Rows per page:
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </RowsPerPage>

      <PageNavigation>
        <PaginationInfo>
          {$(currentPage - 1) * rowsPerPage + 1}-${Math.min(currentPage * rowsPerPage, totalRows)} of ${totalRows}
        </PaginationInfo>

        <ArrowButton onClick={handlePreviousPage} disabled={currentPage === 1}>
          &lt;
        </ArrowButton>
        <ArrowButton onClick={handleNextPage} disabled={currentPage === totalPages}>
          &gt;
        </ArrowButton>
      </PageNavigation>
    </PaginationWrapper>
  );
};

export default Pagination;