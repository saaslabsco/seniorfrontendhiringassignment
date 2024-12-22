export const fetchProjectDetails = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
  );
  const data = await response.json();
  if (!response.ok) throw new Error("Error fetching project data");

  return data;
};
