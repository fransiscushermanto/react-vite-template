/* eslint-disable @typescript-eslint/no-explicit-any */

interface IsEqualOptions {
  /**
   * If `true` this will compare only the key exist in targetObj.
   */
  partial?: boolean;
}

export function isEqual(
  targetObj: Record<string, any>,
  sourceObj: Record<string, any>,
  options: IsEqualOptions = {},
) {
  const { partial } = options;

  let result = true;

  if (!partial) {
    if (Object.keys(targetObj).length !== Object.keys(sourceObj).length) {
      return false;
    }
  }

  Object.keys(targetObj).forEach((key) => {
    const targetValue = targetObj[key];
    const sourceValue = sourceObj[key];

    if (typeof targetValue === "object") {
      result = isEqual(targetValue, sourceValue, options);
      return;
    }

    if (targetValue !== sourceValue) {
      result = false;
    }
  });

  return result;
}
