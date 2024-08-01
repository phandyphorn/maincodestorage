import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
const QUERY_BUSINESSES = "query-business";

const deleteBusiness = async ({ id, reason }: any) => {
  const response = await axios.delete<boolean>(
    `/admin/businesses/${id}?reason=${reason}`
  );
  return response.data;
};

export default function useMutationDeleteBusiness() {
  const queryClient = useQueryClient();

  return useMutation<boolean, AxiosError, any>(
    (variables) => deleteBusiness(variables),
    {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_BUSINESSES]);
      },
    }
  );
}
