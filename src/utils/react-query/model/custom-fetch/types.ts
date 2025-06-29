import type { ApiError } from "@/models/api";
import isCustomError from "../../is-custom-error";
import { camelize } from "@/utils/string";

type FetchArgumentType = Parameters<typeof fetch>;
export interface CustomErrorOptions {
  ignoreCamelize?: Array<string> | true;
  /**
   * @default false
   */
  retry?: boolean;
}
export type FetchRequestInfoType = NonNullable<FetchArgumentType["0"]>;
export type FetchInitType = NonNullable<FetchArgumentType["1"]> &
  Omit<CustomErrorOptions, "retry">;

export class CustomError<TPayload = ApiError> extends Error {
  public retry: boolean;

  public payload: TPayload;

  protected ignoreCamelize?: Array<string> | true;

  constructor(
    message: string | CustomError<TPayload>,
    payload?: TPayload,
    options: CustomErrorOptions = {},
  ) {
    const { ignoreCamelize, retry = false } = options;

    function handlePayload(
      payload: TPayload | undefined,
      ignoreCamelize: CustomErrorOptions["ignoreCamelize"] = [],
    ) {
      const ignoredKeys = Array.isArray(ignoreCamelize)
        ? ignoreCamelize
        : Object.keys(ignoreCamelize ?? {});

      return payload
        ? camelize<TPayload>(payload, ignoredKeys)
        : ({} as TPayload);
    }

    if (isCustomError<TPayload>(message)) {
      const error = message;

      super(error.message);
      Object.assign(this, error);
      this.payload = handlePayload(
        payload ?? error.payload,
        options.ignoreCamelize ?? error.ignoreCamelize,
      );
      this.retry = options.retry ?? error.retry;
      this.ignoreCamelize = options.ignoreCamelize ?? error.ignoreCamelize;
      return;
    }

    super(message);
    this.retry = retry;
    this.ignoreCamelize = ignoreCamelize;
    this.payload = handlePayload(payload, ignoreCamelize);
  }
}
