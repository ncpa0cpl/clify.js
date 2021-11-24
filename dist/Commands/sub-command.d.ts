import { Command } from "./command";
import type { CommandInitializeCallback } from "./types";
export declare class SubCommand extends Command {
    protected keyword: string;
    constructor(keyword: string, initialize: CommandInitializeCallback);
    protected getPrintableList(): string[];
    getName(): string;
    /**
     * Adds a sub-command for this command. Sub commands can be nested.
     *
     * @example
     *   const command_1 = mainCommand.addSubCommand(
     *     "command_1",
     *     () => ({
     *       run() {
     *         console.log("Sub-command 1 ran.");
     *       },
     *     })
     *   );
     *
     *   const command_2 = command_1.addSubCommand(
     *     "command_2",
     *     () => {
     *       return {
     *         run() {
     *           console.log("Nested sub-command ran.");
     *         },
     *       };
     *     }
     *   );
     *
     *   // CLI: node my-script.js command_1 command_2
     *   // Output: "Nested sub-command ran."
     */
    addSubCommand(keyword: string, initialize?: CommandInitializeCallback): SubCommand;
}
