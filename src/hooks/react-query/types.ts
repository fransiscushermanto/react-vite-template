import type {
  QueryKey,
  UseMutationOptions as DefaultUseMutationOptions,
  UseQueryOptions as DefaultUseQueryOptions,
  UseInfiniteQueryOptions as DefaultUseInfiniteQueryOptions,
  QueryFunctionContext as DefaultQueryFunctionContext,
  UseSuspenseQueryOptions as DefaultUseSuspenseQueryOptions,
  UseSuspenseInfiniteQueryOptions as DefaultUseSuspenseInfiniteQueryOptions,
  QueryMeta as DefaultQueryMeta,
} from "@tanstack/react-query";

import type {
  CustomError,
  HttpOptions,
  MutationFnContext,
} from "@/utils/react-query";

export type MutationFnArgs<TVars = unknown> = (TVars extends object
  ? {
      variables: TVars;
    }
  : { variables?: TVars }) & {
  context?: Omit<MutationFnContext, "path"> &
    Pick<Partial<MutationFnContext>, "path">;
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

export interface QueryMeta extends DefaultQueryMeta {
  /**
   * To replace env basePath
   */
  basePath?: string;
  /**
   * To use other version of the api
   */
  apiVersion?: "2";
  /**
   * Keys of object that want to be ignore to be camelized
   *
   * If `true` all keys will not be camelized
   *
   * Note: camelize only apply by default to header `content-type` = `application/json`
   *
   * @default true
   */
  ignoreCamelize?: HttpOptions["ignoreCamelize"];
  headers?: Record<string, string>;
}

export type QueryFunctionContext<
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = never,
> = Omit<DefaultQueryFunctionContext<TQueryKey, TPageParam>, "meta"> & {
  meta?: QueryMeta;
};
