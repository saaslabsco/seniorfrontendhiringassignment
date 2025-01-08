import React from 'react';
import './Table.css';
import { useSaasLabsContext } from '../context/context';

const Table = () => {
    const { loading, error, currentRows } = useSaasLabsContext();

    return (
        <div className='table-wrapper'>
            <h2 className='glow'>CATALOG</h2>
            {loading ? (
                <h3 className='glow loading'>Loading .......</h3>
            ) : error ? (
                <h3 className='glow error'>Error: {error}</h3>
            ) : (
                <div className="catalog-container">
                    <table className="catalog-table">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Percentage Funded</th>
                                <th>Amount Pledged</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((item, index) => (
                                <tr key={index}>
                                    <td>{item["s.no"]}</td>
                                    <td>{item["percentage.funded"]}</td>
                                    <td>{item["amt.pledged"]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Table;
