import React, { useEffect, useMemo, useState } from 'react';
import ProjectTable from './ProjectTable';
import Pagination from './Pagination';
import usePagination from '../hooks/use-pagination';

const Projects = () => {
  const dataURL = useMemo(() => {
    return "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";
  }, []);

  const {
    currentPageData,
    currentPage,
    totalPages,
    pages,
    error,
    isLoading,
    setCurrentPage
  } = usePagination(dataURL, 5);

  return (
    <div>
      <ProjectTable projects={currentPageData} loading={isLoading} error={error} />
      {
        currentPageData?.length > 0 ?
        <Pagination
          pages={pages}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        /> : null
      }
      
    </div>
  )
}

export default Projects