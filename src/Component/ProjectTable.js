import React from "react";
import { formatCurrency } from "./Formatter/formate";
import { formatPercentage } from "./Formatter/formate";

const ProjectTable = ({ projects, startingIndex }) => {
  return (
    <table className="project-table">
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Percentage Funded</th>
          <th>Amount Pledged</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <tr key={project.id}>
            <td>{startingIndex + index}</td> {/* Adjust serial number */}
            <td>{formatPercentage(project["percentage.funded"])}</td>
            <td>{formatCurrency(project["amt.pledged"])}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectTable;
