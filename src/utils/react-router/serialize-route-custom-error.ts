import type { EntryContext } from "react-router";

import type { ApiError } from "@/models/api";

import { isCustomError } from "../react-query";

const serializeRouteCustomError: EntryContext["serializeError"] = (error) => {
  console.log(
    "(utils/serialize-route-custom-error) serializeRouteCustomError:",
    error,
  );

  if (!isCustomError(error) || !isCustomError<ApiError>(error)) {
    return error;
  }

  return {
    message: error.message,
    payload: error.payload,
  };
};

export default serializeRouteCustomError;
