import { API_BASE_PATH } from "@/constants/config";

interface BuildBasePathOptions {
  basePath?: string;
  version?: string;
  search?: string;
}

export function buildBasePath(
  path: string,
  options: BuildBasePathOptions = {},
) {
  const { basePath, version = "", search = "" } = options;

  return `${basePath ?? API_BASE_PATH}${version}/${path.replace(
    /^\//,
    "",
  )}${search}`;
}
