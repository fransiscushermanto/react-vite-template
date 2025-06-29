import { client } from "@/react-query/client";
import {
  CustomError,
  type FetchInitType,
  type FetchRequestInfoType,
} from "./model/custom-fetch";
import isCustomError from "./is-custom-error";

const customFetch = (
  url: FetchRequestInfoType,
  options: FetchInitType = {},
) => {
  return new Promise<Response>((resolve, reject) => {
    const { ignoreCamelize, ...resOptions } = options;

    try {
      resolve(client({ ignoreCamelize })(url, resOptions));
    } catch (error) {
      if (isCustomError(error)) {
        if (error.name === "AbortError") {
          const customError = new CustomError(
            "Request Aborted - Timeout Exceeded",
            undefined,
            {
              ignoreCamelize,
            },
          );
          customError.name = error.name;

          reject(customError);
        }
      }

      reject(error);
    }
  });
};

export default customFetch;
