import React, { useState } from "react";
import styles from "@/components/Table/index.module.css";
import {
  getPaginationDataIndices,
  getTableClass,
} from "@/components/Table/utils";
import { TableColumn, TableData, TablePagination, TableSize } from "TableTypes";

interface TableProps {
  data: TableData[];
  columns: TableColumn[];
  size?: TableSize;
  pagination?: TablePagination;
  loading?: boolean;
  style?: React.CSSProperties;
}

const Table: React.FC<TableProps> = ({
  columns = [],
  data = [],
  size = "default",
  loading = false,
  style = {},
  pagination = { pageSize: 10 },
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { startIndex, endIndex } = getPaginationDataIndices(
    data.length,
    pagination.pageSize,
    currentPage
  );

  const totalPages = Math.ceil(data.length / pagination.pageSize);
  const currentPageData = data.slice(startIndex, endIndex);

  return (
    <div className={styles.tableWrapper}>
      <table className={`${styles[getTableClass(size)]}`} style={style}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{
                  width: column.width,
                  textAlign: column.align,
                }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className={styles.noDataCell}>
                Loading...
              </td>
            </tr>
          ) : data.length > 0 ? (
            currentPageData.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    style={{
                      width: column.width,
                      textAlign: column.align,
                    }}
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className={styles.noDataCell}>
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {data.length > 0 && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span>Page {currentPage}</span>
          <button
            className={styles.paginationButton}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
