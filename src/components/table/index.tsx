import React from "react";
import TableRow from "./tableRow/index.tsx";
import TableHeader from "./tableHeader/index.tsx";
import './index.css'

type tbodyType = {
  "s.no": number;
  "amt.pledged": number;
  blurb: string;
  by: string;
  country: string;
  currency: string;
  "end.time": string;
  location: string;
  "percentage.funded": number;
  "num.backers": string;
  state: string;
  title: string;
  type: string;
  url: string;
};

interface tableProps {
  theadData: string[];
  tbodyData: tbodyType[];
  loading: boolean
}

const Table = (props: tableProps) => {
  const { theadData = [], tbodyData = [], loading } = props;
  return (
    <table id="tbl">
      <thead>
        <tr>
          {theadData.map((h) => {
            return <TableHeader key={h} item={h} />;
          })}
        </tr>
      </thead>
      <tbody>
       {
        loading ? <div>Loading ...</div> :  tbodyData.map((item) => {
            return <TableRow key={item.id} data={item.items} loading={loading} />;
          })}
       
      </tbody>
    </table>
  );
};

export default Table;
