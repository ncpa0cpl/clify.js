import { splitByAlphanumericTransitions } from "../../src/Utils/split-by-alphanumeric-transitions";

describe("splitByAlphanumericTransitions", () => {
  it("should split the string into an array of strings where each elem is a string of only numbers or only not numbers", () => {
    const text = "a1bc23def456ghij7890";

    const result = splitByAlphanumericTransitions(text);

    expect(result).toEqual([
      "a",
      "1",
      "bc",
      "23",
      "def",
      "456",
      "ghij",
      "7890",
    ]);
  });
});
