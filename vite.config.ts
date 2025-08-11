import { defineConfig, loadEnv } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { reactRouter } from "@react-router/dev/vite";
import pandacss from "@pandacss/dev/postcss";
import autoprefixer from "autoprefixer";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [reactRouter(), tsConfigPaths({ root: "./" })],
    css: {
      postcss: {
        plugins: [
          pandacss({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          }) as any,
          autoprefixer({}),
        ],
      },
    },
    server: {
      port: 3000,
      https: {
        cert: "./certs/cert.pem",
        key: "./certs/dev.pem",
      },
      host: env.DEV_HOST,
    },
    preview: {
      port: 3000,
      https: {
        cert: "./certs/cert.pem",
        key: "./certs/dev.pem",
      },
      host: env.DEV_HOST,
    },
  };
});
