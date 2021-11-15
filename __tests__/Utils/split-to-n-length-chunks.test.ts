import { splitToNLengthChunks } from "../../src/Utils/split-to-n-length-chunks";

describe("splitToNLengthChunks", () => {
  it("should split the string into multiple chunks of a max length of n", () => {
    const text = "qwertyuiopasdfghjkl"; // length = 19

    const chunksOf2 = splitToNLengthChunks(text, 2);
    const chunksOf3 = splitToNLengthChunks(text, 3);
    const chunksOf5 = splitToNLengthChunks(text, 5);
    const chunksOf9 = splitToNLengthChunks(text, 9);
    const chunksOf15 = splitToNLengthChunks(text, 15);
    const chunksOf18 = splitToNLengthChunks(text, 18);
    const chunksOf19 = splitToNLengthChunks(text, 19);

    expect(chunksOf2).toEqual([
      "qw",
      "er",
      "ty",
      "ui",
      "op",
      "as",
      "df",
      "gh",
      "jk",
      "l",
    ]);
    expect(chunksOf3).toEqual(["qwe", "rty", "uio", "pas", "dfg", "hjk", "l"]);
    expect(chunksOf5).toEqual(["qwert", "yuiop", "asdfg", "hjkl"]);
    expect(chunksOf9).toEqual(["qwertyuio", "pasdfghjk", "l"]);
    expect(chunksOf15).toEqual(["qwertyuiopasdfg", "hjkl"]);
    expect(chunksOf18).toEqual(["qwertyuiopasdfghjk", "l"]);
    expect(chunksOf19).toEqual(["qwertyuiopasdfghjkl"]);
  });
});
