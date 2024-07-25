import { useMutation } from "@tanstack/react-query";
import { adminAPI } from "../../api";



const useDelete = ({
  endpoint = "",
}) => {
  const mutation = useMutation({
    mutationFn: (deleteId) => {
      return adminAPI.delete(
       `${endpoint}/${deleteId}`
      );
    },
  });

  return mutation;
};

export default useDelete;
