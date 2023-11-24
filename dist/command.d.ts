import minimist from "minimist";
import { ArgConstructor, Argument, ArgumentImpl, ArgumentType } from "./arguments/argument";
import { ArgumentError } from "./arguments/argument-error";
import { CmdInput } from "./command-input";
export type CommandResult = void | Promise<void>;
export interface CommandInput {
    source: "argument" | "stdin";
    get(): string;
}
export interface CommandInitCallback {
    (command: CommandInitPhase): () => CommandResult;
}
export interface CommandInitPhase {
    /**
     * Define an argument for the command. Should be called inside the command
     * initialization callback, but outside the action callback.
     */
    arg<T extends ArgumentType, R extends boolean>(arg: ArgConstructor<T, R>): Argument<T, R>;
    /**
     * Creates a interface that can be used to read the command input. Input
     * can be either a filepath given as a command line argument, or the stdin.
     */
    input(): CommandInput;
    setDescription(description: string): void;
}
export interface Command {
    /**
     * Define a subcommand.
     */
    command(name: string, initCallback: CommandInitCallback): Command;
}
export declare class Cmd implements Command, CommandInitPhase {
    protected name: string;
    protected ownArguments: Array<ArgumentImpl<ArgumentType, boolean>>;
    protected ownAction: (() => any) | undefined;
    protected subCommands: Array<Cmd>;
    protected parsedArgs: minimist.ParsedArgs;
    protected ownInput: CmdInput | undefined;
    protected description: string;
    constructor(name: string);
    command(name: string, initCallback: CommandInitCallback): Command;
    arg<T extends ArgumentType, R extends boolean>(arg: ArgConstructor<T, R>): Argument<T, R>;
    input(): CommandInput;
    setDescription(description: string): void;
    findSubcommand(command: string[]): [Cmd | null, string | null];
    protected printHelp(): void;
    protected printUnknownArgsMsg(unknownArgs: string[]): void;
    protected printArgumentErrors(errors: ArgumentError[]): void;
    protected prepare(): Promise<boolean>;
    protected runAction(): any;
    getParsedArgs(): minimist.ParsedArgs;
    start(parsedArgs: minimist.ParsedArgs, input: string | null): Promise<any>;
}
