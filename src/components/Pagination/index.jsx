import React from 'react';
import './styles.css';

const Pagination = ({ pages, totalPages, currentPage, setCurrentPage }) => {
  const isActivePage = (pageNo) => {
    return currentPage === pageNo;
  }

  const changePage = (pageNo) => {
    setCurrentPage(pageNo)
  }

  const goToPreviousPage = () => {
    changePage(currentPage - 1);
  }

  const goToNextPage = () => {
    changePage(currentPage + 1);
  }

  return (
    <div className="pagination-container">
      <button className="pagination-button" disabled={currentPage === 1} onClick={goToPreviousPage}>
        <i className="fa-solid fa-angles-left"></i>
      </button>
      <div className="pagination-pages">
        {
          pages.map((page, index) => (
            <button
              key={`${page.page}-${index}`}
              className={`pagination-page ${isActivePage(page.page) ? "active" : ""}`}
              disabled={page.type === "ellipsis"}
              onClick={() => changePage(page.page)}
            >
              <strong>
                {page.type === "ellipsis" ? "..." : page.page}
              </strong>
            </button> 
          ))
        }
      </div>
      <button className="pagination-button" disabled={currentPage === totalPages} onClick={goToNextPage}>
        <i className="fa-solid fa-angles-right"></i>
      </button> 
    </div>
  )
}

export default Pagination