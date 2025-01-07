import React from 'react';

import usePagination from '../../hooks/Pagination';

import './pagination.css';

const MAX_PAGES = 5;

const Pagination = (props) => {
    const { dataLength, pageSize, onPageChange } = props;

    const totalPages = Math.ceil(dataLength / pageSize);
    const maxPages = Math.min(MAX_PAGES, totalPages);

    const { currentPage, paginationArr, offset, handlePageChange } = usePagination(totalPages, maxPages, onPageChange);

    const handlePreviousPage = () => {
        handlePageChange(currentPage - 1);
    }

    const handleNextPage = () => {
        handlePageChange(currentPage + 1);
    }

    return (
        <nav className='pagination-container' aria-label='pagination navigation'>
            {currentPage > 1 && 
                <button
                    className='btn previous-page-btn'
                    aria-label='previous-page-btn'
                    onClick={handlePreviousPage}>
                        Previous
                </button>}
            {paginationArr.map(page => (
                <button 
                    key={page}
                    aria-label='page-btn'
                    className={`btn number-btn ${page + offset === currentPage ? 'selected-btn' : ''}`}
                    onClick={() => handlePageChange(page + offset)}>
                        {page + offset}
                </button>
            ))}
            {currentPage < totalPages &&
                <button
                    className='btn next-page-btn'
                    aria-label='next-page-btn'
                    onClick={handleNextPage}>
                        Next
                </button>}
        </nav>
    )
}

export default Pagination;