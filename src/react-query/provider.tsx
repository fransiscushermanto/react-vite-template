import { useMatches } from "react-router";
import {
  HydrationBoundary,
  QueryClientProvider,
  type DehydratedState,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "./client";

export function ReactQueryProvider(props: React.PropsWithChildren) {
  const { children } = props;
  const matches = useMatches();

  const dehydratedState = (
    matches.find(
      (match) =>
        (match.data as { dehydratedState: DehydratedState } | undefined)
          ?.dehydratedState,
    )?.data as { dehydratedState: DehydratedState } | undefined
  )?.dehydratedState;

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
