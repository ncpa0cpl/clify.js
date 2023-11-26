import minimist from "minimist";
import { ClifyGlobals } from "../clify";
import { Opt, OptConstructor, Option, OptionType } from "../options/option";
import { OptionError } from "../options/option-error";
import { CmdInput } from "./command-input";

export type CommandResult = any | Promise<any>;

export interface CommandInput {
  source: "argument" | "stdin";
  get(): string;
}

export interface CommandInitCallback {
  (command: CommandInitPhase): () => CommandResult;
}

export interface CommandInitPhase {
  /**
   * Define a cli option for the command. Should be called inside the command
   * initialization callback, but outside the action callback.
   */
  option<T extends OptionType, R extends boolean>(
    option: OptConstructor<T, R>
  ): Option<T, R>;
  /**
   * Creates a interface that can be used to read the command input. Input
   * can be either a filepath given as a command line argument, or the stdin.
   */
  input(): CommandInput;
  setDescription(description: string): void;
}

export interface Command {
  /**
   * Define a subcommand.
   */
  command(name: string, initCallback: CommandInitCallback): Command;
}

enum CmdConfigState {
  HAS_NOTHING = 0b000,
  HAS_SUBCMD = 0b001,
  HAS_INPUT = 0b010,
  HAS_ACTION = 0b100,
  HAS_SUBCMD_INPUT = 0b011,
  HAS_SUBCMD_ACTION = 0b101,
  HAS_INPUT_ACTION = 0b110,
  HAS_SUBCMD_INPUT_ACTION = 0b111,
}

const alphasort = (a: string, b: string) => a.localeCompare(b);

export class Cmd implements Command, CommandInitPhase {
  protected ownOptions: Array<Opt<OptionType, boolean>> = [];
  protected ownAction: (() => any) | undefined;
  protected subCommands: Array<Cmd> = [];
  protected parsedArgs!: minimist.ParsedArgs;
  protected ownInput: CmdInput | undefined;

  protected description: string = "";

  constructor(protected cmdName: string, protected parentCommand?: Cmd) {}

  command(name: string, initCallback: CommandInitCallback): Command {
    const cmd = new Cmd(name, this);
    cmd.ownAction = initCallback(cmd);
    this.subCommands.push(cmd);
    return cmd;
  }

  option<T extends OptionType, R extends boolean>(
    Option: OptConstructor<T, R>
  ): Option<T, R> {
    const option = new Option(this);
    this.ownOptions.push(option as Opt<T, R>);
    return option;
  }

  input(): CommandInput {
    if (this.ownInput != null) {
      return this.ownInput;
    }

    return (this.ownInput = new CmdInput(this));
  }

  setDescription(description: string) {
    this.description = description;
  }

  findSubcommand(command: string[]): [Cmd | null, string | null] {
    if (command.length === 0) {
      return [this, null];
    }

    const [firstCommand] = command;

    const subCommand = this.subCommands.find(
      (cmd) => cmd.cmdName === firstCommand
    );

    if (subCommand == null) {
      if (this.ownInput && command.length === 1) {
        return [this, command[0]!];
      }

      return [null, null];
    }

    return subCommand.findSubcommand(command.slice(1));
  }

  protected getName(): string {
    let parentName = this.parentCommand?.getName();
    if (parentName != null) {
      return parentName + " " + this.cmdName;
    }
    return this.cmdName;
  }

