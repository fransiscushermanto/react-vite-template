import {
  createBrowserRouter,
  type DOMRouterOpts,
  type RouteObject,
} from "react-router";

import { routeGuard } from "./route-guard";

function customBrowserRouter(routes: RouteObject[], opts?: DOMRouterOpts) {
  return createBrowserRouter(routeGuard(routes), { window, ...opts });
}

export default customBrowserRouter;
