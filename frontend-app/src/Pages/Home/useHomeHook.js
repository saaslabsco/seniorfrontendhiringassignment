import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

// Custom Hook for handling project data and pagination
const useHomeHooks = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch data on component mount
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        const data = response.data;
        setProjects(data);
        setTotalPages(Math.ceil(data.length / 5)); // Calculate total pages
        setTotalItems(data.length);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // Get the projects for the current page
  const indexOfLastProject = currentPage * 5;
  const indexOfFirstProject = indexOfLastProject - 5;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  // Change the current page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return {
    currentProjects,
    currentPage,
    totalPages,
    totalItems,
    handlePageChange,
  };
};

export default useHomeHooks;
