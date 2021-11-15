export function padRight(
  text: string,
  options:
    | { paddingLength?: undefined; targetWidth: number }
    | { paddingLength: number; targetWidth?: undefined }
) {
  if (options.paddingLength !== undefined)
    options.paddingLength = Math.max(0, options.paddingLength);

  if (options.targetWidth !== undefined)
    options.targetWidth = Math.max(0, options.targetWidth);

  let paddingLength = options.paddingLength ?? 0;

  if (options.targetWidth !== undefined) {
    if (options.targetWidth <= text.length)
      return text.slice(0, options.targetWidth);

    paddingLength = options.targetWidth - text.length;
  }

  return `${text}${Array.from({ length: paddingLength }, () => " ").join("")}`;
}
