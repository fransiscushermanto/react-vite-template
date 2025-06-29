import { useMutation, type UseMutationOptions } from "@/hooks/react-query";
import { fetcherMutation } from "@/utils/react-query";
import type { ApiError } from "@/models/api";

function useRLogout(
  options: UseMutationOptions<undefined, ApiError, undefined> = {},
) {
  return useMutation<undefined, ApiError, undefined>({
    mutationFn: async ({ context, variables } = {}) =>
      await fetcherMutation({
        context: { ...context, path: "logout" },
        variables,
      }),
    ...options,
  });
}

export default useRLogout;
