import type { RouteObject } from "react-router";

import { Home } from "@/components/modules/home";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
];

export default routes;
