import fs from "fs";
import path from "path";

import {__dirname} from './constants'

export function getSSLCredentials() {
  try {
    const privateKey = fs.readFileSync(
      path.resolve(__dirname, "..", "certs/dev.pem"),
      "utf8",
    );
    const certificate = fs.readFileSync(
      path.resolve(__dirname, "..", "certs/cert.pem"),
      "utf8",
    );

    return { key: privateKey, cert: certificate };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    throw new Error(
      "SSL certificates not found. Please generate them using `yarn certs:generate` command.",
    );
  }
}

export const SERVER_ARGS = ["--port", "-p", "--mode", '--env', "--preview"] as const;

export function getCliValue(
  flag: (typeof SERVER_ARGS)[number],
): string | undefined {
  const args = process.argv;
  const flagIndex = args.findIndex(
    (arg) => arg === flag || arg.startsWith(`${flag}=`),
  );

  if (flagIndex === -1) return;

  if (args[flagIndex].startsWith(`${flag}=`)) {
    return args[flagIndex].split("=")[1];
  }

  if (flagIndex + 1 > args.length) return;

  return args[flagIndex + 1];
}

export function ensureLoadableStats() {
  const statsPath = path.resolve("./dist/loadable-stats.json");
  const statsDir = path.dirname(statsPath);

  // Create dist directory if it doesn't exist
  if (!fs.existsSync(statsDir)) {
    fs.mkdirSync(statsDir, { recursive: true });
  }

  // Create basic stats file if it doesn't exist
  if (!fs.existsSync(statsPath)) {
    const stats = {
      publicPath: "/",
      chunks: {},
      entrypoints: {
        app: {
          assets: [],
        },
      },
      namedChunkGroups: {
        app: {
          assets: [],
          chunks: [],
          js: [],
          css: [],
        },
      },
    };

    fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));
    console.log("Created loadable-stats.json for development");
  }
}