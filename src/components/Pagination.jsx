import React from "react";
import { useSaasLabsContext } from "../context/context";
import './Pagination.css'

const Pagination = () => {
    const { currentPage, totalPages, changePage } = useSaasLabsContext();

    const generatePagination = () => {
        return [1, 2, 3, "...", totalPages];
    };

    return (
        <div className="pagination">
            {currentPage !== 1 && (
                <button className="page-btn first" onClick={() => changePage(1)}>
                    First
                </button>
            )}

            {currentPage > 1 && (
                <button
                    className="page-btn prev"
                    onClick={() => changePage(currentPage - 1)}
                >
                    Prev
                </button>
            )}

            {generatePagination().map((item, index) =>
                item === "..." ? (
                    <span key={index} className="ellipsis">...</span>
                ) : (
                    <button
                        key={item}
                        className={`page-btn ${currentPage === item ? "active" : ""}`}
                        onClick={() => changePage(item)}
                    >
                        {item}
                    </button>
                )
            )}

            {currentPage < totalPages && (
                <button
                    className="page-btn next"
                    onClick={() => changePage(currentPage + 1)}
                >
                    Next
                </button>
            )}

            {currentPage !== totalPages && (
                <button
                    className="page-btn last"
                    onClick={() => changePage(totalPages)}
                >
                    Last
                </button>
            )}
        </div>
    );
};

export default Pagination;
