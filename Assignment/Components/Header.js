import React from "react";
import PropTypes from "prop-types";
import styles from "./Header.module.css";

const Header = ({ colDefs }) => {
  return (
    <thead>
      <tr>
        {colDefs.map((def) => (
          <th className={styles.th} key={def.headerName}>
            {def.headerName}
          </th>
        ))}
      </tr>
    </thead>
  );
};

Header.propTypes = {
  colDefs: PropTypes.arrayOf(
    PropTypes.shape({
      headerName: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default React.memo(Header);
