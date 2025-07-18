import type {
  QueryKey,
  UseMutationOptions as DefaultUseMutationOptions,
  UseQueryOptions as DefaultUseQueryOptions,
  UseInfiniteQueryOptions as DefaultUseInfiniteQueryOptions,
  QueryFunctionContext as DefaultQueryFunctionContext,
  UseSuspenseQueryOptions as DefaultUseSuspenseQueryOptions,
  UseSuspenseInfiniteQueryOptions as DefaultUseSuspenseInfiniteQueryOptions,
  QueryMeta,
} from "@tanstack/react-query";

import type { CustomError, MutationFnContext } from "@/utils/react-query";

export type MutationFnArgs<TVars = unknown> = (TVars extends object
  ? {
      variables: TVars;
    }
  : { variables?: TVars }) & {
  context?: Partial<MutationFnContext>;
};

export type UseMutationOptions<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
> = DefaultUseMutationOptions<
  TData,
  CustomError<TError>,
  MutationFnArgs<TVariables>,
  TContext
>;

export interface UseQueryOptions<
  TQueryFnData = unknown,
  TError = Record<string, unknown>,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> extends Omit<
    DefaultUseQueryOptions<TQueryFnData, CustomError<TError>, TData, TQueryKey>,
    "queryKey" | "meta"
  > {
  meta?: QueryMeta;
  queryKey?: QueryKey;
}

export interface UseSuspenseQueryOptions<
  TQueryFnData = unknown,
  TError = Record<string, unknown>,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> extends Omit<
    DefaultUseSuspenseQueryOptions<
      TQueryFnData,
      CustomError<TError>,
      TData,
      TQueryKey
    >,
    "queryKey" | "meta"
  > {
  meta?: QueryMeta;
  queryKey?: QueryKey;
}

export interface UseInfiniteQueryOptions<
  TQueryFnData = unknown,
  TError = Record<string, unknown>,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
> extends Omit<
    DefaultUseInfiniteQueryOptions<
      TQueryFnData,
      CustomError<TError>,
      TData,
      TQueryKey,
      TPageParam
    >,
    "queryKey"
  > {
  queryKey?: QueryKey;
}

export interface UseSuspenseInfiniteQueryOptions<
  TQueryFnData = unknown,
  TError = Record<string, unknown>,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
> extends Omit<
    DefaultUseSuspenseInfiniteQueryOptions<
      TQueryFnData,
      CustomError<TError>,
      TData,
      TQueryKey,
      TPageParam
    >,
    "queryKey"
  > {
  queryKey?: QueryKey;
}

export type QueryFunctionContext<
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = never,
> = Omit<DefaultQueryFunctionContext<TQueryKey, TPageParam>, "meta"> & {
  meta?: QueryMeta;
};
