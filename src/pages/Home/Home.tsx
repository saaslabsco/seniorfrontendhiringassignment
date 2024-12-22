import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Table from "../../components/Table/Table";
import Pagination from "../../components/Pagination/Pagination";
import { Project } from "../../types/Project";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  const { data, loading, error } = useFetch<Project[] | Project[][]>(
    "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
  );

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Normalize the data to ensure it is a flat array of Project[]
  const normalizedData: Project[] =
    Array.isArray(data) && Array.isArray(data[0])
      ? (data as Project[][]).flat()
      : (data as unknown as Project[]);

  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentData = normalizedData.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  return (
    <div className={styles.container}>
      <h1>Kickstarter Campaign Summary</h1>
      {loading && <p aria-live="polite">Loading...</p>}
      {error && <p aria-live="assertive">Error: {error}</p>}
      {!loading && !error && (
        <>
          <div className={styles.tableContainer}>
            <Table data={currentData} />
          </div>
          <div
            className={styles.paginationContainer}
            aria-label="Pagination controls for navigating pages of Kickstarter campaigns"
          >
            <Pagination
              currentPage={currentPage}
              totalRecords={normalizedData.length}
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
