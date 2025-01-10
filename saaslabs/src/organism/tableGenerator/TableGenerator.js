import React, { useState } from "react";
import PropTypes from 'prop-types';

import { getCurrentPageData, getTotalPages } from './tableGenerator.helpers';
import './tableGenerator.css';


const TableGenerator = ({ columnsConfig, data, recordsPerPage, tableHeaderTitle }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const currentPageData = getCurrentPageData(currentPage,recordsPerPage,data);

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = getTotalPages(data,recordsPerPage);

    return (
        <div className="table-container">
            <h1 className="tableHeader">{tableHeaderTitle}</h1>
            <table className="data-table">
                <thead>
                <tr>
                    {columnsConfig.map((column) => {
                        const {key,width,title} = column || {};
                        return (
                            <th key={key} style={{ width }}>{title}</th>
                        )
                    })}
                </tr>
                </thead>
                <tbody>
                {currentPageData.map((rowData, index) => (
                    <tr key={index}>
                        {columnsConfig.map((column) => {
                            const { key,renderer } = column || {};
                            const dataToShow = rowData[key];
                            return (
                                <td key={key}>
                                    {renderer ? renderer(dataToShow) : dataToShow}
                                </td>
                            )
                        })}
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    onClick={() => handlePagination(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePagination(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

TableGenerator.propTypes = {
    columnsConfig: PropTypes.array,
    recordsPerPage: PropTypes.number,
    data: PropTypes.array,
    tableHeaderTitle: PropTypes.string,

}

TableGenerator.defaultProps = {
    columnsConfig: [],
    recordsPerPage: 5,
    data: [],
    tableHeaderTitle: '',
}

export default TableGenerator;
