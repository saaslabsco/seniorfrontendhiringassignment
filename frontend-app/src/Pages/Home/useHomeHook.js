import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./constants";

const useHomeHooks = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = response.data;
      setProjects(() => data);
      setTotalPages(() => Math.ceil(data.length / 5));
      setTotalItems(() => data.length);
    } catch (error) {
      console.error("Error while fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProject = currentPage * 5;
  const indexOfFirstProject = indexOfLastProject - 5;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  return {
    currentProjects,
    currentPage,
    totalPages,
    totalItems,
    handlePageChange,
  };
};

export default useHomeHooks;
