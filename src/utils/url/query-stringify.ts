import queryString from "query-string";

const { stringify } = queryString;

/**
 * @constant STRINGIFY_OPTIONS
 */
export const STRINGIFY_OPTIONS = {
  skipEmptyString: true,
  skipNull: true,
};

/**
 * @function queryStringify
 * @param object
 * @returns {string}
 */
const queryStringify = (object: Record<string, unknown>): string => {
  const convert = stringify(object, STRINGIFY_OPTIONS);
  return convert;
};

export default queryStringify;
