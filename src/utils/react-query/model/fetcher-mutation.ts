import type { QueryMeta } from "@tanstack/react-query";
import type { HttpOptions } from "./http";

// variables can be anything
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FetcherMutationOptions<TVars = any> {
  variables?: TVars;
  context: MutationFnContext;
}

export interface MutationFnContext
  extends QueryMeta,
    Omit<HttpOptions, "ignoreCamelize" | "params" | "body"> {
  isFormData?: boolean;
  contentType?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryParams?: Record<string, any>;
  /**
   * This to override default basePath from env
   */
  basePath?: string;
  /**
   * To use other version of the api
   */
  apiVersion?: "2";
}
