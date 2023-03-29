"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padLeft = void 0;
function padLeft(text, options) {
    if (options.paddingLength !== undefined)
        options.paddingLength = Math.max(0, options.paddingLength);
    if (options.targetWidth !== undefined)
        options.targetWidth = Math.max(0, options.targetWidth);
    const textLines = text.split("\n");
    const paddedLines = textLines.map((line) => {
        var _a;
        let paddingLength = (_a = options.paddingLength) !== null && _a !== void 0 ? _a : 0;
        if (options.targetWidth !== undefined) {
            if (options.targetWidth <= line.length)
                return line.slice(0, options.targetWidth);
            paddingLength = options.targetWidth - line.length;
        }
        return `${Array.from({ length: paddingLength }, () => " ").join("")}${line}`;
    });
    return paddedLines.join("\n");
}
exports.padLeft = padLeft;
