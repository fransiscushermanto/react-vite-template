import fs from "node:fs";
import path from "node:path";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
  type LayoutRouteProps,
} from "react-router";

import type { Route } from "./+types/root";
import { ReactQueryProvider } from "@/react-query/provider";

import Error from "@/components/modules/error";

export async function loader() {
  let criticalCSS = "";
  const isProduction = import.meta.env.MODE === "production";

  if (isProduction) {
    const clientDir = path.resolve(import.meta.dirname, "..", "client");
    const assetsDir = path.join(clientDir, "assets");

    if (fs.existsSync(assetsDir)) {
      const cssFiles = fs
        .readdirSync(assetsDir)
        .filter((file) => file.endsWith(".css"));

      // Find the main CSS file (usually the largest one or named appropriately)
      const mainCSSFile =
        cssFiles.find((file) => file.includes("index")) || cssFiles[0];

      if (mainCSSFile) {
        criticalCSS = fs.readFileSync(
          path.join(assetsDir, mainCSSFile),
          "utf-8",
        );
      }
    }

    return { criticalCSS };
  }
}

export function ErrorBoundary({}: Route.ErrorBoundaryProps) {
  return <Error />;
}

export function Layout({ children }: LayoutRouteProps) {
  const data = useRouteLoaderData("root");

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {data?.criticalCSS && (
          <style data-panda-critical>{data.criticalCSS}</style>
        )}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root(_props: Route.ComponentProps) {
  return (
    <ReactQueryProvider>
      <Outlet />
    </ReactQueryProvider>
  );
}
