import React, { useState } from 'react';
import { useFetchFunds } from '../../Hooks/api';
import './styles.css';

const TableContainer = (props) => {

    const { maxRecordPerPage = 5 } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, isError, error } = useFetchFunds();

    const totalPages = Math.ceil(data?.length / maxRecordPerPage);
    const startIndex = (currentPage - 1) * maxRecordPerPage;
    const currentRecords = data?.slice(startIndex, startIndex + maxRecordPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div className='container'>
            <h2 aria-label="Table heading">Project Funds</h2>
            <table aria-label="funds data table">
                <thead>
                    <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">Percentage funded</th>
                        <th scope="col">Amount pledged</th>
                    </tr>
                </thead>
                {
                    currentRecords?.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item?.["s.no"]}</td>
                                <td>{item?.["percentage.funded"]}</td>
                                <td>{item?.["amt.pledged"]}</td>
                            </tr>
                        );
                    })
                }
            </table>
            <div className='pagination' role="navigation" aria-label="Pagination controls">
                <button onClick={handlePrevious} disabled={currentPage === 1} aria-label="Previous">
                    Previous
                </button>
                <button onClick={handleNext} disabled={currentPage === totalPages} aria-label="Next">
                    Next
                </button>
            </div>
        </div>
    );
}

export default TableContainer;