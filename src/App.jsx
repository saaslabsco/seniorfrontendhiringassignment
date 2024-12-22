import { useEffect, useState } from "react";
import { fetchProjectDetails } from "./utils/api";
import "./App.css";
import Table from "./components/table/Table";
import Pagination from "./components/pagination/Pagination";

function App() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setIsError] = useState(null);

  const recordPerPage = 5;

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProjectDetails();

        setProjects(data);
      } catch (err) {
        setIsError("Failed to fetch data due to this: ", err);
      }
    };
    loadData();
  }, []);

  const totalPages = Math.ceil(projects.length / recordPerPage);

  const paginationData = projects.filter((item, index) => {
    const startPage = (currentPage - 1) * recordPerPage;
    const endPage = currentPage * recordPerPage;
    return index >= startPage && index < endPage;
  });

  return (
    <div className="container">
      <h1>Kickstarter Project Analytics Dashboard</h1>
      {error ? (
        <div className="error" role="alert">
          {" "}
          {error}{" "}
        </div>
      ) : (
        <>
          <Table data={paginationData} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
}

export default App;
