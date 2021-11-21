import type { ArgumentDataType, ArgumentInitData, Constructor, ResolveValueType, ReWrap } from "./types";
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
export declare abstract class Argument<DT extends ArgumentDataType | undefined, R extends boolean> {
    private static _isCommandInitializing;
    private static initiatedArguments;
    private static hasMultipleArgumentsWithKeywordOrFlag;
    protected static startCommandInitialization(): void;
    protected static endCommandInitialization(): void;
    protected static isCommandInitializing(): boolean;
    protected static getArgumentsInfo(): {
        flagChar: `-${string}`;
        keyword: `--${string}`;
        description: string;
        category: string | undefined;
    }[];
    protected static validateArguments(): void;
    static define<DT extends ArgumentDataType | undefined = undefined, R extends boolean = false>(initData: ArgumentInitData<DT, R>): Constructor<Argument<DT, R>>;
    private context;
    private _value;
    private _isSet;
    private constructor();
    private ensureDataType;
    private validate;
    private getName;
    private getArgumentValue;
    private throwArgumentError;
    private throwInternalError;
    protected abstract init(): ReWrap<ArgumentInitData<DT, R>>;
    /**
     * Value of the argument, this is the value specified in the
     * CLI command arguments or the default value of the Argument.
     */
    get value(): ResolveValueType<DT, R>;
    /**
     * Defines if the Argument has been set as a part of the CLI
     * command argument.
     *
     * Setting the Argument default value does not affect this property.
     */
    get isSet(): boolean;
    setDefault(v: ResolveValueType<DT, true>): void;
}
