import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import { customBrowserRouter } from "@/utils/react-router";

import routes from "@/routes";

import App from "./App";
import "./global.css";

const container = document.getElementById("app") as HTMLElement;

const router = customBrowserRouter(routes, {
  hydrationData: window.__REACT_ROUTER_STATE__,
});

hydrateRoot(
  container,
  <StrictMode>
    <App router={router} />
  </StrictMode>,
);
