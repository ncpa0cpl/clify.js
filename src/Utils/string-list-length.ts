export function stringListLength(strings: string[]) {
  return strings.reduce(
    (len, c) => len + Math.max(0, ...c.split("\n").map((l) => l.length)),
    0
  );
}
