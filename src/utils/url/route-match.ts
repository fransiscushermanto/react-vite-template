import { minimatch } from "minimatch";

function routeMatch(hostname: string, patterns: string | Array<string>) {
  if (typeof patterns === "string") return minimatch(hostname, patterns);

  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i];

    if (minimatch(hostname, pattern)) {
      return true;
    }
  }

  return false;
}

export default routeMatch;
