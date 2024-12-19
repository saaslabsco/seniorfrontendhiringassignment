import { useQuery } from 'react-query';
 
const fetchFundsData = async () => {
  const response = await fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json');
  if (!response.ok) {
    throw new Error('Failed to fetch table data');
  }  
  return response.json();
};
 

export const useFetchFunds = () => {
  return useQuery({
          queryKey: ['fundsData'],
          queryFn: fetchFundsData, 
          staleTime: 1000 * 60 * 3, 
          retry: 2, 
        });
};