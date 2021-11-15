export function stringListLength(strings: string[]) {
  return strings.reduce((len, c) => len + c.length, 0);
}
