"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArgumentValue = void 0;
function parseArgumentValue(value) {
    if (value === "true")
        return true;
    if (value === "false")
        return false;
    return value;
}
exports.parseArgumentValue = parseArgumentValue;
