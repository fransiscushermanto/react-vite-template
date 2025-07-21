import type { RouteConfig } from "@react-router/dev/routes";

export default [
  {
    file: "./routes/layout.tsx",
    children: [
      {
        index: true,
        file: "./routes/home.tsx",
      },
      {
        path: "/about",
        file: "./routes/about.tsx",
      },
    ],
  },
] satisfies RouteConfig;
