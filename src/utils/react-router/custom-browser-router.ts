import { createBrowserRouter, type RouteObject } from "react-router";

import { routeGuard } from "./route-guard";

function customBrowserRouter(routes: RouteObject[]) {
  return createBrowserRouter(routeGuard(routes), { window });
}

export default customBrowserRouter;
