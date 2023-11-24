import minimist from "minimist";
import { ClifyGlobals } from "./clify";
import { Cmd } from "./commands/command";
import { MainCmd } from "./configure";

export interface Program {
  /**
   * Starts the program with the given command and arguments,
   * if not specified, it will use the process.argv.
   */
  run(command?: string, args?: Record<string, any>): Promise<unknown>;
}

export class ClifyProgram implements Program {
  constructor(protected mainCommand: MainCmd) {}

  init(
    command?: string | undefined,
    args?: Record<string, any> | undefined
  ): minimist.ParsedArgs {
    if (command != null) {
      const parsedArgs: minimist.ParsedArgs = {
        _: command.split(" "),
        ...args,
      };

      return parsedArgs;
    }

    return minimist(ClifyGlobals.getArgs());
  }

  findCommand(command: string[]): [Cmd | null, string | null] {
    return this.mainCommand.findSubcommand(command);
  }

  run(
    command?: string | undefined,
    args?: Record<string, any> | undefined
  ): Promise<Error | unknown> {
    const parsedArgs = this.init(command, args);

    if (parsedArgs.version) {
      this.mainCommand.printVersionInfo();
      return Promise.resolve();
    }

    const [cmd, input] = this.findCommand(parsedArgs._);

    if (cmd == null) {
      const errMsg = `Unknown command: ${parsedArgs._.join(" ")}`;
      ClifyGlobals.err(errMsg);
      return Promise.resolve(new Error(errMsg));
    }

    return cmd.start(parsedArgs, input);
  }
}
