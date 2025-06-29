/**
 * This function is used to generate next path value from current path that will be used in search value
 *
 * This is only used for redirection purpose
 *
 * @param pathname (current pathname)
 * @param paramKey (default is "next")
 * @returns search string
 */
function getNextPath(url: URL, paramKey: string = "next") {
  const prevSearch = url.searchParams.toString();
  const next = url.pathname.slice(1);
  return `${next ? `?${paramKey}=${next}` : ""}${
    next ? `${prevSearch ? "&" : ""}${prevSearch}` : url.searchParams.toString()
  }`;
}

export default getNextPath;
