export function splitToNLengthChunks(text: string, n: number) {
  const charArray = text.split("");

  const chunks: string[] = [];

  while (true) {
    const chunk = charArray.splice(0, n);

    if (chunk.length === 0) break;

    chunks.push(chunk.join(""));
  }

  return chunks;
}
