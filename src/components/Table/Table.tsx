import React from "react";
import styles from "./Table.module.css";
import { Project } from "../../types/Project";

interface TableProps {
  data: Project[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div>
      {data.length === 0 ? (
        <p className={styles.noRecords} role="alert" aria-live="assertive">
          No records available
        </p>
      ) : (
        <table
          className={styles.table}
          aria-label="Kickstarter Campaign Summary Table"
        >
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Percentage Funded</th>
              <th scope="col">Amount Pledged</th>
            </tr>
          </thead>
          <tbody>
            {data.map((project) => (
              <tr key={project["s.no"]} aria-rowindex={project["s.no"]}>
                <td>{project["s.no"]}</td>
                <td>{project["percentage.funded"]}</td>
                <td>{project["amt.pledged"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
