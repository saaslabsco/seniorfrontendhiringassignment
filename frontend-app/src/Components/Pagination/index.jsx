import React from "react";
import PropTypes from "prop-types"; 
import "./paginationStyles.css";

const Pagination = ({ currentPage, totalPages, startItem, endItem, totalItems, onPageChange }) => {
  return (
    <div className="pagination">
      <div className="pagination-buttons">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
      </div>

      <span>{`${startItem}-${endItem} of ${totalItems}`}</span>

      <div className="pagination-buttons">
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,  
  totalPages: PropTypes.number.isRequired,   
  startItem: PropTypes.number.isRequired,   
  endItem: PropTypes.number.isRequired,     
  totalItems: PropTypes.number.isRequired,   
  onPageChange: PropTypes.func.isRequired,    
};

export default React.memo(Pagination);
