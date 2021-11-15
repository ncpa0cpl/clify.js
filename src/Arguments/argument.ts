import chalk from "chalk";
import { Arguments } from "./argument-parser";
import type {
  ArgumentDataType,
  ArgumentFlagChar,
  ArgumentKeyword,
  Constructor,
  ReWrap,
  TypeIsUndefined,
  TypeOfArg,
} from "./types";
import { ensureDataType } from "./Utils/ensure-data-type";

type ArgumentInitDataBase = {
  keyword: ArgumentKeyword;
  flagChar: ArgumentFlagChar;
  displayName?: string;
  require?: boolean;
  description?: string;
};

type ArgumentInitData<DT extends ArgumentDataType | undefined> =
  ArgumentInitDataBase &
    (TypeIsUndefined<DT> extends true
      ? {
          default?: TypeOfArg<ArgumentDataType>;
          dataType?: undefined;
        }
      : {
          default?: TypeOfArg<DT>;
          dataType?: DT;
        });

export type ArgumentContext<DT extends ArgumentDataType | undefined> = ReWrap<
  ArgumentInitData<DT>
>;

export abstract class Argument<DT extends ArgumentDataType | undefined = undefined> {
  private static initiatedArguments: Argument<any>[] = [];

  private static hasMultipleArgumentsWithKeywordOrFlag(
    keyword: string,
    flag: string
  ) {
    return (
      Argument.initiatedArguments.filter(
        (arg) => arg.context.keyword === keyword || arg.context.flagChar === flag
      ).length > 1
    );
  }

  protected static getArgumentsInfo() {
    return Argument.initiatedArguments.map((arg) => [
      arg.context.flagChar,
      arg.context.keyword,
      arg.context.description ?? "",
    ]);
  }

  protected static validateArguments() {
    for (const arg of Argument.initiatedArguments) {
      arg.validate();
    }
  }

  static define<DT extends ArgumentDataType | undefined = undefined>(
    initData: ArgumentInitData<DT>
  ): Constructor<Argument<DT>> {
    class Arg extends Argument<DT> {
      constructor() {
        super();

        Argument.initiatedArguments.push(this);
      }

      init() {
        return initData as ReWrap<ArgumentInitData<DT>>;
      }
    }

    return Arg as any as Constructor<Argument<DT>>;
  }

  private context: ArgumentContext<DT>;

  private constructor() {
    this.context = this.init();
  }

  private validate() {
    const keywordRegex = /^--[a-zA-Z]+(-[a-zA-Z]+)*$/;
    const flagRegex = /^-[a-zA-Z]{1}$/;

    if (!keywordRegex.test(this.context.keyword)) {
      this.throwError(`Incorrect Keyword (${this.context.keyword})`);
    }

    if (!flagRegex.test(this.context.flagChar)) {
      this.throwError(`Incorrect Flag (${this.context.flagChar})`);
    }

    if (this.context.require && !this.isSet && this.context.default === undefined) {
      this.throwError("Argument must be specified.");
    }

    if (
      Argument.hasMultipleArgumentsWithKeywordOrFlag(
        this.context.keyword,
        this.context.flagChar
      )
    ) {
      this.throwError("Duplicate argument instances.");
    }

    this.value;
  }

  private getName() {
    return this.context.displayName || this.context.keyword;
  }

  private throwError(message: string) {
    const name = this.getName();

    throw new Error(
      `${chalk.red("Argument Error")} [${chalk.yellow(name)}]: ${message}`
    );
  }

  protected abstract init(): ReWrap<ArgumentInitData<DT>>;

  get value(): TypeOfArg<DT> | undefined {
    const argValue = Arguments.getArgument(this.context);
    return ensureDataType(
      argValue,
      this.context.require ?? false,
      this.context.dataType as DT
    );
  }

  get isSet(): boolean {
    return Arguments.isArgumentSet(this.context);
  }
}
