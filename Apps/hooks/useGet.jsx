
import { useQuery } from "@tanstack/react-query";
import adminAPI from "../../api/adminAPI";

const useGet = ({
  endpoint,
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
}) => {
  const query = useQuery(
    ["getData", endpoint],
    () => adminAPI.get(endpoint),
    {
      onSuccess,
      onError,
      onSettled,
    }
  );

  return query;
};

export default useGet;
