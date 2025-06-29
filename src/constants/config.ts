const CONFIG = {
  API_BASE_PATH: String(import.meta.env.VITE_API_BASE_PATH ?? ""),
  API_HOST: String(import.meta.env.VITE_API_HOST ?? ""),
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT ?? 3500),
  APP_NAME: String(import.meta.env.VITE_APP_NAME ?? ""),
  SSR_API_BASE_PATH: String(import.meta.env.VITE_SSR_API_BASE_PATH ?? ""),
};

export const {
  API_BASE_PATH,
  API_HOST,
  API_TIMEOUT,
  APP_NAME,
  SSR_API_BASE_PATH,
} = CONFIG;
