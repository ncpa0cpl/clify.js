"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printLists = exports.removeColumnsNotFittingTheScreen = void 0;
const pad_left_1 = require("./pad-left");
const pad_right_1 = require("./pad-right");
const split_to_n_length_chunks_1 = require("./split-to-n-length-chunks");
const string_list_length_1 = require("./string-list-length");
function removeColumnsNotFittingTheScreen(cells, screenWidth) {
    cells = [...cells];
    const slicedCells = cells.slice(0, -1);
    if ((0, string_list_length_1.stringListLength)(slicedCells) >= screenWidth) {
        return removeColumnsNotFittingTheScreen(slicedCells, screenWidth);
    }
    return cells;
}
exports.removeColumnsNotFittingTheScreen = removeColumnsNotFittingTheScreen;
function printLists(lists, addLeftPadding = false) {
    const wholeLeftPadding = addLeftPadding ? 2 : 0;
    const columns = lists.reduce((colCount, list) => Math.max(colCount, list.length), 0);
    const columnsWidth = Array.from({ length: columns }).map((_, columnIndex) => {
        const width = lists.reduce((w, list) => {
            if (list[columnIndex]) {
                return Math.max(w, list[columnIndex].length);
            }
            return w;
        }, 0);
        return width + 2;
    });
    const screenWidth = process.stdout.columns;
    for (const line of lists) {
        const cells = line.map((cellText, columnIndex, arr) => {
            const columnWidth = columnsWidth[columnIndex];
            const text = (0, pad_left_1.padLeft)(cellText, { paddingLength: wholeLeftPadding });
            if (columnIndex === arr.length - 1)
                return text;
            return (0, pad_right_1.padRight)(text, { targetWidth: columnWidth });
        });
        const slicedCells = removeColumnsNotFittingTheScreen(cells, screenWidth);
        if (slicedCells.length === 0)
            return;
        if ((0, string_list_length_1.stringListLength)(slicedCells) > screenWidth) {
            const lastCell = slicedCells.splice(-1)[0];
            const padLeftWidth = (0, string_list_length_1.stringListLength)(slicedCells) + wholeLeftPadding;
            const lastCellWidth = screenWidth - padLeftWidth;
            const [firstChunk, ...chunks] = (0, split_to_n_length_chunks_1.splitToNLengthChunks)(lastCell, lastCellWidth);
            slicedCells.push(firstChunk);
            console.log(slicedCells.join(""));
            for (const chunk of chunks) {
                const text = (0, pad_left_1.padLeft)(chunk, { paddingLength: padLeftWidth });
                console.log(text);
            }
        }
        else {
            console.log(slicedCells.join(""));
        }
    }
}
exports.printLists = printLists;
