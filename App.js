import React from "react";
import ReactDOM from "react-dom/client";
import styles from "./App.module.css";
import Table from "./Assignment/Table";
import { api } from "./Assignment/constants";

const colDefs = [
  { headerName: "S.No.", field: "s.no" },
  {
    headerName: "Percentage funded",
    field: "percentage.funded",
  },
  {
    headerName: "Amount pledged",
    field: "amt.pledged",
  },
];

const App = () => {
  return (
    <div className={styles.app}>
      <Table colDefs={colDefs} api={api} rowsPerPage={5} title={"pagination"} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
