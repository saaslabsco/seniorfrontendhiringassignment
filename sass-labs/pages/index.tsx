import Table from "@/components/Table";
import { useEffect, useState } from "react";

const API_URL = "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

interface DataItem {
  id: number;
  name: string;
  age: number;
}

const fetchData = async (): Promise<DataItem[]> => {
  try {
    const response = await fetch(API_URL);
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default function Home() {
  const [data, setData] = useState<DataItem[]>([]);
  const [paginatedData, setPaginatedData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  const updatePaginatedData = (page: number) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const slicedData = data.slice(startIndex, endIndex);
    setPaginatedData(slicedData);
  };

  // Effect to fetch all data on initial load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
        updatePaginatedData(1); // Initialize paginated data for the first page
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Effect to update paginated data when the current page changes
  useEffect(() => {
    updatePaginatedData(currentPage);
  }, [currentPage, data]);

  const columns = [
    { header: 'S.No.', accessor: 's.no' },
    { header: 'Percentage funded', accessor: 'percentage.funded' },
    { header: 'Amount pledged', accessor: 'amt.pledged' },
  ];

  return (
    <div className="max-w-xl m-auto h-screen flex flex-col justify-center">
      <h1 className="font-semibold text-2xl">Table | SaasLabs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          columns={columns}
          data={paginatedData}
          totalItems={data.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}