/* eslint-disable react/prop-types */

import TableRow from "./TableRow";
import "./Table.css";

const Table = ({ data }) => {
  return (
    <div className="table" role="table">
      <table>
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Percentage Funded</th>
            <th scope="col">Amount pledged</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((project, index) => (
              <TableRow
                key={project.id}
                serialNo={index + 1}
                percentageFunded={project["percentage.funded"]}
                amountPledged={project["amt.pledged"]}
              />
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-data">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
