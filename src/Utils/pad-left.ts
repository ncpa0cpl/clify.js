export function padLeft(
  text: string,
  options:
    | { paddingLength?: undefined; targetWidth: number }
    | { paddingLength: number; targetWidth?: undefined }
) {
  let paddingLength = options.paddingLength ?? 0;

  if (options.targetWidth) {
    if (options.targetWidth <= text.length)
      return text.slice(0, options.targetWidth);

    paddingLength = options.targetWidth - text.length;
  }

  return `${Array.from({ length: paddingLength }, () => " ").join("")}${text}`;
}
