import minimist from "minimist";
import { Opt, OptConstructor, Option, OptionType } from "../options/option";
import { OptionError } from "../options/option-error";
import { CmdInput } from "./command-input";
export type CommandResult = any | Promise<any>;
export interface CommandInput {
    source: "argument" | "stdin";
    get(): string;
}
export interface CommandInitCallback {
    (command: CommandInitPhase): () => CommandResult;
}
export interface CommandInitPhase {
    /**
     * Define a cli option for the command. Should be called inside the command
     * initialization callback, but outside the action callback.
     */
    option<T extends OptionType, R extends boolean>(option: OptConstructor<T, R>): Option<T, R>;
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
    protected cmdName: string;
    protected parentCommand?: Cmd | undefined;
    protected ownOptions: Array<Opt<OptionType, boolean>>;
    protected ownAction: (() => any) | undefined;
    protected subCommands: Array<Cmd>;
    protected parsedArgs: minimist.ParsedArgs;
    protected ownInput: CmdInput | undefined;
    protected description: string;
    constructor(cmdName: string, parentCommand?: Cmd | undefined);
    command(name: string, initCallback: CommandInitCallback): Command;
    option<T extends OptionType, R extends boolean>(Option: OptConstructor<T, R>): Option<T, R>;
    input(): CommandInput;
    setDescription(description: string): void;
    findSubcommand(command: string[]): [Cmd | null, string | null];
    protected getName(): string;
    protected printHelp(): void;
    protected printUnknownArgsMsg(unknownArgs: string[]): void;
    protected printArgumentErrors(errors: OptionError[]): void;
    protected prepare(): Promise<"ok" | "skip" | "fail">;
    protected runAction(): any;
    getParsedArgs(): minimist.ParsedArgs;
    start(parsedArgs: minimist.ParsedArgs, input: string | null): Promise<any>;
}
