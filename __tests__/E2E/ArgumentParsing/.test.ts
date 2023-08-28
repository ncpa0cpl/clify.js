import path from "path";
import { NodeCommand } from "../command";

const s = (filename) => path.resolve(__dirname, filename);

describe("ArgumentParsing", () => {
  describe("parses all non-required argument types", () => {
    it("all undefined", async () => {
      const cmd = new NodeCommand(
        s("script.mts"),
        "test-non-required",
      );

      await cmd.run();

      const out = cmd.getStdio();
      const err = cmd.getStderr();

      expect(err).toEqual("");
      expect(out).toEqual(
        "String: undefined\nNumber: undefined\nBoolean: false\n",
      );
    });

    it("all defined", async () => {
      const cmd = new NodeCommand(
        s("script.mts"),
        "test-non-required",
        "--foo",
        "foo",
        "--bar",
        "123",
        "--baz",
      );

      const ecode = await cmd.run();

      const out = cmd.getStdio();
      const err = cmd.getStderr();

      expect(ecode).toEqual(0);
      expect(err).toEqual("");
      expect(out).toEqual(
        "String: foo\nNumber: 123\nBoolean: true\n",
      );
    });
  });

  describe("parses all required argument types", () => {
    it("all undefined", async () => {
      const cmd = new NodeCommand(s("script.mts"), "test-required");

      const ecode = await cmd.run();

      const out = cmd.getStdio();
      const err = cmd.getStderr();

      expect(ecode).toEqual(1);
      expect(err).toEqual(
        "Argument Error [--foo]\n  Argument not specified.\n",
      );
      expect(out).toEqual("");
    });

    it("bar undefined", async () => {
      const cmd = new NodeCommand(
        s("script.mts"),
        "test-required",
        "--foo",
        "foo",
        "--baz",
      );

      const ecode = await cmd.run();

      const out = cmd.getStdio();
      const err = cmd.getStderr();

      expect(ecode).toEqual(1);
      expect(err).toEqual(
        "Argument Error [--bar]\n  Argument not specified.\n",
      );
      expect(out).toEqual("");
    });

    it("baz undefined", async () => {
      const cmd = new NodeCommand(
        s("script.mts"),
        "test-required",
        "--foo",
        "foo",
        "--bar",
        "23",
      );

      const ecode = await cmd.run();

      const out = cmd.getStdio();
      const err = cmd.getStderr();

      expect(err).toEqual("");
      expect(ecode).toEqual(0);
      expect(out).toEqual(
        "String: foo\nNumber: 23\nBoolean: false\n",
      );
    });

    it("all defined", async () => {
      const cmd = new NodeCommand(
        s("script.mts"),
        "test-required",
        "--foo",
        "foo",
        "--bar",
        "123",
        "--baz",
      );

      const ecode = await cmd.run();

      const output = cmd.getStdio();
      const err = cmd.getStderr();

      expect(ecode).toEqual(0);
      expect(err).toEqual("");
      expect(output).toEqual(
        "String: foo\nNumber: 123\nBoolean: true\n",
      );
    });
  });

  describe("number parsing", () => {
    it("correctly parses floating points", async () => {
      const cmd = new NodeCommand(
        s("script.mts"),
        "test-num",
        "-b",
        "123.456",
      );

      const ecode = await cmd.run();

      const output = cmd.getStdio();
      const err = cmd.getStderr();

      expect(ecode).toEqual(0);
      expect(err).toEqual("");
      expect(output).toEqual("Number: 123.456 (number)\n");
    });

    it("correctly parses negative number", async () => {
      const cmd = new NodeCommand(
        s("script.mts"),
        "test-num",
        "-b",
        "-123",
      );

      const ecode = await cmd.run();

      const output = cmd.getStdio();
      const err = cmd.getStderr();

      expect(err).toEqual("");
      expect(output).toEqual("Number: -123 (number)\n");
      expect(ecode).toEqual(0);
    });

    it("correctly parses e-notation", async () => {
      const cmd = new NodeCommand(
        s("script.mts"),
        "test-num",
        "-b",
        "123e-2",
      );

      const ecode = await cmd.run();

      const output = cmd.getStdio();
      const err = cmd.getStderr();

      expect(ecode).toEqual(0);
      expect(err).toEqual("");
      expect(output).toEqual("Number: 1.23 (number)\n");
    });

    it("throws errors when provided with invalid values", async () => {
      const cmd = new NodeCommand(
        s("script.mts"),
        "test-num",
        "-b",
        "1.2.3",
      );

      const ecode = await cmd.run();

      const out = cmd.getStdio();
      const err = cmd.getStderr();

      expect(ecode).toEqual(1);
      expect(out).toEqual("");
      expect(err).toEqual(
        'Argument Error [--bar]\n  Expected number, but received: "1.2.3"\n',
      );
    });
  });

  describe("boolean parsing", () => {
    it("should parse into true when specified", async () => {
      const cmd = new NodeCommand(s("script.mts"), "test-bool", "-z");

      let ecode = await cmd.run();

      let out = cmd.getStdio();
      let err = cmd.getStderr();

      expect(ecode).toEqual(0);
      expect(err).toEqual("");
      expect(out).toEqual("Boolean: true (boolean)\n");
    });

    it("should parse into false when not specified", async () => {
      const cmd = new NodeCommand(s("script.mts"), "test-bool");

      let ecode = await cmd.run();

      let out = cmd.getStdio();
      let err = cmd.getStderr();

      expect(ecode).toEqual(0);
      expect(err).toEqual("");
      expect(out).toEqual("Boolean: false (boolean)\n");
    });

    it("should parse into false when inverted specified", async () => {
      const cmd = new NodeCommand(
        s("script.mts"),
        "test-invert-bool",
        "-q",
      );

      let ecode = await cmd.run();

      let out = cmd.getStdio();
      let err = cmd.getStderr();

      expect(err).toEqual("");
      expect(ecode).toEqual(0);
      expect(out).toEqual("Boolean: false (boolean)\n");
    });

    it("should parse into true when inverted and not specified", async () => {
      const cmd = new NodeCommand(
        s("script.mts"),
        "test-invert-bool",
      );

      let ecode = await cmd.run();

      let out = cmd.getStdio();
      let err = cmd.getStderr();

      expect(ecode).toEqual(0);
      expect(err).toEqual("");
      expect(out).toEqual("Boolean: true (boolean)\n");
    });
  });

  describe("array parsing", () => {
    it("should parse array of strings", async () => {
      const cmd = new NodeCommand(
        s("script.mts"),
        "test-array",
        "-a",
        "foo",
      );

      let ecode = await cmd.run();

      let out = cmd.getStdio();
      let err = cmd.getStderr();

      expect(ecode).toEqual(0);
      expect(err).toEqual("");
      expect(out).toEqual("Array: foo (string)\n");

      cmd.changeArgs("test-array", "-a", "foo,bar,1 2 3 abc.;");

      ecode = await cmd.run();

      out = cmd.getStdio();
      err = cmd.getStderr();

      expect(ecode).toEqual(0);
      expect(err).toEqual("");
      expect(out).toEqual(
        "Array: foo (string), bar (string), 1 2 3 abc.; (string)\n",
      );
    });

    it("should parse a union array", async () => {
      const cmd = new NodeCommand(
        s("script.mts"),
        "test-union-array",
        "-n",
        "1",
      );

      let ecode = await cmd.run();

      let out = cmd.getStdio();
      let err = cmd.getStderr();

      expect(err).toEqual("");
      expect(ecode).toEqual(0);
      expect(out).toEqual("Array: true (boolean)\n");

      cmd.changeArgs(
        "test-union-array",
        "-n",
        "0,1,2,3,01,true,false,foo",
      );

      ecode = await cmd.run();

      out = cmd.getStdio();
      err = cmd.getStderr();

      expect(ecode).toEqual(0);
      expect(err).toEqual("");
      expect(out).toEqual(
        "Array: false (boolean), true (boolean), 2 (string), 3 (string), 01 (string), true (boolean), false (boolean), foo (string)\n",
      );
    });

    it("should not split the string on escaped separators", async () => {
      const cmd = new NodeCommand(
        s("script.mts"),
        "test-array",
        "-a",
        "foo,bar\\,baz,qux",
      );

      let ecode = await cmd.run();

      let out = cmd.getStdio();
      let err = cmd.getStderr();

      expect(err).toEqual("");
      expect(ecode).toEqual(0);
      expect(out).toEqual(
        "Array: foo (string), bar,baz (string), qux (string)\n",
      );

      cmd.changeArgs(
        "test-array",
        "-a",
        "foo,bar\\\\,baz,qux\\\\\\,coorg",
      );

      ecode = await cmd.run();

      out = cmd.getStdio();
      err = cmd.getStderr();

      expect(err).toEqual("");
      expect(ecode).toEqual(0);
      expect(out).toEqual(
        "Array: foo (string), bar\\ (string), baz (string), qux\\,coorg (string)\n",
      );
    });
  });

  describe("union parsing", () => {
    it("should parse a union", async () => {
      const cmd = new NodeCommand(
        s("script.mts"),
        "test-union",
        "-u",
        "foo",
      );

      let ecode = await cmd.run();

      let out = cmd.getStdio();
      let err = cmd.getStderr();

      expect(err).toEqual("");
      expect(ecode).toEqual(0);
      expect(out).toEqual("Union: foo (string)\n");

      cmd.changeArgs("test-union", "-u", "3e+12");

      ecode = await cmd.run();

      out = cmd.getStdio();
      err = cmd.getStderr();

      expect(err).toEqual("");
      expect(ecode).toEqual(0);
      expect(out).toEqual("Union: 3000000000000 (number)\n");

      cmd.changeArgs("test-union", "-u", ".14e+6");

      ecode = await cmd.run();

      out = cmd.getStdio();
      err = cmd.getStderr();

      expect(err).toEqual("");
      expect(ecode).toEqual(0);
      expect(out).toEqual("Union: 140000 (number)\n");

      cmd.changeArgs("test-union", "-u", "2.e+3");

      ecode = await cmd.run();

      out = cmd.getStdio();
      err = cmd.getStderr();

      expect(err).toEqual("");
      expect(ecode).toEqual(0);
      expect(out).toEqual("Union: 2000 (number)\n");

      cmd.changeArgs("test-union", "-u", "1.1e-1");

      ecode = await cmd.run();

      out = cmd.getStdio();
      err = cmd.getStderr();

      expect(err).toEqual("");
      expect(ecode).toEqual(0);
      expect(out).toEqual("Union: 0.11 (number)\n");
    });
  });

  describe("literal parsing", () => {
    it("should correctly parse all valid values", async () => {
      const cmd = new NodeCommand(
        s("script.mts"),
        "test-literal",
        "-l",
        "foo",
      );

      let ecode = await cmd.run();

      let out = cmd.getStdio();
      let err = cmd.getStderr();

      expect(err).toEqual("");
      expect(ecode).toEqual(0);
      expect(out).toEqual("Literal: foo (string)\n");

      cmd.changeArgs("test-literal", "-l", "bar");

      ecode = await cmd.run();

      out = cmd.getStdio();
      err = cmd.getStderr();

      expect(err).toEqual("");
      expect(ecode).toEqual(0);
      expect(out).toEqual("Literal: bar (string)\n");

      cmd.changeArgs("test-literal", "-l", "0");

      ecode = await cmd.run();

      out = cmd.getStdio();
      err = cmd.getStderr();

      expect(err).toEqual("");
      expect(ecode).toEqual(0);
      expect(out).toEqual("Literal: 0 (number)\n");

      cmd.changeArgs("test-literal", "-l", "true");

      ecode = await cmd.run();

      out = cmd.getStdio();
      err = cmd.getStderr();

      expect(err).toEqual("");
      expect(ecode).toEqual(0);
      expect(out).toEqual("Literal: true (boolean)\n");
    });
  });

  describe("file argument parsing", () => {
    it("should load the file contents", async () => {
      const cmd = new NodeCommand(
        s("script.mts"),
        "test-file",
        "./lorem-ipsum",
      ).setCwd(__dirname);

      let ecode = await cmd.run();

      let out = cmd.getStdio();
      let err = cmd.getStderr();

      expect(err).toEqual("");
      expect(ecode).toEqual(0);
      expect(out).toEqual(
        "File: Lorem ipsum dolor sit amet\nconsectetur adipiscing elit\n",
      );
    });

    it("should load the file contents when a flag is used", async () => {
      const cmd = new NodeCommand(
        s("script.mts"),
        "test-file-with-flag",
        "-z",
        "./lorem-ipsum",
      ).setCwd(__dirname);

      let ecode = await cmd.run();

      let out = cmd.getStdio();
      let err = cmd.getStderr();

      expect(err).toEqual("");
      expect(ecode).toEqual(0);
      expect(out).toEqual(
        "Boolean: true\nFile: Lorem ipsum dolor sit amet\nconsectetur adipiscing elit\n",
      );
    });
  });

  describe("file handle argument parsing", () => {
    it("should load the file contents", async () => {
      const cmd = new NodeCommand(
        s("script.mts"),
        "test-file-handle",
        "./lorem-ipsum",
      ).setCwd(__dirname);

      let ecode = await cmd.run();

      let out = cmd.getStdio();
      let err = cmd.getStderr();

      expect(err).toEqual("");
      expect(ecode).toEqual(0);
      expect(out).toEqual(
        "File: Lorem ipsum dolor sit amet\nconsectetur adipiscing elit\n",
      );
    });

    it("should load the file contents when a flag is used", async () => {
      const cmd = new NodeCommand(
        s("script.mts"),
        "test-file-handle-with-flag",
        "-z",
        "./lorem-ipsum",
      ).setCwd(__dirname);

      let ecode = await cmd.run();

      let out = cmd.getStdio();
      let err = cmd.getStderr();

      expect(err).toEqual("");
      expect(ecode).toEqual(0);
      expect(out).toEqual(
        "Boolean: true\nFile: Lorem ipsum dolor sit amet\nconsectetur adipiscing elit\n",
      );
    });
  });
});
