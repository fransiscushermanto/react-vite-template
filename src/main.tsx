import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import { ReactQueryWrapper } from "@/react-query/wrapper";
import { customBrowserRouter } from "@/utils/react-router";

import routes from "@/routes";

import "./global.css";

const router = customBrowserRouter(routes);

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <ReactQueryWrapper>
      <RouterProvider router={router} />
    </ReactQueryWrapper>
  </StrictMode>,
);
