const FETCH_TABLE_DATA_URL =
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

export const getTableData = async () => {
  const response = await fetch(FETCH_TABLE_DATA_URL, {
    method: "GET",
  });
  return response.json();
};
