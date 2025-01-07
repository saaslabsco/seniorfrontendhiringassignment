import React, { useMemo } from "react";
import "./homeStyles.css";
import useHomeHooks from "./useHomeHook";
import { TABLE_HEADERS } from "./constants";
import Table from "../../Components/Table";
import Pagination from "../../Components/Pagination";

const Home = () => {
  const {
    currentProjects,
    currentPage,
    totalPages,
    totalItems,
    handlePageChange,
    loading, 
  } = useHomeHooks();

  const startItem = (currentPage - 1) * 5 + 1;
  const endItem = Math.min(currentPage * 5, totalItems);

  const paginationData = useMemo(() => ({
    startItem,
    endItem,
    totalItems,
  }), [startItem, endItem, totalItems]);

  return (
    <div className="container">
      <div className="header-wrapper">
        <header className="header">
          <h1>FUNDS TABLE</h1>
        </header>
      </div>

      <div className="table-container">
        {loading ? (
          <div className="loading">Loading...</div> 
        ) : (
          <Table
            headers={TABLE_HEADERS}
            data={currentProjects}
            startItem={startItem}
          />
        )}
      </div>

      <footer className="footer">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          {...paginationData}
          onPageChange={handlePageChange}
        />
      </footer>
    </div>
  );
};

export default Home;
