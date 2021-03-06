"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padLeft = void 0;
function padLeft(text, options) {
    var _a;
    if (options.paddingLength !== undefined)
        options.paddingLength = Math.max(0, options.paddingLength);
    if (options.targetWidth !== undefined)
        options.targetWidth = Math.max(0, options.targetWidth);
    let paddingLength = (_a = options.paddingLength) !== null && _a !== void 0 ? _a : 0;
    if (options.targetWidth !== undefined) {
        if (options.targetWidth <= text.length)
            return text.slice(0, options.targetWidth);
        paddingLength = options.targetWidth - text.length;
    }
    return `${Array.from({ length: paddingLength }, () => " ").join("")}${text}`;
}
exports.padLeft = padLeft;
