import myData from "./frontend.json";
import "./styles.css";
import { useState, createContext, useContext } from "react";

function ListingData({ dataFetched }) {
  
  const returnComp = dataFetched.map((data) => (
    <tr key={data["s.no"]}>
      <td>{data["s.no"]}</td>
      <td> {data["percentage.funded"]}</td>
      <td> {data["amt.pledged"]}</td>
    </tr>
  ));
  return returnComp;
}
function Greeting({ datafetched }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage funded</th>
            <th>Amount pledged</th>
          </tr>
        </thead>
        <tbody>
          <ListingData dataFetched={datafetched} />
        </tbody>
      </table>
    </>
  );
}
function Pagination({
  setfetchedData,
  startIndex,
  endIndex,
  setendIndex,
  setStartIndex,
}) {
  function handleRightClick() {
    var ind = 0;
    var out = 0;
    if (endIndex + 5 <= myData.length) {
      ind = startIndex + 5;
      out = endIndex + 5;
      setStartIndex(() => startIndex + 5);
      setendIndex(() => endIndex + 5);
      const datatoset = myData.slice(ind, out);

      setfetchedData(datatoset);
    } else if (
      endIndex != myData.length &&
      endIndex + 5 > myData.length &&
      startIndex + 5 < myData.length
    ) {
      ind = startIndex + 5;
      out = myData.length - endIndex + startIndex + 5;
      setStartIndex(() => startIndex + 5);
      setendIndex(() => myData.length - endIndex + startIndex + 5);
      const datatoset = myData.slice(ind, out);

      setfetchedData(datatoset);
    }
  }
  function handleLeftClick() {
    var ind = 0;
    var out = 0;
    if (endIndex == myData.length) {
      out = myData.length - endIndex + startIndex;
      ind = startIndex - 5;
      setendIndex(() => out);
      setStartIndex(() => ind);
      const datatoset = myData.slice(ind, out);

      setfetchedData(datatoset);
    } else if (startIndex - 5 >= 0) {
      ind = startIndex - 5;
      out = endIndex - 5;
      setStartIndex(() => startIndex - 5);
      setendIndex(() => endIndex - 5);
      const datatoset = myData.slice(ind, out);

      setfetchedData(datatoset);
    }
  }
  return (
    <>
      <div className="paginq">
        <span className="leftclick" onClick={() => handleLeftClick()}>
          {" "}
          &laquo;
        </span>
        <span>
          {startIndex} of {endIndex - 1}
        </span>

        <span className="rightclick" onClick={() => handleRightClick()}>
          {" "}
          &raquo;{" "}
        </span>
      </div>
    </>
  );
}
export default function App() {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setendIndex] = useState(5);
  const pageSize = 5;
  const datatorender = myData.slice(0, 5);

  const [datafetched, setfetchedData] = useState(datatorender);

  return (
    <>
      <Pagination
        setfetchedData={setfetchedData}
        setendIndex={setendIndex}
        setStartIndex={setStartIndex}
        startIndex={startIndex}
        endIndex={endIndex}
      />
      <Greeting datafetched={datafetched} setfetchedData={setfetchedData} />
    </>
  );
}