  protected printHelp() {
    const log = ClifyGlobals.log.bind(ClifyGlobals);

    let usage = `Usage: ${this.getName()}`;
    let state = CmdConfigState.HAS_NOTHING;
    if (this.subCommands.length > 0) {
      state |= CmdConfigState.HAS_SUBCMD;
    }
    if (this.ownInput) {
      state |= CmdConfigState.HAS_INPUT;
    }
    if (this.ownAction) {
      state |= CmdConfigState.HAS_ACTION;
    }

    switch (state) {
      case CmdConfigState.HAS_NOTHING:
      case CmdConfigState.HAS_ACTION:
        break;
      case CmdConfigState.HAS_INPUT:
      case CmdConfigState.HAS_INPUT_ACTION:
        // no sub-commands
        usage += " INPUT";
        break;
      case CmdConfigState.HAS_SUBCMD:
        // Has sub-commands, but no action itself
        // so the sub-command is required
        usage += " COMMAND";
        break;
      case CmdConfigState.HAS_SUBCMD_ACTION:
        usage += " COMMAND?";
        break;
      case CmdConfigState.HAS_SUBCMD_INPUT:
        usage += " COMMAND|INPUT";
        break;
      case CmdConfigState.HAS_SUBCMD_INPUT_ACTION:
        usage += " COMMAND|INPUT?";
        break;
    }

    if (this.ownOptions.length > 0) {
      usage += " [...OPTIONS]";
    }

    let commandsList: string[] = [];

    if (this.subCommands.length > 0) {
      const cmdNames = this.subCommands.map((cmd) => {
        return `  ${cmd.cmdName}`;
      });
      const longestLen = cmdNames.reduce(
        (a, b) => (a.length > b.length ? a : b),
        ""
      ).length;
      commandsList = cmdNames
        .map((cmd, i) => {
          return cmd.padEnd(longestLen + 4) + this.subCommands[i]!.description;
        })
        .sort(alphasort);
    }

    let optsList: string[] = [];
    if (this.ownOptions.length > 0) {
      const optNames = this.ownOptions.map((arg) => {
        return `  ${arg.getNameWithType()}`;
      });
      const longestLen = optNames.reduce(
        (a, b) => (a.length > b.length ? a : b),
        ""
      ).length;
      optsList = optNames
        .map((arg, i) => {
          return (
            arg.padEnd(longestLen + 4) + this.ownOptions[i]!.getDescription()
          );
        })
        .sort(alphasort);
    }

    log(usage);
    if (this.description) {
      log("");
      log(this.description);
    }
    if (commandsList.length > 0) {
      log("");
      log("Commands:");
      for (const cmd of commandsList) {
        log(cmd);
      }
    }
    if (optsList.length > 0) {
      log("");
      log("Options:");
      for (const opt of optsList) {
        log(opt);
      }
    }
  }

  protected printUnknownArgsMsg(unknownArgs: string[]) {
    const logErr = ClifyGlobals.err.bind(ClifyGlobals);

    logErr("Unknown options:");
    unknownArgs.forEach((arg) => {
      if (arg.length === 1) {
        logErr(`  -${arg}`);
      } else {
        logErr(`  --${arg}`);
      }
    });
  }

  protected printArgumentErrors(errors: OptionError[]) {
    const logErr = ClifyGlobals.err.bind(ClifyGlobals);

    logErr("Invalid options:");
    errors.forEach((err) => {
      logErr(`  ${err.toPrintable()}`);
    });
  }

  protected async prepare(): Promise<"ok" | "skip" | "fail"> {
    if ("help" in this.parsedArgs) {
      this.printHelp();
      return "skip";
    }

    // Detect unknown arguments
    const argNames = Object.keys(this.parsedArgs).filter(
      (key) => key !== "_" && key !== "__"
    );

    const unknownArgs: string[] = [];

    for (let i = 0; i < argNames.length; i++) {
      const name = argNames[i]!;

      if (this.ownOptions.some((a) => a.nameMatches(name))) {
        continue;
      }

      unknownArgs.push(name);
    }

    if (unknownArgs.length > 0) {
      this.printUnknownArgsMsg(unknownArgs);
      return "fail";
    }

    // Validate known arguments
    const validationErrors: OptionError[] = [];

    for (let i = 0; i < this.ownOptions.length; i++) {
      const err = this.ownOptions[i]!.init();
      if (err != null) {
        validationErrors.push(err);
      }
    }

    if (validationErrors.length > 0) {
      this.printArgumentErrors(validationErrors);
      return "fail";
    }

    if (this.ownInput) {
      await this.ownInput.prepare();
      return this.ownInput.validate() ? "ok" : "fail";
    }

    return "ok";
  }

  protected runAction() {
    if (this.ownAction == null) {
      ClifyGlobals.warn("Nothing to do.");
      return Promise.resolve(new Error("Nothing to do."));
    }

    return this.ownAction();
  }

  getParsedArgs(): minimist.ParsedArgs {
    return this.parsedArgs;
  }

  async start(parsedArgs: minimist.ParsedArgs, input: string | null) {
    this.parsedArgs = parsedArgs;
    this.ownInput?.setArgumentInput(input);

    const r = await this.prepare();
    if (r === "ok") {
      return this.runAction();
    } else if (r === "fail") {
      return Promise.resolve(new Error("Command failed"));
    }
  }
}
