import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import { ReactQueryWrapper } from "@/react-query/wrapper";
import { customBrowserRouter } from "@/utils/react-router";

import routes from "./routes";

import "./global.css";

const container = document.getElementById("app") as HTMLElement;
const router = customBrowserRouter(routes);

hydrateRoot(
  container,
  <StrictMode>
    <ReactQueryWrapper>
      <RouterProvider router={router} />
    </ReactQueryWrapper>
  </StrictMode>,
);
