import type { QueryMeta as DefaultQueryMeta } from "@tanstack/react-query";
import type { HttpOptions } from "@/utils/react-query";

declare module "@tanstack/react-query" {
  interface QueryMeta
    extends DefaultQueryMeta,
      Omit<HttpOptions, "params" | "body" | "path">,
      Record<string, unknown> {
    /**
     * To replace env basePath
     */
    basePath?: string;
    /**
     * To use other version of the api
     */
    apiVersion?: "2";
  }
}
