import { calcStartEndPageRange, generatePageNumber } from '../util';

function Pagination({ totalPages, currentPage, onPageChange }) {
  const pageRange = calcStartEndPageRange(totalPages, currentPage);

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav className="pagination-container" aria-label="Pagination Navigater">
      <button
        aria-label="
        Go
        to
        Previous
    page"
        className="pagination-button-previous"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pageRange.map((page) => (
        <button
          className={`pagination-button ${currentPage === page ? 'active' : ''}`}
          key={page}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}

      <button
        aria-label="Go to Next Page"
        className="pagination-button-next "
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
