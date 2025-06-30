import type { DataRouteMatch, Location } from "react-router";

export default function getRouteId(
  matches: DataRouteMatch[],
  location: Location,
): string {
  let routeId = "";

  const results = matches.filter(
    ({ pathname }) => location.pathname === pathname,
  );

  if (results.length > 1) {
    const parentPath = results.find(({ route }) => !!route.children);
    routeId =
      parentPath?.route.children?.find(({ path }) => path === location.pathname)
        ?.id || "";
  } else if (results.length === 1) {
    const match = results[0];
    routeId = match.route.id;
  }

  return routeId;
}
