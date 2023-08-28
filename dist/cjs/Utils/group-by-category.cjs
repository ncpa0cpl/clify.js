"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Utils/group-by-category.ts
var group_by_category_exports = {};
__export(group_by_category_exports, {
  groupByCategory: () => groupByCategory
});
module.exports = __toCommonJS(group_by_category_exports);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1V0aWxzL2dyb3VwLWJ5LWNhdGVnb3J5LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZnVuY3Rpb24gZ3JvdXBCeUNhdGVnb3J5PEUgZXh0ZW5kcyB7IGNhdGVnb3J5Pzogc3RyaW5nIH0+KFxuICBlbGVtczogRVtdXG4pOiBbY2F0ZWdvcnk6IHN0cmluZywgZWxlbXM6IEVbXV1bXSB7XG4gIGNvbnN0IHJlc3VsdHM6IFtjYXRlZ29yeTogc3RyaW5nLCBlbGVtczogRVtdXVtdID0gW107XG5cbiAgY29uc3QgY2F0ZWdvcmllcyA9IG5ldyBTZXQoW1wiXCJdKTtcblxuICBmb3IgKGNvbnN0IGUgb2YgZWxlbXMpIHtcbiAgICBjYXRlZ29yaWVzLmFkZChlLmNhdGVnb3J5ID8/IFwiXCIpO1xuICB9XG5cbiAgZm9yIChjb25zdCBjYXRlZ29yeSBvZiBjYXRlZ29yaWVzKSB7XG4gICAgcmVzdWx0cy5wdXNoKFtcbiAgICAgIGNhdGVnb3J5LFxuICAgICAgZWxlbXMuZmlsdGVyKChlKSA9PiBjYXRlZ29yeSA9PT0gKGUuY2F0ZWdvcnkgPz8gXCJcIikpLFxuICAgIF0pO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBTyxTQUFTLGdCQUNkLE9BQ2tDO0FBQ2xDLFFBQU0sVUFBNEMsQ0FBQztBQUVuRCxRQUFNLGFBQWEsb0JBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQztBQUUvQixhQUFXLEtBQUssT0FBTztBQUNyQixlQUFXLElBQUksRUFBRSxZQUFZLEVBQUU7QUFBQSxFQUNqQztBQUVBLGFBQVcsWUFBWSxZQUFZO0FBQ2pDLFlBQVEsS0FBSztBQUFBLE1BQ1g7QUFBQSxNQUNBLE1BQU0sT0FBTyxDQUFDLE1BQU0sY0FBYyxFQUFFLFlBQVksR0FBRztBQUFBLElBQ3JELENBQUM7QUFBQSxFQUNIO0FBRUEsU0FBTztBQUNUOyIsCiAgIm5hbWVzIjogW10KfQo=
