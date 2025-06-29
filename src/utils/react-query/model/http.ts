export type HTTPMethods = "PUT" | "DELETE" | "POST" | "PATCH";

export interface HttpOptions {
  path: string;
  baseURL?: string;
  params?: string;
  method?: HTTPMethods | (string & NonNullable<unknown>);
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
  ignoreCamelize?: true | Array<string>;
}
