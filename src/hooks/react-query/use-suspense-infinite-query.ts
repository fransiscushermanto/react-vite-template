import {
  type QueryKey,
  useSuspenseInfiniteQuery as _useSuspenseInfiniteQuery,
  type UseSuspenseInfiniteQueryOptions,
  type InfiniteData,
  type QueryMeta,
} from "@tanstack/react-query";

import type { ApiError } from "@/models/api";
import type { CustomError } from "@/utils/react-query";

const useSuspenseInfiniteQuery = <
  TQueryFnData,
  TError extends ApiError = ApiError,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
>(
  options: UseSuspenseInfiniteQueryOptions<
    TQueryFnData,
    CustomError<TError>,
    TData,
    TQueryKey,
    TPageParam
  > & { meta?: QueryMeta },
) => {
  return _useSuspenseInfiniteQuery<
    TQueryFnData,
    CustomError<TError>,
    TData,
    TQueryKey,
    TPageParam
  >(options);
};

export default useSuspenseInfiniteQuery;
