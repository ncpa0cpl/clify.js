import { Argument } from "../Arguments/argument";
import { printLists } from "../Utils/print-lists";
import type { SubCommand } from "./sub-command";
import type { CommandImplementation, CommandInitiator } from "./types";

const HelpFlag = Argument.define({
  flagChar: "-h",
  keyword: "--help",
  dataType: "boolean",
  displayName: "help",
  description: "Show help for the command.",
});

const help = new HelpFlag();

export class Command {
  private childCommands: SubCommand[] = [];
  private implementation: CommandImplementation | undefined = undefined;
  private initiator: CommandInitiator | undefined = undefined;

  protected description = "";
  protected shortDescription = "";
  protected name = "";

  private setImplementation(impl: CommandImplementation) {
    this.implementation = impl;
  }

  protected initiate() {
    if (this.initiator && !this.implementation) {
      const data = this.initiator();

      this.setImplementation(data);

      if (data.commandDescription) this.description = data.commandDescription;
      if (data.shortDescription) this.shortDescription = data.shortDescription;
      if (data.name) this.name = data.name;
    }
  }

  protected define(initiator: CommandInitiator) {
    this.initiator = initiator;
  }

  protected execute() {
    this.initiate();

    if (help.isSet && help.value === true) return this.printHelpMessage();

    Argument["validateArguments"]();
    if (this.implementation) return this.implementation.run();
  }

  protected addChildCommand(c: SubCommand) {
    if (this.findChildCommand(c["keyword"])) {
      throw new Error("There cannot be multiple commands with the same keyword.");
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
}
