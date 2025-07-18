import type { RequestInit as NodeRequestInit } from "node-fetch";
import { SSR_API_BASE_PATH } from "@/constants/config";

export async function ssrFetch(input: string, init?: RequestInit) {
  const fetch =
    typeof window === "undefined"
      ? (await import("node-fetch")).default
      : window.fetch;

  return fetch(
    `${SSR_API_BASE_PATH}${input}`,
    init as NodeRequestInit & RequestInit,
  );
}
