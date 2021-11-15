"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printLists = exports.removeColumnsNotFittingTheScreen = void 0;
var pad_left_1 = require("./pad-left");
var pad_right_1 = require("./pad-right");
var split_to_n_length_chunks_1 = require("./split-to-n-length-chunks");
var string_list_length_1 = require("./string-list-length");
function removeColumnsNotFittingTheScreen(cells, screenWidth) {
    cells = __spreadArray([], cells, true);
    var slicedCells = cells.slice(0, -1);
    if ((0, string_list_length_1.stringListLength)(slicedCells) >= screenWidth) {
        return removeColumnsNotFittingTheScreen(slicedCells, screenWidth);
    }
    return cells;
}
exports.removeColumnsNotFittingTheScreen = removeColumnsNotFittingTheScreen;
function printLists(lists, addLeftPadding) {
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
    for (var _i = 0, lists_1 = lists; _i < lists_1.length; _i++) {
        var line = lists_1[_i];
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
            var _a = (0, split_to_n_length_chunks_1.splitToNLengthChunks)(lastCell, lastCellWidth), firstChunk = _a[0], chunks = _a.slice(1);
            slicedCells.push(firstChunk);
            console.log(slicedCells.join(""));
            for (var _b = 0, chunks_1 = chunks; _b < chunks_1.length; _b++) {
                var chunk = chunks_1[_b];
                var text = (0, pad_left_1.padLeft)(chunk, { paddingLength: padLeftWidth });
                console.log(text);
            }
        }
        else {
            console.log(slicedCells.join(""));
        }
    }
}
exports.printLists = printLists;
