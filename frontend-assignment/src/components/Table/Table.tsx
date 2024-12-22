//@ts-nocheck
import React from "react";
import { Project } from "../../types/Project";
import "./Table.module.css";

interface TableProps {
  data: Project[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <table className="table" aria-label="Kickstarter Projects Table">
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Percentage Funded</th>
          <th>Amount Pledged</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={3} style={{ textAlign: "center" }}>
              No records available
            </td>
          </tr>
        ) : (
          data.map((project) => (
            <tr key={project["s.no"]}>
              <td>{project["s.no"]}</td>
              <td>{project["percentage.funded"]}</td>
              <td>{project["amt.pledged"]}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
