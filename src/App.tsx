import Table from './components/Table';
import {useState, useEffect} from 'react';


function App() {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const  mockData = data.map((item:Record<string,string | number>) => ({
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
        setData(mockData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <>
  {data && <Table data={data}/> }
  </>
}

export default App
