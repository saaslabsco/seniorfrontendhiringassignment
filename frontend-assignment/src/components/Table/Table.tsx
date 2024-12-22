import React from "react";
import styles from "./Table.module.css";
import { Project } from "../../types/Project";

interface TableProps {
  data: Project[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <table className={styles.table} aria-label="Kickstarter Projects Table">
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Percentage Funded</th>
          <th>Amount Pledged</th>
        </tr>
      </thead>
      <tbody>
        {data.map((project) => (
          <tr key={project["s.no"]}>
            <td>{project["s.no"]}</td>
            <td>{project["percentage.funded"]}</td>
            <td>{project["amt.pledged"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
