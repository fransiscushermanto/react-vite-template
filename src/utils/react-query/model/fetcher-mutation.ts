import type { QueryMeta } from "@tanstack/react-query";
import type { HTTPMethods } from "./http";

// variables can be anything
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FetcherMutationOptions<TVars = any> {
  variables?: TVars;
  context: MutationFnContext;
}

export interface MutationFnContext extends QueryMeta {
  path: string;
  method?: HTTPMethods;
  headers?: Record<string, string>;
  isFormData?: boolean;
  contentType?: string;
  /**
   * This to override default basePath from env
   */
  basePath?: string;
  /**
   * To use other version of the api
   */
  apiVersion?: "2";
}
