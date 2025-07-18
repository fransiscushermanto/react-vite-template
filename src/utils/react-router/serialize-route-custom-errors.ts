import type { StaticHandlerContext } from "react-router";

import type { ApiError } from "@/models/api";

import { isCustomError } from "../react-query";

export default function serializeRouteCustomErrors(
  errors: StaticHandlerContext["errors"],
): StaticHandlerContext["errors"] {
  if (!errors) return null;

  const entries = Object.entries(errors);
  const serialized: StaticHandlerContext["errors"] = {};

  for (const [key, val] of entries) {
    if (!isCustomError(val) || !isCustomError<ApiError>(val)) {
      serialized[key] = val;
      continue;
    }

    serialized[key] = {
      message: val.message,
      payload: val.payload,
    };
  }

  return serialized;
}
