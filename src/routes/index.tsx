import type { RouteObject } from "react-router";

import { DefaultLayout } from "@/components/layouts";

import { Home } from "@/components/modules/home";
import { Error } from "@/components/modules/error";

const routes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
    errorElement: <Error />,
  },
];

export default routes;
