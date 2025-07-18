function getType(value: unknown) {
  return Object.prototype.toString.call(value);
}

function isShouldDeepCompare(type: string) {
  return type === "[object Object]" || type === "[object Array]";
}

export function deepEqual(valueA: unknown, valueB: unknown): boolean {
  const typeA = getType(valueA);
  const typeB = getType(valueB);

  if (typeA !== typeB) {
    return false;
  }

  if (isShouldDeepCompare(typeA) && isShouldDeepCompare(typeB)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tValueA = valueA as Array<any> | Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tValueB = valueB as Array<any> | Record<string, any>;

    const entriesA = Object.entries(tValueA);
    const entriesB = Object.entries(tValueB);

    if (entriesA.length !== entriesB.length) return false;

    for (let i = 0; i < entriesA.length; i++) {
      const [kA, vA] = entriesA[i];

      if (!Object.hasOwn(tValueB, kA)) return false;

      if (!deepEqual(vA, tValueB[kA as keyof typeof tValueB])) return false;
    }

    return true;
  }

  return valueA === valueB;
}
