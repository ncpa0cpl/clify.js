export function parseArgumentValue(value: string) {
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
}
