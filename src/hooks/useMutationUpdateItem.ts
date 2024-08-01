import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";


const updateBusiness = async ({ id, variables }: any) => {
  const res = await axios.put(`/admin/businesses/${id}`, variables);
  return res.data;
};

export default function useMutationUpdateBusiness() {
  return useMutation<any, AxiosError, any>(
    (variables) => updateBusiness(variables)
  );
}
