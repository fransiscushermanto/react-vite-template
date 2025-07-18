export function pick<TData extends object | unknown = unknown>(
  object: TData,
  pickedKey: (keyof TData)[],
) {
  const newObject: TData = {} as TData;

  for (const key of pickedKey) {
    newObject[key] = object[key];
  }

  return newObject;
}
