import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import TableContainer from './components/TableContainer/TableContainer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <TableContainer maxRecordPerPage={5}/>
      </div>
    </QueryClientProvider>
  );
}

export default App;
