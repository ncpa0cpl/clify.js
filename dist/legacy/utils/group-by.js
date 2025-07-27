"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/group-by.ts
var group_by_exports = {};
module.exports = __toCommonJS(group_by_exports);
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
