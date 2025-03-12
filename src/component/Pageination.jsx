import React from 'react';
import { PaginationWrapper, RowsPerPage, PageNavigation, ArrowButton, PaginationInfo } from './Outerstyle2';

const Pagination = ({ totalRows, rowsPerPage, currentPage, setCurrentPage, setRowsPerPage }) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
          {(currentPage - 1) * rowsPerPage + 1}-{Math.min(currentPage * rowsPerPage, totalRows)} of {totalRows}
        </PaginationInfo>
        <ArrowButton onClick={handlePreviousPage} disabled={currentPage === 1}>{"<"}</ArrowButton>
        <ArrowButton onClick={handleNextPage} disabled={currentPage === totalPages}>{">"}</ArrowButton>
      </PageNavigation>
    </PaginationWrapper>
  );
};

export default Pagination;