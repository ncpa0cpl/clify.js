export {};

declare global {
  interface ObjectConstructor {
    groupBy<T, K extends string | number | symbol>(
      iterable: Iterable<T>,
      callback: (item: T) => K,
    ): Record<K, T[]>;
  }
}

if (typeof Object.groupBy === typeof undefined) {
  Object.groupBy = function groupBy<U, K extends string | number | symbol>(
    iterable: Iterable<U>,
    callback: (item: U) => K,
  ) {
    const grouped = {} as Record<K, U[]>;
    for (const item of iterable) {
      const key = callback(item);
      if (key in grouped) {
        grouped[key].push(item);
      } else {
        grouped[key] = [item];
      }
    }
    return grouped;
  };
}
