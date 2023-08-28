import { DataType, Type } from "dilswer";
import { html } from "termx-markup";
import { Argument } from "./Arguments/argument";
import {
  InputFileArg,
  InputFileHandleArg,
} from "./Arguments/input-file-arg";
import { MainCommand } from "./Commands/main-command";
import { ClifyError, ExitError } from "./Utils/errors";
import { Out } from "./output";
import { StdInput } from "./stdinput";

const DEBUG = process.env.DEBUG === "true";

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
async function configure(
  initialize: (mainCommand: MainCommand) => void,
) {
  try {
    const mainCommand = new MainCommand();
    await initialize(mainCommand);
    await mainCommand.start();
  } catch (e) {
    if (e instanceof ClifyError) {
      if (DEBUG) {
        Out.debug(html`<pre>${String(e.stack)}</pre>`);
      }
      process.exit(1);
    }

    Out.err(html`
      <span bold color="lightRed">
        An error occurred when running this script.
      </span>
    `);

    if (e instanceof Error) {
      Out.err(html` <pad size="2" color="red"> ${e.message} </pad> `);

      if (DEBUG) {
        Out.debug(html`<pre>${String(e.stack)}</pre>`);
      }
    }

    if (e instanceof ExitError) {
      process.exit(e.code);
    }

    process.exit(1);
  }
}

export {
  Argument,
  DataType,
  ExitError,
  InputFileArg,
  InputFileHandleArg,
  MainCommand,
  Out,
  StdInput,
  Type,
  configure,
  html,
};
export default {
  Argument,
  DataType,
  ExitError,
  InputFileArg,
  InputFileHandleArg,
  MainCommand,
  Out,
  StdInput,
  Type,
  configure,
  html,
};
