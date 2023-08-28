import {
  AnyDataType,
  assertDataType,
  Type,
  ValidationError,
} from "dilswer";
import { SimpleDataType } from "dilswer/dist/types/data-types/data-types";
import { html } from "termx-markup";
import { Out } from "../output";
import { compareStrings } from "../Utils/compare-strings";
import { ClifyError, InitError } from "../Utils/errors";
import { Arguments } from "./argument-parser";
import type {
  ArgumentContext,
  ArgumentDataType,
  ArgumentInitData,
  ResolveValueType,
  ReWrap,
} from "./types";

const NUMBER_REGEX =
  /^([+-]?([0-9]*[.])?[0-9]+)|(\d*(\.\d*)?e[-+]\d+)$/;

const alphanumComparator = compareStrings({ alphanum: true });

const isBooleanType = (context: ArgumentContext) => {
  return (
    context.dataType.kind === "simple" &&
    context.dataType.simpleType === "boolean"
  );
};

/**
 * Used to define and access the script or sub-command arguments.
 *
 * @example
 *   // define an Argument
 *   const InputArg = Argument.define({
 *     flagChar: "-i",
 *     keyword: "--input",
 *     dataType: "string",
 *     require: true,
 *     description: "Path to the file.",
 *   });
 *
 *   // access the Argument within a Command
 *   mainCommand.setMainAction(() => {
 *     const input = new InputArg();
 *
 *     return {
 *       run() {
 *         console.log("Processing the file: ", input.value);
 *       },
 *     };
 *   });
 */
export class Argument<
  DT extends ArgumentDataType = ArgumentDataType,
  R extends boolean = boolean,
