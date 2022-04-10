"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupByCategory = void 0;
function groupByCategory(elems) {
    var _a;
    const results = [];
    const categories = new Set([""]);
    for (const e of elems) {
        categories.add((_a = e.category) !== null && _a !== void 0 ? _a : "");
    }
    for (const category of categories) {
        results.push([
            category,
            elems.filter((e) => { var _a; return category === ((_a = e.category) !== null && _a !== void 0 ? _a : ""); }),
        ]);
    }
    return results;
}
exports.groupByCategory = groupByCategory;
