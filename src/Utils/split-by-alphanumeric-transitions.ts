import { isNumerical } from "./is-numerical";

export function splitByAlphanumericTransitions(str: string): string[] {
  const results: string[] = [];

  const lastChar = (): string | undefined => results[results.length - 1];

  const addChar = (char: string) => (results[results.length - 1] += char);

  const addNextWord = (char: string) => results.push(char);

  for (const char of str.split("")) {
    const lastCharacter = lastChar();

    if (lastCharacter === undefined) {
      addNextWord(char);
      continue;
    }

    if (isNumerical(char) === isNumerical(lastCharacter)) {
      addChar(char);
      continue;
    }

    addNextWord(char);
  }

  return results;
}
