import type { QueryKey } from "@tanstack/react-query";

import type { QueryFunctionContext } from "@/hooks/react-query";
import { API_BASE_PATH } from "@/constants/config";
import queryStringify from "../url/query-stringify";
import http from "./http";
import type { InfiniteResult } from "./model/fetcher-infinite";

/**
 * @function fetcherInfinite
 * @param options
 */
const fetcherInfinite = async (
  options: QueryFunctionContext<QueryKey, Record<string, unknown>>,
): Promise<InfiniteResult> => {
  const { queryKey = [], pageParam, meta = {} } = options;

  const { apiVersion, basePath, ...restMeta } = meta;

  const version = `/v${apiVersion ?? 1}`;

  const [rpath, rparams] = queryKey;
  const path = rpath ? `${basePath ?? API_BASE_PATH}${version}/${rpath}` : "";

  let variables: Record<string, unknown>;
  if (pageParam) {
    variables = pageParam;
  } else {
    variables = rparams ? (rparams as Record<string, unknown>) : {};
  }

  const params = queryStringify(variables);
  const response = await http({
    path,
    params,
    ...restMeta,
  });

  return Promise.resolve({ data: response, variables: variables });
};

export default fetcherInfinite;
