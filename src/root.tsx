import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import type { Route } from "./+types/root";
import { ReactQueryProvider } from "@/react-query/provider";

import Error from "@/components/modules/error";

export function ErrorBoundary({}: Route.ErrorBoundaryProps) {
  return <Error />;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ReactQueryProvider>
      <Outlet />
    </ReactQueryProvider>
  );
}
