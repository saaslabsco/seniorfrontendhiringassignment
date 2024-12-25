import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
        );
        setProjects(response.data);
      } catch (err) {
        setError("Failed to fetch projects. Please try again later.");
      }
    };

    fetchProjects();
  }, []);
  return (
    <div className="App">
      <div>
        <h1>Highly Rated Kickstarter Projects</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Percentage Funded</th>
              <th>Amount Pledged (USD)</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project["s.no"]}>
                <td>{project["s.no"] + 1}</td>
                <td>{project["percentage.funded"]}%</td>
                <td>${project["amt.pledged"].toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
