import Table from './components/Table';
import jsonData from "../frontend-assignment.json";

export const  mockData = jsonData.map((item) => ({
  sNo: item["s.no"],
  amtPledged: item["amt.pledged"],
  blurb: item["blurb"],
  by: item["by"],
  country: item["country"],
  currency: item["currency"],
  endTime: item["end.time"],
  location: item["location"],
  percentageFunded: item["percentage.funded"],
  numBackers: item["num.backers"],
  state: item["state"],
  title: item["title"],
  type: item["type"],
  url: item["url"],
}));


function App() {
  return <Table data={mockData}/>
}

export default App
