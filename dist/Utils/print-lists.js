"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
exports.printLists = exports.removeColumnsNotFittingTheScreen = void 0;
var pad_left_1 = require("./pad-left");
var pad_right_1 = require("./pad-right");
var split_to_n_length_chunks_1 = require("./split-to-n-length-chunks");
var string_list_length_1 = require("./string-list-length");
function removeColumnsNotFittingTheScreen(cells, screenWidth) {
    cells = __spreadArray([], __read(cells), false);
    var slicedCells = cells.slice(0, -1);
    if ((0, string_list_length_1.stringListLength)(slicedCells) >= screenWidth) {
        return removeColumnsNotFittingTheScreen(slicedCells, screenWidth);
    }
    return cells;
}
exports.removeColumnsNotFittingTheScreen = removeColumnsNotFittingTheScreen;
function printLists(lists, addLeftPadding) {
    var e_1, _a, e_2, _b;
    if (addLeftPadding === void 0) { addLeftPadding = false; }
    var wholeLeftPadding = addLeftPadding ? 2 : 0;
    var columns = lists.reduce(function (colCount, list) { return Math.max(colCount, list.length); }, 0);
    var columnsWidth = Array.from({ length: columns }).map(function (_, columnIndex) {
        var width = lists.reduce(function (w, list) {
            if (list[columnIndex]) {
                return Math.max(w, list[columnIndex].length);
            }
            return w;
        }, 0);
        return width + 2;
    });
    var screenWidth = process.stdout.columns;
    try {
        for (var lists_1 = __values(lists), lists_1_1 = lists_1.next(); !lists_1_1.done; lists_1_1 = lists_1.next()) {
            var line = lists_1_1.value;
            var cells = line.map(function (cellText, columnIndex, arr) {
                var columnWidth = columnsWidth[columnIndex];
                var text = (0, pad_left_1.padLeft)(cellText, { paddingLength: wholeLeftPadding });
                if (columnIndex === arr.length - 1)
                    return text;
                return (0, pad_right_1.padRight)(text, { targetWidth: columnWidth });
            });
            var slicedCells = removeColumnsNotFittingTheScreen(cells, screenWidth);
            if (slicedCells.length === 0)
                return;
            if ((0, string_list_length_1.stringListLength)(slicedCells) > screenWidth) {
                var lastCell = slicedCells.splice(-1)[0];
                var padLeftWidth = (0, string_list_length_1.stringListLength)(slicedCells) + wholeLeftPadding;
                var lastCellWidth = screenWidth - padLeftWidth;
                var _c = __read((0, split_to_n_length_chunks_1.splitToNLengthChunks)(lastCell, lastCellWidth)), firstChunk = _c[0], chunks = _c.slice(1);
                slicedCells.push(firstChunk);
                console.log(slicedCells.join(""));
                try {
                    for (var chunks_1 = (e_2 = void 0, __values(chunks)), chunks_1_1 = chunks_1.next(); !chunks_1_1.done; chunks_1_1 = chunks_1.next()) {
                        var chunk = chunks_1_1.value;
                        var text = (0, pad_left_1.padLeft)(chunk, { paddingLength: padLeftWidth });
                        console.log(text);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (chunks_1_1 && !chunks_1_1.done && (_b = chunks_1.return)) _b.call(chunks_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            else {
                console.log(slicedCells.join(""));
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (lists_1_1 && !lists_1_1.done && (_a = lists_1.return)) _a.call(lists_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
exports.printLists = printLists;
