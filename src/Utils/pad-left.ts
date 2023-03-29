export function padLeft(
  text: string,
  options:
    | { paddingLength?: undefined; targetWidth: number }
    | { paddingLength: number; targetWidth?: undefined }
) {
  if (options.paddingLength !== undefined)
    options.paddingLength = Math.max(0, options.paddingLength);

  if (options.targetWidth !== undefined)
    options.targetWidth = Math.max(0, options.targetWidth);

  const textLines = text.split("\n");

  const paddedLines = textLines.map((line) => {
    let paddingLength = options.paddingLength ?? 0;

    if (options.targetWidth !== undefined) {
      if (options.targetWidth <= line.length)
        return line.slice(0, options.targetWidth);

      paddingLength = options.targetWidth - line.length;
    }

    return `${Array.from({ length: paddingLength }, () => " ").join(
      ""
    )}${line}`;
  });

  return paddedLines.join("\n");
}
