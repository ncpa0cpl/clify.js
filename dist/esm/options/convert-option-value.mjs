// src/options/convert-option-value.ts
import { InvalidOptionError } from "./option-error.mjs";
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
      return new InvalidOptionError(optName, "single value", "multiple");
    }
    switch (optType) {
      case "string":
        return String(value);
        break;
      case "boolean":
        if (typeof value !== "boolean") {
          return new InvalidOptionError(optName, "boolean", typeof value);
        }
        return value;
        break;
      case "number":
        if (typeof value !== "number" || Number.isNaN(value)) {
          return new InvalidOptionError(optName, "number", typeof value);
        }
        return value;
        break;
      case "int":
        if (typeof value !== "number" || Number.isNaN(value)) {
          return new InvalidOptionError(optName, "integer", typeof value);
        }
        if (!Number.isInteger(value)) {
          return new InvalidOptionError(optName, "integer", "float");
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
export {
  convertOptionValue
};
