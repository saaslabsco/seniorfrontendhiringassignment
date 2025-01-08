import React, { createContext, useContext, useState, useEffect } from "react";

export const SaasLabsContext = createContext();

export function useSaasLabsContext() {
    const context = useContext(SaasLabsContext);
    if (!context) {
        throw new Error("useSaasLabsContext must be used within SaasLabsProvider");
    }
    return context;
}

export function SaasLabsProvider({ children }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await fetch(
                    "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
                );
                if (!result.ok) {
                    throw new Error("Network response was not ok");
                }
                const jsonResult = await result.json();
                setData(jsonResult);
                setError(null);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const changePage = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <SaasLabsContext.Provider
            value={{
                data,
                loading,
                error,
                currentRows,
                currentPage,
                totalPages,
                changePage,
            }}
        >
            {children}
        </SaasLabsContext.Provider>
    );
}
