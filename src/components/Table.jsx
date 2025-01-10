import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import "../styles/Table.css";

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const API_URL =
    "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

  const fetchTableData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="table-container">
      {error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        <>
          <table className="data-table">
            <thead className="table-head">
              <tr className="table-row">
                <th scope="col" className="table-header">S.No.</th>
                <th scope="col" className="table-header">Percentage Funded</th>
                <th scope="col" className="table-header">Amount Pledged</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {currentItems.map((project, index) => (
                <tr key={index} className="table-row">
                  <td className="table-cell">{project["s.no"]}</td>
                  <td className="table-cell">
                    {project["percentage.funded"]}%
                  </td>
                  <td className="table-cell">
                    ${project["amt.pledged"].toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Table;
