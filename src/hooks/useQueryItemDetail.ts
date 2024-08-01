import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const QUERY_BUSINESS_DETAIL = "query-business-detail";

const getItemDetail = async (businessId: string) => {
  const response = await axios.get(`/admin/businesses/${businessId}`);
  return response.data;
};

export default function useQueryItemDetail(businessId: string) {
  const { data, ...query } = useQuery(
    [QUERY_BUSINESS_DETAIL, businessId],
    () => getItemDetail(businessId)
  );
  return { business: data, ...query };
}


// Call to use with frontend.
// import useMutationDeleteBusiness from "../../hooks/useMutationDeleteBusiness";

// const { mutateAsync: deleteBusiness, isLoading: isDeleting } =
// useMutationDeleteBusiness();

// const handleConfirmDelete = async (reason: string) => {
//     if (!businessId) return;
//     try {
//       await deleteBusiness({ id: businessId, reason });
//       setSuccess("Business deleted successfully");
//       refetch?.();
//     } catch (err) {
//       setError(computeErrorMessage(err));
//     } finally {
//       handleCloseDialog();
//     }
//   };
