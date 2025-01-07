import React, { useState, useEffect } from "react";
import axios from "axios";

const Table = () => {
  const [projects, setProjects] = useState([]); // Store fetched projects
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const recordsPerPage = 5; // Maximum records per page

  useEffect(() => {
    // Fetch data on component mount
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
        );
        // Check if response contains projects
        if (response.data && Array.isArray(response.data)) {
          setProjects(response.data); // Save projects data
        } else {
          setError("Unexpected response structure from the API.");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Pagination calculations
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = projects.slice(indexOfFirstRecord, indexOfLastRecord); // Safe slicing
  const totalPages = Math.ceil(projects.length / recordsPerPage);

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Kickstarter Projects</h1>
      {loading ? (
        <p style={styles.message}>Loading...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : (
        <div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>S.No.</th>
                <th style={styles.th}>Percentage Funded</th>
                <th style={styles.th}>Amount Pledged</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((project, index) => (
                <tr key={project["s.no"]}>
                  <td style={styles.td}>{indexOfFirstRecord + index + 1}</td>
                  <td style={styles.td}>{project["percentage.funded"]}%</td>
                  <td style={styles.td}>${project["amt.pledged"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.pagination}>
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              style={{
                ...styles.button,
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.6 : 1,
              }}
            >
              Previous
            </button>
            <span style={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              style={{
                ...styles.button,
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages ? 0.6 : 1,
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles object for inline CSS

const styles = {
  container: {
    fontFamily: "'Amazon Ember', sans-serif",
    padding: "20px",
    textAlign: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#f1f1f1",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    marginBottom: "20px",
    color: "#232f3e",
    fontSize: "2.5em",
    fontWeight: "700",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    borderBottom: "2px solid #ff9900",
    paddingBottom: "10px",
  },
  table: {
    width: "100%",
    margin: "0 auto 20px",
    borderCollapse: "collapse",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    overflow: "hidden",
    transition: "box-shadow 0.3s ease",
  },
  th: {
    border: "1px solid #e0e0e0",
    padding: "14px 20px",
    backgroundColor: "#f3f3f3",
    textAlign: "center",
    fontWeight: "700",
    color: "#111111",
    fontSize: "1em",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    transition: "background-color 0.3s ease",
  },
  td: {
    border: "1px solid #e0e0e0",
    padding: "12px 20px",
    textAlign: "center",
    fontSize: "1em",
    color: "#333333",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  row: {
    transition: "background-color 0.3s",
  },
  rowHover: {
    backgroundColor: "#f7f7f7",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    marginTop: "30px",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 25px",
    backgroundColor: "#FF9900",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1.1em",
    fontWeight: "500",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  buttonHover: {
    backgroundColor: "#e68900",
    transform: "scale(1.05)",
  },
  buttonDisabled: {
    padding: "12px 25px",
    backgroundColor: "#d3d3d3",
    color: "#cccccc",
    border: "none",
    borderRadius: "4px",
    fontSize: "1.1em",
    fontWeight: "500",
    cursor: "not-allowed",
    boxShadow: "none",
  },
  pageInfo: {
    fontWeight: "bold",
    fontSize: "1.2em",
    color: "#333333",
  },
  loading: {
    fontSize: "1.5em",
    color: "#555555",
    fontWeight: "600",
    letterSpacing: "0.5px",
    marginTop: "20px",
  },
  error: {
    fontSize: "1.5em",
    color: "#FF0000",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  noData: {
    fontSize: "1.2em",
    color: "#888888",
    fontStyle: "italic",
    marginTop: "20px",
  },
  tableContainer: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  // Responsive styling 
  "@media (max-width: 768px)": {
    container: {
      padding: "10px",
    },
    header: {
      fontSize: "2em",
    },
    table: {
      width: "100%",
    },
    th: {
      padding: "10px",
      fontSize: "0.9em",
    },
    td: {
      padding: "10px",
      fontSize: "0.9em",
    },
    button: {
      padding: "10px 20px",
      fontSize: "1em",
    },
    pageInfo: {
      fontSize: "1.1em",
    },
  },
};


export default Table;
