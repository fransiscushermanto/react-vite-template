import type { QueryMeta as DefaultQueryMeta } from "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface QueryMeta extends DefaultQueryMeta {
    /**
     * To replace env basePath
     */
    basePath?: string;
    /**
     * To use other version of the api
     */
    apiVersion?: "2";
    /**
     * Keys of object that want to be ignore to be camelized
     *
     * If `true` all keys will not be camelized
     *
     * Note: camelize only apply by default to header `content-type` = `application/json`
     *
     * @default true
     */
    ignoreCamelize?: HttpOptions["ignoreCamelize"];
    headers?: Record<string, string>;
  }
}
