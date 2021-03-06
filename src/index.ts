import chalk from "chalk";
import { Argument } from "./Arguments/argument";
import { MainCommand } from "./Commands/main-command";

const mainCommand = MainCommand["init"]();

/**
 * Initiates and configures the script. This method takes one
 * argument, an initiation callback.
 *
 * @example
 *   configure((mainCommand) => {
 *     mainCommand.setName("my-script");
 *     mainCommand.setMainAction(() => {
 *       return {
 *         run() {
 *           // Here goes the main command implementation
 *         },
 *       };
 *     });
 *
 *     mainCommand.addSubCommand("sub-command", () => {
 *       return {
 *         run() {
 *           // Here goes the sub-command implementation
 *         },
 *       };
 *     });
 *   });
 */
function configure(initialize: (mainCommand: MainCommand) => void) {
  try {
    initialize(mainCommand);
    mainCommand["start"]();
  } catch (e) {
    console.error(
      chalk.redBright("An error occurred when running this script.")
    );
    if (e instanceof Error) console.error(e.message);
  }
}

export { configure, Argument, MainCommand };

export default { configure, Argument, MainCommand };
