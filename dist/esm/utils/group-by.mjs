// src/utils/group-by.ts
if (typeof Object.groupBy === "undefined") {
  Object.groupBy = function groupBy(iterable, callback) {
    const grouped = {};
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
