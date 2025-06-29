import { useMutation, type UseMutationOptions } from "@/hooks/react-query";
import type { ApiError, ApiResult } from "@/models/api";
import { fetcherMutation } from "@/utils/react-query";

import type { LoginParam, LoginResponse } from "../models";

function useRLogin(
  options: UseMutationOptions<
    ApiResult<LoginResponse>,
    ApiError,
    LoginParam
  > = {},
) {
  return useMutation<ApiResult<LoginResponse>, ApiError, LoginParam>({
    mutationFn: async ({ context, variables }) =>
      await fetcherMutation({
        context: { ...context, path: "login" },
        variables,
      }),
    ...options,
  });
}

export default useRLogin;
