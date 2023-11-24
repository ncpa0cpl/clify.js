import minimist from "minimist";
import { describe, expect, it } from "vitest";
import { convertOptionValue } from "../../src/options/convert-option-value";
import { InvalidOptionError } from "../../src/options/option-error";

const conv = convertOptionValue;

describe("convertOptionValue", () => {
  describe("Type: 'string'", () => {
    it("should properly converts any primitive to string", () => {
      expect(conv(minimist(["-v", "123"]).v, "string", "")).toBe("123");
      expect(conv(minimist(["-v"]).v, "string", "")).toBe("true");
      expect(conv(minimist(["-v", "hello"]).v, "string", "")).toBe("hello");
    });

    it("throw if provided more than one argument", () => {
      expect(
        conv(minimist(["-v", "123", "-v", "0"]).v, "string", "")
      ).toBeInstanceOf(InvalidOptionError);
    });
  });

  describe("Type: 'number'", () => {
    it("should let through any number", () => {
      expect(conv(minimist(["-v", "123"]).v, "number", "")).toBe(123);
      expect(conv(minimist(["-v", "0"]).v, "number", "")).toBe(0);
      expect(conv(minimist(["-v=-123"]).v, "number", "")).toBe(-123);
      expect(conv(minimist(["-v", "1.23"]).v, "number", "")).toBe(1.23);
    });

    it("should throw if value is not a number", () => {
      expect(conv(minimist(["-v", "hello"]).v, "number", "")).toBeInstanceOf(
        InvalidOptionError
      );
      expect(conv(minimist(["-v"]).v, "number", "")).toBeInstanceOf(
        InvalidOptionError
      );
      expect(conv(NaN, "number", "")).toBeInstanceOf(InvalidOptionError);
    });

    it("throw if provided more than one argument", () => {
      expect(
        conv(minimist(["-v", "123", "-v", "345"]).v, "number", "")
      ).toBeInstanceOf(InvalidOptionError);
    });
  });

  describe("Type: 'int'", () => {
    it("should let through any integer", () => {
      expect(conv(minimist(["-v", "123"]).v, "int", "")).toBe(123);
      expect(conv(minimist(["-v", "0"]).v, "int", "")).toBe(0);
      expect(conv(minimist(["-v=-123"]).v, "int", "")).toBe(-123);
    });

    it("should throw if value is not an integer", () => {
      expect(conv(minimist(["-v", "1.23"]).v, "int", "")).toBeInstanceOf(
        InvalidOptionError
      );
      expect(conv(minimist(["-v", "hello"]).v, "int", "")).toBeInstanceOf(
        InvalidOptionError
      );
      expect(conv(minimist(["-v"]).v, "int", "")).toBeInstanceOf(
        InvalidOptionError
      );
      expect(conv(NaN, "int", "")).toBeInstanceOf(InvalidOptionError);
    });

    it("throw if provided more than one argument", () => {
      expect(
        conv(minimist(["-v", "123", "-v", "345"]).v, "int", "")
      ).toBeInstanceOf(InvalidOptionError);
    });
  });

  describe("Type: 'boolean'", () => {
    it("should let through any boolean", () => {
      expect(conv(minimist(["-v"]).v, "boolean", "")).toBe(true);
    });

    it("should throw if value is not a boolean", () => {
      expect(conv(minimist(["-v", "1"]).v, "boolean", "")).toBeInstanceOf(
        InvalidOptionError
      );
      expect(conv(minimist(["-v", "hello"]).v, "boolean", "")).toBeInstanceOf(
        InvalidOptionError
      );
    });

    it("throw if provided more than one argument", () => {
      expect(conv(minimist(["-v=1", "-v"]).v, "boolean", "")).toBeInstanceOf(
        InvalidOptionError
      );
    });
  });

  describe("array of", () => {
    describe("Type: 'string'", () => {
      it("should properly converts any primitive to string", () => {
        expect(conv(minimist(["-v", "123"]).v, ["string"], "")).toEqual([
          "123",
        ]);
        expect(conv(minimist(["-v"]).v, ["string"], "")).toEqual(["true"]);
        expect(conv(minimist(["-v", "hello"]).v, ["string"], "")).toEqual([
          "hello",
        ]);
        expect(
          conv(minimist(["-v", "123", "-v", "", "-v", "foo"]).v, ["string"], "")
        ).toEqual(["123", "true", "foo"]);
        expect(conv(minimist(["-v=", "-v=bar"]).v, ["string"], "")).toEqual([
          "",
          "bar",
        ]);
        expect(conv(minimist(["-v", "-v", "bar"]).v, ["string"], "")).toEqual([
          "bar",
        ]);
      });
    });
  });
});
