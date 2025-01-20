import React from 'react';
import '../styles/Pagination.css';
import { PAGINATION_TEXT, BUTTON_ARIA_LABELS } from '../config/constants';

const Pagination = ({ currentPage, totalPages, handlePrevious, handleNext }) => {
  return (
    <div className="pagination-container">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label={BUTTON_ARIA_LABELS.previous}
      >
        {PAGINATION_TEXT.previous}
      </button>
      <span aria-live="polite">
        {PAGINATION_TEXT.pageLabel} {currentPage} {PAGINATION_TEXT.of}{' '}
        {totalPages}{' '}
        {/* Handle pluralization for pages */}
        {totalPages > 1 && (
          <span aria-hidden="true">{PAGINATION_TEXT.pagesLabel}</span>
        )}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label={BUTTON_ARIA_LABELS.next}
      >
        {PAGINATION_TEXT.next}
      </button>
    </div>
  );
};

export default Pagination;
