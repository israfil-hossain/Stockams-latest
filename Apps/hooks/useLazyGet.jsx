import { useQuery } from "@tanstack/react-query";
import { adminAPI } from "../../api";

const useLazyGet = (endpoint, id) => {
  // Handle optional ID for lazy fetching

  // Use useQuery with appropriate configuration

  return useQuery({
    queryKey: ["getData", endpoint, id],
    queryFn: () => adminAPI.get(endpoint),
    enabled: false,
  });
};

export default useLazyGet;
