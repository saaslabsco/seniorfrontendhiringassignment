import React from 'react';
import '../styles/Table.css';

const Table = ({ columns, data, className = '' }) => {
  return (
    <div className={`table-container ${className}`}>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} tabIndex={0} aria-sort="none">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>{item[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
