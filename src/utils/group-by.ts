export {};

if (typeof Object.groupBy === typeof undefined) {
  Object.groupBy = function groupBy<U, K extends string | number | symbol>(
    iterable: Iterable<U>,
    callback: (item: U, index: number) => K,
  ) {
    const grouped = {} as Record<K, U[]>;
    let index = 0;
    for (const item of iterable) {
      const key = callback(item, index++);
      if (key in grouped) {
        grouped[key].push(item);
      } else {
        grouped[key] = [item];
      }
    }
    return grouped;
  };
}
