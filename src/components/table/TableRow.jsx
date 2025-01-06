/* eslint-disable react/prop-types */

const TableRow = ({ serialNo, percentageFunded, amountPledged }) => {
  return (
    <tr>
      <td role="cell">{serialNo}</td>
      <td role="cell">{percentageFunded}</td>
      <td role="cell">{amountPledged}</td>
    </tr>
  );
};

export default TableRow;
