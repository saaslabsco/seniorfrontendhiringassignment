import { use, useState } from "react";
import { useEffect } from "react";

const usePagination = (url, pageSize, pageBoundary = 5) => {
  const [data, setData] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pages, setPages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const caluclateTotalPages = (totalItems, pageSize) => {
    const totalPages = Math.ceil(totalItems / pageSize);
    setTotalPages(totalPages);
  }

  const fetchData = async () => {
    try {
      setIsLoading(true);
      let response = await fetch(url);
      response = await response.json();
      setData(response);
      caluclateTotalPages(response?.length, pageSize);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const getPagesToRender = () => {
    const half = Math.floor(pageBoundary / 2);
    const pages = [];


    let leftElements;
    if (currentPage === totalPages) {
      leftElements = 4; // Show 4 elements on the left when on page 21
    } else if (currentPage === totalPages - 1) {
      leftElements = 3; // Show 3 elements on the left when on page 20
    } else {
      // For other pages, show the usual number of elements on the left
      leftElements = Math.min(currentPage - 1, half);
    }

    const rightElements = (half * 2) - leftElements;
    let startPage = Math.max(2, currentPage - leftElements);
    let endPage = Math.min(totalPages - 1, currentPage + rightElements);

    pages.push({ page: 1, type: 'page' });

    //Left Ellipsis
    if (startPage > 2) {
      pages.push({ page: -1, type: "ellipsis" })
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push({ page: i, type: 'page' });
    }

    //Right Ellipsis
    if (totalPages - endPage > 1) {
      pages.push({ page: -1, type: "ellipsis" })
    }

    pages.push({ page: totalPages, type: 'page' });
    setPages(pages);
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  useEffect(() => {
    if (data.length > 0) {
      const pageStart = (currentPage - 1) * pageSize;
      const pageEnd = pageStart + pageSize;
      const pageData = data.slice(pageStart, pageEnd);

      setCurrentPageData(pageData);
      getPagesToRender();
    }
  }, [data, currentPage, pageSize]);

  return {
    currentPageData,
    currentPage,
    totalPages,
    pages,
    error,
    isLoading,
    setCurrentPage
  };
}

export default usePagination;