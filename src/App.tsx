import Table from "@/components/Table";
import { getTableData } from "@/apis";
import { useEffect, useState } from "react";
import { TABLE_COLUMNS } from "./constants";

function App() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tableData.length) {
      getTableData()
        .then((data) => {
          setTableData(data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Top Rated Kickstarter Projects</h1>
      </header>
      <main className="app-main">
        <Table
          data={tableData}
          columns={TABLE_COLUMNS}
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </main>
      <footer className="app-footer">
        <span>Submitted by</span>
        <a
          href="https://www.linkedin.com/in/sahil-kumar-a055b9181/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sahil Kumar
        </a>
      </footer>
    </div>
  );
}

export default App;
