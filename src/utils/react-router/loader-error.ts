import { data } from "react-router";

import type { ApiError } from "@/models/api";
import { isCustomError, type CustomError } from "../react-query";

export function loaderError(customError: CustomError): ReturnType<typeof data>;
export function loaderError(errorPayload: ApiError): ReturnType<typeof data>;
export default function loaderError(error: ApiError | CustomError) {
  let payload: ApiError = { message: "", statusCode: 0 };
  if (isCustomError(error)) {
    payload = error.payload;
  } else {
    payload = error;
  }

  const { statusCode, ...restPayload } = payload;

  return data(restPayload, { status: statusCode });
}
