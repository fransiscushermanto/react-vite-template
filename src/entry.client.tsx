import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import { HydratedRouter } from "react-router/dom";
import "./global.css";

hydrateRoot(
  document,
  <StrictMode>
    <HydratedRouter />
  </StrictMode>,
);
