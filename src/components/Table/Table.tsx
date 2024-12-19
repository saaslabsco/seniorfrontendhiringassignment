import React from "react";
import "../styles/table.css";
import { Column, DatasetItem } from "../../types/global";

interface TableProps {
  columns: Column[];
  data: DatasetItem[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hovered-row">
              {columns.map((col) => (
                <td key={col.key} className="row-text">{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
