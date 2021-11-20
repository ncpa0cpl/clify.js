import { compareStrings } from "../../src/Utils/compare-strings";

describe("compareStrings", () => {
  describe("should correctly compare similarly formatted string", () => {
    describe("with only letters", () => {
      it("when used directly", () => {
        const a = "fooBarA";
        const b = "fooBarB";

        expect(compareStrings(a, b)).toEqual(-1);
        expect(compareStrings(b, a)).toEqual(1);

        expect(compareStrings("foo", "foo")).toEqual(0);
      });

      it("when used with generator", () => {
        const a = "fooBarA";
        const b = "fooBarB";

        expect(compareStrings({})(a, b)).toEqual(-1);
        expect(compareStrings({})(b, a)).toEqual(1);

        expect(compareStrings({})("foo", "foo")).toEqual(0);
      });

      it("when used with generator and reversed", () => {
        const a = "fooBarA";
        const b = "fooBarB";

        expect(compareStrings({ reverse: true })(a, b)).toEqual(1);
        expect(compareStrings({ reverse: true })(b, a)).toEqual(-1);

        expect(compareStrings({ reverse: true })("foo", "foo")).toEqual(0);
      });

      it("when used with generator and with numeric option", () => {
        const a = "fooBarA";
        const b = "fooBarB";

        expect(compareStrings({ numCompare: true })(a, b)).toEqual(-1);
        expect(compareStrings({ numCompare: true })(b, a)).toEqual(1);

        expect(compareStrings({ numCompare: true })("foo", "foo")).toEqual(0);
      });
    });

    describe("with only numbers", () => {
      it("when used directly", () => {
        const a = "123";
        const b = "127";

        expect(compareStrings(a, b)).toEqual(-1);
        expect(compareStrings(b, a)).toEqual(1);

        expect(compareStrings("123", "123")).toEqual(0);
      });

      it("when used with generator", () => {
        const a = "123";
        const b = "127";

        expect(compareStrings({})(a, b)).toEqual(-1);
        expect(compareStrings({})(b, a)).toEqual(1);

        expect(compareStrings({})("123", "123")).toEqual(0);
      });

      it("when used with generator and reversed", () => {
        const a = "123";
        const b = "127";

        expect(compareStrings({ reverse: true })(a, b)).toEqual(1);
        expect(compareStrings({ reverse: true })(b, a)).toEqual(-1);

        expect(compareStrings({ reverse: true })("123", "123")).toEqual(0);
      });

      it("when used with generator and with numeric option", () => {
        const a = "123";
        const b = "1";

        expect(compareStrings({ numCompare: true })(a, b)).toEqual(1);
        expect(compareStrings({ numCompare: true })(b, a)).toEqual(-1);

        expect(compareStrings({ numCompare: true })("123", "123")).toEqual(0);
      });
    });

    describe("with only letters and numbers", () => {
      it("for string formatted as <string><number>", () => {
        const comparator = compareStrings({ numCompare: true });

        expect(comparator("foo123", "foo123")).toEqual(0);

        expect(comparator("foo100", "foo1")).toEqual(1);
        expect(comparator("foo1", "foo100")).toEqual(-1);
        expect(comparator("foo11", "foo100")).toEqual(-1);
        expect(comparator("foo1", "bar100")).toEqual(1);
      });

      it("for string formatted as <number><string>", () => {
        const comparator = compareStrings({ numCompare: true });

        expect(comparator("123foo", "123foo")).toEqual(0);

        expect(comparator("100foo", "1foo")).toEqual(1);
        expect(comparator("1foo", "100foo")).toEqual(-1);
        expect(comparator("100foo", "11foo")).toEqual(1);
        expect(comparator("11foo", "100foo")).toEqual(-1);
      });
    });
  });

  it("should correctly compare differently formatted strings", () => {
    const comparator = compareStrings({ numCompare: true });

    expect(comparator("", "")).toEqual(0);

    expect(comparator("abcde1000", "1abcde")).toEqual(1);
    expect(comparator("0eoigvn", "eoigvn0")).toEqual(-1);
    expect(comparator("abcdef100", "a100")).toEqual(1);
    expect(comparator("abcdef9", "abcdefg0")).toEqual(-1);
    expect(comparator("a-10-b-25", "a-10-b-100")).toEqual(-1);
    expect(comparator("a-10-b-100", "a-10-b-25")).toEqual(1);
    expect(comparator("1-foo-69-a", "a-foo-69-b")).toEqual(-1);
    expect(comparator("a-foo-69-b", "1-foo-69-a")).toEqual(1);
    expect(comparator("abc-def-ghi", "abc-123-jkl")).toEqual(1);
    expect(comparator("abc-123-jkl", "abc-def-ghi")).toEqual(-1);
  });
});
