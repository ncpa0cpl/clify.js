import { Argument } from "./argument";
import { BaseInputFileArg } from "./input-file-arg";
declare class ArgumentParser {
    private static parseValue;
    private allowUnrecognizedArguments;
    private registeredArguments;
    private fileInputArg;
    constructor();
    private findArgument;
    private handleUnrecognizedArgument;
    parseArguments(args: string[]): Promise<void>;
    validateAll(): void;
    getRegisteredArguments(): Argument<import("./types").ArgumentDataType, boolean>[];
    getRegisteredArgumentsNames(): string[];
    registerArgument(argument: Argument): void;
    registerFileInputArg(arg: BaseInputFileArg): void;
    allowUnrecognized(allow: boolean): void;
    hasFileInputArg(): boolean;
}
export declare const Arguments: ArgumentParser;
export {};
