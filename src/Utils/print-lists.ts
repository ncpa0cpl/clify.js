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

export function printLists(lists: string[][], addLeftPadding = false) {
  const wholeLeftPadding = addLeftPadding ? 2 : 0;

  const columns = lists.reduce(
    (colCount, list) => Math.max(colCount, list.length),
    0
  );

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
      const text = padLeft(cellText, { paddingLength: wholeLeftPadding });
      if (columnIndex === arr.length - 1) return text;
      return padRight(text, { targetWidth: columnWidth });
    });

    const slicedCells = removeColumnsNotFittingTheScreen(cells, screenWidth);

    if (slicedCells.length === 0) return;

    if (stringListLength(slicedCells) > screenWidth) {
      const lastCell = slicedCells.splice(-1)[0];

      const padLeftWidth = stringListLength(slicedCells) + wholeLeftPadding;
      const lastCellWidth = screenWidth - padLeftWidth;

      const [firstChunk, ...chunks] = splitToNLengthChunks(lastCell, lastCellWidth);

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
