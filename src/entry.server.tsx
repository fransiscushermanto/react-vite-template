import type { HandleDataRequestFunction } from "react-router";

import { PassThrough } from "node:stream";
import type { EntryContext } from "react-router";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter } from "react-router";
import { renderToPipeableStream } from "react-dom/server";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
) {
  return new Promise((resolve, reject) => {
    const { pipe } = renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        onShellReady() {
          responseHeaders.set("Content-Type", "text/html");

          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          console.log("stream", stream);

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          console.log("(entry.server) onShellError:", error);
          reject(error);
        },
      },
    );
  });
}

export const handleDataRequest: HandleDataRequestFunction = async (
  response: Response,
  { request },
) => {
  const isGet = request.method.toLowerCase() === "get";
  const purpose =
    request.headers.get("Purpose") ||
    request.headers.get("X-Purpose") ||
    request.headers.get("Sec-Purpose") ||
    request.headers.get("Sec-Fetch-Purpose") ||
    request.headers.get("Moz-Purpose");
  const isPrefetch = purpose === "prefetch";

  // If it's a GET request and it's a prefetch request and it doesn't have a Cache-Control header
  // NOTE: If cache is not working, please check if your certificate is trusted by browser and OS
  if (isGet && isPrefetch && !response.headers.has("Cache-Control")) {
    // we will cache for 10 seconds only on the browser
    response.headers.set("Cache-Control", "private, max-age=10");
  }

  return response;
};
