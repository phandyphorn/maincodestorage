import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const QUERY_BUSINESSES = "query-businesses";

// for any type, you can replace it by another interfaces.
const getItems = async (params: any) => {
  // axios: we can replaced it with privateApi, because your team will be use that.
  const response = await axios.get(`/admin/businesses`, {
    params,
  });
  return response.data;
};

export default function useQueryItems(variables: any) {
  const { data, ...query } = useQuery(
    [QUERY_BUSINESSES, variables],
    () => getItems(variables)
  );
  return { result: data, ...query };
}


// How to apply with frontend:===
// import useQueryBusinesses from "../../hooks/useQueryBusinesses";
// const { result, isLoading, refetch } = useQueryBusinesses({
//   pageNumber,
//   limit,
//   query: query || undefined,
//   merchantType: merchantType || undefined,
//   categoryId: categoryId || undefined,
//   status,
//   sortList: sortValues?.label,
//   isEnabled: BUSINESS_STATUS[bizStatus],
//   direction: sortValues?.direction
//     ? SORT_DIRECTIONS[sortValues?.direction]
//     : SORT_DIRECTIONS.DESC,
// });

// const { businesses, total } = useMemo(() => {
//   if (!result) return { businesses: [], total: 0 };
//   return { businesses: result.items, total: result.total };
// }, [result]);

// Then we can use businesses, total from that query.