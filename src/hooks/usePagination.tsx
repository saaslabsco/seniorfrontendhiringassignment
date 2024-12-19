import { useState, useEffect } from "react";

interface UsePaginationProps {
  apiUrl: string;
  pageSize: number;
}

export const usePagination = <T,>({ apiUrl, pageSize }: UsePaginationProps) => {
  const [allData, setAllData] = useState<T[]>([]);
  const [paginatedData, setPaginatedData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl);
        const result: T[] = await response.json();
        setAllData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    setPaginatedData(allData.slice(start, end));
  }, [allData, currentPage, pageSize]);

  const totalPages = Math.ceil(allData.length / pageSize);

  return { paginatedData, currentPage, totalPages, setCurrentPage, loading };
};
