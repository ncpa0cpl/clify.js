import { MapType, OptionType } from "./option";
import { InvalidOptionError } from "./option-error";

const TRUTHY: any[] = ["true", "True", "TRUE", 1, ""];
const FALSY: any[] = ["false", "False", "FALSE", 0];

export function convertOptionValue<T extends OptionType>(
  value: string | number | boolean | Array<string | number | boolean>,
  optType: T,
  optName: string,
): MapType<T> | InvalidOptionError {
  if (Array.isArray(optType)) {
    if (!Array.isArray(value)) {
      const result = convertOptionValue(value, optType[0], optName);
      if (typeof result === "object") {
        return result;
      }
      return [result] as MapType<T>;
    }

    const mapped: Array<string | number | boolean> = [];
    for (const v of value) {
      const result = convertOptionValue(v, optType[0], optName);
      if (typeof result === "object") {
        return result;
      }
      mapped.push(result);
    }
    return mapped as MapType<T>;
  } else {
    if (Array.isArray(value)) {
      return new InvalidOptionError(optName, "multiple", "single value");
    }

    switch (optType) {
      case "string":
        return String(value) as MapType<T>;
        break;
      case "boolean":
        if (TRUTHY.includes(value)) {
          value = true;
        } else if (FALSY.includes(value)) {
          value = false;
        }
        if (typeof value !== "boolean") {
          return new InvalidOptionError(optName, typeof value, "boolean");
        }
        return value as MapType<T>;
        break;
      case "number":
        if (typeof value !== "number" || Number.isNaN(value)) {
          return new InvalidOptionError(optName, typeof value, "number");
        }
        return value as MapType<T>;
        break;
      case "int":
        if (typeof value !== "number" || Number.isNaN(value)) {
          return new InvalidOptionError(optName, typeof value, "integer");
        }
        if (!Number.isInteger(value)) {
          return new InvalidOptionError(optName, "float", "integer");
        }
        return value as MapType<T>;
        break;
      case "unknown":
        return value as MapType<T>;
        break;
    }
  }

  throw Error("unreachable");
}
