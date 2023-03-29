"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countChar = void 0;
const countChar = (str, char) => {
    let count = 0;
    for (const c of str) {
        if (c === char)
            count++;
    }
    return count;
};
exports.countChar = countChar;
