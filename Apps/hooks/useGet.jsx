import { useQuery } from "@tanstack/react-query";
import { adminAPI } from "../../api";



const useGet = ({ endpoint, onSuccess = () => {}, onError = () => {}, onSettled = () => {} }) => {
  const query = useQuery({
    queryKey: ["getData", endpoint], // Include the endpoint in the query key
    queryFn: () => adminAPI.get(endpoint), // Fetch data using adminAPI.get
    onSuccess, // Callback for successful data fetching (optional)
    onError, // Callback for errors during data fetching (optional)
    onSettled, // Callback after data fetching is settled (optional)
  });

  return query;
};

export default useGet;
