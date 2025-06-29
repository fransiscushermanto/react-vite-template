import { API_BASE_PATH } from "@/constants/config";

import type { FetcherMutationOptions } from "./model";
import http from "./http";

/**
 * @function fetcherMutation
 * @param options
 */
const fetcherMutation = async (options: FetcherMutationOptions) => {
  const { variables, context } = options;
  const {
    path = "",
    method,
    headers = {},
    basePath,
    apiVersion,
    isFormData,
    ignoreCamelize,
  } = context;

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const version = apiVersion ? `/v${apiVersion}` : "";

  const response = await http({
    path: `${basePath ?? API_BASE_PATH}${version}/${path}`,
    body: variables,
    method: method ?? "POST",
    headers,
    ignoreCamelize,
  });

  return Promise.resolve(response);
};

export default fetcherMutation;
