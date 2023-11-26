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

// src/options/convert-option-value.ts
var convert_option_value_exports = {};
__export(convert_option_value_exports, {
  convertOptionValue: () => convertOptionValue
});
module.exports = __toCommonJS(convert_option_value_exports);
var import_option_error = require("./option-error.cjs");
function convertOptionValue(value, optType, optName) {
  if (Array.isArray(optType)) {
    if (!Array.isArray(value)) {
      const result = convertOptionValue(value, optType[0], optName);
      if (typeof result === "object") {
        return result;
      }
      return [result];
    }
    const mapped = [];
    for (const v of value) {
      const result = convertOptionValue(v, optType[0], optName);
      if (typeof result === "object") {
        return result;
      }
      mapped.push(result);
    }
    return mapped;
  } else {
    if (Array.isArray(value)) {
      return new import_option_error.InvalidOptionError(optName, "single value", "multiple");
    }
    switch (optType) {
      case "string":
        return String(value);
        break;
      case "boolean":
        if (typeof value !== "boolean") {
          return new import_option_error.InvalidOptionError(optName, "boolean", typeof value);
        }
        return value;
        break;
      case "number":
        if (typeof value !== "number" || Number.isNaN(value)) {
          return new import_option_error.InvalidOptionError(optName, "number", typeof value);
        }
        return value;
        break;
      case "int":
        if (typeof value !== "number" || Number.isNaN(value)) {
          return new import_option_error.InvalidOptionError(optName, "integer", typeof value);
        }
        if (!Number.isInteger(value)) {
          return new import_option_error.InvalidOptionError(optName, "integer", "float");
        }
        return value;
        break;
      case "unknown":
        return value;
        break;
    }
  }
  throw Error("unreachable");
}
