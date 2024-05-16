
import { useMutation } from "@tanstack/react-query";
import { adminAPI } from "../../api";


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
