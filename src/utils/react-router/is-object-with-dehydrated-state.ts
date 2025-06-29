import type { DehydratedState } from "@tanstack/react-query";

export default function isObjectWithDehydratedState(
  data: unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): data is { dehydratedState: DehydratedState; [key: string]: any } {
  const isObject = typeof data === "object" && data !== null;

  return (
    isObject || (isObject && ("dehydratedState" in data || "redirect" in data))
  );
}
