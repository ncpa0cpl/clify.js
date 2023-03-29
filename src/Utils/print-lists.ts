import { countChar } from "./count-char";
import { padBottom } from "./pad-bottom";
import { padLeft } from "./pad-left";
import { padRight } from "./pad-right";
import { splitToNLengthChunks } from "./split-to-n-length-chunks";
import { stringListLength } from "./string-list-length";

export function removeColumnsNotFittingTheScreen(
  cells: string[],
  screenWidth: number
): string[] {
  cells = [...cells];
  const slicedCells = cells.slice(0, -1);
  if (stringListLength(slicedCells) >= screenWidth) {
    return removeColumnsNotFittingTheScreen(slicedCells, screenWidth);
  }
  return cells;
}

export function printLists(linesList: string[][], addLeftPadding = false) {
  const wholeLeftPadding = addLeftPadding ? 2 : 0;

  const columns = linesList.reduce(
    (colCount, line) => Math.max(colCount, line.length),
    0
  );

  const columnsWidth = Array.from({ length: columns }).map((_, columnIndex) => {
    const width = linesList.reduce((w, line) => {
      const cell = line[columnIndex];
      if (cell) {
        const cellLines = cell.split("\n");

        const cellLinesWidths = cellLines.map((line) => line.length);

        return Math.max(w, ...cellLinesWidths);
      }

      return w;
    }, 0);

    return width + 2;
  });

  const screenWidth = process.stdout.columns;

  for (const line of linesList) {
    const lineHeight = Math.max(
      1,
      ...line.map((cell) => countChar(cell, "\n") + 1)
    );

    const columns = line.map((cellText, columnIndex, arr) => {
      const columnWidth = columnsWidth[columnIndex];
      const text = padLeft(padBottom(cellText, lineHeight), {
        paddingLength: wholeLeftPadding,
      });
      if (columnIndex === arr.length - 1) return text;
      return padRight(text, { targetWidth: columnWidth });
    });

    const rows = columns.reduce((rows: string[][], c) => {
      const cellLines = c.split("\n");

      for (let i = 0; i < cellLines.length; i++) {
        if (!rows[i]) rows[i] = [];
        rows[i].push(cellLines[i]);
      }

      return rows;
    }, []);

    for (const cells of rows) {
      const slicedCells = removeColumnsNotFittingTheScreen(cells, screenWidth);

      if (slicedCells.length === 0) return;

      if (stringListLength(slicedCells) > screenWidth) {
        const lastCell = slicedCells.splice(-1)[0];

        const padLeftWidth = stringListLength(slicedCells) + wholeLeftPadding;
        const lastCellWidth = screenWidth - padLeftWidth;

        const [firstChunk, ...chunks] = splitToNLengthChunks(
          lastCell,
          lastCellWidth
        );

        slicedCells.push(firstChunk);

        console.log(slicedCells.join(""));

        for (const chunk of chunks) {
          const text = padLeft(chunk, { paddingLength: padLeftWidth });
          console.log(text);
        }
      } else {
        console.log(slicedCells.join(""));
      }
    }
  }
}
