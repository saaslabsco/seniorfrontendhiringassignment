import React, { useState } from 'react';
import useKickstarterProjects from '../../hooks/useKickstarterProjects';
import ProjectTable from '../../components/projectTable/ProjectTable';
import Pagination from '../../components/pagination/Pagination';
import './styles.css'

const KickstarterProjects = () => {
  const { data, isLoading, error } = useKickstarterProjects();
  const [currentPage, setCurrentPage ] = useState(1);
  if (isLoading) return <div className='loading-text' aria-live="polite">Loading...</div>;
  if (error) return <div className='error-msg' aria-live="assertive">Error fetching data</div>;

  console.log(data, 'kk12')
  return (
    <div>
      <h1 className="heading">Kickstarter Projects</h1>
    <ProjectTable aria-labelledby="projectTable" projects={data} currentPage={currentPage}/>
    <Pagination aria-label="Pagination for project list"  totalPages={Math.ceil(data.length/5)} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  );

};

export default KickstarterProjects;