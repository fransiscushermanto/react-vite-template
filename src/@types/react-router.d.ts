import type { ApiError } from "@/models/api";
import type { DehydratedState } from "@tanstack/react-query";
import type {
  IndexRouteObject,
  NonIndexRouteObject,
  LoaderFunctionArgs,
} from "react-router";

declare module "react-router" {
  type DataFunctionValue =
    | Response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | { dehydratedState?: DehydratedState; [key: string]: any }
    | null;

  type DataFunctionReturnValue = Promise<DataFunctionValue> | DataFunctionValue;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface LoaderFunction<Context = any> {
    (
      args: LoaderFunctionArgs<Context>,
      handlerCtx?: unknown,
    ): DataFunctionReturnValue;
    hydrate?: boolean;
  }

  type RouteAccess = "public" | "protected" | "private";

  type DefaultRouteObject = IndexRouteObject | NonIndexRouteObject;

  type RouteObject = (
    | (Omit<IndexRouteObject, "children" | "loader"> & {
        index: true;
        children?: never;
      })
    | (Omit<NonIndexRouteObject, "children" | "loader"> & {
        index?: false;
        children?: RouteObject[];
      })
  ) & {
    /**
     * This is used to identify the route access that you have define
     *
     * "public" | undefined -> Allowed to be access with and without authorization key
     * "protected" -> Allowed to be access without authorization key
     * "private" -> Allowed to be access with authorization key
     *
     * @default "public"
     */
    access?: RouteAccess;
    children?: RouteObject[];
    loader?: LoaderFunction | boolean;
  };
  const a: RouteObject = {
    index: true,
  };

  type ErrorResponse = {
    status: number;
    statusText: string;
    data: ApiError;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  declare function isRouteErrorResponse(error: any): error is ErrorResponse;
}
