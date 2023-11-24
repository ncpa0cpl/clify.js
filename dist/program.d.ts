import minimist from "minimist";
import { Cmd } from "./command";
export interface Program {
    /**
     * Starts the program with the given command and arguments,
     * if not specified, it will use the process.argv.
     */
    run(command?: string, args?: Record<string, any>): unknown;
}
export declare class ClifyProgram implements Program {
    protected mainCommand: Cmd;
    constructor(mainCommand: Cmd);
    init(command?: string | undefined, args?: Record<string, any> | undefined): minimist.ParsedArgs;
    findCommand(command: string[]): [Cmd | null, string | null];
    run(command?: string | undefined, args?: Record<string, any> | undefined): Promise<Error | unknown>;
}
