import humps from "humps";

import { API_ORIGIN, API_TIMEOUT } from "@/constants/config";
import { camelize } from "@/utils/string";
import { queryStringify } from "@/utils/url";
import { type HttpOptions, CustomError } from "./model";
import customFetch from "./custom-fetch";

/**
 * @function timeout
 * @param promise the promise you want to execute
 * @param controller abort controller. This will trigger abort() if past ms
 * @param ms time to timeout in ms
 */
const timeout = <T>(
  promise: Promise<T>,
  options: {
    controller: AbortController;
    ignoreCamelize: HttpOptions["ignoreCamelize"];
  },
  ms: number,
) => {
  const { controller, ignoreCamelize } = options;

  const timer = new Promise<never>(() => {
    setTimeout(() => {
      const customError = new CustomError(
        "Request Aborted - Timeout Exceeded",
        undefined,
        {
          ignoreCamelize,
        },
      );
      customError.name = "AbortError";

      return controller.abort(customError);
    }, ms);
  });

  return Promise.race<T>([timer, promise]);
};

/**
 * @function http
 * @param {any} options
 * @param {any} context
 */
const http = async (options: HttpOptions) => {
  const {
    path,
    baseURL,
    params,
    method = "GET",
    headers = {},
    body,
    ignoreCamelize,
    credentials = "include",
    ...restOptions
  } = options;
  let _http_body: unknown | undefined = undefined;
  let _params = undefined;

  switch (method) {
    case "DELETE":
    case "POST":
    case "PUT":
    case "PATCH":
      if (headers["Content-Type"] !== "application/json") {
        _http_body = body;
        break;
      }
      _http_body = body ? JSON.stringify(humps.decamelizeKeys(body)) : "";
      break;
    case "GET":
      _params = body ? queryStringify(body) : params;
      break;
    default:
      break;
  }

  const base = baseURL || API_ORIGIN;
  const endpoint = base + path;
  const requestPath = endpoint + (_params ? `?${_params}` : "");

  const controller: AbortController = new AbortController();

  const request = customFetch(requestPath, {
    method: method,
    body: _http_body as BodyInit,
    signal: controller.signal,
    credentials,
    headers,
    ignoreCamelize,
    ...restOptions,
  });

  const response = await timeout<Response>(
    request,
    { controller, ignoreCamelize },
    API_TIMEOUT,
  );

  if (!response.headers.get("content-type")?.includes("application/json"))
    return response.blob();

  const result = {
    statusCode: response.status,
  };

  if (response.status === 204) return result;

  const json = await response.json();
  const ignoredKeys = Array.isArray(ignoreCamelize)
    ? ignoreCamelize
    : Object.keys(ignoreCamelize ?? {});

  return { ...camelize(json, ignoredKeys), ...result };
};

export default http;
