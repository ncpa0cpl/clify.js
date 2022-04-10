"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitToNLengthChunks = void 0;
function splitToNLengthChunks(text, n) {
    const charArray = text.split("");
    const chunks = [];
    while (true) {
        const chunk = charArray.splice(0, n);
        if (chunk.length === 0)
            break;
        chunks.push(chunk.join(""));
    }
    return chunks;
}
exports.splitToNLengthChunks = splitToNLengthChunks;
