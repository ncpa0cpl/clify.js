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
exports.groupByCategory = void 0;
function groupByCategory(elems) {
    var e_1, _a, e_2, _b;
    var _c;
    var results = [];
    var categories = new Set([""]);
    try {
        for (var elems_1 = __values(elems), elems_1_1 = elems_1.next(); !elems_1_1.done; elems_1_1 = elems_1.next()) {
            var e = elems_1_1.value;
            categories.add((_c = e.category) !== null && _c !== void 0 ? _c : "");
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (elems_1_1 && !elems_1_1.done && (_a = elems_1.return)) _a.call(elems_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var _loop_1 = function (category) {
        results.push([
            category,
            elems.filter(function (e) { var _a; return category === ((_a = e.category) !== null && _a !== void 0 ? _a : ""); }),
        ]);
    };
    try {
        for (var categories_1 = __values(categories), categories_1_1 = categories_1.next(); !categories_1_1.done; categories_1_1 = categories_1.next()) {
            var category = categories_1_1.value;
            _loop_1(category);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (categories_1_1 && !categories_1_1.done && (_b = categories_1.return)) _b.call(categories_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return results;
}
exports.groupByCategory = groupByCategory;
