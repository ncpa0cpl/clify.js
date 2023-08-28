import { ArrayOf, GetDataType, OneOf, Type } from "dilswer";
import { Enum, EnumMember, Literal, StringMatching, Tuple } from "dilswer/dist/types/data-types/data-types";
type BaseDataTypes = typeof Type.Unknown | typeof Type.String | typeof Type.StringInt | typeof Type.StringNumeral | typeof Type.Number | typeof Type.Int | typeof Type.Boolean | Literal<any> | Enum<any> | EnumMember<any> | StringMatching<any>;
export type FullArgumentName = `--${string}`;
export type ShortArgumentName = `-${string}`;
export type ArgumentDataType = BaseDataTypes | OneOf<BaseDataTypes[]> | ArrayOf<BaseDataTypes[]> | Tuple<BaseDataTypes[]>;
export type TypeOfArg<DT extends ArgumentDataType | undefined> = TypeIsUndefined<DT> extends true ? string | number | boolean | undefined : {
    string: string;
    number: number;
    boolean: boolean;
}[DT];
export type TypeIsUndefined<T> = [Exclude<T, undefined>] extends [
    never
] ? true : false;
export type ReWrap<T> = T extends infer O ? {
    [K in keyof O]: O[K];
} : never;
export type Constructor<T> = new () => T;
export type ResolveValueType<DT extends ArgumentDataType, R extends boolean> = R extends true ? GetDataType<DT> : GetDataType<DT> | undefined;
export type ArgumentInitData<DT extends ArgumentDataType, R extends boolean> = {
    /**
     * The keyword for this argument, must be prefixed with a double
     * Hyphen character. It can only consist of letters possibly
     * separated with a single hyphen.
     *
     * @example
     *   const arg = {
     *     fullArg: "--input",
     *   };
     *   // or
     *   const arg = {
     *     fullArg: "--output-file",
     *   };
     */
    fullArg?: FullArgumentName;
    /**
     * A single character flag, must be prefixed with exactly one
     * Hyphen.
     *
     * @example
     *   const arg = {
     *     arg: "-i",
     *   };
     *   // or
     *   const arg = {
     *     arg: "-C",
     *   };
     */
    arg?: ShortArgumentName;
    /**
     * If set to true an error will be thrown if the argument is not
     * defined nor have a default.
     */
    require?: R;
    /**
     * The description that will be displayed when accessing the
     * `--help` menu.
     */
    description?: string;
    /**
     * The category name under which this argument will be displayed in
     * the `--help` message.
     */
    category?: string;
    /**
     * The default value that's provided if the argument is not
     * specified in the CLI.
     */
    default?: TypeOfArg<DT>;
    /**
     * Type of the data that's expected. The value provided via the CLI
     * will be converted to this type if possible, if it's not possible
     * the program will exit with an appropriate error.
     */
    dataType: DT;
    /**
     * When the expected type is a boolean, if this option is enabled
     * the value is inverted (when specified as cli arg it's `false`,
     * when not specified it's `true`).
     */
    boolInvert?: boolean;
};
export type ArgumentContext<DT extends ArgumentDataType = ArgumentDataType, R extends boolean = boolean> = ReWrap<ArgumentInitData<DT, R>>;
export {};
