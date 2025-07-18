export function omit<TData>(object: TData, omittedKey: (keyof TData)[]) {
  const newObject = { ...object };

  for (const key of omittedKey) {
    delete newObject[key];
  }

  return newObject;
}
