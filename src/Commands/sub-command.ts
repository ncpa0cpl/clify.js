import { Command } from "./command";
import { defaultInitializer } from "./default-initializer";
import type { CommandInitializeCallback } from "./types";

export class SubCommand extends Command {
  protected keyword: string;

  constructor(keyword: string, initialize: CommandInitializeCallback) {
    super();
    this.define(initialize);

    this.keyword = keyword;
  }

  protected getPrintableList() {
    this.runInitialize();
    return [this.keyword, this.shortDescription];
  }

  getName() {
    return this.name || this.keyword;
  }

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
  addSubCommand(
    keyword: string,
    initialize: CommandInitializeCallback = defaultInitializer
  ) {
    const subCommand = new SubCommand(keyword, initialize);
    this.addChildCommand(subCommand);
    return subCommand;
  }
}
