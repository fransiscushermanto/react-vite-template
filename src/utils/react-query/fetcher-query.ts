import { API_BASE_PATH } from "@/constants/config";
import type { QueryFunctionContext } from "@/hooks/react-query";

import { queryStringify } from "../url";
import http from "./http";

/**
 * @function fetcherQuery
 * @param options
 */
const fetcherQuery = async (options: QueryFunctionContext) => {
  const { queryKey = [], meta = {} } = options;

  const { apiVersion, basePath, ignoreCamelize, headers } = meta;

  const version = apiVersion ? `/v${apiVersion}` : "";

  const [rpath, rparams] = queryKey;
  const path = rpath ? `${basePath ?? API_BASE_PATH}${version}/${rpath}` : "";
  const params = rparams ? (rparams as Record<string, unknown>) : {};
  const pstring = queryStringify(params);

  const response = await http({
    path,
    params: pstring,
    ignoreCamelize,
    headers,
  });
  return Promise.resolve(response);
};

export default fetcherQuery;
