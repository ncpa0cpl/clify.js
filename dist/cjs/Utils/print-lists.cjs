"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Utils/print-lists.ts
var print_lists_exports = {};
__export(print_lists_exports, {
  printLists: () => printLists,
  removeColumnsNotFittingTheScreen: () => removeColumnsNotFittingTheScreen
});
module.exports = __toCommonJS(print_lists_exports);
var import_termx_markup = require("termx-markup");
var import_output = require("../output.cjs");
var import_count_char = require("./count-char.cjs");
var import_pad_bottom = require("./pad-bottom.cjs");
var import_pad_left = require("./pad-left.cjs");
var import_pad_right = require("./pad-right.cjs");
var import_split_to_n_length_chunks = require("./split-to-n-length-chunks.cjs");
var import_string_list_length = require("./string-list-length.cjs");
function removeColumnsNotFittingTheScreen(cells, screenWidth) {
  cells = [...cells];
  const slicedCells = cells.slice(0, -1);
  if ((0, import_string_list_length.stringListLength)(slicedCells) >= screenWidth) {
    return removeColumnsNotFittingTheScreen(slicedCells, screenWidth);
  }
  return cells;
}
function printLists(linesList, addLeftPadding = false) {
  const wholeLeftPadding = addLeftPadding ? 2 : 0;
  const columns = linesList.reduce(
    (colCount, line) => Math.max(colCount, line.length),
    0
  );
  const columnsWidth = Array.from({ length: columns }).map(
    (_, columnIndex) => {
      const width = linesList.reduce((w, line) => {
        const cell = line[columnIndex];
        if (cell) {
          const cellLines = cell.split("\n");
          const cellLinesWidths = cellLines.map(
            (line2) => line2.length
          );
          return Math.max(w, ...cellLinesWidths);
        }
        return w;
      }, 0);
      return width + 2;
    }
  );
  const screenWidth = process.stdout.columns;
  for (const line of linesList) {
    const lineHeight = Math.max(
      1,
      ...line.map((cell) => (0, import_count_char.countChar)(cell, "\n") + 1)
    );
    const columns2 = line.map((cellText, columnIndex, arr) => {
      const columnWidth = columnsWidth[columnIndex];
      const text = (0, import_pad_left.padLeft)((0, import_pad_bottom.padBottom)(cellText, lineHeight), {
        paddingLength: wholeLeftPadding
      });
      if (columnIndex === arr.length - 1)
        return text;
      return (0, import_pad_right.padRight)(text, { targetWidth: columnWidth });
    });
    const rows = columns2.reduce((rows2, c) => {
      const cellLines = c.split("\n");
      for (let i = 0; i < cellLines.length; i++) {
        if (!rows2[i])
          rows2[i] = [];
        rows2[i].push(cellLines[i]);
      }
      return rows2;
    }, []);
    for (const cells of rows) {
      const slicedCells = removeColumnsNotFittingTheScreen(
        cells,
        screenWidth
      );
      if (slicedCells.length === 0)
        return;
      if ((0, import_string_list_length.stringListLength)(slicedCells) > screenWidth) {
        const lastCell = slicedCells.splice(-1)[0];
        const padLeftWidth = (0, import_string_list_length.stringListLength)(slicedCells) + wholeLeftPadding;
        const lastCellWidth = screenWidth - padLeftWidth;
        const [firstChunk, ...chunks] = (0, import_split_to_n_length_chunks.splitToNLengthChunks)(
          lastCell,
          lastCellWidth
        );
        slicedCells.push(firstChunk);
        import_output.Out.out(import_termx_markup.html` <span>${slicedCells.join("")}</span> `);
        for (const chunk of chunks) {
          const text = (0, import_pad_left.padLeft)(chunk, {
            paddingLength: padLeftWidth
          });
          import_output.Out.out(import_termx_markup.html` <span>${text}</span> `);
        }
      } else {
        import_output.Out.out(import_termx_markup.html` <span>${slicedCells.join("")}</span> `);
      }
    }
  }
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1V0aWxzL3ByaW50LWxpc3RzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBodG1sIH0gZnJvbSBcInRlcm14LW1hcmt1cFwiO1xuaW1wb3J0IHsgT3V0IH0gZnJvbSBcIi4uL291dHB1dFwiO1xuaW1wb3J0IHsgY291bnRDaGFyIH0gZnJvbSBcIi4vY291bnQtY2hhclwiO1xuaW1wb3J0IHsgcGFkQm90dG9tIH0gZnJvbSBcIi4vcGFkLWJvdHRvbVwiO1xuaW1wb3J0IHsgcGFkTGVmdCB9IGZyb20gXCIuL3BhZC1sZWZ0XCI7XG5pbXBvcnQgeyBwYWRSaWdodCB9IGZyb20gXCIuL3BhZC1yaWdodFwiO1xuaW1wb3J0IHsgc3BsaXRUb05MZW5ndGhDaHVua3MgfSBmcm9tIFwiLi9zcGxpdC10by1uLWxlbmd0aC1jaHVua3NcIjtcbmltcG9ydCB7IHN0cmluZ0xpc3RMZW5ndGggfSBmcm9tIFwiLi9zdHJpbmctbGlzdC1sZW5ndGhcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNvbHVtbnNOb3RGaXR0aW5nVGhlU2NyZWVuKFxuICBjZWxsczogc3RyaW5nW10sXG4gIHNjcmVlbldpZHRoOiBudW1iZXIsXG4pOiBzdHJpbmdbXSB7XG4gIGNlbGxzID0gWy4uLmNlbGxzXTtcbiAgY29uc3Qgc2xpY2VkQ2VsbHMgPSBjZWxscy5zbGljZSgwLCAtMSk7XG4gIGlmIChzdHJpbmdMaXN0TGVuZ3RoKHNsaWNlZENlbGxzKSA+PSBzY3JlZW5XaWR0aCkge1xuICAgIHJldHVybiByZW1vdmVDb2x1bW5zTm90Rml0dGluZ1RoZVNjcmVlbihzbGljZWRDZWxscywgc2NyZWVuV2lkdGgpO1xuICB9XG4gIHJldHVybiBjZWxscztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByaW50TGlzdHMoXG4gIGxpbmVzTGlzdDogc3RyaW5nW11bXSxcbiAgYWRkTGVmdFBhZGRpbmcgPSBmYWxzZSxcbikge1xuICBjb25zdCB3aG9sZUxlZnRQYWRkaW5nID0gYWRkTGVmdFBhZGRpbmcgPyAyIDogMDtcblxuICBjb25zdCBjb2x1bW5zID0gbGluZXNMaXN0LnJlZHVjZShcbiAgICAoY29sQ291bnQsIGxpbmUpID0+IE1hdGgubWF4KGNvbENvdW50LCBsaW5lLmxlbmd0aCksXG4gICAgMCxcbiAgKTtcblxuICBjb25zdCBjb2x1bW5zV2lkdGggPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBjb2x1bW5zIH0pLm1hcChcbiAgICAoXywgY29sdW1uSW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHdpZHRoID0gbGluZXNMaXN0LnJlZHVjZSgodywgbGluZSkgPT4ge1xuICAgICAgICBjb25zdCBjZWxsID0gbGluZVtjb2x1bW5JbmRleF07XG4gICAgICAgIGlmIChjZWxsKSB7XG4gICAgICAgICAgY29uc3QgY2VsbExpbmVzID0gY2VsbC5zcGxpdChcIlxcblwiKTtcblxuICAgICAgICAgIGNvbnN0IGNlbGxMaW5lc1dpZHRocyA9IGNlbGxMaW5lcy5tYXAoXG4gICAgICAgICAgICAobGluZSkgPT4gbGluZS5sZW5ndGgsXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHJldHVybiBNYXRoLm1heCh3LCAuLi5jZWxsTGluZXNXaWR0aHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHc7XG4gICAgICB9LCAwKTtcblxuICAgICAgcmV0dXJuIHdpZHRoICsgMjtcbiAgICB9LFxuICApO1xuXG4gIGNvbnN0IHNjcmVlbldpZHRoID0gcHJvY2Vzcy5zdGRvdXQuY29sdW1ucztcblxuICBmb3IgKGNvbnN0IGxpbmUgb2YgbGluZXNMaXN0KSB7XG4gICAgY29uc3QgbGluZUhlaWdodCA9IE1hdGgubWF4KFxuICAgICAgMSxcbiAgICAgIC4uLmxpbmUubWFwKChjZWxsKSA9PiBjb3VudENoYXIoY2VsbCwgXCJcXG5cIikgKyAxKSxcbiAgICApO1xuXG4gICAgY29uc3QgY29sdW1ucyA9IGxpbmUubWFwKChjZWxsVGV4dCwgY29sdW1uSW5kZXgsIGFycikgPT4ge1xuICAgICAgY29uc3QgY29sdW1uV2lkdGggPSBjb2x1bW5zV2lkdGhbY29sdW1uSW5kZXhdO1xuICAgICAgY29uc3QgdGV4dCA9IHBhZExlZnQocGFkQm90dG9tKGNlbGxUZXh0LCBsaW5lSGVpZ2h0KSwge1xuICAgICAgICBwYWRkaW5nTGVuZ3RoOiB3aG9sZUxlZnRQYWRkaW5nLFxuICAgICAgfSk7XG4gICAgICBpZiAoY29sdW1uSW5kZXggPT09IGFyci5sZW5ndGggLSAxKSByZXR1cm4gdGV4dDtcbiAgICAgIHJldHVybiBwYWRSaWdodCh0ZXh0LCB7IHRhcmdldFdpZHRoOiBjb2x1bW5XaWR0aCB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJvd3MgPSBjb2x1bW5zLnJlZHVjZSgocm93czogc3RyaW5nW11bXSwgYykgPT4ge1xuICAgICAgY29uc3QgY2VsbExpbmVzID0gYy5zcGxpdChcIlxcblwiKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjZWxsTGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFyb3dzW2ldKSByb3dzW2ldID0gW107XG4gICAgICAgIHJvd3NbaV0ucHVzaChjZWxsTGluZXNbaV0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcm93cztcbiAgICB9LCBbXSk7XG5cbiAgICBmb3IgKGNvbnN0IGNlbGxzIG9mIHJvd3MpIHtcbiAgICAgIGNvbnN0IHNsaWNlZENlbGxzID0gcmVtb3ZlQ29sdW1uc05vdEZpdHRpbmdUaGVTY3JlZW4oXG4gICAgICAgIGNlbGxzLFxuICAgICAgICBzY3JlZW5XaWR0aCxcbiAgICAgICk7XG5cbiAgICAgIGlmIChzbGljZWRDZWxscy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgaWYgKHN0cmluZ0xpc3RMZW5ndGgoc2xpY2VkQ2VsbHMpID4gc2NyZWVuV2lkdGgpIHtcbiAgICAgICAgY29uc3QgbGFzdENlbGwgPSBzbGljZWRDZWxscy5zcGxpY2UoLTEpWzBdO1xuXG4gICAgICAgIGNvbnN0IHBhZExlZnRXaWR0aCA9XG4gICAgICAgICAgc3RyaW5nTGlzdExlbmd0aChzbGljZWRDZWxscykgKyB3aG9sZUxlZnRQYWRkaW5nO1xuICAgICAgICBjb25zdCBsYXN0Q2VsbFdpZHRoID0gc2NyZWVuV2lkdGggLSBwYWRMZWZ0V2lkdGg7XG5cbiAgICAgICAgY29uc3QgW2ZpcnN0Q2h1bmssIC4uLmNodW5rc10gPSBzcGxpdFRvTkxlbmd0aENodW5rcyhcbiAgICAgICAgICBsYXN0Q2VsbCxcbiAgICAgICAgICBsYXN0Q2VsbFdpZHRoLFxuICAgICAgICApO1xuXG4gICAgICAgIHNsaWNlZENlbGxzLnB1c2goZmlyc3RDaHVuayk7XG5cbiAgICAgICAgT3V0Lm91dChodG1sYCA8c3Bhbj4ke3NsaWNlZENlbGxzLmpvaW4oXCJcIil9PC9zcGFuPiBgKTtcblxuICAgICAgICBmb3IgKGNvbnN0IGNodW5rIG9mIGNodW5rcykge1xuICAgICAgICAgIGNvbnN0IHRleHQgPSBwYWRMZWZ0KGNodW5rLCB7XG4gICAgICAgICAgICBwYWRkaW5nTGVuZ3RoOiBwYWRMZWZ0V2lkdGgsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgT3V0Lm91dChodG1sYCA8c3Bhbj4ke3RleHR9PC9zcGFuPiBgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgT3V0Lm91dChodG1sYCA8c3Bhbj4ke3NsaWNlZENlbGxzLmpvaW4oXCJcIil9PC9zcGFuPiBgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQXFCO0FBQ3JCLG9CQUFvQjtBQUNwQix3QkFBMEI7QUFDMUIsd0JBQTBCO0FBQzFCLHNCQUF3QjtBQUN4Qix1QkFBeUI7QUFDekIsc0NBQXFDO0FBQ3JDLGdDQUFpQztBQUUxQixTQUFTLGlDQUNkLE9BQ0EsYUFDVTtBQUNWLFVBQVEsQ0FBQyxHQUFH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
