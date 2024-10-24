import { QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";

export const useQueryData = (
  queryKey: QueryKey,
  queryFn: QueryFunction,
  enabled?: boolean,
) => {
  const { data, isPending, isFetched, refetch, isFetching } = useQuery({
    queryKey,
    queryFn,
  });
  return { data, isPending, isFetched, refetch, isFetching };
};
