export const PREPARE_ARGS = ["--preview", "--env", "--mode"] as const;

export function getCliArgs(
  flag: (typeof PREPARE_ARGS)[number],
): { value: string } | undefined {
  const args = process.argv;
  const flagIndex = args.findIndex(
    (arg) => arg === flag || arg.startsWith(`${flag}=`),
  );

  if (flagIndex === -1) return;

  if (args[flagIndex].startsWith(`${flag}=`)) {
    return { value: args[flagIndex].split("=")[1] };
  }

  if (flagIndex + 1 > args.length) return;

  return { value: args[flagIndex + 1] };
}
