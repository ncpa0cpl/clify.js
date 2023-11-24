"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertArg = void 0;
const argument_error_1 = require("./argument-error");
function convertArg(value, argType) {
    if (Array.isArray(argType)) {
        if (!Array.isArray(value)) {
            return [convertArg(value, argType[0])];
        }
        return value.map((v) => convertArg(v, argType[0]));
    }
    else {
        if (Array.isArray(value)) {
            return new argument_error_1.ArgumentError("single value", "multiple");
        }
        switch (argType) {
            case "string":
                return String(value);
                break;
            case "boolean":
                if (typeof value !== "boolean") {
                    return new argument_error_1.ArgumentError("boolean", typeof value);
                }
                return value;
                break;
            case "number":
                if (typeof value !== "number" || Number.isNaN(value)) {
                    return new argument_error_1.ArgumentError("number", typeof value);
                }
                return value;
                break;
            case "int":
                if (typeof value !== "number" ||
                    Number.isNaN(value) ||
                    !Number.isInteger(value)) {
                    return new argument_error_1.ArgumentError("integer", typeof value);
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
exports.convertArg = convertArg;
