export function parseCookie(context?: { cookies?: Record<string, string> }) {
  if (context?.cookies) {
    return context.cookies;
  }

  if (typeof document !== "undefined") {
    return Object.fromEntries(
      document.cookie.split("; ").map((cookie) => {
        const [name, value] = cookie.split("=");
        return [name, value ? decodeURIComponent(value) : ""];
      }),
    );
  }

  return {};
}
