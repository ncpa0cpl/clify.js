import { AnyDataType, Literal } from "dilswer";
import path from "path";
import { html } from "termx-markup";
import { ClifyError } from "../Utils/errors";
import { Out } from "../output";
import { isArgName } from "./Utils/is-arg-name";
import { Argument } from "./argument";
import { BaseInputFileArg } from "./input-file-arg";

const parseBool = (value: string) => {
  if (value === "true" || value === "1") return true;
  if (value === "false" || value === "0") return false;
  return undefined;
};

const NUMBER_REGEX =
  /^([+-]?([0-9]*[.])?[0-9]+)|(\d*(\.\d*)?e[-+]\d+)$/;

class ArgumentParser {
  private static parseValue(
    dt: AnyDataType,
    value: string | undefined,
  ): any {
    if (value === undefined) {
      if (dt.kind === "simple" && dt.simpleType === "boolean") {
        return true;
      }

      if (
        dt.kind === "union" &&
        dt.oneOf.some(
          (t) => t.kind === "simple" && t.simpleType === "boolean",
        )
      ) {
        return true;
      }

      return undefined;
    }

    const splitToArray = (v: string) => {
      const result: string[] = [];
      const appendToCurrent = (char: string) => {
        if (result.at(-1) === undefined) {
          result.push(char);
          return;
        }

        result[result.length - 1] += char;
      };

      let isEscaped = false;
      for (let i = 0; i < v.length; i++) {
        const char = v[i];

        if (char === "\\") {
          if (isEscaped) {
            appendToCurrent(char);
            isEscaped = false;
            continue;
          }
          isEscaped = true;
          continue;
        }

        if (char === "," && !isEscaped) {
          result.push("");
          continue;
        }

        appendToCurrent(char);
        isEscaped = false;
      }

      return result;
    };

    const parseOneOf = (dts: AnyDataType[], value: string) => {
      const lt = dts.find(
        (t) => t.kind === "literal" && String(t.literal) === value,
      ) as Literal<any>;
      if (lt) {
        switch (typeof lt.literal) {
          case "number": {
            return Number(value);
          }
          case "boolean": {
            return parseBool(value);
          }
          case "string": {
            return String(value);
          }
        }
      }

      if (
        dts.some(
          (t) =>
            t.kind === "simple" &&
            (t.simpleType === "number" || t.simpleType === "integer"),
        )
      ) {
        if (NUMBER_REGEX.test(value)) {
          return Number(value);
        }
      }

      if (
        dts.some(
          (t) => t.kind === "simple" && t.simpleType === "boolean",
        )
      ) {
        const r = parseBool(value);
        if (r !== undefined) return r;
      }

      return value;
    };

    switch (dt.kind) {
      case "simple": {
        switch (dt.simpleType) {
          case "boolean": {
            return parseBool(value);
          }
          case "integer":
          case "number": {
            return Number(value);
          }
          case "string":
          case "stringinteger":
          case "stringnumeral": {
            return String(value);
          }
        }
        return value;
      }
      case "enumMember": {
        switch (typeof dt.enumMember) {
          case "number": {
            return Number(value);
          }
          case "boolean": {
            return parseBool(value);
          }
          case "string": {
            return String(value);
          }
        }
        return value;
      }
      case "enumUnion": {
        const firstMember = Object.entries(dt.enumInstance).filter(
          ([key]) => Number.isNaN(Number(key)),
        )[0][1];

        switch (typeof firstMember) {
          case "number": {
            return Number(value);
          }
          case "boolean": {
            return parseBool(value);
          }
          case "string": {
            return String(value);
          }
        }

        return value;
      }
      case "literal": {
        switch (typeof dt.literal) {
          case "number": {
            return Number(value);
          }
          case "boolean": {
            return parseBool(value);
          }
          case "string": {
            return String(value);
          }
        }
        return value;
      }
      case "stringMatching": {
        return String(value);
      }
      case "array": {
        const values = splitToArray(value);
        return values.map((v) => parseOneOf(dt.arrayOf, v));
      }
      case "union": {
        return parseOneOf(dt.oneOf, value);
      }
      case "tuple": {
        const values = splitToArray(value);
        return dt.tuple.map((t, idx) =>
          this.parseValue(t, values[idx]),
        );
      }
    }
  }

  private allowUnrecognizedArguments = false;
  private registeredArguments: Array<Argument> = [];
  private fileInputArg: BaseInputFileArg | undefined;

  constructor() {}

  private findArgument(name: string) {
    return this.registeredArguments.find(
      (argument) =>
        argument.arg === name || argument.fullArg === name,
    );
  }

  private handleUnrecognizedArgument(name: string) {
    if (this.allowUnrecognizedArguments) return;

    Out.err(html`
      <span color="lightRed"> Unrecognized Argument: ${name} </span>
    `);
    throw new ClifyError("Unrecognized Argument.");
  }

  public async parseArguments(args: string[]) {
    for (let i = 0; i < args.length; i++) {
      const argName = args[i]!;

      if (isArgName(argName)) {
        const argument = this.findArgument(argName);

        if (!argument) {
          this.handleUnrecognizedArgument(argName);
          continue;
        }

        const expectedType = Argument.getExpectedType(argument);

        if (Argument.isExpectingParameter(argument)) {
          const nextArg = args[++i];
          const parsedValue = ArgumentParser.parseValue(
            expectedType,
            nextArg,
          );
          Argument.setArgumentValue(argument, nextArg, parsedValue);
        } else {
          const parsedValue = ArgumentParser.parseValue(
            expectedType,
            undefined,
          );
          Argument.setArgumentValue(argument, undefined, parsedValue);
        }
      } else if (i === args.length - 1 && this.fileInputArg) {
        await BaseInputFileArg.setArgumentValue(
          this.fileInputArg,
          path.resolve(process.cwd(), args[i]),
        );
      } else {
        Out.err(html`
          <line color="lightRed">Unexpected token: ${argName}</line>
        `);
      }
    }
  }

  public validateAll() {
    for (let i = 0; i < this.registeredArguments.length; i++) {
      const argument = this.registeredArguments[i];
      Argument.validateArgument(argument);
    }
  }

  public getRegisteredArguments() {
    return this.registeredArguments.slice();
  }

  public getRegisteredArgumentsNames() {
    return this.registeredArguments
      .map((arg) => arg.fullArg ?? arg.arg)
      .filter((argName): argName is string => !!argName);
  }

  public registerArgument(argument: Argument) {
    if (
      this.registeredArguments.some(
        (arg) =>
          arg.arg === argument.arg ||
          arg.fullArg === argument.fullArg,
      )
    ) {
      Out.err(html`
        <span color="lightRed">
          Internal Error: Duplicate argument registered.
        </span>
      `);
      throw new ClifyError("Argument already registered.");
    }

    this.registeredArguments.push(argument);
  }

  public registerFileInputArg(arg: BaseInputFileArg) {
    if (this.fileInputArg) {
      Out.err(html`
        <span color="lightRed">
          Internal Error: File input argument already registered.
        </span>
      `);
      throw new ClifyError("File input argument already registered.");
    }

    this.fileInputArg = arg;
  }

  public allowUnrecognized(allow: boolean) {
    this.allowUnrecognizedArguments = allow;
  }

  public hasFileInputArg() {
    return !!this.fileInputArg;
  }
}

export const Arguments = new ArgumentParser();
