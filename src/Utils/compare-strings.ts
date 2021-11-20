import { isNumerical } from "./is-numerical";
import { splitByAlphanumericTransitions } from "./split-by-alphanumeric-transitions";

function compare(a: string, b: string): -1 | 0 | 1 {
  if (a === b) return 0;

  const shorter = a.length > b.length ? b : a;

  for (const index of Array.from({ length: shorter.length }, (_, i) => i)) {
    const charCodeA = a.charCodeAt(index);
    const charCodeB = b.charCodeAt(index);

    if (charCodeA < charCodeB) return -1;
    if (charCodeA > charCodeB) return 1;
  }

  return a.length > b.length ? 1 : -1;
}

function compareWithNumbers(a: string, b: string): -1 | 0 | 1 {
  if (a === b) return 0;

  const partsOfA = splitByAlphanumericTransitions(a);
  const partsOfB = splitByAlphanumericTransitions(b);

  const shorter = partsOfA.length > partsOfB.length ? partsOfB : partsOfA;

  for (const index of Array.from({ length: shorter.length }, (_, i) => i)) {
    const substringA = partsOfA[index];
    const substringB = partsOfB[index];

    const aIsNumeric = isNumerical(substringA);
    const bIsNumeric = isNumerical(substringB);

    if (aIsNumeric && !bIsNumeric) {
      return -1;
    }

    if (!aIsNumeric && bIsNumeric) {
      return 1;
    }

    if (aIsNumeric && bIsNumeric) {
      const numA = Number(substringA);
      const numB = Number(substringB);

      if (numA < numB) return -1;
      if (numA > numB) return 1;
    }

    if (!aIsNumeric && !bIsNumeric) {
      const substringCompare = compare(substringA, substringB);
      if (substringCompare !== 0) return substringCompare;
    }
  }

  return 0;
}

function compareStrings(strA: string, strB: string): -1 | 0 | 1;
function compareStrings(options: {
  numCompare?: boolean;
  reverse?: boolean;
}): (a: string, b: string) => -1 | 0 | 1;
function compareStrings(
  arg_0: unknown,
  arg_1?: unknown
): -1 | 0 | 1 | ((a: string, b: string) => -1 | 0 | 1) {
  if (typeof arg_0 === "string" && typeof arg_1 === "string") {
    return compare(arg_0, arg_1);
  }

  if (typeof arg_0 === "object" && arg_0 !== null) {
    // @ts-expect-error
    const numCompare = arg_0["numCompare"] ?? false;
    // @ts-expect-error
    const reverse = arg_0["reverse"] ?? false;

    if (numCompare) {
      return (a: string, b: string) => {
        if (reverse) return REVERSE_TABLE[compareWithNumbers(a, b)];
        return compareWithNumbers(a, b);
      };
    }

    return (a: string, b: string) => {
      if (reverse) return REVERSE_TABLE[compare(a, b)];
      return compare(a, b);
    };
  }

  return compare;
}

const REVERSE_TABLE = {
  "-1": 1,
  "0": 0,
  "1": -1,
} as const;

export { compareStrings };
