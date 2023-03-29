"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padBottom = void 0;
const count_char_1 = require("./count-char");
const padBottom = (text, targetHeight) => {
    const endLineCharCount = (0, count_char_1.countChar)(text, "\n") + 1;
    const paddingLength = Math.max(0, targetHeight - endLineCharCount);
    return `${text}${Array.from({ length: paddingLength }, () => "\n").join("")}`;
};
exports.padBottom = padBottom;
