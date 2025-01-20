import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import Pagination from './components/Pagination';
import './styles/App.css';
import { API_ENDPOINT, RECORDS_PER_PAGE } from './config/constants';

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Calculate records for current page
  const indexOfLastRecord = currentPage * RECORDS_PER_PAGE;
  const indexOfFirstRecord = indexOfLastRecord - RECORDS_PER_PAGE;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / RECORDS_PER_PAGE);

  // Handle page change
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Table column configuration
  const columns = [
    { header: 'S.No', accessor: 's.no' },
    { header: 'Percentage Funded', accessor: 'percentage.funded' },
    { header: 'Amount Pledged', accessor: 'amt.pledged' },
  ];

  return (
    <div>
      <h2>Funding Data Table</h2>
      {currentRecords.length > 0 ? (
        <>
          <Table columns={columns} data={currentRecords} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        </>
      ) : (
        <p className="loading-message" role="status" aria-live="polite">
          Loading data...
        </p>
      )}
    </div>
  );
};

export default App;
