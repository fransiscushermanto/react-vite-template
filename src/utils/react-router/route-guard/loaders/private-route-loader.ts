import type { LoaderFunctionArgs } from "react-router";

import type { ApiError, ApiResult } from "@/models/api";
import { GET_PROFILE_KEY, type Profile } from "@/repositories/common";
import { queryClient } from "@/react-query/client";

import { parseCookie, stringifyCookie } from "@/utils/cookie";
import { getNextPath } from "@/utils/url";
import { CustomError, isCustomError } from "@/utils/react-query";
import COOKIES_KEY from "@/constants/cookies";
import { BASE_REDIRECT_PATH } from "@/constants/config";

import { privateRoutes } from "../constants";

export const privateRouteLoader = async (args: LoaderFunctionArgs) => {
  const cookies = parseCookie(args.context);
  const url = new URL(args.request.url);
  const next = getNextPath(url);

  if (cookies[COOKIES_KEY.IS_LOGGED_IN] !== "true") {
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/${BASE_REDIRECT_PATH}${next}`,
      },
    });
  }

  let profile = queryClient.getQueryData(GET_PROFILE_KEY);
  const isCached = !!profile;

  try {
    if (!isCached) {
      profile = await queryClient.fetchQuery<ApiResult<Profile>, ApiError>({
        queryKey: GET_PROFILE_KEY,
        meta: {
          apiVersion: "2",
          headers: { cookie: stringifyCookie(cookies) },
        },
      });
    }

    return profile;
  } catch (error) {
    if (isCustomError<ApiError>(error)) {
      if (error.payload) {
        const statusCode = error.payload.statusCode;

        if (statusCode === 401) {
          const isPrivateRoute = privateRoutes.routes.includes(url.pathname);

          if (!isPrivateRoute) {
            return new Response(null, {
              status: 302,
              headers: {
                Location: `/${url.searchParams.toString()}`,
              },
            });
          }

          return new Response(null, {
            status: 302,
            headers: {
              Location: `/${BASE_REDIRECT_PATH}${next}`,
            },
          });
        }
      }

      throw new CustomError(error.message, {
        statusCode: 500,
        error,
      });
    }

    throw new CustomError("Something went wrong", {
      statusCode: 500,
      error,
    });
  }
};
