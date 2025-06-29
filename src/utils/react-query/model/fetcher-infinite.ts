// TVars can be anything, TData can be anything
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface InfiniteResult<TVars = any, TData = any> {
  data?: TData;
  variables: TVars;
}
