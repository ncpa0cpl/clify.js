import chalk from "chalk";
import { Argument } from "../Arguments/argument";
import { printLists } from "../Utils/print-lists";
import type { SubCommand } from "./sub-command";
import type { CommandImplementation, CommandInitializeCallback } from "./types";

const HelpFlag = Argument.define({
  flagChar: "-h",
  keyword: "--help",
  dataType: "boolean",
  displayName: "help",
  description: "Show help for the command.",
});

export class Command {
  private static helpArgument?: Argument<"boolean", false>;

  private static initHelpArg() {
    if (!Command.helpArgument) {
      Command.helpArgument = new HelpFlag();
    }
  }

  private childCommands: SubCommand[] = [];
  private implementation: CommandImplementation | undefined = undefined;
  private initialize: CommandInitializeCallback | undefined = undefined;

  protected description = "";
  protected shortDescription = "";
  protected name = "";

  private setImplementation(impl: CommandImplementation) {
    this.implementation = impl;
  }

  protected runInitialize() {
    if (this.initialize && !this.implementation) {
      Argument["startCommandInitialization"]();

      try {
        Command.initHelpArg();

        const data = this.initialize();

        this.setImplementation(data);

        if (data.commandDescription) this.description = data.commandDescription;
        if (data.shortDescription)
          this.shortDescription = data.shortDescription;
        if (data.displayName) this.name = data.displayName;
      } finally {
        Argument["endCommandInitialization"]();
      }
    }
  }

  protected define(initialize: CommandInitializeCallback) {
    this.initialize = initialize;
  }

  protected execute() {
    this.runInitialize();

    if (Command.helpArgument?.isSet && Command.helpArgument.value === true)
      return this.printHelpMessage();

    Argument["validateArguments"]();
    if (this.implementation) return this.implementation.run();
  }

  protected addChildCommand(c: SubCommand) {
    if (this.findChildCommand(c["keyword"])) {
      throw new Error(
        `${chalk.red(
          "Internal Error:"
        )} There cannot be multiple commands with the same keyword.`
      );
    }

    this.childCommands.push(c);
  }

  protected findChildCommand(keyword: string) {
    return this.childCommands.find((c) => c["keyword"] === keyword);
  }

  protected getName() {
    return this.name;
  }

  protected printHelpMessage() {
    const argsInfo = Argument["getArgumentsInfo"]();
    const commandName = this.getName();

    if (this.description) {
      printLists([[`${commandName}:`, this.description]]);
    } else if (this.shortDescription) {
      printLists([[`${commandName}:`, this.shortDescription]]);
    } else {
      printLists([[`${commandName}:`]]);
    }

    if (this.childCommands.length > 0) {
      console.log("\nCommands:");
      printLists(
        this.childCommands.map((child) => child["getPrintableList"]()),
        true
      );
    }

    console.log("\nArguments:");
    printLists(argsInfo, true);
  }

  /**
   * Sets the description of this command that will be displayed
   * when looking up the `--help` for this command.
   */
  setDescription(description: string) {
    this.description = description;
  }

  /**
   * Sets the name that will be displayed for this Command in the
   * command line interface.
   */
  setDisplayName(name: string) {
    this.name = name;
  }
}
