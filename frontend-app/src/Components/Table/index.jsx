import React from "react";
import PropTypes from "prop-types";  
import "./tableStyles.css";

const Table = ({ headers, data, startItem }) => {
  return (
    <div className="responsive-table">
      <div className="desktop-view">
        <table className="table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header.key} className="table-th">
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={`${row.id}_${index}`} className="table-tr">
                <td className="table-td">{startItem + index}</td>
                <td className="table-td">{row["percentage.funded"]}%</td>
                <td className="table-td">${row["amt.pledged"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mobile-view">
        {data.map((row, index) => (
          <div key={`${row.id}_${index}`} className="card">
            {headers.map((header) => (
              <div key={header.key} className="card-row">
                <span className="card-header">{header.label}:</span>
                <span className="card-value">
                  {header.key === "sno" ? startItem + index : row[header.key]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

Table.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,  
      label: PropTypes.string.isRequired, 
    })
  ).isRequired,  
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,   
      "percentage.funded": PropTypes.number.isRequired,
      "amt.pledged": PropTypes.number.isRequired, 
    })
  ).isRequired, 
  startItem: PropTypes.number.isRequired, 
};

export default React.memo(Table);
