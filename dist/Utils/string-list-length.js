"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringListLength = void 0;
function stringListLength(strings) {
    return strings.reduce(function (len, c) { return len + c.length; }, 0);
}
exports.stringListLength = stringListLength;
