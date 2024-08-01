import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface BusinessResponseProps {
  shops: any[];
}

export const createBusiness = async (variables: any) => {
  const res = await axios.post("/admin/businesses", variables);
  return res.data;
};

export default function useMutationCreateBusiness() {
  return useMutation<BusinessResponseProps, AxiosError, any>(
    (variables) => createBusiness(variables)
  );
}
