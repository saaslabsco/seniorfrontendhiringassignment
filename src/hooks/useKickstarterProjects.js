import { useQuery } from "@tanstack/react-query";
import { KickstarterProjectsURL } from "../constants/globalContants";

const useKickstarterProjects = () => {
  return useQuery({
    queryKey: ["kickstarterProjects"],
    queryFn: async () => {
      const response = await fetch(KickstarterProjectsURL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
};

export default useKickstarterProjects;
