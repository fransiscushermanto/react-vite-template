import type { DOMRouterOpts } from "react-router";
import type { DehydratedState } from "@tanstack/react-query";

declare global {
  interface Window {
    __REACT_QUERY_STATE__: DehydratedState;
    __REACT_ROUTER_STATE__: DOMRouterOpts["hydrationData"];
  }
}
