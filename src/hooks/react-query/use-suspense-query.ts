import {
  type QueryKey,
  useSuspenseQuery as _useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";

import type { CustomError } from "@/utils/react-query";

import type { QueryMeta } from "./types";

const useSuspenseQuery = <
  TQueryFnData = unknown,
  TError = Record<string, unknown>,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseSuspenseQueryOptions<
    TQueryFnData,
    CustomError<TError>,
    TData,
    TQueryKey
  > & { meta?: QueryMeta },
) => {
  return _useSuspenseQuery<TQueryFnData, CustomError<TError>, TData, TQueryKey>(
    options,
  );
};

export default useSuspenseQuery;
