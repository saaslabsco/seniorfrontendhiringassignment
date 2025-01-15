import React from 'react';

interface TableColumn<T> {
  header: string;
  accessor: keyof T | string;
  renderCell?: (row: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Table = <T,>({
  columns,
  data,
  totalItems,
  pageSize,
  onPageChange,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.ceil(totalItems / pageSize);

  const handleNext = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      onPageChange(nextPage);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      onPageChange(prevPage);
    }
  };

  // Function to safely render a cell value
  const renderCellValue = (value: any) => {
    if (value instanceof Promise) {
      return null; // or any loading indicator or default value
    }

    if (value === undefined || value === null) {
      return ''; // Fallback for null/undefined
    }

    return value;
  };

  return (
    <div className="table-container w-full">
      <table>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => {
                const cellValue = col.renderCell
                  ? col.renderCell(row)
                  : row[col.accessor as keyof T];

                return (
                  <td key={colIndex}>
                    {renderCellValue(cellValue)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-pagination">
        <button disabled={currentPage === 1} onClick={handlePrev}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;