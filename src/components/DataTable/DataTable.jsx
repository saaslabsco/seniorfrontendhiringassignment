//libs
import React, { useState, useMemo, useEffect } from 'react';
import { isEmpty } from 'lodash';

//Components
import Placeholder from '../Placeholder';
import ResultNotFound from '../ResultNotFound';
import ErrorPage from '../ErrorPage';

//Constants
import { API_URL, ACTION_BUTTONS, PROJECT_TITLE, TEST_IDS, PAGE_LIMITS } from './Constants';

//Helpers
import { paginateData, formatPageInfo } from "./helpers";

const columns = [
    { label: 'S.No', key: 's.no' },
    { label: 'Percentage funded', key: 'percentage.funded' },
    { label: 'Amount pledged', key: 'amt.pledged' }
];

const Table = ({ columns, data }) => (
  <table data-testid={TEST_IDS.DATA_TABLE} className="data-table">
    <thead>
      <tr>
        {columns.map(({ label, key }) => (
          <th key={key}>{label}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((eachData) => (
          <tr key={`${eachData["s.no"]}`}>
            <td>{eachData["s.no"]}</td>
            <td>{eachData["amt.pledged"]}</td>
            <td>{eachData["percentage.funded"]}</td>
          </tr>
        ),
      )}
    </tbody>
  </table>
);

const PaginationControls = ({ page, totalPages, pageSize, onPageChange, onPageSizeChange }) => (
  <div data-testid={TEST_IDS.PAGINATION_CONTROLS} className="pagination-controls">
    <div data-testid={TEST_IDS.PAGINATION_SIZE} className="page-size">
      <select
        aria-label="Select no of rows per page"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        id="pageSizeSelect"
      >
        {PAGE_LIMITS.map((size) => (
          <option key={size} value={size}>
            {`Show ${size}`}
          </option>
        ))}
      </select>
    </div>
    <div data-testid={TEST_IDS.PAGINATION_BUTTONS} className="pagination">
      <button
        className="pagination-button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Go to Previous Page"
        data-testid={TEST_IDS.BUTTON_PREV}
      >
        {ACTION_BUTTONS.PREVIOUS}
      </button>
      <span data-testid={TEST_IDS.PAGE_NUMBER} aria-label="Current Page">{formatPageInfo(page, totalPages)}</span>
      <button
        className="pagination-button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Go to Next Page"
        data-testid={TEST_IDS.BUTTON_NEXT}
      >
        {ACTION_BUTTONS.NEXT}
      </button>
    </div>
  </div>
);

const DataTable = () => {
    const [projects, setProjects] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [isLoading, setIsLoading] = useState(true);
    const [showError, setError] = useState(false);

    // Fetch data from the API
    useEffect(() => {
      fetchProjects();
    }, []);

    const fetchProjects = async () => {
      setIsLoading(true);
      try {
          const response = await fetch(API_URL);
          if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          setProjects(data);
      } catch (error) {
          setError(true);
      } finally{
        setIsLoading(false);
      }
    };

    
    const handlePageSizeChange = (size) => {
      setPageSize(size);
      setPage(1); 
    };

    const { pageItems, totalPages } = useMemo(() => paginateData(projects, page, pageSize));

    const RenderDataTable = () => {
      return (
        <>
          <Table columns={columns} data={pageItems}/>
          <PaginationControls
            page={page}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={(size) => handlePageSizeChange(size)}
          />
        </>
      )
    }

    if(showError) return <ErrorPage/>;

    return (
      <div className='data-table-container'>
        <div className="data-table-content">
          <h1 data-testid={TEST_IDS.PROJECT_TITLE}>{PROJECT_TITLE}</h1>
          { 
          isLoading ? <Placeholder/> : (isEmpty(projects) && !showError) ? <ResultNotFound/> : <RenderDataTable/>
          }
        </div>
      </div>
    )
}

export default React.memo(DataTable);