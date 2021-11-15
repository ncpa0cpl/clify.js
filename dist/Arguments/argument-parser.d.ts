import type { ArgumentContext } from "./types";
declare class ArgumentParser {
    private subCommands;
    private arguments;
    constructor();
    private init;
    isArgumentSet(argument: ArgumentContext<any, any>): boolean;
    getArgument(argument: ArgumentContext<any, any>, throwError: (msg: string) => never): string | number | boolean | undefined;
    getSubCommandsPath(): string[];
}
export declare const Arguments: ArgumentParser;
export {};
