import { exec } from "child_process";

import { SERVER_ARGS } from "../../server/utils";
import { getCliArgs, PREPARE_ARGS } from "./utils";

function main() {
  const env = getCliArgs("--env")?.value ?? "";
  const mode = getCliArgs("--mode")?.value;
  const cmd = "tsx watch ./server";

  const args = process.argv
    .slice(2)
    .filter(
      (arg) =>
        SERVER_ARGS.some((v) => arg.startsWith(v)) ||
        !PREPARE_ARGS.some((v) => arg.startsWith(v)),
    );
  const cmdWithArgs = `${cmd} ${args.join(" ")}`.trim();

  const isDocker = process.env.DOCKER === "true";

  const childProcess = exec(
    `${
      isDocker ? "" : "sudo "
    }sh setup-host.sh --env=${env} --mode=${mode} &&${cmdWithArgs}`,
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
