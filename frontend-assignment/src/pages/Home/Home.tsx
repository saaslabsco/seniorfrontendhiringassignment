//@ts-nocheck
import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Table from "../../components/Table/Table";
import Pagination from "../../components/Pagination/Pagination";
import { Project } from "../../types/Project";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  const { data, loading, error } = useFetch<Project[]>(
    "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
  );

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Pagination logic
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentData = data.slice(startIndex, startIndex + recordsPerPage);

  return (
    <div className={styles.container}>
      <h1>Kickstarter Projects</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <div className={styles.tableContainer}>
            <Table data={currentData} />
          </div>
          <div className={styles.paginationContainer}>
            <Pagination
              currentPage={currentPage}
              totalRecords={data.length}
              recordsPerPage={recordsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
