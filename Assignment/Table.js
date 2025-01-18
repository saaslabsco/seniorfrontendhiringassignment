import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Table.module.css";
import { useFetch } from "./hooks/useFetch";
import Header from "./Components/Header";
import { NEXT, PREV } from "./constants";

const Table = ({ colDefs, api, rowsPerPage, title }) => {
  const totalButtons = 5;
  const { data, error, loading } = useFetch(api);
  const [currentPage, setCurrentPage] = useState(0);
  const _ = useMemo(() => new Array(totalButtons).fill(0), []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>something went wrong please try again...</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }

  const renderData = data.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const isNextDisabled = (currentPage + 1) * rowsPerPage >= data.length;
  const isPrevDisabled = currentPage === 0;
  const totalPages = Math.floor(data.length / rowsPerPage);

  const nextPage = () => {
    if (!isNextDisabled) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (!isPrevDisabled) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1 className={styles.header}>{title}</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <Header colDefs={colDefs} />
          <tbody>
            {renderData.map((item) => (
              <tr key={item[colDefs[0].field]}>
                {colDefs.map((col, index) => (
                  <td className={styles.td} key={index}>
                    {item[col.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.buttonContainer}>
        <button disabled={isPrevDisabled} onClick={prevPage}>
          {PREV}
        </button>
        <React.Fragment>
          {_.map((_, index) => {
            let iterator;
            if (currentPage < 3) {
              iterator = -1 * currentPage;
            } else if (currentPage + 1 === totalPages) {
              iterator = -1 * totalButtons + totalPages - currentPage + 1;
            } else if (currentPage === totalPages) {
              iterator = -1 * totalButtons + 1;
            } else {
              iterator = -1 * Math.floor(totalButtons / 2);
            }
            if (index + currentPage + iterator > totalPages) {
              return null;
            }
            return (
              <button
                key={index}
                className={
                  currentPage === index + currentPage + iterator
                    ? styles.currentPage
                    : styles.normalPage
                }
                onClick={() => setCurrentPage(index + currentPage + iterator)}
              >
                {index + currentPage + iterator}
              </button>
            );
          })}
        </React.Fragment>
        <button disabled={isNextDisabled} onClick={nextPage}>
          {NEXT}
        </button>
      </div>
    </div>
  );
};

Table.propTypes = {
  colDefs: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
    })
  ).isRequired,
  api: PropTypes.string.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default React.memo(Table);
