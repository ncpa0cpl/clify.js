import { countChar } from "./count-char";

export const padBottom = (text: string, targetHeight: number) => {
  const endLineCharCount = countChar(text, "\n") + 1;

  const paddingLength = Math.max(0, targetHeight - endLineCharCount);

  return `${text}${Array.from({ length: paddingLength }, () => "\n").join("")}`;
};
