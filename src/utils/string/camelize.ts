import humps from "humps";

export function camelize<T = Record<string, unknown>>(
  obj: T,
  /**
   * @TODO need to enhance to allow target to inner object
   *
   * currently you only can target the root key,
   */
  ignoreKeys: Array<keyof T | (string & NonNullable<unknown>)> = [],
): T {
  const temp = ignoreKeys.reduce(
    (prev, key) => ({ ...prev, [key]: obj[key as keyof T] }),
    {},
  );

  ignoreKeys.forEach((key) => {
    delete obj[key as keyof T];
  });

  return { ...humps.camelizeKeys(obj), ...temp } as T;
}
