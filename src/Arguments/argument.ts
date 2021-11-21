import chalk from "chalk";
import { compareStrings } from "../Utils/compare-strings";
import { Arguments } from "./argument-parser";
import type {
  ArgumentContext,
  ArgumentDataType,
  ArgumentInitData,
  Constructor,
  ResolveValueType,
  ReWrap,
} from "./types";

const FLOATING_NUMBER_REGEX = /^[+-]?([0-9]*[.])?[0-9]+$/;

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
export abstract class Argument<
  DT extends ArgumentDataType | undefined,
  R extends boolean
> {
  private static _isCommandInitializing = false;
  private static initiatedArguments: Argument<any, any>[] = [];

  private static hasMultipleArgumentsWithKeywordOrFlag(
    keyword: string,
    flag: string
  ) {
    return (
      Argument.initiatedArguments.filter(
        (arg) =>
          arg.context.keyword === keyword || arg.context.flagChar === flag
      ).length > 1
    );
  }

  protected static startCommandInitialization() {
    Argument._isCommandInitializing = true;
  }

  protected static endCommandInitialization() {
    Argument._isCommandInitializing = false;
  }

  protected static isCommandInitializing() {
    return Argument._isCommandInitializing;
  }

  protected static getArgumentsInfo() {
    return Argument.initiatedArguments
      .sort((arg_0, arg_1) =>
        compareStrings({ numCompare: true })(
          arg_0.context.flagChar,
          arg_1.context.flagChar
        )
      )
      .map((arg) => ({
        flagChar: arg.context.flagChar,
        keyword: arg.context.keyword,
        description: arg.context.description ?? "",
        category: arg.context.category,
      }));
  }

  protected static validateArguments() {
    for (const arg of Argument.initiatedArguments) {
      arg.validate();
    }
  }

  static define<
    DT extends ArgumentDataType | undefined = undefined,
    R extends boolean = false
  >(initData: ArgumentInitData<DT, R>): Constructor<Argument<DT, R>> {
    class Arg extends Argument<DT, R> {
      constructor() {
        super();

        Argument.initiatedArguments.push(this);
      }

      init() {
        return initData as ReWrap<ArgumentInitData<DT, R>>;
      }
    }

    return Arg as any as Constructor<Argument<DT, R>>;
  }

  private context: ArgumentContext<DT, R>;
  private _value: ResolveValueType<DT, R>;
  private _isSet: boolean;

  private constructor() {
    if (!Argument.isCommandInitializing()) {
      this.throwInternalError(
        "Arguments must be initialized within the Command init callback."
      );
    }

    this.context = this.init();
    this._value = this.getArgumentValue();
    this._isSet = Arguments.isArgumentSet(this.context);
  }

  private ensureDataType(
    v: string | number | boolean | undefined
  ): ResolveValueType<DT, R> {
    // @ts-expect-error
    if (!this.context.require && v === undefined) return v;

    switch (this.context.dataType) {
      case "boolean":
        // @ts-expect-error
        if (typeof v === "boolean") return v;
        // @ts-expect-error
        if (v === "0" || v === 0) return false;
        // @ts-expect-error
        if (v === "1" || v === 1) return true;
        this.throwArgumentError(
          'Argument value is not of expected type (boolean). Try one of the following: "true", "false", 0 or 1'
        );
        break;
      case "number":
        // @ts-expect-error
        if (typeof v === "number") return v;
        if (typeof v === "string" && FLOATING_NUMBER_REGEX.test(v))
          // @ts-expect-error
          return Number(v);
        this.throwArgumentError(
          "Argument value is not of expected type (number). Try putting in a number value to this argument like: 0, 1, 123, 1.2 or .678"
        );
        break;
      case "string":
        // @ts-expect-error
        if (typeof v === "string") return v;
        this.throwArgumentError(
          "Argument value is not of expected type (string)."
        );
        break;
      default:
        // @ts-expect-error
        return v;
    }
  }

  private validate() {
    const keywordRegex = /^--[a-zA-Z]+(-[a-zA-Z]+)*$/;
    const flagRegex = /^-[a-zA-Z]{1}$/;

    if (!keywordRegex.test(this.context.keyword)) {
      this.throwInternalError(
        `Incorrect Argument definition: invalid keyword (${this.context.keyword})`
      );
    }

    if (!flagRegex.test(this.context.flagChar)) {
      this.throwInternalError(
        `Incorrect Argument definition: invalid flag character (${this.context.flagChar})`
      );
    }

    if (
      Argument.hasMultipleArgumentsWithKeywordOrFlag(
        this.context.keyword,
        this.context.flagChar
      )
    ) {
      this.throwInternalError(
        "Duplicate argument instances declared within a Command."
      );
    }

    if (this.context.require && this.value === undefined) {
      this.throwArgumentError("Argument must be specified.");
    }

    // @ts-expect-error
    this.ensureDataType(this.value);
  }

  private getName() {
    return this.context.displayName || this.context.keyword;
  }

  private getArgumentValue() {
    const argValue = Arguments.getArgument(this.context);

    return argValue as ResolveValueType<DT, R>;
  }

  private throwArgumentError(message: string): never {
    const name = this.getName();

    throw new Error(
      `${chalk.red("Argument Error")} [${chalk.yellow(name)}]: ${message}`
    );
  }

  private throwInternalError(message: string): never {
    const name = this.getName();

    throw new Error(
      `${chalk.red("Argument Error")} [${chalk.yellow(name)}]: ${message}`
    );
  }

  protected abstract init(): ReWrap<ArgumentInitData<DT, R>>;

  /**
   * Value of the argument, this is the value specified in the
   * CLI command arguments or the default value of the Argument.
   */
  get value(): ResolveValueType<DT, R> {
    return this._value;
  }

  /**
   * Defines if the Argument has been set as a part of the CLI
   * command argument.
   *
   * Setting the Argument default value does not affect this property.
   */
  get isSet(): boolean {
    return this._isSet;
  }

  setDefault(v: ResolveValueType<DT, true>) {
    this.context.default = v;
    this._value = this.getArgumentValue();
  }
}
