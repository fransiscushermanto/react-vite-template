import * as express from "express";
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router";
import {
  QueryClientProvider,
  type DehydratedState,
} from "@tanstack/react-query";

import routes from "@/routes";
import { queryClient } from "@/react-query/client";
import {
  routeGuard,
  getRouteId,
  isObjectWithDehydratedState,
} from "@/utils/react-router";

import "./global.css";

const { query, dataRoutes } = createStaticHandler(routeGuard(routes));

export function createFetchRequest(
  req: express.Request,
  res: express.Response,
): Request {
  const origin = `${req.protocol}://${req.get("host")}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  const url = new URL(req.originalUrl || req.url, origin);

  const controller = new AbortController();
  res.on("close", () => controller.abort());

  const headers = new Headers();

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  const init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new Request(url.href, init);
}

export async function render(
  request: express.Request,
  response: express.Response,
) {
  const remixRequest = createFetchRequest(request, response);
  const context = await query(remixRequest, {
    requestContext: {
      cookies: request.cookies,
    },
  });

  if (context instanceof Response) {
    return context;
  }

  let dehydratedState: DehydratedState = { mutations: [], queries: [] };

  const routeId = getRouteId(context.matches, context.location);
  const routeLoaderData = context.loaderData[String(routeId)];

  if (isObjectWithDehydratedState(routeLoaderData)) {
    dehydratedState = routeLoaderData.dehydratedState;
  }

  const router = createStaticRouter(dataRoutes, context);

  const html = renderToString(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <StaticRouterProvider context={context} router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );

  const deepestMatch = context.matches[context.matches.length - 1];
  const actionHeaders = context.actionHeaders[deepestMatch.route.id];
  const loaderHeaders = context.loaderHeaders[deepestMatch.route.id];

  const headers = new Headers(actionHeaders);

  if (loaderHeaders) {
    for (const [key, value] of loaderHeaders.entries()) {
      headers.append(key, value);
    }
  }

  return { html, dehydratedState };
}
