"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringListLength = void 0;
function stringListLength(strings) {
    return strings.reduce((len, c) => len + Math.max(0, ...c.split("\n").map((l) => l.length)), 0);
}
exports.stringListLength = stringListLength;
