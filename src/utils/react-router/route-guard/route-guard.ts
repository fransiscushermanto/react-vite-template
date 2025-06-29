import type { LoaderFunctionArgs, RouteObject } from "react-router";

import extractLoaderDataWithHydratedState from "../extract-loader-data-with-hydrated-state";
import { privateRouteLoader, protectedRouteLoader } from "./loaders";
import { privateRoutes, protectedRoutes } from "./constants";

function routeGuard(routes: RouteObject[]) {
  function checkRouteAccess(routes: RouteObject[]) {
    return routes.map((route) => {
      let guardLoader: typeof privateRouteLoader | typeof protectedRouteLoader;

      const isPublic = !route.access || route.access === "public";

      if (!isPublic) {
        if (route.access === "private") {
          privateRoutes.register(route);
          guardLoader = privateRouteLoader;
        } else if (route.access === "protected") {
          protectedRoutes.register(route);
          guardLoader = protectedRouteLoader;
        }

        const loader = route.loader;

        route.loader = async (args: LoaderFunctionArgs) => {
          const res = await guardLoader(args);

          if (res instanceof Response) {
            return res;
          }

          if (typeof loader === "function") {
            const loaderRes = await loader(args);

            const dehydratedState =
              extractLoaderDataWithHydratedState(loaderRes);

            return {
              ...loaderRes,
              dehydratedState,
            };
          }
        };
      }

      if (route.children) {
        route.children = checkRouteAccess(route.children);
      }

      return route;
    });
  }

  return checkRouteAccess(routes);
}

export default routeGuard;
