import type { FetchInitType } from "./custom-fetch";

export type HTTPMethods = "PUT" | "DELETE" | "POST" | "PATCH";

export interface HttpOptions extends Omit<FetchInitType, "body"> {
  path: string;
  /**
   * This to override default basePath from env
   */
  baseURL?: string;
  params?: string;
  method?: HTTPMethods | (string & NonNullable<unknown>);
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
  /**
   * Keys of object that want to be ignore to be camelized
   *
   * If `true` all keys will not be camelized
   *
   * Note: camelize only apply by default to header `content-type` = `application/json`
   *
   * @default true
   */
  ignoreCamelize?: true | Array<string>;
  credentials?: RequestCredentials;
}
