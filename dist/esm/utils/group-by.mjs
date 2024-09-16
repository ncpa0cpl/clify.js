// src/utils/group-by.ts
if (typeof Object.groupBy === "undefined") {
  Object.groupBy = function groupBy(iterable, callback) {
    const grouped = {};
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
