import {
  type QueryKey,
  useQuery as _useQuery,
  type UseQueryOptions,
  type QueryMeta,
} from "@tanstack/react-query";

import type { CustomError } from "@/utils/react-query";

const useQuery = <
  TQueryFnData = unknown,
  TError = Record<string, unknown>,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<
    TQueryFnData,
    CustomError<TError>,
    TData,
    TQueryKey
  > & { meta?: QueryMeta },
) => {
  return _useQuery<TQueryFnData, CustomError<TError>, TData, TQueryKey>(
    options,
  );
};

export default useQuery;
