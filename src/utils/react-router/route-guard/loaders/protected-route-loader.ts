import type { LoaderFunctionArgs } from "react-router";

import type { ApiError, ApiResult } from "@/models/api";
import { GET_PROFILE_KEY, type Profile } from "@/repositories/common";
import { queryClient } from "@/react-query/client";

import COOKIES_KEY from "@/constants/cookies";
import { parseCookie, stringifyCookie } from "@/utils/cookie";
import { CustomError } from "@/utils/react-query";
import { BASE_PATH } from "@/constants/config";

export const protectedRouteLoader = async (args: LoaderFunctionArgs) => {
  const cookies = parseCookie(args.context);

  if (cookies[COOKIES_KEY.IS_LOGGED_IN] === "true") {
    try {
      await queryClient.fetchQuery<ApiResult<Profile>, ApiError>({
        queryKey: GET_PROFILE_KEY,
        meta: {
          apiVersion: "2",
          headers: {
            cookie: stringifyCookie(cookies),
          },
        },
      });

      return new Response(null, {
        status: 302,
        headers: {
          Location: `${BASE_PATH}`,
        },
      });
    } catch (err) {
      const error = err as CustomError<ApiError>;
      console.error(error);
    }
  }

  return null;
};
