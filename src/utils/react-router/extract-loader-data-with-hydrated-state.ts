import type { DehydratedState } from "@tanstack/react-query";

import isObjectWithDehydratedState from "./is-object-with-dehydrated-state";

export default function extractLoaderDataWithHydratedState(
  loaderData: unknown,
): DehydratedState {
  const dehydratedState: DehydratedState = {
    mutations: [],
    queries: [],
  };

  if (isObjectWithDehydratedState(loaderData)) {
    const targetDehydratedState = loaderData.dehydratedState;
    dehydratedState.queries.push(...targetDehydratedState.queries);
    dehydratedState.mutations.push(...targetDehydratedState.mutations);
  }

  return dehydratedState;
}
