import { useState } from "react";
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
  const recordsPerPage = 5;
  const [sortKey, setSortKey] = useState<keyof PropsType>("sNo");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Sorting logic
  const sortedData = [...data].sort((a, b) => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];

    return sortOrder === "asc"
      ? valueA > valueB
        ? 1
        : -1
      : valueA < valueB
      ? 1
      : -1;
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

  return (
    <div className="table-wrapper">
      {/* Sorting Dropdown */}
      <div className="sort-dropdown">
        <label>Sort By:</label>
        <select onChange={handleSortChange}>
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
        <table className="styled-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Percentage Funded</th>
              <th>Amount Pledged</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((item) => (
              <tr key={item.sNo}>
                <td>{item.sNo}</td>
                <td>{item.percentageFunded}%</td>
                <td>${item.amtPledged.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          ⏮ First
        </button>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          ◀ Prev
        </button>
        <input
          type="number"
          value={currentPage}
          onChange={(e) => {
            let page = Number(e.target.value);
            if (page >= 1 && page <= totalPages) setCurrentPage(page);
          }}
          min={1}
          max={totalPages}
        />
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next ▶
        </button>
        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
          ⏭ Last
        </button>
      </div>
    </div>
  );
};

export default Table;
