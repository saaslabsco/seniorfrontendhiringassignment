//libs
import React, { useState, useMemo, useEffect } from 'react';
import { isEmpty } from 'lodash';

//components
import Placeholder from '../Placeholder';
import ResultNotFound from '../ResultNotFound';

//constants
import { API_URL, ACTION_BUTTONS } from './Constants';

//helper
import { paginateData } from "./helpers";

//mock
import projectData from "../../data/frontend-assignment.json";

const columns = [
    { label: 'S.No', key: 's.no' },
    { label: 'Percentage funded', key: 'percentage.funded' },
    { label: 'Amount pledged', key: 'amt.pledged' }
];

export default function DataTable() {
    const [projects, setProjects] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data from the API
    useEffect(() => {
      const fetchProjects = async () => {
          setIsLoading(true);
          try {
              const response = await fetch(API_URL);
              if (!response.ok) {
                  throw new Error(`Error: ${response.status}`);
              }
              const data = await response.json();
              setProjects(data);
			  //setProjects([]);
          } catch (error) {
              console.error('Failed to fetch projects:', error);
          } finally{
            setIsLoading(false);
          }
      };

      fetchProjects();
  }, []);

    
    const handlePageSizeChange = (event) => {
      setPageSize(Number(event.target.value));
      setPage(1); // Reset to the first page
    };

    const handlePrevPage = () => setPage((prev) => prev - 1);

    const handleNextPage = () => setPage((prev) => prev + 1);

    const { pageItems, totalPages } = useMemo(() => paginateData(projects, page, pageSize));

    return (
      <div className='data-table-container'>
        <div className="data-table-content">
          <h1>Kickstarter Projects</h1>
          { isLoading ? <Placeholder/> : (
			isEmpty(projects) ? <ResultNotFound/> :
            <>
            <table className="data-table">
            <thead>
              <tr>
                {columns.map(({ label, key }) => (
                  <th key={key}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageItems.map((eachData) => (
                  <tr key={`${eachData["s.no"]}`}>
                    <td>{eachData["s.no"]}</td>
                    <td>{eachData["amt.pledged"]}</td>
                    <td>{eachData["percentage.funded"]}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
          <div className="pagination-controls">
            <div className="page-size">
              <select
                aria-label="Page size"
                onChange={handlePageSizeChange}
                id="pageSizeSelect"
              >
                {[5, 10, 20].map((size) => (
                  <option key={size} value={size}>
                    Show {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="pagination">
              <button
                className="pagination-button"
                disabled={page === 1}
                onClick={handlePrevPage}
                aria-label="Previous Page"
              >
                {ACTION_BUTTONS.PREVIOUS}
              </button>
              <span aria-label="Current Page">
                Page {page} of {totalPages}
              </span>
              <button
                className="pagination-button"
                disabled={page === totalPages}
                onClick={handleNextPage}
                aria-label="Next Page"
              >
                {ACTION_BUTTONS.NEXT}
              </button>
            </div>
          </div>
            </>
          )}
        </div>
      </div>
    )
}