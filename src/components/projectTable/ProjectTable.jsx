import React, { useState, useEffect } from "react";
import "./styles.css";
import { RecordsPerPage } from "../../constants/globalContants";

const ProjectTable = ({ projects, currentPage }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(
      projects.slice(
        (currentPage - 1) * RecordsPerPage,
        currentPage * RecordsPerPage
      )
    );
  }, [currentPage, projects]);

  return (
    <div className="table-container">
      <table className="table" aria-label="Kickstarter projects funding details">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Percentage Funded</th>
            <th scope="col">Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((project, index) => (
              <tr key={index}>
                <td>{project?.["s.no"] ?? "-"}</td>
                <td>{project?.["percentage.funded"] ? `${project["percentage.funded"]}%` : "-"}</td>
                <td>{project?.["amt.pledged"] ? `₹${project["amt.pledged"]}` : "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-data" aria-live="polite">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
