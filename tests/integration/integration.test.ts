import minimist from "minimist";
import { afterEach, beforeAll, describe, expect, it, vitest } from "vitest";
import { Clify, configure, defineOption, Program } from "../../src/index";

const OptNum = defineOption({
  name: "onum",
  char: "n",
  type: "number",
  description: "A number",
});

const OptBool = defineOption({
  name: "obool",
  char: "b",
  type: "boolean",
  description: "A boolean",
});

const OptStr = defineOption({
  name: "ostr",
  char: "s",
  type: "string",
  description: "A string",
});

const OptInt = defineOption({
  name: "oint",
  char: "i",
  type: "int",
  description: "An integer",
});

const OptNumRequired = defineOption({
  name: "onumreq",
  type: "number",
  required: true,
  description: "A number (required)",
});

const OptBoolRequired = defineOption({
  name: "oboolreq",
  type: "boolean",
  required: true,
});

const OptStrRequired = defineOption({
  name: "ostrreq",
  type: "string",
  required: true,
});

const OptIntRequired = defineOption({
  name: "ointreq",
  type: "int",
  required: true,
  description: "An integer (required)",
});

const OptNumArr = defineOption({
  name: "onumarr",
  type: ["number"],
  description: "A number (accepts multiple values)",
});

const OptBoolArr = defineOption({
  name: "oboolarr",
  type: ["boolean"],
  description: "A boolean (accepts multiple values)",
});

const OptStrArr = defineOption({
  name: "ostrarr",
  type: ["string"],
  description: "A string (accepts multiple values)",
});

const OptIntArr = defineOption({
  name: "ointarr",
  type: ["int"],
  description: "An integer (accepts multiple values)",
});

const OptNumArrRequired = defineOption({
  name: "onumarrreq",
  type: ["number"],
  required: true,
});

const OptBoolArrRequired = defineOption({
  name: "oboolarrreq",
  type: ["boolean"],
  required: true,
});

const OptStrArrRequired = defineOption({
  name: "ostrarrreq",
  type: ["string"],
  required: true,
});

const OptIntArrRequired = defineOption({
  name: "ointarrreq",
  type: ["int"],
  required: true,
});

function runProgram(program: Program, vargs: string[]) {
  const parsed = minimist(vargs);
  return program.run(parsed._.join(" "), parsed);
}

