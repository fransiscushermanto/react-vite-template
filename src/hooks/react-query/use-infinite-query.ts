import {
  type QueryKey,
  useInfiniteQuery as _useInfiniteQuery,
  type UseInfiniteQueryOptions,
  type InfiniteData,
  type QueryMeta,
} from "@tanstack/react-query";

import type { ApiError } from "@/models/api";
import type { CustomError } from "@/utils/react-query";

const useInfiniteQuery = <
  TQueryFnData,
  TError extends ApiError = ApiError,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
>(
  options: UseInfiniteQueryOptions<
    TQueryFnData,
    CustomError<TError>,
    TData,
    TQueryKey,
    TPageParam
  > & { meta?: QueryMeta },
) => {
  return _useInfiniteQuery<
    TQueryFnData,
    CustomError<TError>,
    TData,
    TQueryKey,
    TPageParam
  >(options);
};

export default useInfiniteQuery;
