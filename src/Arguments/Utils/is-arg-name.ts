export function isArgName(value: string): value is `-${string}` {
  return value[0] === "-";
}