describe("integration", () => {
  const onRun = vitest.fn();
  let logs = {
    info: [] as string[],
    error: [] as string[],
    warning: [] as string[],
  };

  beforeAll(() => {
    Clify.setLogger((type, msg) => {
      logs[type].push(msg.map(String).join(" "));
    });
  });

  afterEach(() => {
    logs = {
      info: [],
      error: [],
      warning: [],
    };
    onRun.mockReset();
  });

  describe("help message", () => {
    it("displays the subcommands with descriptions", async () => {
      const program = configure((app) => {
        app.setName("program");

        app.command("foo", (foo) => {
          foo.setDescription("Foo command");
          return onRun;
        });

        app.command("bar", (bar) => {
          bar.setDescription("Bar command");
          return onRun;
        });
      });

      const result = await runProgram(program, ["--help"]);

      expect(result).toBeUndefined();
      expect(onRun).not.toHaveBeenCalled();
      expect(logs.info).toEqual([
        "Usage: program COMMAND",
        "",
        "Commands:",
        "  bar    Bar command",
        "  foo    Foo command",
      ]);
    });

    it("displays the options with descriptions", async () => {
      const program = configure((app) => {
        app.setName("program");

        app.main((cmd) => {
          const str = cmd.option(OptStr);
          const num = cmd.option(OptNum);
          const bool = cmd.option(OptBool);
          const int = cmd.option(OptInt);
          const strArr = cmd.option(OptStrArr);
          const numArr = cmd.option(OptNumArr);
          const intArr = cmd.option(OptIntArr);

          return onRun;
        });
      });

      const result = await runProgram(program, ["--help"]);

      expect(result).toBeUndefined();
      expect(onRun).not.toHaveBeenCalled();
      expect(logs.info).toEqual([
        "Usage: program [...OPTIONS]",
        "",
        "Options:",
        "  --obool, -b              A boolean",
        "  --oint, -i <int>         An integer",
        "  --ointarr <...int>       An integer (accepts multiple values)",
        "  --onum, -n <number>      A number",
        "  --onumarr <...number>    A number (accepts multiple values)",
        "  --ostr, -s <string>      A string",
        "  --ostrarr <...string>    A string (accepts multiple values)",
      ]);
    });

    it("displays both commands and options", async () => {
      const program = configure((app) => {
        app.setName("program");

        app.main((cmd) => {
          const bool = cmd.option(OptBool);
          const int = cmd.option(OptInt);
          const num = cmd.option(OptNum);
          const str = cmd.option(OptStr);

          return onRun;
        });

        app.command("foo", (foo) => {
          foo.setDescription("Foo command");
          return onRun;
        });

        app.command("bar", (bar) => {
          bar.setDescription("Bar command");
          return onRun;
        });
      });

      const result = await runProgram(program, ["--help"]);

      expect(result).toBeUndefined();
      expect(onRun).not.toHaveBeenCalled();
      expect(logs.info).toEqual([
        "Usage: program COMMAND? [...OPTIONS]",
        "",
        "Commands:",
        "  bar    Bar command",
        "  foo    Foo command",
        "",
        "Options:",
        "  --obool, -b            A boolean",
        "  --oint, -i <int>       An integer",
        "  --onum, -n <number>    A number",
        "  --ostr, -s <string>    A string",
      ]);
    });

    it("displays both subcommands and options of a subcommand", async () => {
      const program = configure((app) => {
        app.setName("program");

        app.main((cmd) => {
          const bool = cmd.option(OptBool);
          const int = cmd.option(OptInt);
          const num = cmd.option(OptNum);
          const str = cmd.option(OptStr);

          return onRun;
        });

        const foo = app.command("foo", (foo) => {
          foo.setDescription("Foo command");
          const int = foo.option(OptIntRequired);
          const num = foo.option(OptNumRequired);

          return onRun;
        });

        foo.command("sub-foo", (subFoo) => {
          subFoo.setDescription("Sub Foo command");
          return onRun;
        });

        app.command("bar", (bar) => {
          bar.setDescription("Bar command");
          return onRun;
        });
      });

      const result = await runProgram(program, ["foo", "--help"]);

      expect(result).toBeUndefined();
      expect(onRun).not.toHaveBeenCalled();
      expect(logs.info).toEqual([
        "Usage: program foo COMMAND? [...OPTIONS]",
        "",
        "Foo command",
        "",
        "Commands:",
        "  sub-foo    Sub Foo command",
        "",
        "Options:",
        "  --ointreq <int>       An integer (required)",
        "  --onumreq <number>    A number (required)",
      ]);
    });
  });

  describe("handles invalid options", () => {
    describe("incorrect type", () => {
      it("requires number, receives string", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const num = main.option(OptNum);
            return onRun;
          });
        });

        const result = await runProgram(program, ["--onum", "foo"]);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Invalid option, expected 'number', but received 'string': --onum, -n",
        ]);
      });

      it("requires number, receives boolean", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const num = main.option(OptNum);
            return onRun;
          });
        });

        const result = await runProgram(program, ["--onum"]);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Invalid option, expected 'number', but received 'boolean': --onum, -n",
        ]);
      });

      it("requires number, receives number array", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const num = main.option(OptNum);
            return onRun;
          });
        });

        const result = await runProgram(program, [
          "--onum",
          "1",
          "--onum",
          "2",
        ]);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Invalid option, expected 'single value', but received 'multiple': --onum, -n",
        ]);
      });

      it("requires integer, receives float", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const num = main.option(OptInt);
            return onRun;
          });
        });

        const result = await runProgram(program, ["--oint", "1.23"]);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Invalid option, expected 'integer', but received 'float': --oint, -i",
        ]);
      });

      it("requires integer, receives string", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const num = main.option(OptInt);
            return onRun;
          });
        });

        const result = await runProgram(program, ["--oint", "foo"]);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Invalid option, expected 'integer', but received 'string': --oint, -i",
        ]);
      });

      it("requires integer, receives boolean", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const num = main.option(OptInt);
            return onRun;
          });
        });

        const result = await runProgram(program, ["--oint"]);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Invalid option, expected 'integer', but received 'boolean': --oint, -i",
        ]);
      });

      it("requires integer, receives string array", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const num = main.option(OptInt);
            return onRun;
          });
        });

        const result = await runProgram(program, [
          "--oint",
          "hello",
          "--oint",
          "world",
        ]);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Invalid option, expected 'single value', but received 'multiple': --oint, -i",
        ]);
      });

      it("requires boolean, receives string", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const bool = main.option(OptBool);
            return onRun;
          });
        });

        const result = await runProgram(program, ["--obool", "foo"]);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Invalid option, expected 'boolean', but received 'string': --obool, -b",
        ]);
      });

      it("requires boolean, receives number", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const bool = main.option(OptBool);
            return onRun;
          });
        });

        const result = await runProgram(program, ["--obool", "2"]);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Invalid option, expected 'boolean', but received 'number': --obool, -b",
        ]);
      });

      it("requires boolean, receives string array", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const bool = main.option(OptBool);
            return onRun;
          });
        });

        const result = await runProgram(program, [
          "--obool",
          "hello",
          "--obool",
          "world",
        ]);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Invalid option, expected 'single value', but received 'multiple': --obool, -b",
        ]);
      });

      it("requires number array, receives string", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const num = main.option(OptNumArr);
            return onRun;
          });
        });

        const result = await runProgram(program, ["--onumarr", "foo"]);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Invalid option, expected 'number', but received 'string': --onumarr",
        ]);
      });

      it("requires number array, receives string array", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const num = main.option(OptNumArr);
            return onRun;
          });
        });

        const result = await runProgram(program, [
          "--onumarr",
          "hello",
          "--onumarr",
          "world",
        ]);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Invalid option, expected 'number', but received 'string': --onumarr",
        ]);
      });

      it("requires number array, receives boolean", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const num = main.option(OptNumArr);
            return onRun;
          });
        });

        const result = await runProgram(program, ["--onumarr"]);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Invalid option, expected 'number', but received 'boolean': --onumarr",
        ]);
      });

      it("requires number, is not provided", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const num = main.option(OptNumRequired);
            return onRun;
          });
        });

        const result = await runProgram(program, []);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Unspecified option: --onumreq",
        ]);
      });

      it("requires integer, is not provided", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const num = main.option(OptIntRequired);
            return onRun;
          });
        });

        const result = await runProgram(program, []);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Unspecified option: --ointreq",
        ]);
      });

      it("requires boolean, is not provided", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const bool = main.option(OptBoolRequired);
            return onRun;
          });
        });

        const result = await runProgram(program, []);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Unspecified option: --oboolreq",
        ]);
      });

      it("requires string, is not provided", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const str = main.option(OptStrRequired);
            return onRun;
          });
        });

        const result = await runProgram(program, []);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Unspecified option: --ostrreq",
        ]);
      });

      it("requires number array, is not provided", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const num = main.option(OptNumArrRequired);
            return onRun;
          });
        });

        const result = await runProgram(program, []);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Unspecified option: --onumarrreq",
        ]);
      });

      it("requires integer array, is not provided", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const num = main.option(OptIntArrRequired);
            return onRun;
          });
        });

        const result = await runProgram(program, []);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Unspecified option: --ointarrreq",
        ]);
      });

      it("requires boolean array, is not provided", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const bool = main.option(OptBoolArrRequired);
            return onRun;
          });
        });

        const result = await runProgram(program, []);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Unspecified option: --oboolarrreq",
        ]);
      });

      it("requires string array, is not provided", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const str = main.option(OptStrArrRequired);
            return onRun;
          });
        });

        const result = await runProgram(program, []);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Unspecified option: --ostrarrreq",
        ]);
      });
    });

    describe("invalid subcommand", () => {
      it("under main cmd", async () => {
        const program = configure((app) => {});

        const result = await runProgram(program, ["foo"]);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual(["Unknown command: foo"]);
      });

      it("under subcommand", async () => {
        const program = configure((app) => {
          app.command("foo", () => {
            return () => {
              onRun();
              return "ok";
            };
          });
        });

        const successResult = await runProgram(program, ["foo"]);
        expect(successResult).toBe("ok");
        expect(onRun).toHaveBeenCalled();
        expect(logs.error).toEqual([]);

        onRun.mockReset();

        const result = await runProgram(program, ["foo", "bar"]);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual(["Unknown command: foo bar"]);
        expect(onRun).not.toHaveBeenCalled();
      });

      it("under nested subcommand", async () => {
        const program = configure((app) => {
          const foo = app.command("foo", () => {
            return () => {
              onRun();
              return "ok";
            };
          });
          foo.command("bar", () => {
            return () => {
              onRun();
              return "ok";
            };
          });
        });

        const successResult = await runProgram(program, ["foo", "bar"]);
        expect(successResult).toBe("ok");
        expect(onRun).toHaveBeenCalled();
        expect(logs.error).toEqual([]);

        onRun.mockReset();

        const result = await runProgram(program, ["foo", "bar", "baz"]);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual(["Unknown command: foo bar baz"]);
        expect(onRun).not.toHaveBeenCalled();
      });
    });
  });

  describe("parses args successfully", () => {
    it("simple number", async () => {
      const program = configure((app) => {
        app.main((main) => {
          const num = main.option(OptNum);
          return () => {
            onRun(num.value);
            return "ok";
          };
        });
      });

      const result = await runProgram(program, ["--onum", "123"]);

      expect(result).toBe("ok");
      expect(onRun).toHaveBeenCalledWith(123);
    });

    it("simple integer", async () => {
      const program = configure((app) => {
        app.main((main) => {
          const num = main.option(OptInt);
          return () => {
            onRun(num.value);
            return "ok";
          };
        });
      });

      const result = await runProgram(program, ["--oint", "123"]);

      expect(result).toBe("ok");
      expect(onRun).toHaveBeenCalledWith(123);
    });

    it("simple boolean", async () => {
      const program = configure((app) => {
        app.main((main) => {
          const bool = main.option(OptBool);
          return () => {
            onRun(bool.value);
            return "ok";
          };
        });
      });

      const result = await runProgram(program, ["--obool"]);

      expect(result).toBe("ok");
      expect(onRun).toHaveBeenCalledWith(true);
    });

    it("simple string", async () => {
      const program = configure((app) => {
        app.main((main) => {
          const str = main.option(OptStr);
          return () => {
            onRun(str.value);
            return "ok";
          };
        });
      });

      const result = await runProgram(program, ["--ostr", "hello"]);

      expect(result).toBe("ok");
      expect(onRun).toHaveBeenCalledWith("hello");
    });

    it("number array", async () => {
      const program = configure((app) => {
        app.main((main) => {
          const num = main.option(OptNumArr);
          return () => {
            onRun(num.value);
            return "ok";
          };
        });
      });

      const result = await runProgram(program, [
        "--onumarr",
        "1",
        "--onumarr",
        "2",
        "--onumarr",
        "3",
      ]);

      expect(result).toBe("ok");
      expect(onRun).toHaveBeenCalledWith([1, 2, 3]);
    });

    it("integer array", async () => {
      const program = configure((app) => {
        app.main((main) => {
          const num = main.option(OptIntArr);
          return () => {
            onRun(num.value);
            return "ok";
          };
        });
      });

      const result = await runProgram(program, [
        "--ointarr",
        "1",
        "--ointarr",
        "2",
        "--ointarr",
        "3",
      ]);

      expect(result).toBe("ok");
      expect(onRun).toHaveBeenCalledWith([1, 2, 3]);
    });

    it("string array", async () => {
      const program = configure((app) => {
        app.main((main) => {
          const num = main.option(OptStrArr);
          return () => {
            onRun(num.value);
            return "ok";
          };
        });
      });

      const result = await runProgram(program, [
        "--ostrarr",
        "hello",
        "--ostrarr",
        "world",
      ]);

      expect(result).toBe("ok");
      expect(onRun).toHaveBeenCalledWith(["hello", "world"]);
    });

    it("number array (one value)", async () => {
      const program = configure((app) => {
        app.main((main) => {
          const num = main.option(OptNumArr);
          return () => {
            onRun(num.value);
            return "ok";
          };
        });
      });

      const result = await runProgram(program, ["--onumarr", "1"]);

      expect(result).toBe("ok");
      expect(onRun).toHaveBeenCalledWith([1]);
    });

    it("integer array (one value)", async () => {
      const program = configure((app) => {
        app.main((main) => {
          const num = main.option(OptIntArr);
          return () => {
            onRun(num.value);
            return "ok";
          };
        });
      });

      const result = await runProgram(program, ["--ointarr", "1"]);

      expect(result).toBe("ok");
      expect(onRun).toHaveBeenCalledWith([1]);
    });

    it("string array (one value)", async () => {
      const program = configure((app) => {
        app.main((main) => {
          const num = main.option(OptStrArr);
          return () => {
            onRun(num.value);
            return "ok";
          };
        });
      });

      const result = await runProgram(program, ["--ostrarr", "hello"]);

      expect(result).toBe("ok");
      expect(onRun).toHaveBeenCalledWith(["hello"]);
    });
  });
});
