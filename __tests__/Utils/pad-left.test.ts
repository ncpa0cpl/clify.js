import { padLeft } from "../../src/Utils/pad-left";

describe("padLeft", () => {
  it("should add the specified number of spaces to the string", () => {
    const text = "foo";

    const paddedText2Spaces = padLeft(text, { paddingLength: 2 });
    const paddedText3Spaces = padLeft(text, { paddingLength: 3 });
    const paddedText10Spaces = padLeft(text, { paddingLength: 10 });

    expect(paddedText2Spaces).toEqual("  foo");
    expect(paddedText3Spaces).toEqual("   foo");
    expect(paddedText10Spaces).toEqual("          foo");
  });

  it("should add amount of spaces necessary for the string to have the specified length", () => {
    const text = "bar";

    const noPadding = padLeft(text, { targetWidth: 3 });
    const paddedText1Space = padLeft(text, { targetWidth: 4 });
    const paddedText2Spaces = padLeft(text, { targetWidth: 5 });
    const paddedText3Spaces = padLeft(text, { targetWidth: 6 });
    const paddedText10Spaces = padLeft(text, { targetWidth: 13 });

    expect(noPadding).toEqual("bar");
    expect(paddedText1Space).toEqual(" bar");
    expect(paddedText2Spaces).toEqual("  bar");
    expect(paddedText2Spaces).toEqual("  bar");
    expect(paddedText3Spaces).toEqual("   bar");
    expect(paddedText10Spaces).toEqual("          bar");
  });

  it("should trim the end of string when it's too long", () => {
    const text = "baz";

    const trimmed1 = padLeft(text, { targetWidth: 2 });
    const trimmed2 = padLeft(text, { targetWidth: 1 });
    const trimmed3 = padLeft(text, { targetWidth: 0 });

    expect(trimmed1).toEqual("ba");
    expect(trimmed2).toEqual("b");
    expect(trimmed3).toEqual("");
  });

  it("should not fail when provided with a negative number", () => {
    const text = "qux";

    const negativePadding = padLeft(text, { paddingLength: -2 });
    const negativeTarget = padLeft(text, { targetWidth: -2 });

    expect(negativePadding).toEqual(text);
    expect(negativeTarget).toEqual("");
  });
});
