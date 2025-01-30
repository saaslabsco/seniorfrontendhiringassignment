import React from "react";
import "./styles.css";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const handlePageChange = (page) => {
    console.log(page, "handleChange");
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = renderPagination();

  return (
    <div className="pagination" aria-label="Pagination">
      {/* First Page Button */}
      <button
        data-testid="first-page"
        disabled={currentPage === 1}
        aria-disabled={currentPage === 1}
        aria-label="Go to first page"
        onClick={() => handlePageChange(1)}
      >
        &lt;&lt;
      </button>

      {/* Previous Page Button */}
      <button
        data-testid="prev-page"
        disabled={currentPage === 1}
        aria-disabled={currentPage === 1}
        aria-label="Go to previous page"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        &lt;
      </button>

      {currentPage > 3 && (
        <>
          <button aria-label="Go to page 1" onClick={() => handlePageChange(1)}>
            1
          </button>
          <span aria-hidden="true" className="ellipsis">
            ...
          </span>
        </>
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={page === currentPage ? "active" : ""}
          aria-current={page === currentPage ? "page" : undefined}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages - 2 && (
        <>
          <span aria-hidden="true" className="ellipsis">
            ...
          </span>
          <button
            aria-label={`Go to page ${totalPages}`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Page Button */}
      <button
        data-testid="next-page"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        &gt;
      </button>

      {/* Last Page Button */}
      <button
        data-testid="last-page"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-disabled={currentPage === totalPages}
        aria-label="Go to last page"
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
