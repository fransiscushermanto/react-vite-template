import { CustomError } from "./model";

function isCustomError<TError = unknown>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
): error is CustomError<TError> {
  return typeof error === "object" && "payload" in error;
}

export default isCustomError;
