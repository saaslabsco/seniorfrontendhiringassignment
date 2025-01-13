import Table from 'components/Table';
import useFetchData from 'hooks/useFetchData';
import './App.css';

function App() {
  const { data, loading, error } = useFetchData(
    'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json'
  );
  return (
    <div className="app-wrapper">
      <Table data={data} loading={loading} error={error} />
    </div>
  );
}

export default App;
