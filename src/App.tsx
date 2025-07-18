import {
  RouterProvider as ClientRouterProvider,
  StaticRouterProvider,
  type RouterProviderProps,
  type StaticHandlerContext,
  type StaticRouterProviderProps,
} from "react-router";

import { ReactQueryProvider } from "@/react-query/provider";

interface ClientAppProps {
  ssr?: false;
  routerContext?: undefined;
  router: RouterProviderProps["router"];
}

interface ServerAppProps {
  ssr: true;
  routerContext: StaticHandlerContext;
  router: StaticRouterProviderProps["router"];
}

function App(props: ServerAppProps | ClientAppProps) {
  const { ssr } = props;

  let router;

  if (ssr) {
    router = (
      <StaticRouterProvider
        context={props.routerContext}
        router={props.router}
      />
    );
  } else {
    router = <ClientRouterProvider router={props.router} />;
  }

  return <ReactQueryProvider>{router}</ReactQueryProvider>;
}

export default App;
