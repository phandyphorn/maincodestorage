import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
export const QUERY_AUDIT = "query-audit";

export const getItems = async ({
  params,
}: {
  params: any;
}) => {
  const response = await axios.get(
    `/admin/audit`,
    { params }
  );
  return response.data;
};

export default function useQueryInfiniteItems(params: {
  limit: number;
  businessId?: string;
}) {
  const queryClient = useQueryClient();

  const query = useInfiniteQuery(
    [QUERY_AUDIT, params],
    ({ pageParam }) => {
      return getItems({
        params: { pageNumber: pageParam || 0, ...params },
      });
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.hasMore) {
          return lastPage.pageNumber + 1;
        }
        return undefined;
      },
    }
  );

  const resetQuery = () => {
    queryClient.resetQueries({
      queryKey: [QUERY_AUDIT],
    });
  };

  const { data, ...rest } = query;
  const merchantHistories =
    (data?.pages?.flatMap((page) => page.items) as any[]) || [];
  return { merchantHistories, resetQuery, ...rest, ...query };
}
