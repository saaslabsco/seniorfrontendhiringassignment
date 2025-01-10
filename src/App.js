
import './App.css';
import Table from './components/table/index.tsx';
import {theadData} from './mockData/mockData.js';
import {useEffect, useState} from 'react';
import { getService } from './services/http.ts';
import {returnDataWrtTableContent} from './utils/helpers.ts';


function App() {

  // console.log(data);
  const [tbodyData, settbodyData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setendIndex] = useState(5);
  const [loading, setLoading] = useState(false);
  const [tableData, setTbaldata] = useState([]);

  const callAPI = async  ()=>{
    setLoading(true);
    const resp = await getService('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json');
    const {data, pageSize} = returnDataWrtTableContent(resp);
    settbodyData([...data]);
    setLoading(false);
    setTbaldata([...resp])
  }

  useEffect(()=>{
    callAPI();
  },[])

  const handlePrevPage =()=>{
    setStartIndex(startIndex - 5);
    setendIndex(endIndex - 5);
  }

  const handleNextPage =()=>{
    setStartIndex(endIndex);
    setendIndex(endIndex + 5);
  }

  useEffect(()=>{
    const data =  returnDataWrtTableContent(tableData, startIndex, endIndex);
    settbodyData([...data.data]);
    console.log(startIndex, endIndex);
    
  },[startIndex, endIndex])

  function Pagination (){

    return (
      <div>
        <button onClick={()=>handlePrevPage()} disabled = {startIndex <= 0}>Prev</button>
        <button onClick={()=>handleNextPage()} disabled = {endIndex >= tableData.length}>Next</button>
      </div>
    )
  }
  

  return (
    <div className="App">
      <span style={{fontSize: '16px', fontWeight: '600'}}>SaasLabs Assignment</span>
      <Table 
        theadData = {theadData}  
        tbodyData = {tbodyData}  
        loading = {loading}
      />
      <Pagination />
    </div>
  );
}

export default App;
