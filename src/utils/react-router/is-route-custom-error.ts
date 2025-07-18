import { isCustomError, type CustomError } from "../react-query";
import { isTrullyEmpty } from "../validator";

export default function isRouteCustomError(
  error: unknown,
): error is Pick<CustomError, "message" | "payload"> {
  if (!isCustomError(error)) return false;

  return (
    !isTrullyEmpty(error.message) &&
    typeof error === "object" &&
    "payload" in error
  );
}
