// src/Arguments/argument-parser.ts
import path from "path";
import { html } from "termx-markup";
import { ClifyError } from "../Utils/errors.mjs";
import { Out } from "../output.mjs";
import { isArgName } from "./Utils/is-arg-name.mjs";
import { Argument } from "./argument.mjs";
import { BaseInputFileArg } from "./input-file-arg.mjs";
var parseBool = (value) => {
  if (value === "true" || value === "1")
    return true;
  if (value === "false" || value === "0")
    return false;
  return void 0;
};
var NUMBER_REGEX = /^([+-]?([0-9]*[.])?[0-9]+)|(\d*(\.\d*)?e[-+]\d+)$/;
var ArgumentParser = class _ArgumentParser {
  constructor() {
    this.allowUnrecognizedArguments = false;
    this.registeredArguments = [];
  }
  static parseValue(dt, value) {
    if (value === void 0) {
      if (dt.kind === "simple" && dt.simpleType === "boolean") {
        return true;
      }
      if (dt.kind === "union" && dt.oneOf.some(
        (t) => t.kind === "simple" && t.simpleType === "boolean"
      )) {
        return true;
      }
      return void 0;
    }
    const splitToArray = (v) => {
      const result = [];
      const appendToCurrent = (char) => {
        if (result.at(-1) === void 0) {
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
    const parseOneOf = (dts, value2) => {
      const lt = dts.find(
        (t) => t.kind === "literal" && String(t.literal) === value2
      );
      if (lt) {
        switch (typeof lt.literal) {
          case "number": {
            return Number(value2);
          }
          case "boolean": {
            return parseBool(value2);
          }
          case "string": {
            return String(value2);
          }
        }
      }
      if (dts.some(
        (t) => t.kind === "simple" && (t.simpleType === "number" || t.simpleType === "integer")
      )) {
        if (NUMBER_REGEX.test(value2)) {
          return Number(value2);
        }
      }
      if (dts.some(
        (t) => t.kind === "simple" && t.simpleType === "boolean"
      )) {
        const r = parseBool(value2);
        if (r !== void 0)
          return r;
      }
      return value2;
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
          ([key]) => Number.isNaN(Number(key))
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
        return dt.tuple.map(
          (t, idx) => this.parseValue(t, values[idx])
        );
      }
    }
  }
  findArgument(name) {
    return this.registeredArguments.find(
      (argument) => argument.arg === name || argument.fullArg === name
    );
  }
  handleUnrecognizedArgument(name) {
    if (this.allowUnrecognizedArguments)
      return;
    Out.err(html`
      <span color="lightRed"> Unrecognized Argument: ${name} </span>
    `);
    throw new ClifyError("Unrecognized Argument.");
  }
  async parseArguments(args) {
    for (let i = 0; i < args.length; i++) {
      const argName = args[i];
      if (isArgName(argName)) {
        const argument = this.findArgument(argName);
        if (!argument) {
          this.handleUnrecognizedArgument(argName);
          continue;
        }
        const expectedType = Argument.getExpectedType(argument);
        if (Argument.isExpectingParameter(argument)) {
          const nextArg = args[++i];
          const parsedValue = _ArgumentParser.parseValue(
            expectedType,
            nextArg
          );
          Argument.setArgumentValue(argument, nextArg, parsedValue);
        } else {
          const parsedValue = _ArgumentParser.parseValue(
            expectedType,
            void 0
          );
          Argument.setArgumentValue(argument, void 0, parsedValue);
        }
      } else if (i === args.length - 1 && this.fileInputArg) {
        await BaseInputFileArg.setArgumentValue(
          this.fileInputArg,
          path.resolve(process.cwd(), args[i])
        );
      } else {
        Out.err(html`
          <line color="lightRed">Unexpected token: ${argName}</line>
        `);
      }
    }
  }
  validateAll() {
    for (let i = 0; i < this.registeredArguments.length; i++) {
      const argument = this.registeredArguments[i];
      Argument.validateArgument(argument);
    }
  }
  getRegisteredArguments() {
    return this.registeredArguments.slice();
  }
  getRegisteredArgumentsNames() {
    return this.registeredArguments.map((arg) => arg.fullArg ?? arg.arg).filter((argName) => !!argName);
  }
  registerArgument(argument) {
    if (this.registeredArguments.some(
      (arg) => arg.arg === argument.arg || arg.fullArg === argument.fullArg
    )) {
      Out.err(html`
        <span color="lightRed">
          Internal Error: Duplicate argument registered.
        </span>
      `);
      throw new ClifyError("Argument already registered.");
    }
    this.registeredArguments.push(argument);
  }
  registerFileInputArg(arg) {
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
  allowUnrecognized(allow) {
    this.allowUnrecognizedArguments = allow;
  }
  hasFileInputArg() {
    return !!this.fileInputArg;
  }
};
var Arguments = new ArgumentParser();
export {
  Arguments
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL0FyZ3VtZW50cy9hcmd1bWVudC1wYXJzZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IEFueURhdGFUeXBlLCBMaXRlcmFsIH0gZnJvbSBcImRpbHN3ZXJcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBodG1sIH0gZnJvbSBcInRlcm14LW1hcmt1cFwiO1xuaW1wb3J0IHsgQ2xpZnlFcnJvciB9IGZyb20gXCIuLi9VdGlscy9lcnJvcnNcIjtcbmltcG9ydCB7IE91dCB9IGZyb20gXCIuLi9vdXRwdXRcIjtcbmltcG9ydCB7IGlzQXJnTmFtZSB9IGZyb20gXCIuL1V0aWxzL2lzLWFyZy1uYW1lXCI7XG5pbXBvcnQgeyBBcmd1bWVudCB9IGZyb20gXCIuL2FyZ3VtZW50XCI7XG5pbXBvcnQgeyBCYXNlSW5wdXRGaWxlQXJnIH0gZnJvbSBcIi4vaW5wdXQtZmlsZS1hcmdcIjtcblxuY29uc3QgcGFyc2VCb29sID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgaWYgKHZhbHVlID09PSBcInRydWVcIiB8fCB2YWx1ZSA9PT0gXCIxXCIpIHJldHVybiB0cnVlO1xuICBpZiAodmFsdWUgPT09IFwiZmFsc2VcIiB8fCB2YWx1ZSA9PT0gXCIwXCIpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbmNvbnN0IE5VTUJFUl9SRUdFWCA9XG4gIC9eKFsrLV0/KFswLTldKlsuXSk/WzAtOV0rKXwoXFxkKihcXC5cXGQqKT9lWy0rXVxcZCspJC87XG5cbmNsYXNzIEFyZ3VtZW50UGFyc2VyIHtcbiAgcHJpdmF0ZSBzdGF0aWMgcGFyc2VWYWx1ZShcbiAgICBkdDogQW55RGF0YVR5cGUsXG4gICAgdmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgKTogYW55IHtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGR0LmtpbmQgPT09IFwic2ltcGxlXCIgJiYgZHQuc2ltcGxlVHlwZSA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgZHQua2luZCA9PT0gXCJ1bmlvblwiICYmXG4gICAgICAgIGR0Lm9uZU9mLnNvbWUoXG4gICAgICAgICAgKHQpID0+IHQua2luZCA9PT0gXCJzaW1wbGVcIiAmJiB0LnNpbXBsZVR5cGUgPT09IFwiYm9vbGVhblwiLFxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BsaXRUb0FycmF5ID0gKHY6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xuICAgICAgY29uc3QgYXBwZW5kVG9DdXJyZW50ID0gKGNoYXI6IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAocmVzdWx0LmF0KC0xKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goY2hhcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSArPSBjaGFyO1xuICAgICAgfTtcblxuICAgICAgbGV0IGlzRXNjYXBlZCA9IGZhbHNlO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNoYXIgPSB2W2ldO1xuXG4gICAgICAgIGlmIChjaGFyID09PSBcIlxcXFxcIikge1xuICAgICAgICAgIGlmIChpc0VzY2FwZWQpIHtcbiAgICAgICAgICAgIGFwcGVuZFRvQ3VycmVudChjaGFyKTtcbiAgICAgICAgICAgIGlzRXNjYXBlZCA9IGZhbHNlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlzRXNjYXBlZCA9IHRydWU7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhciA9PT0gXCIsXCIgJiYgIWlzRXNjYXBlZCkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKFwiXCIpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwZW5kVG9DdXJyZW50KGNoYXIpO1xuICAgICAgICBpc0VzY2FwZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgY29uc3QgcGFyc2VPbmVPZiA9IChkdHM6IEFueURhdGFUeXBlW10sIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGx0ID0gZHRzLmZpbmQoXG4gICAgICAgICh0KSA9PiB0LmtpbmQgPT09IFwibGl0ZXJhbFwiICYmIFN0cmluZyh0LmxpdGVyYWwpID09PSB2YWx1ZSxcbiAgICAgICkgYXMgTGl0ZXJhbDxhbnk+O1xuICAgICAgaWYgKGx0KSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIGx0LmxpdGVyYWwpIHtcbiAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIodmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOiB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VCb29sKHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBkdHMuc29tZShcbiAgICAgICAgICAodCkgPT5cbiAgICAgICAgICAgIHQua2luZCA9PT0gXCJzaW1wbGVcIiAmJlxuICAgICAgICAgICAgKHQuc2ltcGxlVHlwZSA9PT0gXCJudW1iZXJcIiB8fCB0LnNpbXBsZVR5cGUgPT09IFwiaW50ZWdlclwiKSxcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIGlmIChOVU1CRVJfUkVHRVgudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGR0cy5zb21lKFxuICAgICAgICAgICh0KSA9PiB0LmtpbmQgPT09IFwic2ltcGxlXCIgJiYgdC5zaW1wbGVUeXBlID09PSBcImJvb2xlYW5cIixcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHIgPSBwYXJzZUJvb2wodmFsdWUpO1xuICAgICAgICBpZiAociAhPT0gdW5kZWZpbmVkKSByZXR1cm4gcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG5cbiAgICBzd2l0Y2ggKGR0LmtpbmQpIHtcbiAgICAgIGNhc2UgXCJzaW1wbGVcIjoge1xuICAgICAgICBzd2l0Y2ggKGR0LnNpbXBsZVR5cGUpIHtcbiAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOiB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VCb29sKHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSBcImludGVnZXJcIjpcbiAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIodmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgY2FzZSBcInN0cmluZ2ludGVnZXJcIjpcbiAgICAgICAgICBjYXNlIFwic3RyaW5nbnVtZXJhbFwiOiB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgICAgY2FzZSBcImVudW1NZW1iZXJcIjoge1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBkdC5lbnVtTWVtYmVyKSB7XG4gICAgICAgICAgY2FzZSBcIm51bWJlclwiOiB7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjoge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlQm9vbCh2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjoge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJlbnVtVW5pb25cIjoge1xuICAgICAgICBjb25zdCBmaXJzdE1lbWJlciA9IE9iamVjdC5lbnRyaWVzKGR0LmVudW1JbnN0YW5jZSkuZmlsdGVyKFxuICAgICAgICAgIChba2V5XSkgPT4gTnVtYmVyLmlzTmFOKE51bWJlcihrZXkpKSxcbiAgICAgICAgKVswXVsxXTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBmaXJzdE1lbWJlcikge1xuICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjoge1xuICAgICAgICAgICAgcmV0dXJuIE51bWJlcih2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUJvb2wodmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJsaXRlcmFsXCI6IHtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgZHQubGl0ZXJhbCkge1xuICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjoge1xuICAgICAgICAgICAgcmV0dXJuIE51bWJlcih2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUJvb2wodmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgICBjYXNlIFwic3RyaW5nTWF0Y2hpbmdcIjoge1xuICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJhcnJheVwiOiB7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IHNwbGl0VG9BcnJheSh2YWx1ZSk7XG4gICAgICAgIHJldHVybiB2YWx1ZXMubWFwKCh2KSA9PiBwYXJzZU9uZU9mKGR0LmFycmF5T2YsIHYpKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJ1bmlvblwiOiB7XG4gICAgICAgIHJldHVybiBwYXJzZU9uZU9mKGR0Lm9uZU9mLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjYXNlIFwidHVwbGVcIjoge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBzcGxpdFRvQXJyYXkodmFsdWUpO1xuICAgICAgICByZXR1cm4gZHQudHVwbGUubWFwKCh0LCBpZHgpID0+XG4gICAgICAgICAgdGhpcy5wYXJzZVZhbHVlKHQsIHZhbHVlc1tpZHhdKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFsbG93VW5yZWNvZ25pemVkQXJndW1lbnRzID0gZmFsc2U7XG4gIHByaXZhdGUgcmVnaXN0ZXJlZEFyZ3VtZW50czogQXJyYXk8QXJndW1lbnQ+ID0gW107XG4gIHByaXZhdGUgZmlsZUlucHV0QXJnOiBCYXNlSW5wdXRGaWxlQXJnIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBwcml2YXRlIGZpbmRBcmd1bWVudChuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RlcmVkQXJndW1lbnRzLmZpbmQoXG4gICAgICAoYXJndW1lbnQpID0+XG4gICAgICAgIGFyZ3VtZW50LmFyZyA9PT0gbmFtZSB8fCBhcmd1bWVudC5mdWxsQXJnID09PSBuYW1lLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVVucmVjb2duaXplZEFyZ3VtZW50KG5hbWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmFsbG93VW5yZWNvZ25pemVkQXJndW1lbnRzKSByZXR1cm47XG5cbiAgICBPdXQuZXJyKGh0bWxgXG4gICAgICA8c3BhbiBjb2xvcj1cImxpZ2h0UmVkXCI+IFVucmVjb2duaXplZCBBcmd1bWVudDogJHtuYW1lfSA8L3NwYW4+XG4gICAgYCk7XG4gICAgdGhyb3cgbmV3IENsaWZ5RXJyb3IoXCJVbnJlY29nbml6ZWQgQXJndW1lbnQuXCIpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHBhcnNlQXJndW1lbnRzKGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBhcmdOYW1lID0gYXJnc1tpXSE7XG5cbiAgICAgIGlmIChpc0FyZ05hbWUoYXJnTmFtZSkpIHtcbiAgICAgICAgY29uc3QgYXJndW1lbnQgPSB0aGlzLmZpbmRBcmd1bWVudChhcmdOYW1lKTtcblxuICAgICAgICBpZiAoIWFyZ3VtZW50KSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVVbnJlY29nbml6ZWRBcmd1bWVudChhcmdOYW1lKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGV4cGVjdGVkVHlwZSA9IEFyZ3VtZW50LmdldEV4cGVjdGVkVHlwZShhcmd1bWVudCk7XG5cbiAgICAgICAgaWYgKEFyZ3VtZW50LmlzRXhwZWN0aW5nUGFyYW1ldGVyKGFyZ3VtZW50KSkge1xuICAgICAgICAgIGNvbnN0IG5leHRBcmcgPSBhcmdzWysraV07XG4gICAgICAgICAgY29uc3QgcGFyc2VkVmFsdWUgPSBBcmd1bWVudFBhcnNlci5wYXJzZVZhbHVlKFxuICAgICAgICAgICAgZXhwZWN0ZWRUeXBlLFxuICAgICAgICAgICAgbmV4dEFyZyxcbiAgICAgICAgICApO1xuICAgICAgICAgIEFyZ3VtZW50LnNldEFyZ3VtZW50VmFsdWUoYXJndW1lbnQsIG5leHRBcmcsIHBhcnNlZFZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IEFyZ3VtZW50UGFyc2VyLnBhcnNlVmFsdWUoXG4gICAgICAgICAgICBleHBlY3RlZFR5cGUsXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBBcmd1bWVudC5zZXRBcmd1bWVudFZhbHVlKGFyZ3VtZW50LCB1bmRlZmluZWQsIHBhcnNlZFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpID09PSBhcmdzLmxlbmd0aCAtIDEgJiYgdGhpcy5maWxlSW5wdXRBcmcpIHtcbiAgICAgICAgYXdhaXQgQmFzZUlucHV0RmlsZUFyZy5zZXRBcmd1bWVudFZhbHVlKFxuICAgICAgICAgIHRoaXMuZmlsZUlucHV0QXJnLFxuICAgICAgICAgIHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBhcmdzW2ldKSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIE91dC5lcnIoaHRtbGBcbiAgICAgICAgICA8bGluZSBjb2xvcj1cImxpZ2h0UmVkXCI+VW5leHBlY3RlZCB0b2tlbjogJHthcmdOYW1lfTwvbGluZT5cbiAgICAgICAgYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHZhbGlkYXRlQWxsKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yZWdpc3RlcmVkQXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBhcmd1bWVudCA9IHRoaXMucmVnaXN0ZXJlZEFyZ3VtZW50c1tpXTtcbiAgICAgIEFyZ3VtZW50LnZhbGlkYXRlQXJndW1lbnQoYXJndW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRSZWdpc3RlcmVkQXJndW1lbnRzKCkge1xuICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyZWRBcmd1bWVudHMuc2xpY2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRSZWdpc3RlcmVkQXJndW1lbnRzTmFtZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJlZEFyZ3VtZW50c1xuICAgICAgLm1hcCgoYXJnKSA9PiBhcmcuZnVsbEFyZyA/PyBhcmcuYXJnKVxuICAgICAgLmZpbHRlcigoYXJnTmFtZSk6IGFyZ05hbWUgaXMgc3RyaW5nID0+ICEhYXJnTmFtZSk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJBcmd1bWVudChhcmd1bWVudDogQXJndW1lbnQpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnJlZ2lzdGVyZWRBcmd1bWVudHMuc29tZShcbiAgICAgICAgKGFyZykgPT5cbiAgICAgICAgICBhcmcuYXJnID09PSBhcmd1bWVudC5hcmcgfHxcbiAgICAgICAgICBhcmcuZnVsbEFyZyA9PT0gYXJndW1lbnQuZnVsbEFyZyxcbiAgICAgIClcbiAgICApIHtcbiAgICAgIE91dC5lcnIoaHRtbGBcbiAgICAgICAgPHNwYW4gY29sb3I9XCJsaWdodFJlZFwiPlxuICAgICAgICAgIEludGVybmFsIEVycm9yOiBEdXBsaWNhdGUgYXJndW1lbnQgcmVnaXN0ZXJlZC5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgYCk7XG4gICAgICB0aHJvdyBuZXcgQ2xpZnlFcnJvcihcIkFyZ3VtZW50IGFscmVhZHkgcmVnaXN0ZXJlZC5cIik7XG4gICAgfVxuXG4gICAgdGhpcy5yZWdpc3RlcmVkQXJndW1lbnRzLnB1c2goYXJndW1lbnQpO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyRmlsZUlucHV0QXJnKGFyZzogQmFzZUlucHV0RmlsZUFyZykge1xuICAgIGlmICh0aGlzLmZpbGVJbnB1dEFyZykge1xuICAgICAgT3V0LmVycihodG1sYFxuICAgICAgICA8c3BhbiBjb2xvcj1cImxpZ2h0UmVkXCI+XG4gICAgICAgICAgSW50ZXJuYWwgRXJyb3I6IEZpbGUgaW5wdXQgYXJndW1lbnQgYWxyZWFkeSByZWdpc3RlcmVkLlxuICAgICAgICA8L3NwYW4+XG4gICAgICBgKTtcbiAgICAgIHRocm93IG5ldyBDbGlmeUVycm9yKFwiRmlsZSBpbnB1dCBhcmd1bWVudCBhbHJlYWR5IHJlZ2lzdGVyZWQuXCIpO1xuICAgIH1cblxuICAgIHRoaXMuZmlsZUlucHV0QXJnID0gYXJnO1xuICB9XG5cbiAgcHVibGljIGFsbG93VW5yZWNvZ25pemVkKGFsbG93OiBib29sZWFuKSB7XG4gICAgdGhpcy5hbGxvd1VucmVjb2duaXplZEFyZ3VtZW50cyA9IGFsbG93O1xuICB9XG5cbiAgcHVibGljIGhhc0ZpbGVJbnB1dEFyZygpIHtcbiAgICByZXR1cm4gISF0aGlzLmZpbGVJbnB1dEFyZztcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgQXJndW1lbnRzID0gbmV3IEFyZ3VtZW50UGFyc2VyKCk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsWUFBWTtBQUNyQixTQUFTLGtCQUFrQjtBQUMzQixTQUFTLFdBQVc7QUFDcEIsU0FBUyxpQkFBaUI7QUFDMUIsU0FBUyxnQkFBZ0I7QUFDekIsU0FBUyx3QkFBd0I7QUFFakMsSUFBTSxZQUFZLENBQUMsVUFBa0I7QUFDbkMsTUFBSSxVQUFVLFVBQVUsVUFBVTtBQUFLLFdBQU87QUFDOUMsTUFBSSxVQUFVLFdBQVcsVUFBVTtBQUFLLFdBQU87QUFDL0MsU0FBTztBQUNUO0FBRUEsSUFBTSxlQUNKO0FBRUYsSUFBTSxpQkFBTixNQUFNLGdCQUFlO0FBQUEsRUE2TG5CLGNBQWM7QUFKZCxTQUFRLDZCQUE2QjtBQUNyQyxTQUFRLHNCQUF1QyxDQUFD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LGNBQWMsZ0JBQWU7QUFBQSxZQUNqQztBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQ0EsbUJBQVMsaUJBQWlCLFVBQVUsUUFBVyxXQUFXO0FBQUEsUUFDNUQ7QUFBQSxNQUNGLFdBQVcsTUFBTSxLQUFLLFNBQVMsS0FBSyxLQUFLLGNBQWM7QUFDckQsY0FBTSxpQkFBaUI7QUFBQSxVQUNyQixLQUFLO0FBQUEsVUFDTCxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFBQSxRQUNyQztBQUFBLE1BQ0YsT0FBTztBQUNMLFlBQUksSUFBSTtBQUFBLHFEQUNxQyxPQUFPO0FBQUEsU0FDbkQ7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVPLGNBQWM7QUFDbkIsYUFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLG9CQUFvQixRQUFRLEtBQUs7QUFDeEQsWUFBTSxXQUFXLEtBQUssb0JBQW9CLENBQUM7QUFDM0MsZUFBUyxpQkFBaUIsUUFBUTtBQUFBLElBQ3BDO0FBQUEsRUFDRjtBQUFBLEVBRU8seUJBQXlCO0FBQzlCLFdBQU8sS0FBSyxvQkFBb0IsTUFBTTtBQUFBLEVBQ3hDO0FBQUEsRUFFTyw4QkFBOEI7QUFDbkMsV0FBTyxLQUFLLG9CQUNULElBQUksQ0FBQyxRQUFRLElBQUksV0FBVyxJQUFJLEdBQUcsRUFDbkMsT0FBTyxDQUFDLFlBQStCLENBQUMsQ0FBQyxPQUFPO0FBQUEsRUFDckQ7QUFBQSxFQUVPLGlCQUFpQixVQUFvQjtBQUMxQyxRQUNFLEtBQUssb0JBQW9CO0FBQUEsTUFDdkIsQ0FBQyxRQUNDLElBQUksUUFBUSxTQUFTLE9BQ3JCLElBQUksWUFBWSxTQUFTO0FBQUEsSUFDN0IsR0FDQTtBQUNBLFVBQUksSUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BSVA7QUFDRCxZQUFNLElBQUksV0FBVyw4QkFBOEI7QUFBQSxJQUNyRDtBQUVBLFNBQUssb0JBQW9CLEtBQUssUUFBUTtBQUFBLEVBQ3hDO0FBQUEsRUFFTyxxQkFBcUIsS0FBdUI7QUFDakQsUUFBSSxLQUFLLGNBQWM7QUFDckIsVUFBSSxJQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FJUDtBQUNELFlBQU0sSUFBSSxXQUFXLHlDQUF5QztBQUFBLElBQ2hFO0FBRUEsU0FBSyxlQUFlO0FBQUEsRUFDdEI7QUFBQSxFQUVPLGtCQUFrQixPQUFnQjtBQUN2QyxTQUFLLDZCQUE2QjtBQUFBLEVBQ3BDO0FBQUEsRUFFTyxrQkFBa0I7QUFDdkIsV0FBTyxDQUFDLENBQUMsS0FBSztBQUFBLEVBQ2hCO0FBQ0Y7QUFFTyxJQUFNLFlBQVksSUFBSSxlQUFlOyIsCiAgIm5hbWVzIjogWyJ2YWx1ZSJdCn0K
