export const getHighRatedKickStartersProjects = (_start, _end) => {
  const response = fetch(
    "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
  );
  return response
    .then((res) => {
      const data = res.json();
      return data;
    })
    .then((res) => {
      return {
        data: res.slice(_start, _end),
        totalCount: res.length,
      };
    })
    .catch((err) => {
      console.log({ err });
    });
};
