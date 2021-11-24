import { Command } from "./command";
import { SubCommand } from "./sub-command";
import type { CommandInitializeCallback, MainCommandInitializeCallback } from "./types";
export declare class MainCommand extends Command {
    protected static init(): MainCommand;
    private constructor();
    protected start(): void;
    /**
     * Sets the default behavior for this script when started from
     * the CLI without any sub-commands.
     */
    setMainAction(initialize: MainCommandInitializeCallback): void;
    /**
     * Creates a sub-command for this script.
     *
     * @example
     *   mainCommand.addSubCommand("cmdName", () => {
     *     return {
     *       run() {
     *         console.log("Sub Command ran.");
     *       },
     *     };
     *   });
     *
     *   // CLI: node my-script.js cmdName
     *   // Output: "Sub Command ran."
     */
    addSubCommand(keyword: string, initialize?: CommandInitializeCallback): SubCommand;
}
