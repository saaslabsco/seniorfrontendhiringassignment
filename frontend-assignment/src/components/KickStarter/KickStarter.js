import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import { getKickStarterData } from './kickStarter.service';
import './kickStarter.css';

const KickStarter = () => {
  const [kickStarterData, setKickStarterData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const PAGE_SIZE = 5;

  useEffect(() => {
    onInit();
  }, []);

  const onInit = async () => {
    try {
      setIsLoading(true);
      const data = await getKickStarterData();
      setKickStarterData(data);
      setPaginatedData(data.slice(0, PAGE_SIZE));
    } catch (err) {
      setError('Failed to load KickStarter data');
      console.error('Error fetching KickStarter data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const onPageChange = (page) => {
    const startIndex = (page - 1) * PAGE_SIZE;
    setPaginatedData(kickStarterData.slice(startIndex, startIndex + PAGE_SIZE));
  };

  if (isLoading) {
    return <div className="loading"></div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <h1 className="kick-starter-title" aria-label="kickstarter-title">
        Highly Rated KickStarter Projects
      </h1>
      {paginatedData.length > 0 ? (
        <>
          <div 
            className="kick-starter-container" 
            aria-label="kickstarter-container" 
            role="table"
          >
            <div 
              className="kick-starter-header" 
              aria-label="kickstarter-header" 
              role="row"
            >
              <div 
                className="kick-starter-header-item" 
                aria-label="kickstarter-header-item" 
                role="columnheader"
              >
                S.No
              </div>
              <div 
                className="kick-starter-header-item" 
                aria-label="kickstarter-header-item" 
                role="columnheader"
              >
                Percentage Funded
              </div>
              <div 
                className="kick-starter-header-item" 
                aria-label="kickstarter-header-item" 
                role="columnheader"
              >
                Amount Pledged
              </div>
            </div>
            <div 
              className="kick-starter-body" 
              aria-label="kickstarter-body" 
              role="rowgroup"
            >
              {paginatedData.map((item) => (
                <div 
                  key={item["s.no"]} 
                  className="kick-starter-row" 
                  aria-label="kickstarter-row" 
                  role="row"
                >
                  <div 
                    className="kick-starter-row-item" 
                    aria-label="kickstarter-row-item" 
                    role="cell"
                  >
                    {item["s.no"]}
                  </div>
                  <div 
                    className="kick-starter-row-item" 
                    aria-label="kickstarter-row-item" 
                    role="cell"
                  >
                    {item["percentage.funded"]}
                  </div>
                  <div 
                    className="kick-starter-row-item" 
                    aria-label="kickstarter-row-item" 
                    role="cell"
                  >
                    {item["amt.pledged"]}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Pagination 
            dataLength={kickStarterData.length} 
            pageSize={PAGE_SIZE} 
            onPageChange={onPageChange} 
          />
        </>
      ) : (
        <div className="no-data">No projects found</div>
      )}
    </div>
  );
};

export default KickStarter;