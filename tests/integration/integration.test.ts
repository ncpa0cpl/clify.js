import minimist from "minimist";
import { afterEach, beforeAll, describe, expect, it, vitest } from "vitest";
import { Clify, Program, configure, defineOption } from "../../src/index";

const OptNum = defineOption({
  name: "onum",
  type: "number",
});

const OptBool = defineOption({
  name: "obool",
  type: "boolean",
});

const OptStr = defineOption({
  name: "ostr",
  type: "string",
});

const OptInt = defineOption({
  name: "oint",
  type: "int",
});

const OptNumRequired = defineOption({
  name: "onumreq",
  type: "number",
  required: true,
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
});

const OptNumArr = defineOption({
  name: "onumarr",
  type: ["number"],
});

const OptBoolArr = defineOption({
  name: "oboolarr",
  type: ["boolean"],
});

const OptStrArr = defineOption({
  name: "ostrarr",
  type: ["string"],
});

const OptIntArr = defineOption({
  name: "ointarr",
  type: ["int"],
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
          "  Invalid option, expected 'number', but received 'string': --onum",
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
          "  Invalid option, expected 'number', but received 'boolean': --onum",
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
          "  Invalid option, expected 'single value', but received 'multiple': --onum",
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
          "  Invalid option, expected 'integer', but received 'float': --oint",
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
          "  Invalid option, expected 'integer', but received 'string': --oint",
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
          "  Invalid option, expected 'integer', but received 'boolean': --oint",
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
          "  Invalid option, expected 'single value', but received 'multiple': --oint",
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
          "  Invalid option, expected 'boolean', but received 'string': --obool",
        ]);
      });

      it("requires boolean, receives number", async () => {
        const program = configure((app) => {
          app.main((main) => {
            const bool = main.option(OptBool);
            return onRun;
          });
        });

        const result = await runProgram(program, ["--obool", "0"]);

        expect(result).toBeInstanceOf(Error);
        expect(logs.error).toEqual([
          "Invalid options:",
          "  Invalid option, expected 'boolean', but received 'number': --obool",
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
          "  Invalid option, expected 'single value', but received 'multiple': --obool",
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
