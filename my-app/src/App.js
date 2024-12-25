import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");

  const projectsPerPage = 5;
  const maxPageButtons = 5;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
        );
        setProjects(response.data);
      } catch (err) {
        setError("Failed to fetch projects. Please try again later.");
      }
    };

    fetchProjects();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const getPageNumbers = () => {
    const startPage = Math.max(
      Math.min(
        currentPage - Math.floor(maxPageButtons / 2),
        totalPages - maxPageButtons + 1
      ),
      1
    );
    const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Highly Rated Kickstarter Projects</h1>
        {error && <p className="error">{error}</p>}

        <table className="project-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Percentage Funded</th>
              <th>Amount Pledged (USD)</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((project) => (
              <tr key={project["s.no"]}>
                <td>{project["s.no"] + 1}</td>
                <td>{project["percentage.funded"]}%</td>
                <td>${project["amt.pledged"].toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button
            className="page-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {getPageNumbers().map((page) => (
            <button
              key={page}
              className={`page-button ${currentPage === page ? "active" : ""}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="page-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
