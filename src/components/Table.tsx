import React, { useState } from 'react';
import Pagination from 'components/Pagination';
import { ProjectProps, TableProps } from 'type';

const TableRow = ({ project }: { project: ProjectProps }) => (
  <tr>
    <td>{project['s.no']}</td>
    <td className="d-flex">
      <img
        src="https://img.icons8.com/office/40/percentage.png"
        alt="Percentage Funded Icon"
        className="icon"
      />
      {project['percentage.funded']}%
    </td>
    <td>
      <img
        src="https://img.icons8.com/color/48/null/us-dollar-circled.png"
        alt="Amount Icon"
        className="icon"
      />
      {project['amt.pledged'].toLocaleString()}
    </td>
  </tr>
);

const Table = ({ data, loading, error }: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const totalPages = Math.ceil(data.length / recordsPerPage);

  const currentRecords = data.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div role="status" aria-live="polite" className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="text-red-500 p-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="overflow-x-auto table-wrapper">
        <table className="min-w-full" aria-label="Kickstarter Projects">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">
                <img
                  src="https://img.icons8.com/office/40/percentage.png"
                  alt="Percentage Funded Icon"
                  className="icon"
                />
                Percentage Funded
              </th>
              <th scope="col">
                <img
                  src="https://img.icons8.com/color/48/null/us-dollar-circled.png"
                  alt="Amount Icon"
                  className="icon"
                />
                Amount Pledged
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((project) => (
              <TableRow key={project['s.no']} project={project} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Table;
