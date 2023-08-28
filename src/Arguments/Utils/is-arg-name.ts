export function isArgName(value: string): value is `-${string}` {
  if (value[0] !== "-") {
    return false;
  }

  if (value[1] === "-") {
    return true;
  }

  return value.length < 3;
}
