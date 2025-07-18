import fs from "node:fs";
import path from "node:path";
import https from "https";
import express from "express";
import cookieParser from "cookie-parser";
import type { ViteDevServer } from "vite";
import cors from "cors";

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

async function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());

  let vite: ViteDevServer | undefined;
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");

    vite = await createViteServer({
      server: {
        middlewareMode: true, // Enable middleware mode for SSR
      },
      appType: "custom",
      base: APP_BASE_PATH,
    });
    app.use(vite.middlewares);
  } else {
    const compression = (await import("compression")).default;
    const sirv = (await import("sirv")).default;
    app.use(compression());
    app.use(
      APP_BASE_PATH,
      sirv(path.resolve(__dirname, "..", "dist/client"), {
        extensions: [],
      }),
    );
  }

  app.use("/api", api);

  app.use("*all", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string = "";
      let render;
      let criticalCSS = "";

      if (!isProduction && vite) {
        template = fs.readFileSync(
          path.resolve(__dirname, "..", "index.html"),
          "utf-8",
        );
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;

        try {
          const pandaCSSPath = path.resolve(
            process.cwd(),
            "styled-system/styles.css",
          );

          if (fs.existsSync(pandaCSSPath)) {
            const cssContent = fs.readFileSync(pandaCSSPath, "utf-8");
            criticalCSS = `<style data-panda-critical>${cssContent}</style>`;
          }
        } catch (err) {
          console.warn("Could not load Panda CSS:", err);
        }
      } else {
        try {
          const clientDir = path.resolve(__dirname, "..", "dist/client");
          const assetsDir = path.join(clientDir, "assets");

          if (fs.existsSync(assetsDir)) {
            const cssFiles = fs
              .readdirSync(assetsDir)
              .filter((file) => file.endsWith(".css"));

            // Find the main CSS file (usually the largest one or named appropriately)
            const mainCSSFile =
              cssFiles.find((file) => file.includes("index")) || cssFiles[0];

            if (mainCSSFile) {
              const cssContent = fs.readFileSync(
                path.join(assetsDir, mainCSSFile),
                "utf-8",
              );
              criticalCSS = `<style data-panda-critical>${cssContent}</style>`;
            }
          }
        } catch (e) {
          console.warn("Could not load production CSS:", e);
        }

        template = await fs.readFileSync(
          path.resolve(__dirname, "..", "dist/client/index.html"),
          "utf-8",
        );
        render = (
          await import(
            path.resolve(__dirname, "..", "dist/server/entry-server.js")
          )
        ).render;
      }

      const renderResult = await render(req, res);
      if (
        renderResult instanceof Response &&
        renderResult.status >= 300 &&
        renderResult.status < 400
      ) {
        // Handle redirect from loader/action
        const location = renderResult.headers.get("Location") || "/";
        const url = new URL(location, `${req.protocol}://${req.host}`);
        res.redirect(renderResult.status, url.toString());
        return;
      }

      const { html, dehydratedState } = renderResult;

      const node = template
        .replace(`<!--ssr-outlet-->`, html)
        .replace(
          `"<!--ssr-query-state-->"`,
          JSON.stringify(dehydratedState["react-query"]),
        )
        .replace(
          `"<!--ssr-router-state-->"`,
          JSON.stringify(dehydratedState["react-router"]),
        )
        .replace(`<!--ssr-critical-css-->`, criticalCSS);

      res.status(200).set({ "Content-Type": "text/html" }).end(node);
    } catch (error) {
      vite?.ssrFixStacktrace(error as Error);
      next(error);
    }
  });

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
}

createServer();
