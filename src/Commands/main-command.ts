import path from "path";
import { isArgName } from "../Arguments/Utils/is-arg-name";
import { Arguments } from "../Arguments/argument-parser";
import { Command } from "./command";
import { defaultInitializer } from "./default-initializer";
import { SubCommand } from "./sub-command";
import type {
  CommandInitializeCallback,
  MainCommandInitializeCallback,
} from "./types";

export type MainCommandOptions = {
  /**
   * When enabled, script will ignore any invalid arguments without
   * printing errors.
   */
  allowUnrecognizedArguments?: boolean;
};

export class MainCommand extends Command {
  private options: MainCommandOptions = {};

  constructor() {
    super();
    const scriptPath = process.argv[1];

    this.name = path.parse(scriptPath).name;

    this.define(defaultInitializer);
  }

  private parseCliCommand() {
    const args = process.argv.slice(2);

    let command: Command = this;

    let i = 0;
    for (; i < args.length; i++) {
      const cmdName = args[i]!;
      if (!command || isArgName(cmdName)) break;

      const cmdReplacement = command.findChildCommand(cmdName);

      if (cmdReplacement) {
        command = cmdReplacement;
      } else {
        break;
      }
    }

    const rest: string[] = [];

    for (; i < args.length; i++) {
      rest.push(args[i]!);
    }

    return [command, rest] as const;
  }

  /**
   * @internal
   */
  public start() {
    const [command, args] = this.parseCliCommand();

    return command.execute(args);
  }

  /**
   * Sets the default behavior for this script when started from the
   * CLI without any sub-commands.
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
    initialize: CommandInitializeCallback = defaultInitializer,
  ) {
    const subCommand = new SubCommand(keyword, initialize);
    this.addChildCommand(subCommand);
    return subCommand;
  }

  setOptions(opt: MainCommandOptions) {
    this.options = opt;
    Arguments.allowUnrecognized(
      this.options.allowUnrecognizedArguments ?? false,
    );
  }
}
