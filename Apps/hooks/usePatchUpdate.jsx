import { useMutation } from "@tanstack/react-query";
import { adminAPI } from "../../api";




const usePatch = ({
  endpoint = "",
  isMultiPart = false,
  onSuccess,
  onError,
  onSettled,
}) => {
  const mutation = useMutation({
    mutationFn: (data) => {
      return adminAPI.patch(
        endpoint,
        data,
        {
          headers: {
            "Content-Type": isMultiPart
              ? "multipart/form-data"
              : "application/json",
          },
        },
        {
          onSuccess,
          onError,
          onSettled,
        }
      );
    },
  });

  return mutation;
};

export default usePatch;
