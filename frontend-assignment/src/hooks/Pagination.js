import { useState, useEffect } from 'react';

const usePagination = (totalPages, maxPages, onPageChange) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationArr, setPaginationArr] = useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        setPaginationArr(Array.from({ length: maxPages }, (_, index) => index + 1));
    }, [totalPages, maxPages]);

    const isLastPageVisible = (page) => {
        return page + maxPages > totalPages;
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        onPageChange(page);

        if (isLastPageVisible(page)) {
            setOffset(totalPages - maxPages);
        } else {
            setOffset(page === 1 ? 0 : page - 2);
        }
    }

    return { currentPage, paginationArr, offset, handlePageChange };
}

export default usePagination;