> {
  private static instanceRef: Argument<any, any>;
  private static _isCommandInitializing = false;

  private static presentDataType(dt: AnyDataType | string): string {
    if (typeof dt === "string") return dt;

    if (dt.kind === "simple") {
      return dt.simpleType;
    }

    if (dt.kind === "literal") {
      return `${JSON.stringify(dt.literal)} (${typeof dt.literal})`;
    }

    if (dt.kind === "stringMatching") {
      return (
        "string matching regular expression: " + dt.pattern.toString()
      );
    }

    if (dt.kind === "enumMember") {
      return `${JSON.stringify(
        dt.enumMember,
      )} (${typeof dt.enumMember})`;
    }

    if (dt.kind === "enumUnion") {
      return `one of: ${Object.entries(dt.enumInstance)
        .filter(([key]) => Number.isNaN(Number(key)))
        .map(([, v]) => `${JSON.stringify(v)} (${typeof v})`)
        .join(" | ")}`;
    }

    if (dt.kind === "array") {
      return `list of: ${dt.arrayOf.map(this.presentDataType)}`;
    }

    if (dt.kind === "union") {
      return `one of: ${dt.oneOf
        .map(this.presentDataType)
        .join(" | ")}`;
    }

    return "<unknown>";
  }

  /**
   * @internal
   */
  static startCommandInitialization() {
    Argument._isCommandInitializing = true;
  }

  /**
   * @internal
   */
  static endCommandInitialization() {
    Argument._isCommandInitializing = false;
  }

  /**
   * @internal
   */
  static isCommandInitializing() {
    return Argument._isCommandInitializing;
  }

  /**
   * @internal
   */
  static getArgumentsInfo() {
    return Arguments.getRegisteredArguments()
      .filter(
        (arg) =>
          arg.context.arg != null || arg.context.fullArg != null,
      )
      .sort((arg_0, arg_1) =>
        alphanumComparator(
          arg_0.context.arg ?? arg_0.context.fullArg!,
          arg_1.context.arg ?? arg_1.context.fullArg!,
        ),
      )
      .map((arg) => ({
        arg: arg.context.arg,
        fullArg: arg.context.fullArg,
        description: arg.context.description ?? "",
        category: arg.context.category,
      }));
  }

  static setArgumentValue(
    arg: Argument,
    unparsed: string | undefined,
    value: any,
  ) {
    arg._unparsed = unparsed;
    arg._value = value;
    arg._isSet = true;

    if (typeof value === "boolean" && arg.context.boolInvert) {
      arg._value = !value;
    }
  }

  static isExpectingParameter(
    arg: Argument<ArgumentDataType, any>,
  ): boolean {
    return !(
      arg.context.dataType.kind === "simple" &&
      arg.context.dataType.simpleType === "boolean"
    );
  }

  static getExpectedType(argument: Argument): ArgumentDataType {
    return argument.context.dataType;
  }

  static validateArgument(argument: Argument) {
    argument.validate();
  }

  static define<
    DT extends ArgumentDataType = SimpleDataType<"unknown">,
    R extends boolean = false,
  >(initData: ArgumentInitData<DT, R>): typeof Argument<DT, R> {
    initData.require ??= false as R;

    // @ts-expect-error
    class Arg extends Argument<DT, R> {
      constructor() {
        super();
        Arguments.registerArgument(this);
        Arg.instanceRef = this;
      }

      getInitialContext() {
        return initData as any;
      }

      static access(): Argument<DT, R> {
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

    return Arg as any;
  }

  private context: ArgumentContext<DT, R>;
  private _value?: ResolveValueType<DT, R>;
  private _isSet: boolean = false;
  private _unparsed?: string;

  constructor() {
    if (!Argument.isCommandInitializing()) {
      this.throwInternalError(
        "Arguments must be initialized within the Command init callback.",
      );
    }

    this.context = this.getInitialContext();

    if (isBooleanType(this.context)) {
      // @ts-expect-error
      this.context.default = this.context.boolInvert ? true : false;
    }
  }

  private validate() {
    const keywordRegex = /^--[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/;
    const flagRegex = /^-[a-zA-Z0-9]{1}$/;

    if (
      this.context.fullArg != null &&
      !keywordRegex.test(this.context.fullArg)
    ) {
      this.throwInternalError(
        `Incorrect Argument definition: invalid keyword (${this.context.fullArg})`,
      );
    }

    if (
      this.context.arg != null &&
      !flagRegex.test(this.context.arg)
    ) {
      this.throwInternalError(
        `Incorrect Argument definition: invalid flag character (${this.context.arg})`,
      );
    }

    if (this.context.require === false && this._isSet === false) {
      return;
    }

    if (!Argument.isExpectingParameter(this)) {
      return;
    }

    if (
      this.context.require === true &&
      this._isSet === false &&
      this.context.default === undefined
    ) {
      this.throwArgumentError(`Argument not specified.`);
    }

    try {
      assertDataType(
        this.context.dataType ?? Type.Unknown,
        this._value,
      );
    } catch (err) {
      if (ValidationError.isValidationError(err)) {
        this.throwArgumentError(
          `Expected ${Argument.presentDataType(
            err.expectedValueType,
          )}, but received: "${String(this._unparsed)}"`,
        );
      }
    }
  }

  private throwArgumentError(message: string): never {
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

  private throwInternalError(message: string): never {
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

  protected getInitialContext(): ReWrap<ArgumentInitData<DT, R>> {
    throw new ClifyError("Unreachable");
  }

  public static access<
    DT extends ArgumentDataType,
    R extends boolean,
  >(this: typeof Argument<DT, R>): Argument<DT, R> {
    throw new ClifyError("Unreachable");
  }

  public getName(): string | undefined {
    return this.context.fullArg ?? this.context.arg;
  }

  get fullArg(): string | undefined {
    return this.context.fullArg;
  }

  get arg(): string | undefined {
    return this.context.arg;
  }

  /**
   * Value of the argument, this is the value specified in the CLI
   * command arguments or the default value of the Argument.
   */
  get value(): ResolveValueType<DT, R> {
    return (this._value ?? this.context.default) as any;
  }

  /**
   * Defines if the Argument has been set as a part of the CLI command
   * argument.
   *
   * Setting the Argument default value does not affect this property.
   */
  get isSet(): boolean {
    return this._isSet;
  }

  setDefault(v: ResolveValueType<DT, true>): Argument<DT, true> {
    this.context.default = v;
    return this as any;
  }
}
