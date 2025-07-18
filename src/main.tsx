import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { customBrowserRouter } from "@/utils/react-router";

import routes from "@/routes";

import App from "./App";
import "./global.css";

const router = customBrowserRouter(routes);

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <App router={router} />
  </StrictMode>,
);
