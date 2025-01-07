import React, { useState, useEffect } from 'react'

import Pagination from '../Pagination/Pagination';

import { getKickStarterData } from './kickStarter.service';

import './kickStarter.css';

const KickStarter = () => {
  const [kickStarterData, setKickStarterData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    onInit();
  }, []);

  const onInit = async () => {
    const data = await getKickStarterData();
    setKickStarterData(data);
    setPaginatedData(data.slice(0, 5));
  }

  const onPageChange = (page) => {
    setPaginatedData(kickStarterData.slice((page - 1) * 5, page * 5));
  }

  return (
    <div className='container'>
      <h1 className='kick-starter-title' aria-label='kickstarter-title'>KickStarter Projects</h1>
      {paginatedData.length > 0 &&
        <div className="kick-starter-container" aria-label='kickstarter-container' role='table'>
          <div className="kick-starter-header" aria-label='kickstarter-header' role='row'>
            <div className='kick-starter-header-item' aria-label='kickstarter-header-item' role='columnheader'>S.No</div>
            <div className='kick-starter-header-item' aria-label='kickstarter-header-item' role='columnheader'>Percentage Funded</div>
            <div className='kick-starter-header-item' aria-label='kickstarter-header-item' role='columnheader'>Amount Pledged</div>
          </div>
          <div className="kick-starter-body" aria-label='kickstarter-body' role='rowgroup'>
            {
              paginatedData.map((item) => (
                <div key={item["s.no"]} className='kick-starter-row' aria-label='kickstarter-row' role='row'>
                  <div className='kick-starter-row-item' aria-label='kickstarter-row-item' role='cell'>{item["s.no"]}</div>
                  <div className='kick-starter-row-item' aria-label='kickstarter-row-item' role='cell'>{item["percentage.funded"]}</div>
                  <div className='kick-starter-row-item' aria-label='kickstarter-row-item' role='cell'>{item["amt.pledged"]}</div>
                </div>
              ))
            }
          </div>
        </div>
      }
      {paginatedData.length > 0 && <Pagination dataLength={kickStarterData.length} pageSize={5} onPageChange={onPageChange} />}
    </div>
  )
}

export default KickStarter;
