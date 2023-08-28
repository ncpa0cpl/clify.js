// src/Utils/group-by-category.ts
function groupByCategory(elems) {
  const results = [];
  const categories = /* @__PURE__ */ new Set([""]);
  for (const e of elems) {
    categories.add(e.category ?? "");
  }
  for (const category of categories) {
    results.push([
      category,
      elems.filter((e) => category === (e.category ?? ""))
    ]);
  }
  return results;
}
export {
  groupByCategory
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1V0aWxzL2dyb3VwLWJ5LWNhdGVnb3J5LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZnVuY3Rpb24gZ3JvdXBCeUNhdGVnb3J5PEUgZXh0ZW5kcyB7IGNhdGVnb3J5Pzogc3RyaW5nIH0+KFxuICBlbGVtczogRVtdXG4pOiBbY2F0ZWdvcnk6IHN0cmluZywgZWxlbXM6IEVbXV1bXSB7XG4gIGNvbnN0IHJlc3VsdHM6IFtjYXRlZ29yeTogc3RyaW5nLCBlbGVtczogRVtdXVtdID0gW107XG5cbiAgY29uc3QgY2F0ZWdvcmllcyA9IG5ldyBTZXQoW1wiXCJdKTtcblxuICBmb3IgKGNvbnN0IGUgb2YgZWxlbXMpIHtcbiAgICBjYXRlZ29yaWVzLmFkZChlLmNhdGVnb3J5ID8/IFwiXCIpO1xuICB9XG5cbiAgZm9yIChjb25zdCBjYXRlZ29yeSBvZiBjYXRlZ29yaWVzKSB7XG4gICAgcmVzdWx0cy5wdXNoKFtcbiAgICAgIGNhdGVnb3J5LFxuICAgICAgZWxlbXMuZmlsdGVyKChlKSA9PiBjYXRlZ29yeSA9PT0gKGUuY2F0ZWdvcnkgPz8gXCJcIikpLFxuICAgIF0pO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQU8sU0FBUyxnQkFDZCxPQUNrQztBQUNsQyxRQUFNLFVBQTRDLENBQUM7QUFFbkQsUUFBTSxhQUFhLG9CQUFJLElBQUksQ0FBQyxFQUFFLENBQUM7QUFFL0IsYUFBVyxLQUFLLE9BQU87QUFDckIsZUFBVyxJQUFJLEVBQUUsWUFBWSxFQUFFO0FBQUEsRUFDakM7QUFFQSxhQUFXLFlBQVksWUFBWTtBQUNqQyxZQUFRLEtBQUs7QUFBQSxNQUNYO0FBQUEsTUFDQSxNQUFNLE9BQU8sQ0FBQyxNQUFNLGNBQWMsRUFBRSxZQUFZLEdBQUc7QUFBQSxJQUNyRCxDQUFDO0FBQUEsRUFDSDtBQUVBLFNBQU87QUFDVDsiLAogICJuYW1lcyI6IFtdCn0K
