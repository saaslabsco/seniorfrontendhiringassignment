import React from "react";
import CustomTable from "./components/molecules/customTable/CustomTable";
import CustomPagination from "./components/molecules/customPagination/CustomPagination";
import CustomTextDisplay from "./components/atoms/customTextDisplay/CustomTextDisplay";
import "./App.css";

const App = () => {
  const [projectsList, setProjectsList] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 5;

  const indexOfLastRecord = currentPage * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;

  const currentRecords = projectsList.length?projectsList.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  ):[];

  const pagination = (pageNumber) => setCurrentPage(pageNumber);

  React.useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    )
      .then((response) => response.json())
      .then((data) => setProjectsList(data))
      .catch((error) => setError(error?.message));
  }, []);

  return (
    <div className="app-container">
      {error ? (
        <CustomTextDisplay message={error} />
      ) : !projectsList.length ? (
        <CustomTextDisplay message={'No data to display!'} />
      ) : (
        <>
          <CustomTable data={currentRecords} />
          <CustomPagination
            rowsPerPage={rowsPerPage}
            totalRecords={projectsList.length}
            pagination={pagination}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

export default App;
