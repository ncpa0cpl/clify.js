// src/Arguments/argument.ts
import {
  assertDataType,
  Type,
  ValidationError
} from "dilswer";
import { html } from "termx-markup";
import { Out } from "../output.mjs";
import { compareStrings } from "../Utils/compare-strings.mjs";
import { ClifyError, InitError } from "../Utils/errors.mjs";
import { Arguments } from "./argument-parser.mjs";
var alphanumComparator = compareStrings({ alphanum: true });
var isBooleanType = (context) => {
  return context.dataType.kind === "simple" && context.dataType.simpleType === "boolean";
};
var Argument = class _Argument {
  constructor() {
    this._isSet = false;
    if (!_Argument.isCommandInitializing()) {
      this.throwInternalError(
        "Arguments must be initialized within the Command init callback."
      );
    }
    this.context = this.getInitialContext();
    if (isBooleanType(this.context)) {
      this.context.default = this.context.boolInvert ? true : false;
    }
  }
  static {
    this._isCommandInitializing = false;
  }
  static presentDataType(dt) {
    if (typeof dt === "string")
      return dt;
    if (dt.kind === "simple") {
      return dt.simpleType;
    }
    if (dt.kind === "literal") {
      return `${JSON.stringify(dt.literal)} (${typeof dt.literal})`;
    }
    if (dt.kind === "stringMatching") {
      return "string matching regular expression: " + dt.pattern.toString();
    }
    if (dt.kind === "enumMember") {
      return `${JSON.stringify(
        dt.enumMember
      )} (${typeof dt.enumMember})`;
    }
    if (dt.kind === "enumUnion") {
      return `one of: ${Object.entries(dt.enumInstance).filter(([key]) => Number.isNaN(Number(key))).map(([, v]) => `${JSON.stringify(v)} (${typeof v})`).join(" | ")}`;
    }
    if (dt.kind === "array") {
      return `list of: ${dt.arrayOf.map(this.presentDataType)}`;
    }
    if (dt.kind === "union") {
      return `one of: ${dt.oneOf.map(this.presentDataType).join(" | ")}`;
    }
    return "<unknown>";
  }
  /**
   * @internal
   */
  static startCommandInitialization() {
    _Argument._isCommandInitializing = true;
  }
  /**
   * @internal
   */
  static endCommandInitialization() {
    _Argument._isCommandInitializing = false;
  }
  /**
   * @internal
   */
  static isCommandInitializing() {
    return _Argument._isCommandInitializing;
  }
  /**
   * @internal
   */
  static getArgumentsInfo() {
    return Arguments.getRegisteredArguments().filter(
      (arg) => arg.context.arg != null || arg.context.fullArg != null
    ).sort(
      (arg_0, arg_1) => alphanumComparator(
        arg_0.context.arg ?? arg_0.context.fullArg,
        arg_1.context.arg ?? arg_1.context.fullArg
      )
    ).map((arg) => ({
      arg: arg.context.arg,
      fullArg: arg.context.fullArg,
      description: arg.context.description ?? "",
      category: arg.context.category
    }));
  }
  static setArgumentValue(arg, unparsed, value) {
    arg._unparsed = unparsed;
    arg._value = value;
    arg._isSet = true;
    if (typeof value === "boolean" && arg.context.boolInvert) {
      arg._value = !value;
    }
  }
  static isExpectingParameter(arg) {
    return !(arg.context.dataType.kind === "simple" && arg.context.dataType.simpleType === "boolean");
  }
  static getExpectedType(argument) {
    return argument.context.dataType;
  }
  static validateArgument(argument) {
    argument.validate();
  }
  static define(initData) {
    initData.require ??= false;
    class Arg extends _Argument {
      constructor() {
        super();
        Arguments.registerArgument(this);
        Arg.instanceRef = this;
      }
      getInitialContext() {
        return initData;
      }
      static access() {
        if (!Arg.instanceRef) {
          Out.err(html`
            <span color="lightRed">
              Internal Error: accessing uninitialized argument.
            </span>
          `);
          throw new ClifyError("Accessing uninitialized argument.");
        }
        return Arg.instanceRef;
      }
    }
    return Arg;
  }
  validate() {
    const keywordRegex = /^--[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/;
    const flagRegex = /^-[a-zA-Z0-9]{1}$/;
    if (this.context.fullArg != null && !keywordRegex.test(this.context.fullArg)) {
      this.throwInternalError(
        `Incorrect Argument definition: invalid keyword (${this.context.fullArg})`
      );
    }
    if (this.context.arg != null && !flagRegex.test(this.context.arg)) {
      this.throwInternalError(
        `Incorrect Argument definition: invalid flag character (${this.context.arg})`
      );
    }
    if (this.context.require === false && this._isSet === false) {
      return;
    }
    if (!_Argument.isExpectingParameter(this)) {
      return;
    }
    if (this.context.require === true && this._isSet === false && this.context.default === void 0) {
      this.throwArgumentError(`Argument not specified.`);
    }
    try {
      assertDataType(
        this.context.dataType ?? Type.Unknown,
        this._value
      );
    } catch (err) {
      if (ValidationError.isValidationError(err)) {
        this.throwArgumentError(
          `Expected ${_Argument.presentDataType(
            err.expectedValueType
          )}, but received: "${String(this._unparsed)}"`
        );
      }
    }
  }
  throwArgumentError(message) {
    const name = this.getName();
    Out.err(html`
      <span color="red">
        Argument Error
        <span color="white">[</span><span color="yellow">${name}</span
        ><span color="white">]</span>
      </span>
      <line>
        <pad size="2" color="lightRed">${message}</pad>
      </line>
    `);
    throw new InitError();
  }
  throwInternalError(message) {
    const name = this.getName();
    Out.err(html`
      <span color="red">
        Internal Argument Error
        <span color="yellow">[${name}]</span>
      </span>
      <line>
        <pad size="2" color="lightRed">${message}</pad>
      </line>
    `);
    throw new InitError();
  }
  getInitialContext() {
    throw new ClifyError("Unreachable");
  }
  static access() {
    throw new ClifyError("Unreachable");
  }
  getName() {
    return this.context.fullArg ?? this.context.arg;
  }
  get fullArg() {
    return this.context.fullArg;
  }
  get arg() {
    return this.context.arg;
  }
  /**
   * Value of the argument, this is the value specified in the CLI
   * command arguments or the default value of the Argument.
   */
  get value() {
    return this._value ?? this.context.default;
  }
  /**
   * Defines if the Argument has been set as a part of the CLI command
   * argument.
   *
   * Setting the Argument default value does not affect this property.
   */
  get isSet() {
    return this._isSet;
  }
  setDefault(v) {
    this.context.default = v;
    return this;
  }
};
export {
  Argument
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL0FyZ3VtZW50cy9hcmd1bWVudC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHtcbiAgQW55RGF0YVR5cGUsXG4gIGFzc2VydERhdGFUeXBlLFxuICBUeXBlLFxuICBWYWxpZGF0aW9uRXJyb3IsXG59IGZyb20gXCJkaWxzd2VyXCI7XG5pbXBvcnQgeyBTaW1wbGVEYXRhVHlwZSB9IGZyb20gXCJkaWxzd2VyL2Rpc3QvdHlwZXMvZGF0YS10eXBlcy9kYXRhLXR5cGVzXCI7XG5pbXBvcnQgeyBodG1sIH0gZnJvbSBcInRlcm14LW1hcmt1cFwiO1xuaW1wb3J0IHsgT3V0IH0gZnJvbSBcIi4uL291dHB1dFwiO1xuaW1wb3J0IHsgY29tcGFyZVN0cmluZ3MgfSBmcm9tIFwiLi4vVXRpbHMvY29tcGFyZS1zdHJpbmdzXCI7XG5pbXBvcnQgeyBDbGlmeUVycm9yLCBJbml0RXJyb3IgfSBmcm9tIFwiLi4vVXRpbHMvZXJyb3JzXCI7XG5pbXBvcnQgeyBBcmd1bWVudHMgfSBmcm9tIFwiLi9hcmd1bWVudC1wYXJzZXJcIjtcbmltcG9ydCB0eXBlIHtcbiAgQXJndW1lbnRDb250ZXh0LFxuICBBcmd1bWVudERhdGFUeXBlLFxuICBBcmd1bWVudEluaXREYXRhLFxuICBSZXNvbHZlVmFsdWVUeXBlLFxuICBSZVdyYXAsXG59IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IE5VTUJFUl9SRUdFWCA9XG4gIC9eKFsrLV0/KFswLTldKlsuXSk/WzAtOV0rKXwoXFxkKihcXC5cXGQqKT9lWy0rXVxcZCspJC87XG5cbmNvbnN0IGFscGhhbnVtQ29tcGFyYXRvciA9IGNvbXBhcmVTdHJpbmdzKHsgYWxwaGFudW06IHRydWUgfSk7XG5cbmNvbnN0IGlzQm9vbGVhblR5cGUgPSAoY29udGV4dDogQXJndW1lbnRDb250ZXh0KSA9PiB7XG4gIHJldHVybiAoXG4gICAgY29udGV4dC5kYXRhVHlwZS5raW5kID09PSBcInNpbXBsZVwiICYmXG4gICAgY29udGV4dC5kYXRhVHlwZS5zaW1wbGVUeXBlID09PSBcImJvb2xlYW5cIlxuICApO1xufTtcblxuLyoqXG4gKiBVc2VkIHRvIGRlZmluZSBhbmQgYWNjZXNzIHRoZSBzY3JpcHQgb3Igc3ViLWNvbW1hbmQgYXJndW1lbnRzLlxuICpcbiAqIEBleGFtcGxlXG4gKiAgIC8vIGRlZmluZSBhbiBBcmd1bWVudFxuICogICBjb25zdCBJbnB1dEFyZyA9IEFyZ3VtZW50LmRlZmluZSh7XG4gKiAgICAgZmxhZ0NoYXI6IFwiLWlcIixcbiAqICAgICBrZXl3b3JkOiBcIi0taW5wdXRcIixcbiAqICAgICBkYXRhVHlwZTogXCJzdHJpbmdcIixcbiAqICAgICByZXF1aXJlOiB0cnVlLFxuICogICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIGZpbGUuXCIsXG4gKiAgIH0pO1xuICpcbiAqICAgLy8gYWNjZXNzIHRoZSBBcmd1bWVudCB3aXRoaW4gYSBDb21tYW5kXG4gKiAgIG1haW5Db21tYW5kLnNldE1haW5BY3Rpb24oKCkgPT4ge1xuICogICAgIGNvbnN0IGlucHV0ID0gbmV3IElucHV0QXJnKCk7XG4gKlxuICogICAgIHJldHVybiB7XG4gKiAgICAgICBydW4oKSB7XG4gKiAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvY2Vzc2luZyB0aGUgZmlsZTogXCIsIGlucHV0LnZhbHVlKTtcbiAqICAgICAgIH0sXG4gKiAgICAgfTtcbiAqICAgfSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBBcmd1bWVudDxcbiAgRFQgZXh0ZW5kcyBBcmd1bWVudERhdGFUeXBlID0gQXJndW1lbnREYXRhVHlwZSxcbiAgUiBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuPiB7XG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlUmVmOiBBcmd1bWVudDxhbnksIGFueT47XG4gIHByaXZhdGUgc3RhdGljIF9pc0NvbW1hbmRJbml0aWFsaXppbmcgPSBmYWxzZTtcblxuICBwcml2YXRlIHN0YXRpYyBwcmVzZW50RGF0YVR5cGUoZHQ6IEFueURhdGFUeXBlIHwgc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIGR0ID09PSBcInN0cmluZ1wiKSByZXR1cm4gZHQ7XG5cbiAgICBpZiAoZHQua2luZCA9PT0gXCJzaW1wbGVcIikge1xuICAgICAgcmV0dXJuIGR0LnNpbXBsZVR5cGU7XG4gICAgfVxuXG4gICAgaWYgKGR0LmtpbmQgPT09IFwibGl0ZXJhbFwiKSB7XG4gICAgICByZXR1cm4gYCR7SlNPTi5zdHJpbmdpZnkoZHQubGl0ZXJhbCl9ICgke3R5cGVvZiBkdC5saXRlcmFsfSlgO1xuICAgIH1cblxuICAgIGlmIChkdC5raW5kID09PSBcInN0cmluZ01hdGNoaW5nXCIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIFwic3RyaW5nIG1hdGNoaW5nIHJlZ3VsYXIgZXhwcmVzc2lvbjogXCIgKyBkdC5wYXR0ZXJuLnRvU3RyaW5nKClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGR0LmtpbmQgPT09IFwiZW51bU1lbWJlclwiKSB7XG4gICAgICByZXR1cm4gYCR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgIGR0LmVudW1NZW1iZXIsXG4gICAgICApfSAoJHt0eXBlb2YgZHQuZW51bU1lbWJlcn0pYDtcbiAgICB9XG5cbiAgICBpZiAoZHQua2luZCA9PT0gXCJlbnVtVW5pb25cIikge1xuICAgICAgcmV0dXJuIGBvbmUgb2Y6ICR7T2JqZWN0LmVudHJpZXMoZHQuZW51bUluc3RhbmNlKVxuICAgICAgICAuZmlsdGVyKChba2V5XSkgPT4gTnVtYmVyLmlzTmFOKE51bWJlcihrZXkpKSlcbiAgICAgICAgLm1hcCgoWywgdl0pID0+IGAke0pTT04uc3RyaW5naWZ5KHYpfSAoJHt0eXBlb2Ygdn0pYClcbiAgICAgICAgLmpvaW4oXCIgfCBcIil9YDtcbiAgICB9XG5cbiAgICBpZiAoZHQua2luZCA9PT0gXCJhcnJheVwiKSB7XG4gICAgICByZXR1cm4gYGxpc3Qgb2Y6ICR7ZHQuYXJyYXlPZi5tYXAodGhpcy5wcmVzZW50RGF0YVR5cGUpfWA7XG4gICAgfVxuXG4gICAgaWYgKGR0LmtpbmQgPT09IFwidW5pb25cIikge1xuICAgICAgcmV0dXJuIGBvbmUgb2Y6ICR7ZHQub25lT2ZcbiAgICAgICAgLm1hcCh0aGlzLnByZXNlbnREYXRhVHlwZSlcbiAgICAgICAgLmpvaW4oXCIgfCBcIil9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gXCI8dW5rbm93bj5cIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHN0YXRpYyBzdGFydENvbW1hbmRJbml0aWFsaXphdGlvbigpIHtcbiAgICBBcmd1bWVudC5faXNDb21tYW5kSW5pdGlhbGl6aW5nID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHN0YXRpYyBlbmRDb21tYW5kSW5pdGlhbGl6YXRpb24oKSB7XG4gICAgQXJndW1lbnQuX2lzQ29tbWFuZEluaXRpYWxpemluZyA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgc3RhdGljIGlzQ29tbWFuZEluaXRpYWxpemluZygpIHtcbiAgICByZXR1cm4gQXJndW1lbnQuX2lzQ29tbWFuZEluaXRpYWxpemluZztcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHN0YXRpYyBnZXRBcmd1bWVudHNJbmZvKCkge1xuICAgIHJldHVybiBBcmd1bWVudHMuZ2V0UmVnaXN0ZXJlZEFyZ3VtZW50cygpXG4gICAgICAuZmlsdGVyKFxuICAgICAgICAoYXJnKSA9PlxuICAgICAgICAgIGFyZy5jb250ZXh0LmFyZyAhPSBudWxsIHx8IGFyZy5jb250ZXh0LmZ1bGxBcmcgIT0gbnVsbCxcbiAgICAgIClcbiAgICAgIC5zb3J0KChhcmdfMCwgYXJnXzEpID0+XG4gICAgICAgIGFscGhhbnVtQ29tcGFyYXRvcihcbiAgICAgICAgICBhcmdfMC5jb250ZXh0LmFyZyA/PyBhcmdfMC5jb250ZXh0LmZ1bGxBcmchLFxuICAgICAgICAgIGFyZ18xLmNvbnRleHQuYXJnID8/IGFyZ18xLmNvbnRleHQuZnVsbEFyZyEsXG4gICAgICAgICksXG4gICAgICApXG4gICAgICAubWFwKChhcmcpID0+ICh7XG4gICAgICAgIGFyZzogYXJnLmNvbnRleHQuYXJnLFxuICAgICAgICBmdWxsQXJnOiBhcmcuY29udGV4dC5mdWxsQXJnLFxuICAgICAgICBkZXNjcmlwdGlvbjogYXJnLmNvbnRleHQuZGVzY3JpcHRpb24gPz8gXCJcIixcbiAgICAgICAgY2F0ZWdvcnk6IGFyZy5jb250ZXh0LmNhdGVnb3J5LFxuICAgICAgfSkpO1xuICB9XG5cbiAgc3RhdGljIHNldEFyZ3VtZW50VmFsdWUoXG4gICAgYXJnOiBBcmd1bWVudCxcbiAgICB1bnBhcnNlZDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHZhbHVlOiBhbnksXG4gICkge1xuICAgIGFyZy5fdW5wYXJzZWQgPSB1bnBhcnNlZDtcbiAgICBhcmcuX3ZhbHVlID0gdmFsdWU7XG4gICAgYXJnLl9pc1NldCA9IHRydWU7XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIiAmJiBhcmcuY29udGV4dC5ib29sSW52ZXJ0KSB7XG4gICAgICBhcmcuX3ZhbHVlID0gIXZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBpc0V4cGVjdGluZ1BhcmFtZXRlcihcbiAgICBhcmc6IEFyZ3VtZW50PEFyZ3VtZW50RGF0YVR5cGUsIGFueT4sXG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhKFxuICAgICAgYXJnLmNvbnRleHQuZGF0YVR5cGUua2luZCA9PT0gXCJzaW1wbGVcIiAmJlxuICAgICAgYXJnLmNvbnRleHQuZGF0YVR5cGUuc2ltcGxlVHlwZSA9PT0gXCJib29sZWFuXCJcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIGdldEV4cGVjdGVkVHlwZShhcmd1bWVudDogQXJndW1lbnQpOiBBcmd1bWVudERhdGFUeXBlIHtcbiAgICByZXR1cm4gYXJndW1lbnQuY29udGV4dC5kYXRhVHlwZTtcbiAgfVxuXG4gIHN0YXRpYyB2YWxpZGF0ZUFyZ3VtZW50KGFyZ3VtZW50OiBBcmd1bWVudCkge1xuICAgIGFyZ3VtZW50LnZhbGlkYXRlKCk7XG4gIH1cblxuICBzdGF0aWMgZGVmaW5lPFxuICAgIERUIGV4dGVuZHMgQXJndW1lbnREYXRhVHlwZSA9IFNpbXBsZURhdGFUeXBlPFwidW5rbm93blwiPixcbiAgICBSIGV4dGVuZHMgYm9vbGVhbiA9IGZhbHNlLFxuICA+KGluaXREYXRhOiBBcmd1bWVudEluaXREYXRhPERULCBSPik6IHR5cGVvZiBBcmd1bWVudDxEVCwgUj4ge1xuICAgIGluaXREYXRhLnJlcXVpcmUgPz89IGZhbHNlIGFzIFI7XG5cbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgY2xhc3MgQXJnIGV4dGVuZHMgQXJndW1lbnQ8RFQsIFI+IHtcbiAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBBcmd1bWVudHMucmVnaXN0ZXJBcmd1bWVudCh0aGlzKTtcbiAgICAgICAgQXJnLmluc3RhbmNlUmVmID0gdGhpcztcbiAgICAgIH1cblxuICAgICAgZ2V0SW5pdGlhbENvbnRleHQoKSB7XG4gICAgICAgIHJldHVybiBpbml0RGF0YSBhcyBhbnk7XG4gICAgICB9XG5cbiAgICAgIHN0YXRpYyBhY2Nlc3MoKTogQXJndW1lbnQ8RFQsIFI+IHtcbiAgICAgICAgaWYgKCFBcmcuaW5zdGFuY2VSZWYpIHtcbiAgICAgICAgICBPdXQuZXJyKGh0bWxgXG4gICAgICAgICAgICA8c3BhbiBjb2xvcj1cImxpZ2h0UmVkXCI+XG4gICAgICAgICAgICAgIEludGVybmFsIEVycm9yOiBhY2Nlc3NpbmcgdW5pbml0aWFsaXplZCBhcmd1bWVudC5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICBgKTtcbiAgICAgICAgICB0aHJvdyBuZXcgQ2xpZnlFcnJvcihcIkFjY2Vzc2luZyB1bmluaXRpYWxpemVkIGFyZ3VtZW50LlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBBcmcuaW5zdGFuY2VSZWY7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIEFyZyBhcyBhbnk7XG4gIH1cblxuICBwcml2YXRlIGNvbnRleHQ6IEFyZ3VtZW50Q29udGV4dDxEVCwgUj47XG4gIHByaXZhdGUgX3ZhbHVlPzogUmVzb2x2ZVZhbHVlVHlwZTxEVCwgUj47XG4gIHByaXZhdGUgX2lzU2V0OiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX3VucGFyc2VkPzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGlmICghQXJndW1lbnQuaXNDb21tYW5kSW5pdGlhbGl6aW5nKCkpIHtcbiAgICAgIHRoaXMudGhyb3dJbnRlcm5hbEVycm9yKFxuICAgICAgICBcIkFyZ3VtZW50cyBtdXN0IGJlIGluaXRpYWxpemVkIHdpdGhpbiB0aGUgQ29tbWFuZCBpbml0IGNhbGxiYWNrLlwiLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmdldEluaXRpYWxDb250ZXh0KCk7XG5cbiAgICBpZiAoaXNCb29sZWFuVHlwZSh0aGlzLmNvbnRleHQpKSB7XG4gICAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgICB0aGlzLmNvbnRleHQuZGVmYXVsdCA9IHRoaXMuY29udGV4dC5ib29sSW52ZXJ0ID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdmFsaWRhdGUoKSB7XG4gICAgY29uc3Qga2V5d29yZFJlZ2V4ID0gL14tLVthLXpBLVowLTldKygtW2EtekEtWjAtOV0rKSokLztcbiAgICBjb25zdCBmbGFnUmVnZXggPSAvXi1bYS16QS1aMC05XXsxfSQvO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5jb250ZXh0LmZ1bGxBcmcgIT0gbnVsbCAmJlxuICAgICAgIWtleXdvcmRSZWdleC50ZXN0KHRoaXMuY29udGV4dC5mdWxsQXJnKVxuICAgICkge1xuICAgICAgdGhpcy50aHJvd0ludGVybmFsRXJyb3IoXG4gICAgICAgIGBJbmNvcnJlY3QgQXJndW1lbnQgZGVmaW5pdGlvbjogaW52YWxpZCBrZXl3b3JkICgke3RoaXMuY29udGV4dC5mdWxsQXJnfSlgLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbnRleHQuYXJnICE9IG51bGwgJiZcbiAgICAgICFmbGFnUmVnZXgudGVzdCh0aGlzLmNvbnRleHQuYXJnKVxuICAgICkge1xuICAgICAgdGhpcy50aHJvd0ludGVybmFsRXJyb3IoXG4gICAgICAgIGBJbmNvcnJlY3QgQXJndW1lbnQgZGVmaW5pdGlvbjogaW52YWxpZCBmbGFnIGNoYXJhY3RlciAoJHt0aGlzLmNvbnRleHQuYXJnfSlgLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb250ZXh0LnJlcXVpcmUgPT09IGZhbHNlICYmIHRoaXMuX2lzU2V0ID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghQXJndW1lbnQuaXNFeHBlY3RpbmdQYXJhbWV0ZXIodGhpcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbnRleHQucmVxdWlyZSA9PT0gdHJ1ZSAmJlxuICAgICAgdGhpcy5faXNTZXQgPT09IGZhbHNlICYmXG4gICAgICB0aGlzLmNvbnRleHQuZGVmYXVsdCA9PT0gdW5kZWZpbmVkXG4gICAgKSB7XG4gICAgICB0aGlzLnRocm93QXJndW1lbnRFcnJvcihgQXJndW1lbnQgbm90IHNwZWNpZmllZC5gKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgYXNzZXJ0RGF0YVR5cGUoXG4gICAgICAgIHRoaXMuY29udGV4dC5kYXRhVHlwZSA/PyBUeXBlLlVua25vd24sXG4gICAgICAgIHRoaXMuX3ZhbHVlLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChWYWxpZGF0aW9uRXJyb3IuaXNWYWxpZGF0aW9uRXJyb3IoZXJyKSkge1xuICAgICAgICB0aGlzLnRocm93QXJndW1lbnRFcnJvcihcbiAgICAgICAgICBgRXhwZWN0ZWQgJHtBcmd1bWVudC5wcmVzZW50RGF0YVR5cGUoXG4gICAgICAgICAgICBlcnIuZXhwZWN0ZWRWYWx1ZVR5cGUsXG4gICAgICAgICAgKX0sIGJ1dCByZWNlaXZlZDogXCIke1N0cmluZyh0aGlzLl91bnBhcnNlZCl9XCJgLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdGhyb3dBcmd1bWVudEVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IG5ldmVyIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCk7XG5cbiAgICBPdXQuZXJyKGh0bWxgXG4gICAgICA8c3BhbiBjb2xvcj1cInJlZFwiPlxuICAgICAgICBBcmd1bWVudCBFcnJvclxuICAgICAgICA8c3BhbiBjb2xvcj1cIndoaXRlXCI+Wzwvc3Bhbj48c3BhbiBjb2xvcj1cInllbGxvd1wiPiR7bmFtZX08L3NwYW5cbiAgICAgICAgPjxzcGFuIGNvbG9yPVwid2hpdGVcIj5dPC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgICAgPGxpbmU+XG4gICAgICAgIDxwYWQgc2l6ZT1cIjJcIiBjb2xvcj1cImxpZ2h0UmVkXCI+JHttZXNzYWdlfTwvcGFkPlxuICAgICAgPC9saW5lPlxuICAgIGApO1xuXG4gICAgdGhyb3cgbmV3IEluaXRFcnJvcigpO1xuICB9XG5cbiAgcHJpdmF0ZSB0aHJvd0ludGVybmFsRXJyb3IobWVzc2FnZTogc3RyaW5nKTogbmV2ZXIge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKTtcblxuICAgIE91dC5lcnIoaHRtbGBcbiAgICAgIDxzcGFuIGNvbG9yPVwicmVkXCI+XG4gICAgICAgIEludGVybmFsIEFyZ3VtZW50IEVycm9yXG4gICAgICAgIDxzcGFuIGNvbG9yPVwieWVsbG93XCI+WyR7bmFtZX1dPC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgICAgPGxpbmU+XG4gICAgICAgIDxwYWQgc2l6ZT1cIjJcIiBjb2xvcj1cImxpZ2h0UmVkXCI+JHttZXNzYWdlfTwvcGFkPlxuICAgICAgPC9saW5lPlxuICAgIGApO1xuXG4gICAgdGhyb3cgbmV3IEluaXRFcnJvcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEluaXRpYWxDb250ZXh0KCk6IFJlV3JhcDxBcmd1bWVudEluaXREYXRhPERULCBSPj4ge1xuICAgIHRocm93IG5ldyBDbGlmeUVycm9yKFwiVW5yZWFjaGFibGVcIik7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFjY2VzczxcbiAgICBEVCBleHRlbmRzIEFyZ3VtZW50RGF0YVR5cGUsXG4gICAgUiBleHRlbmRzIGJvb2xlYW4sXG4gID4odGhpczogdHlwZW9mIEFyZ3VtZW50PERULCBSPik6IEFyZ3VtZW50PERULCBSPiB7XG4gICAgdGhyb3cgbmV3IENsaWZ5RXJyb3IoXCJVbnJlYWNoYWJsZVwiKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXROYW1lKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5mdWxsQXJnID8/IHRoaXMuY29udGV4dC5hcmc7XG4gIH1cblxuICBnZXQgZnVsbEFyZygpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQuZnVsbEFyZztcbiAgfVxuXG4gIGdldCBhcmcoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LmFyZztcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWx1ZSBvZiB0aGUgYXJndW1lbnQsIHRoaXMgaXMgdGhlIHZhbHVlIHNwZWNpZmllZCBpbiB0aGUgQ0xJXG4gICAqIGNvbW1hbmQgYXJndW1lbnRzIG9yIHRoZSBkZWZhdWx0IHZhbHVlIG9mIHRoZSBBcmd1bWVudC5cbiAgICovXG4gIGdldCB2YWx1ZSgpOiBSZXNvbHZlVmFsdWVUeXBlPERULCBSPiB7XG4gICAgcmV0dXJuICh0aGlzLl92YWx1ZSA/PyB0aGlzLmNvbnRleHQuZGVmYXVsdCkgYXMgYW55O1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgaWYgdGhlIEFyZ3VtZW50IGhhcyBiZWVuIHNldCBhcyBhIHBhcnQgb2YgdGhlIENMSSBjb21tYW5kXG4gICAqIGFyZ3VtZW50LlxuICAgKlxuICAgKiBTZXR0aW5nIHRoZSBBcmd1bWVudCBkZWZhdWx0IHZhbHVlIGRvZXMgbm90IGFmZmVjdCB0aGlzIHByb3BlcnR5LlxuICAgKi9cbiAgZ2V0IGlzU2V0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc1NldDtcbiAgfVxuXG4gIHNldERlZmF1bHQodjogUmVzb2x2ZVZhbHVlVHlwZTxEVCwgdHJ1ZT4pOiBBcmd1bWVudDxEVCwgdHJ1ZT4ge1xuICAgIHRoaXMuY29udGV4dC5kZWZhdWx0ID0gdjtcbiAgICByZXR1cm4gdGhpcyBhcyBhbnk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQTtBQUFBLEVBRUU7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE9BQ0s7QUFFUCxTQUFTLFlBQVk7QUFDckIsU0FBUyxXQUFXO0FBQ3BCLFNBQVMsc0JBQXNCO0FBQy9CLFNBQVMsWUFBWSxpQkFBaUI7QUFDdEMsU0FBUyxpQkFBaUI7QUFZMUIsSUFBTSxxQkFBcUIsZUFBZSxFQUFFLFVBQVUsS0FBSyxDQUFDO0FBRTVELElBQU0sZ0JBQWdCLENBQUMsWUFBNkI7QUFDbEQsU0FDRSxRQUFRLFNBQVMsU0FBUyxZQUMxQixRQUFRLFNBQVMsZUFBZTtBQUVwQztBQTBCTyxJQUFNLFdBQU4sTUFBTSxVQUdYO0FBQUEsRUFrS0EsY0FBYztBQUhkLFNBQVEsU0FBa0I7QUFJeEIsUUFBSSxDQUFDLFVBQVMsc0JBQXNCLEdBQUc7QUFDckMsV0FBSztBQUFBLFFBQ0g7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVBLFNBQUssVUFBVSxLQUFLLGtCQUFrQjtBQUV0QyxRQUFJLGNBQWMsS0FBSyxPQUFPLEdBQUc7QUFFL0IsV0FBSyxR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
