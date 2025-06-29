import ky from "ky";
import { QueryClient, type QueryFunction } from "@tanstack/react-query";

import {
  CustomError,
  blacklistStatusCode,
  type CustomErrorOptions,
} from "@/utils/react-query";
/**
 * @TODO workaround issue
 *
 * Cannot access 'fetcherQuery' before initialization
 *
 * ex. import { fetcherQuery } from utils/react-query; <- this will break
 */
import fetcherQuery from "@/utils/react-query/fetcher-query";
import type { ApiError } from "@/models/api";
// import { getNextPath, queryParse } from "@/utils/url";

const MAX_RETRY = 3;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: fetcherQuery as QueryFunction,
      retry: (failureCount, err) => {
        const error = err as CustomError;
        return failureCount < MAX_RETRY && error.retry;
      },
      enabled: false,
      refetchOnWindowFocus: false,
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      // reference: https://tanstack.com/query/v5/docs/framework/react/guides/ssr
      staleTime: 60 * 1000,
    },
    mutations: {
      retry: (failureCount, err) => {
        const error = err as CustomError;
        return failureCount < MAX_RETRY && error.retry;
      },
    },
  },
});

// function redirectOnUnauthenticate() {
//   if (typeof window !== "undefined") {
//     const pathname = window.location.pathname;

//     if (protectedRoutes.routes.includes(pathname.slice(1))) return;

//     const search = queryParse(window.location.search);
//     const prevNext = search.next;

//     if (!!prevNext) return;

//     const url = new URL(window.location.href);

//     const next = getNextPath(url);

//     window.location.replace(`/login${next}`);
//   }
// }

export const client = (options: Omit<CustomErrorOptions, "retry">) =>
  ky.create({
    retry: {
      limit: MAX_RETRY,
      methods: ["get", "put", "delete", "patch"],
      statusCodes: [401],
    },
    hooks: {
      afterResponse: [
        async (_r, _o, res) => {
          if (!res.ok) {
            let errorResponse: Record<string, string> = {};

            if (res.headers.get("content-type")?.includes("application/json"))
              errorResponse = await res.json();

            // if (res.status === 401) {
            //   /**
            //    * @TODO remove when implement refreshToken
            //    */
            //   if (typeof window !== "undefined") {
            //     redirectOnUnauthenticate();
            //   }
            // }

            const customError = new CustomError(
              `[${res.status}] ${res.statusText}`,
              {
                ...errorResponse,
                ...(!errorResponse.status_code && {
                  statusCode: res.status,
                }),
              },
              {
                retry: !blacklistStatusCode.some(
                  (statusCode) => statusCode === res.status,
                ),
                ignoreCamelize: options.ignoreCamelize,
              },
            );
            customError.name = "ApiError";

            throw customError;
          }
        },
      ],
      beforeRetry: [
        async ({ error: err }) => {
          const error = err as CustomError<ApiError>;
          const statusCode = error.payload?.statusCode;

          if (statusCode === 401) {
            /**
             * @TODO implement refreshToken
             */
            throw error;
          }

          throw error;
        },
      ],
    },
  });
