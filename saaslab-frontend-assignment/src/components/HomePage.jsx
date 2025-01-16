import { useEffect, useState } from 'react';
import '../App.css';
import { apiEndpoint } from '../../constant';
import { calculateTotalPages } from '../util';
import Pagination from './Pagination';
import { recordsPerPage } from '../../constant';

function HomePage() {
  const [apiData, setApiData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [apiError, setError] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchData = async () => {
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      setApiData(data);
      setFilterData(data.slice(0, recordsPerPage));
      setLoading(false);
    } catch (error) {
      setError(error || 'An error occured while fetching data from api');
      setLoading(false);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    setFilterData(apiData.slice(startIndex, endIndex));
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div role="status" aria-live="polite">
        Loading data...
      </div>
    );
  }
  if (apiError) {
    return (
      <div role="alert" aria-live="assertive">
        Failed to load Data
      </div>
    );
  }
  return (
    <>
      <div className="home-page">
        <div className="table-container">
          <h1 className="header-text">Project fund table</h1>
          <table aria-label="Projec fund table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Percentage funded</th>
                <th>Amount pledged</th>
              </tr>
            </thead>
            <tbody>
              {filterData.map((data) => (
                <tr key={data['s.no']}>
                  <td>{data['s.no'] + 1}</td>
                  <td>{data['percentage.funded']}</td>
                  <td>${data['amt.pledged']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!isLoading && !apiError && (
          <Pagination
            totalPages={calculateTotalPages(apiData)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
}

export default HomePage;
