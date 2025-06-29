import { useMutation as _useMutation } from "@tanstack/react-query";

import type { ApiError } from "@/models/api";
import {
  type CustomError,
  type FetcherMutationOptions,
  fetcherMutation,
} from "@/utils/react-query";

import type { MutationFnArgs, UseMutationOptions } from "./types";

const useMutation = <
  TData = unknown,
  TError = ApiError,
  TVariables = unknown,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
) => {
  const { mutationFn, ...resOptions } = options;

  return _useMutation<
    TData,
    CustomError<TError>,
    MutationFnArgs<TVariables>,
    TContext
  >({
    mutationFn: async ({ context: _context = {}, variables }) => {
      const context = {
        path: "",
        ..._context,
      } as FetcherMutationOptions["context"];

      const result: unknown = await (mutationFn
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          mutationFn({ context, variables } as any)
        : fetcherMutation({ context, variables }));
      return result as TData;
    },
    ...resOptions,
  });
};

export default useMutation;
