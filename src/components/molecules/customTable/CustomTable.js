import React from "react";

const CustomTable = ({ data }) => {
  return (
    <table>
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
            <td>{`${project["percentage.funded"]}%`}</td>
            <td>{`Rs.${project["amt.pledged"]} /-`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTable;
