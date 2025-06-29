import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

import { getCliArgs } from "../scripts/prepare-app/utils";
import { getCliValue } from "./utils";

const mode = getCliValue("--mode") || "development";

switch (mode) {
  case "production":
    dotenv.config({ path: [".env.production", ".env", ".env.local"] });
    break;

  case "uat":
    dotenv.config({ path: [".env.uat", ".env", ".env.local"] });
    break;

  case "staging":
    dotenv.config({ path: [".env.staging", ".env", ".env.local"] });
    break;

  case "development":
  default:
    dotenv.config({ path: [".env", ".env.local"] });
    break;
}

const DEFAULT_PORT = Number(process.env.PORT) || 3000;
export const __dirname = dirname(fileURLToPath(import.meta.url));
export const HOST = process.env.DEV_HOST;
export const isProduction = !!getCliArgs("--preview");
export const PORT =
  Number(getCliValue("-p") ?? getCliValue("--port")) || DEFAULT_PORT;
export const isCloud = getCliValue("--env") === "cloud";
