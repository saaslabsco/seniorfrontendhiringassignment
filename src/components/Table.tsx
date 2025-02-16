import { useState, useEffect } from "react";
import "../components/Table.css";

type PropsType = {
  sNo: number;
  amtPledged: number;
  blurb: string;
  by: string;
  country: string;
  currency: string;
  endTime: string;
  location: string;
  percentageFunded: number;
  numBackers: string;
  state: string;
  title: string;
  type: string;
  url: string;
};

const Table = ({ data }: { data: PropsType[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("1"); // Sync input with page
  const recordsPerPage = 5;
  const [sortKey, setSortKey] = useState<keyof PropsType>("sNo");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Sync input field when currentPage changes
  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  // Sorting logic
  const sortedData = [...data].sort((a, b) => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return sortOrder === "asc" ? +valueA - +valueB : +valueB - +valueA;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Handle sorting change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [key, order] = e.target.value.split("_");
    setSortKey(key as keyof PropsType);
    setSortOrder(order as "asc" | "desc");
  };

  // Handle page number input
  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setInputValue(value); // Allow free typing

    if (value === "") {
      setCurrentPage(1); // Default to 1 if cleared
    } else {
      let page = Number(value);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    }
  };

  return (
    <div className="table-wrapper">
      {/* Sorting Dropdown */}
      <div className="sort-dropdown">
        <label htmlFor="sort-select">Sort By:</label>
        <select id="sort-select" onChange={handleSortChange} aria-label="Sort table">
          <option value="sNo_asc">S.No - Ascending</option>
          <option value="sNo_desc">S.No - Descending</option>
          <option value="percentageFunded_asc">Percentage Funded - Ascending</option>
          <option value="percentageFunded_desc">Percentage Funded - Descending</option>
          <option value="amtPledged_asc">Amount Pledged - Ascending</option>
          <option value="amtPledged_desc">Amount Pledged - Descending</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="styled-table" role="table">
          <thead>
            <tr role="row">
              <th scope="col">S.No.</th>
              <th scope="col">Percentage Funded</th>
              <th scope="col">Amount Pledged</th>
            </tr>
          </thead>
          <tbody aria-live="polite">
            {currentRecords.map((item) => (
              <tr key={item.sNo} role="row">
                <td role="cell">{item.sNo}</td>
                <td role="cell">{item.percentageFunded}%</td>
                <td role="cell">${item.amtPledged?.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(1)} 
          disabled={currentPage === 1}
          aria-label="Go to first page"
        >
          ⏮ First
        </button>
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          ◀ Prev
        </button>

        <input
          type="number"
          value={inputValue}
          onChange={handlePageChange}
          placeholder="1"
          min={1}
          max={totalPages}
          aria-label="Current page number"
        />

        <button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
        >
          Next ▶
        </button>
        <button 
          onClick={() => setCurrentPage(totalPages)} 
          disabled={currentPage === totalPages}
          aria-label="Go to last page"
        >
          ⏭ Last
        </button>
      </div>
    </div>
  );
};

export default Table;
