import path from "node:path";
import https from "https";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import { createRequestHandler } from "@react-router/express";

import {
  HOST,
  PORT,
  isProduction,
  isCloud,
  __dirname,
  APP_BASE_PATH,
} from "./constants";
import { getSSLCredentials } from "./utils";
import api from "./api";

const viteDevServer = !isProduction
  ? await import("vite").then((vite) =>
      vite.createServer({
        server: { middlewareMode: true },
        appType: "custom",
        base: APP_BASE_PATH,
      }),
    )
  : undefined;

const reactRouteHandler = createRequestHandler({
  build: async () => {
    if (viteDevServer) {
      return viteDevServer.ssrLoadModule("virtual:react-router/server-build");
    }

    return await import(path.resolve(__dirname, "..", "build/server/index.js"));
  },
});

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(compression());
app.disable("x-powered-by");

if (!!viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  const sirv = (await import("sirv")).default;
  app.use(
    "/assets",
    sirv(path.resolve(__dirname, "..", "build/client/assets"), {
      immutable: true,
      maxAge: 1 * 60 * 60 * 24 * 365, // 1 year
    }),
  );
}

app.use("/api", api);

app.all("*all", reactRouteHandler);

if (!isCloud) {
  const credentials = getSSLCredentials();
  https.createServer(credentials, app).listen(PORT, HOST, () => {
    console.log(`Server running at https://${HOST}:${PORT}`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
