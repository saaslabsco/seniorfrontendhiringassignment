import React from "react";
import "./homeStyles.css";
import useHomeHooks from "./useHomeHook";

const Home = () => {
  const {
    currentProjects,
    currentPage,
    totalPages,
    totalItems,
    handlePageChange,
  } = useHomeHooks();

  const startItem = (currentPage - 1) * 5 + 1;
  const endItem = Math.min(currentPage * 5, totalItems);

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>Funds Table</h1>
      </header>

      {/* Table container */}
      <div className="table-container">
        <table className="projects-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Percentage Funded</th>
              <th>Amount Pledged</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((project, index) => (
              <tr key={project.id}>
                <td>{startItem + index}</td>
                <td>{project["percentage.funded"]}%</td>
                <td>${project["amt.pledged"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="footer">
  <div className="pagination">
    {/* Previous button */}
    <div className="pagination-buttons">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
    </div>

    <span>{`${startItem}-${endItem} of ${totalItems}`}</span>

    <div className="pagination-buttons">
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  </div>
</footer>

    </div>
  );
};

export default Home;
