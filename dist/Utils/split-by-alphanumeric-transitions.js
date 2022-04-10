"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitByAlphanumericTransitions = void 0;
const is_numerical_1 = require("./is-numerical");
function splitByAlphanumericTransitions(str) {
    const results = [];
    const lastChar = () => results[results.length - 1];
    const addChar = (char) => (results[results.length - 1] += char);
    const addNextWord = (char) => results.push(char);
    for (const char of str.split("")) {
        const lastCharacter = lastChar();
        if (lastCharacter === undefined) {
            addNextWord(char);
            continue;
        }
        if ((0, is_numerical_1.isNumerical)(char) === (0, is_numerical_1.isNumerical)(lastCharacter)) {
            addChar(char);
            continue;
        }
        addNextWord(char);
    }
    return results;
}
exports.splitByAlphanumericTransitions = splitByAlphanumericTransitions;
