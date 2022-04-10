"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareStrings = void 0;
const is_numerical_1 = require("./is-numerical");
const split_by_alphanumeric_transitions_1 = require("./split-by-alphanumeric-transitions");
function compare(a, b) {
    if (a === b)
        return 0;
    const shorter = a.length > b.length ? b : a;
    for (const index of Array.from({ length: shorter.length }, (_, i) => i)) {
        const charCodeA = a.charCodeAt(index);
        const charCodeB = b.charCodeAt(index);
        if (charCodeA < charCodeB)
            return -1;
        if (charCodeA > charCodeB)
            return 1;
    }
    return a.length > b.length ? 1 : -1;
}
function compareWithNumbers(a, b) {
    if (a === b)
        return 0;
    const partsOfA = (0, split_by_alphanumeric_transitions_1.splitByAlphanumericTransitions)(a);
    const partsOfB = (0, split_by_alphanumeric_transitions_1.splitByAlphanumericTransitions)(b);
    const shorter = partsOfA.length > partsOfB.length ? partsOfB : partsOfA;
    for (const index of Array.from({ length: shorter.length }, (_, i) => i)) {
        const substringA = partsOfA[index];
        const substringB = partsOfB[index];
        const aIsNumeric = (0, is_numerical_1.isNumerical)(substringA);
        const bIsNumeric = (0, is_numerical_1.isNumerical)(substringB);
        if (aIsNumeric && !bIsNumeric) {
            return -1;
        }
        if (!aIsNumeric && bIsNumeric) {
            return 1;
        }
        if (aIsNumeric && bIsNumeric) {
            const numA = Number(substringA);
            const numB = Number(substringB);
            if (numA < numB)
                return -1;
            if (numA > numB)
                return 1;
        }
        if (!aIsNumeric && !bIsNumeric) {
            const substringCompare = compare(substringA, substringB);
            if (substringCompare !== 0)
                return substringCompare;
        }
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
        const numCompare = (_a = arg_0["numCompare"]) !== null && _a !== void 0 ? _a : false;
        // @ts-expect-error
        const reverse = (_b = arg_0["reverse"]) !== null && _b !== void 0 ? _b : false;
        if (numCompare) {
            return (a, b) => {
                if (reverse)
                    return REVERSE_TABLE[compareWithNumbers(a, b)];
                return compareWithNumbers(a, b);
            };
        }
        return (a, b) => {
            if (reverse)
                return REVERSE_TABLE[compare(a, b)];
            return compare(a, b);
        };
    }
    return compare;
}
exports.compareStrings = compareStrings;
const REVERSE_TABLE = {
    "-1": 1,
    "0": 0,
    "1": -1,
};
