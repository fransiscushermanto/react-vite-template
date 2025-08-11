import type { FetcherMutationOptions } from "./model";
import http from "./http";
import { buildBasePath } from "./utils";

/**
 * @function fetcherMutation
 * @param options
 */
const fetcherMutation = async (options: FetcherMutationOptions) => {
  const { variables, context } = options;
  const {
    path: pathProp = "",
    method,
    headers = {},
    basePath,
    apiVersion,
    isFormData,
    queryParams,
    ...restContext
  } = context;

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const version = `/v${apiVersion ?? 1}`;
  const search = queryParams
    ? `?${new URLSearchParams(queryParams).toString()}`
    : "";
  const path = buildBasePath(pathProp, {
    version,
    basePath,
    search,
  });

  const response = await http({
    path,
    body: variables,
    method: method ?? "POST",
    headers,
    ...restContext,
  });

  return Promise.resolve(response);
};

export default fetcherMutation;
