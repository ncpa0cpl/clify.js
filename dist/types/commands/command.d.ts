import minimist from "minimist";
import { StdinIterator } from "../clify";
import { Opt, OptConstructor, Option, OptionType } from "../options/option";
import { OptionError } from "../options/option-error";
import { CmdInputBase } from "./command-input";
export type CommandResult = any | Promise<any>;
export interface CommandInput {
    source: "argument" | "stdin";
    get(): string | null;
}
export interface CommandInputStream {
    source: "argument" | "stdin";
    get(): StdinIterator | string | null;
}
export interface CommandInitCallback {
    (command: CommandInitPhase): () => CommandResult;
}
export interface InputStreamOptions {
    /**
     * The name that will be displayed in the help message instead of
     * the standard `INPUT`.
     */
    name?: string;
}
export interface InputOptions extends InputStreamOptions {
    /**
     * Whether to read from the stdin if no input argument is given.
     * If the `non-tty-only` is set, the stdin will be read only if the
     * `process.stdin.isTTY` is false.
     *
     * @default true
     */
    stdin?: boolean | "non-tty-only";
}
export interface CommandInitPhase {
    setDescription(description: string): void;
    /**
     * Define a cli option for the command. Should be called inside the command
     * initialization callback, but outside the action callback.
     */
    option<T extends OptionType, R extends boolean>(option: OptConstructor<T, R>): Option<T, R>;
    /**
     * Creates a interface that can be used to read the command input. Input
     * can be either a string given as a command line argument, or the stdin.
     */
    input(options?: InputOptions): CommandInput;
    /**
     * Creates a interface that can be used to read the command input chunk by
     * chunk (in case of reading from stdin). Input can be either a string given
     * as a command line argument, or the stdin.
     */
    inputStream(options?: InputStreamOptions): CommandInputStream;
    /**
     * Prints the help message for this command.
     */
    printHelp(): void;
}
export interface Command {
    /**
     * Define a subcommand.
     */
    command(name: string, initCallback: CommandInitCallback): Command;
}
export declare class Cmd implements Command, CommandInitPhase {
    protected cmdName: string;
    protected parentCommand?: Cmd | undefined;
    protected ownOptions: Array<Opt<OptionType, boolean>>;
    protected ownAction: (() => any) | undefined;
    protected subCommands: Array<Cmd>;
    protected parsedArgs: minimist.ParsedArgs;
    protected ownInput: CmdInputBase | undefined;
    protected description: string;
    constructor(cmdName: string, parentCommand?: Cmd | undefined);
    command(name: string, initCallback: CommandInitCallback): Command;
    option<T extends OptionType, R extends boolean>(Option: OptConstructor<T, R>): Option<T, R>;
    input(options?: InputOptions): CommandInput;
    inputStream(options?: InputStreamOptions): CommandInputStream;
    setDescription(description: string): void;
    findSubcommand(command: string[]): [Cmd | null, string | null];
    protected getName(): string;
    printHelp(): void;
    protected printUnknownArgsMsg(unknownArgs: string[]): void;
    protected printArgumentErrors(errors: OptionError[]): void;
    protected prepare(): Promise<"ok" | "skip" | "fail">;
    protected runAction(): any;
    getParsedArgs(): minimist.ParsedArgs;
    start(parsedArgs: minimist.ParsedArgs, input: string | null): Promise<any>;
}
