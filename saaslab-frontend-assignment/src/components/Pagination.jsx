import { generatePageNumber } from '../util';
import { visiblePageCount } from '../../constant';

function Pagination({ totalPages, currentPage, onPageChange }) {
  const startPage = Math.max(1, currentPage - Math.floor(visiblePageCount / 2));
  const endPage = Math.min(totalPages, startPage + visiblePageCount - 1);

  const adjustedStartPage = Math.max(1, endPage - visiblePageCount + 1);

  const pageNumbers = generatePageNumber(adjustedStartPage, endPage);

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

      {pageNumbers.map((page) => (
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
