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
exports.compareStrings = void 0;
var is_numerical_1 = require("./is-numerical");
var split_by_alphanumeric_transitions_1 = require("./split-by-alphanumeric-transitions");
function compare(a, b) {
    var e_1, _a;
    if (a === b)
        return 0;
    var shorter = a.length > b.length ? b : a;
    try {
        for (var _b = __values(Array.from({ length: shorter.length }, function (_, i) { return i; })), _c = _b.next(); !_c.done; _c = _b.next()) {
            var index = _c.value;
            var charCodeA = a.charCodeAt(index);
            var charCodeB = b.charCodeAt(index);
            if (charCodeA < charCodeB)
                return -1;
            if (charCodeA > charCodeB)
                return 1;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return a.length > b.length ? 1 : -1;
}
function compareWithNumbers(a, b) {
    var e_2, _a;
    if (a === b)
        return 0;
    var partsOfA = (0, split_by_alphanumeric_transitions_1.splitByAlphanumericTransitions)(a);
    var partsOfB = (0, split_by_alphanumeric_transitions_1.splitByAlphanumericTransitions)(b);
    var shorter = partsOfA.length > partsOfB.length ? partsOfB : partsOfA;
    try {
        for (var _b = __values(Array.from({ length: shorter.length }, function (_, i) { return i; })), _c = _b.next(); !_c.done; _c = _b.next()) {
            var index = _c.value;
            var substringA = partsOfA[index];
            var substringB = partsOfB[index];
            var aIsNumeric = (0, is_numerical_1.isNumerical)(substringA);
            var bIsNumeric = (0, is_numerical_1.isNumerical)(substringB);
            if (aIsNumeric && !bIsNumeric) {
                return -1;
            }
            if (!aIsNumeric && bIsNumeric) {
                return 1;
            }
            if (aIsNumeric && bIsNumeric) {
                var numA = Number(substringA);
                var numB = Number(substringB);
                if (numA < numB)
                    return -1;
                if (numA > numB)
                    return 1;
            }
            if (!aIsNumeric && !bIsNumeric) {
                var substringCompare = compare(substringA, substringB);
                if (substringCompare !== 0)
                    return substringCompare;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return 0;
}
function compareStrings(arg_0, arg_1) {
    var _a, _b;
    if (typeof arg_0 === "string" && typeof arg_1 === "string") {
        return compare(arg_0, arg_1);
    }
    if (typeof arg_0 === "object" && arg_0 !== null) {
        // @ts-expect-error
        var numCompare = (_a = arg_0["numCompare"]) !== null && _a !== void 0 ? _a : false;
        // @ts-expect-error
        var reverse_1 = (_b = arg_0["reverse"]) !== null && _b !== void 0 ? _b : false;
        if (numCompare) {
            return function (a, b) {
                if (reverse_1)
                    return REVERSE_TABLE[compareWithNumbers(a, b)];
                return compareWithNumbers(a, b);
            };
        }
        return function (a, b) {
            if (reverse_1)
                return REVERSE_TABLE[compare(a, b)];
            return compare(a, b);
        };
    }
    return compare;
}
exports.compareStrings = compareStrings;
var REVERSE_TABLE = {
    "-1": 1,
    "0": 0,
    "1": -1,
};
