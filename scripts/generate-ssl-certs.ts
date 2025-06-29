import { exec, execSync } from "child_process";

import { HOST } from "../server/constants";

async function main() {
  // Check if mkcert is installed
  try {
    const mkcertVersion = execSync("mkcert -version", {
      encoding: "utf8",
    });
    console.log(`mkcert version: ${mkcertVersion.trim()}`);
  } catch (_) {
    console.error(
      `Error: mkcert is not installed or not found in your PATH. Please install it first.`,
    );
    process.exit(1);
  }

  // Create certs directory and generate certificates
  console.log("Generating SSL certificates...");

  const childProcess = exec(
    `mkdir -p certs && mkcert -key-file ./certs/dev.pem -cert-file ./certs/cert.pem "${HOST}" 127.0.0.1 ::1`,
  );

  childProcess.stdout?.on("data", (data) => {
    process.stdout.write(data);
  });

  childProcess.stderr?.on("data", (data) => {
    process.stdout.write(data);
  });

  // Handle process exit
  childProcess.on("exit", (code) => {
    if (code !== 0) {
      console.error(`Process exited with code ${code}`);
      process.exit(code ?? 1);
    }
  });

  // Handle process errors
  childProcess.on("error", (error) => {
    console.error(`Error executing command: ${error.message}`);
    process.exit(1);
  });
}

main();
