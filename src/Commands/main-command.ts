import path from "path";
import { Arguments } from "../Arguments/argument-parser";
import { Command } from "./command";
import { defaultInitializer } from "./default-initializer";
import { SubCommand } from "./sub-command";
import type {
  CommandInitializeCallback,
  MainCommandInitializeCallback,
} from "./types";

export class MainCommand extends Command {
  protected static init() {
    return new MainCommand();
  }

  private constructor() {
    super();
    const scriptPath = process.argv[1];

    this.name = path.parse(scriptPath).name;

    this.define(defaultInitializer);
  }

  protected start() {
    const subCommandsPath = Arguments.getSubCommandsPath();

    if (subCommandsPath.length === 0) return this.execute();

    let command: Command | undefined = this;

    while (true) {
      if (subCommandsPath.length === 0) break;
      if (!command) break;

      const keyword = subCommandsPath.shift()!;

      command = command["findChildCommand"](keyword);
    }

    if (command) return command["execute"]();
  }

  /**
   * Sets the default behavior for this script when started from
   * the CLI without any sub-commands.
   */
  setMainAction(initialize: MainCommandInitializeCallback) {
    this.define(initialize);
  }

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
  addSubCommand(
    keyword: string,
    initialize: CommandInitializeCallback = defaultInitializer
  ) {
    const subCommand = new SubCommand(keyword, initialize);
    this.addChildCommand(subCommand);
    return subCommand;
  }
}
