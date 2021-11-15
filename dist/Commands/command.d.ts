import type { SubCommand } from "./sub-command";
import type { CommandInitializeCallback } from "./types";
export declare class Command {
    private static helpArgument?;
    private static initHelpArg;
    private childCommands;
    private implementation;
    private initialize;
    protected description: string;
    protected shortDescription: string;
    protected name: string;
    private setImplementation;
    protected runInitialize(): void;
    protected define(initialize: CommandInitializeCallback): void;
    protected execute(): void;
    protected addChildCommand(c: SubCommand): void;
    protected findChildCommand(keyword: string): SubCommand | undefined;
    protected getName(): string;
    protected printHelpMessage(): void;
    /**
     * Sets the description of this command that will be displayed
     * when looking up the `--help` for this command.
     */
    setDescription(description: string): void;
    /**
     * Sets the name that will be displayed for this Command in the
     * command line interface.
     */
    setDisplayName(name: string): void;
}
