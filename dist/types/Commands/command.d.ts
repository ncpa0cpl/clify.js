export declare class Command {
    private static helpArgument;
    private static initHelpArg;
    private childCommands;
    private implementation;
    private initialize;
    protected description: string;
    protected shortDescription: string;
    protected name: string;
    private setImplementation;
    protected getName(): string;
    /**
     * Sets the description of this command that will be displayed when
     * looking up the `--help` for this command.
     */
    setDescription(description: string): void;
    /**
     * Sets the name that will be displayed for this Command in the
     * command line interface.
     */
    setDisplayName(name: string): void;
}
