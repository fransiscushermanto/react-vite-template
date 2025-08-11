import { isRouteErrorResponse, useRouteError } from "react-router";

import { cx } from "@styled-system/css";

import type { ErrorProps } from "./types";
import { errorCss } from "./styles";

function Error(props: ErrorProps = { offline: false }) {
  const { offline, maintenance } = props;

  let statusCode: number = 0;
  let message: string = "Unknown Error";
  const routerError = useRouteError();

  if (isRouteErrorResponse(routerError)) {
    statusCode = routerError.data.statusCode ?? routerError.status;
    message = routerError.data.message ?? routerError.statusText;
  }

  if (offline) {
    message = "You are offline. Please check your internet connection.";
    statusCode = 503; // Service Unavailable
  }

  if (maintenance) {
    message =
      "The service is currently under maintenance. Please try again later.";
    statusCode = 503; // Service Unavailable
  }

  return (
    <div className={cx("error", errorCss)}>
      <h1 className="error__title">Error</h1>

      <pre className="error__details">
        <code>
          Code: <b>{statusCode}</b>
        </code>
        <code>
          Message: <b>{message}</b>
        </code>
      </pre>
    </div>
  );
}
export default Error;
