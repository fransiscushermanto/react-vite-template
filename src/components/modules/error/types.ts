export interface ErrorProps extends Record<string, unknown> {
  statusCode?: number;
  maintenance?: boolean;
  offline?: boolean;
}
