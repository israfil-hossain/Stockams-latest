import adminAPI from "@/api/adminAPI";
import { useMutation } from "@tanstack/react-query";

const useDelete = ({
  endpoint = "",
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
} = {}) => {
  const mutation = useMutation(
    (deleteId) => adminAPI.delete(`${endpoint}/${deleteId}`),
    {
      onSuccess,
      onError,
      onSettled,
    }
  );

  return mutation;
};

export default useDelete;
