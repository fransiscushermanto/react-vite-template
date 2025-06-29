import type { RouteObject } from "react-router";

export default class Routes {
  public routes: Array<string> = [];

  register(routes: RouteObject[] | RouteObject) {
    if (Array.isArray(routes)) {
      return routes.forEach((route) => {
        if (!route.path) return;

        this.routes.push(route.path);
      });
    }

    if (!routes.path) return;

    this.routes = [...new Set([...this.routes, routes.path])];
  }
}
