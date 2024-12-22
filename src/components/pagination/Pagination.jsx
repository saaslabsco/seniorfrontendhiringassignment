/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = new Set([
      1,
      currentPage,
      totalPages,
      currentPage - 1,
      currentPage + 1,
    ]);
    return [...pageNumbers]
      .filter((num) => num > 0 && num <= totalPages)
      .sort((a, b) => a - b);
  };

  const pageNumbers = getPageNumbers();

  const renderPageButtons = (pageNum) => {
    return (
      <button
        key={pageNum}
        onClick={() => onPageChange(pageNum)}
        aria-current={currentPage === pageNum ? "page" : undefined}
        aria-label={`Go to page ${pageNum}`}
        className={currentPage === pageNum ? "active" : ""}
      >
        {pageNum}
      </button>
    );
  };

  return (
    <nav
      className="pagination"
      aria-label="Pagination Navigation"
      role="navigation"
    >
      <button
        className="nav-btn"
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Go to previous page"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <div className="page-numbers">
        {pageNumbers.map((pageNum, index) => {
          const prevPage = pageNumbers[index - 1];
          return (
            <React.Fragment key={pageNum}>
              {prevPage && pageNum - prevPage > 1 && (
                <span className="ellipsis" aria-hidden="true">
                  ...
                </span>
              )}
              {renderPageButtons(pageNum)}
            </React.Fragment>
          );
        })}
      </div>

      <button
        className="nav-btn"
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
