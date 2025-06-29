const CONFIG = {
  API_BASE_PATH: String(process.env.VITE_APP_API_BASE_PATH ?? ""),
  API_HOST: String(process.env.VITE_APP_API_HOST ?? "localhost:8000"),
  API_TIMEOUT: Number(process.env.VITE_APP_API_TIMEOUT ?? 3500),
  APP_NAME: String(process.env.VITE_APP_NAME ?? ""),
};

export const { API_BASE_PATH, API_HOST, API_TIMEOUT, APP_NAME } = CONFIG;
