import React from 'react';

const CustomPagination = React.memo(({ rowsPerPage, totalRecords, pagination, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRecords / rowsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {currentPage > 1 && (
          <li>
            <button onClick={() => pagination(currentPage - 1)}>Previous</button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button onClick={() => pagination(number)}>{number}</button>
          </li>
        ))}
        {currentPage < pageNumbers.length && (
          <li>
            <button onClick={() => pagination(currentPage + 1)}>Next</button>
          </li>
        )}
      </ul>
    </nav>
  );
});

export default CustomPagination;
