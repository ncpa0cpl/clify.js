"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitByAlphanumericTransitions = void 0;
var is_numerical_1 = require("./is-numerical");
function splitByAlphanumericTransitions(str) {
    var e_1, _a;
    var results = [];
    var lastChar = function () { return results[results.length - 1]; };
    var addChar = function (char) { return (results[results.length - 1] += char); };
    var addNextWord = function (char) { return results.push(char); };
    try {
        for (var _b = __values(str.split("")), _c = _b.next(); !_c.done; _c = _b.next()) {
            var char = _c.value;
            var lastCharacter = lastChar();
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
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return results;
}
exports.splitByAlphanumericTransitions = splitByAlphanumericTransitions;
