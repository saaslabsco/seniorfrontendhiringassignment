import React, { useState } from "react";
import Table from "../components/Table/Table";
import Pagination from "../components/Table/Pagination";
import { usePagination } from "../hooks/usePagination";
import { Column, DatasetItem } from "../types/global";
import "./styles/paginated-table-page.css";

const PaginatedTablePage = () => {
  const apiUrl =
    "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";
  const pageSize = 10;

  const { paginatedData, currentPage, totalPages, setCurrentPage, loading } =
    usePagination<DatasetItem>({
      apiUrl,
      pageSize,
    });

  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredData = paginatedData.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const columns: Column[] = [
    { key: "s.no", label: "S. No" },
    { key: "amt.pledged", label: "Amount Pledged" },
    { key: "title", label: "Title" },
    { key: "by", label: "By" },
    { key: "country", label: "Country" },
    { key: "percentage.funded", label: "Funded (%)" },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Frontend Paginated Table</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <>
          <Table columns={columns} data={filteredData} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default PaginatedTablePage;
