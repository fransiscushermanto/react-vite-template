import "dotenv/config";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.resolve(__dirname, "..", "package.json");
const markerFilePath = path.resolve(__dirname, "..", ".package-initialized");

// Only update if this is a fresh install (no lockfile) or if explicitly requested
const shouldUpdate =
  !fs.existsSync(markerFilePath) || process.argv.includes("--force");

if (shouldUpdate && !process.env.VITE_APP_NAME) {
  console.warn(
    "⚠️  VITE_APP_NAME is not set. Please set it in your environment variables",
  );
  console.warn(
    "⚠️  After set env value, please run `yarn init-pkg` to initialize package.json",
  );
  process.exit(0);
}

if (shouldUpdate && process.env.VITE_APP_NAME) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    packageJson.name = process.env.VITE_APP_NAME;
    packageJson.version = "0.0.0";

    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + "\n",
    );

    // Create marker file to indicate initialization is complete
    fs.writeFileSync(markerFilePath, new Date().toISOString());
    
    console.log(
      `✅ Package initialized with name: ${process.env.VITE_APP_NAME}`,
    );
  } catch (error) {
    console.warn("⚠️ Could not initialized package:", error.message);
  }
}
