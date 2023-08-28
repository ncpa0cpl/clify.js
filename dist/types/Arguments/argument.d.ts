import { SimpleDataType } from "dilswer/dist/types/data-types/data-types";
import type { ArgumentDataType, ArgumentInitData, ResolveValueType, ReWrap } from "./types";
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
export declare class Argument<DT extends ArgumentDataType = ArgumentDataType, R extends boolean = boolean> {
    private static instanceRef;
    private static _isCommandInitializing;
    private static presentDataType;
    static setArgumentValue(arg: Argument, unparsed: string | undefined, value: any): void;
    static isExpectingParameter(arg: Argument<ArgumentDataType, any>): boolean;
    static getExpectedType(argument: Argument): ArgumentDataType;
    static validateArgument(argument: Argument): void;
    static define<DT extends ArgumentDataType = SimpleDataType<"unknown">, R extends boolean = false>(initData: ArgumentInitData<DT, R>): typeof Argument<DT, R>;
    private context;
    private _value?;
    private _isSet;
    private _unparsed?;
    constructor();
    private validate;
    private throwArgumentError;
    private throwInternalError;
    protected getInitialContext(): ReWrap<ArgumentInitData<DT, R>>;
    static access<DT extends ArgumentDataType, R extends boolean>(this: typeof Argument<DT, R>): Argument<DT, R>;
    getName(): string | undefined;
    get fullArg(): string | undefined;
    get arg(): string | undefined;
    /**
     * Value of the argument, this is the value specified in the CLI
     * command arguments or the default value of the Argument.
     */
    get value(): ResolveValueType<DT, R>;
    /**
     * Defines if the Argument has been set as a part of the CLI command
     * argument.
     *
     * Setting the Argument default value does not affect this property.
     */
    get isSet(): boolean;
    setDefault(v: ResolveValueType<DT, true>): Argument<DT, true>;
}
