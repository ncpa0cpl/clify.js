import { Argument } from "./Arguments/argument";
import { MainCommand } from "./Commands/main-command";
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
declare function configure(initialize: (mainCommand: MainCommand) => void): void;
export { configure, Argument, MainCommand };
declare const _default: {
    configure: typeof configure;
    Argument: typeof Argument;
    MainCommand: typeof MainCommand;
};
export default _default;
