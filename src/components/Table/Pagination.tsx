import React from "react";
import "../styles/table.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="pagination-container">
      <button
        className={`pagination-btn ${isPrevDisabled ? "disabled" : ""}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isPrevDisabled}
      >
        Previous
      </button>
      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className={`pagination-btn ${isNextDisabled ? "disabled" : ""}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isNextDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
