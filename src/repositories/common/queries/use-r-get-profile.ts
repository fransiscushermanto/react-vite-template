import { type UseQueryOptions, useQuery } from "@/hooks/react-query";
import type { ApiError, ApiResult } from "@/models/api";
import { GET_PROFILE_KEY, type Profile } from "../models";

export function useRGetProfile(
  options: UseQueryOptions<ApiResult<Profile>, ApiError> = {},
) {
  const { meta, ...resOptions } = options;

  return useQuery<ApiResult<Profile>, ApiError>({
    queryKey: GET_PROFILE_KEY,
    meta: { ...meta, apiVersion: "2" },
    ...resOptions,
  });
}
