export type ArgumentKeyword = `--${string}`;
export type ArgumentFlagChar = `-${string}`;
export type ArgumentDataType = "string" | "number" | "boolean";

export type TypeOfArg<DT extends ArgumentDataType | undefined> =
  TypeIsUndefined<DT> extends true
    ? string | number | boolean | undefined
    : // @ts-expect-error
      {
        string: string;
        number: number;
        boolean: boolean;
      }[DT];

export type TypeIsUndefined<T> = [Exclude<T, undefined>] extends [never]
  ? true
  : false;

export type ReWrap<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type Constructor<T> = new () => T;

export type ResolveValueType<
  DT extends ArgumentDataType | undefined,
  R extends boolean
> = R extends true ? TypeOfArg<DT> : TypeOfArg<DT> | undefined;

export type ArgumentInitDataBase<R extends boolean> = {
  /**
   * The keyword for this argument, must be prefixed with a
   * double Hyphen character. It can only consist of letters
   * possibly separated with a single hyphen.
   *
   * @example
   *   const arg = {
   *     keyword: "--input",
   *   };
   *   // or
   *   const arg = {
   *     keyword: "--output-file",
   *   };
   */
  keyword: ArgumentKeyword;
  /**
   * A single character flag, must be prefixed with exactly one Hyphen.
   *
   * @example
   *   const arg = {
   *     flagChar: "-i",
   *   };
   *   // or
   *   const arg = {
   *     flagChar: "-C",
   *   };
   */
  flagChar: ArgumentFlagChar;
  /**
   * Optional name that will be used to display the information
   * about this Argument in the command line interface. If not
   * specified, `keyword` will be used instead.
   */
  displayName?: string;
  /**
   * If set to true an error will be thrown if the argument is
   * not defined nor have a default.
   */
  require?: R;
  /**
   * The description that will be displayed when accessing the
   * `--help` menu.
   */
  description?: string;
  /**
   * The category name under which this argument will be
   * displayed in the `--help` message.
   */
  category?: string;
};

export type ArgumentInitData<
  DT extends ArgumentDataType | undefined,
  R extends boolean
> = ArgumentInitDataBase<R> &
  (TypeIsUndefined<DT> extends true
    ? {
        /**
         * The default value that's provided if the argument is
         * not specified in the CLI.
         */
        default?: TypeOfArg<ArgumentDataType>;
        /**
         * Type of the data that's expected. The value provided
         * via the CLI will be converted to this type if
         * possible, if it's not possible the program will exit
         * with an appropriate error.
         */
        dataType?: undefined;
      }
    : {
        /**
         * The default value that's provided if the argument is
         * not specified in the CLI.
         */
        default?: TypeOfArg<DT>;
        /**
         * Type of the data that's expected. The value provided
         * via the CLI will be converted to this type if
         * possible, if it's not possible the program will exit
         * with an appropriate error.
         */
        dataType?: DT;
      });

export type ArgumentContext<
  DT extends ArgumentDataType | undefined,
  R extends boolean
> = ReWrap<ArgumentInitData<DT, R>>;
