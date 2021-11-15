import chalk from "chalk";
import path from "path";
import { Arguments } from "../Arguments/argument-parser";
import { Command } from "./command";
import { SubCommand } from "./sub-command";
import type { CommandImplementation, CommandInitiator } from "./types";

export class MainCommand extends Command {
  private isDefaultCommandSet = false;

  constructor() {
    super();
    const scriptPath = process.argv[1];

    this.name = path.parse(scriptPath).name;
  }

  setMainAction(initiator: () => CommandImplementation) {
    this.define(initiator);
    this.isDefaultCommandSet = true;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setName(name: string) {
    this.name = name;
  }

  addSubCommand(keyword: string, initiator: CommandInitiator) {
    const subCommand = new SubCommand(keyword, initiator);
    this.addChildCommand(subCommand);
    return subCommand;
  }

  protected start() {
    try {
      const subCommandsPath = Arguments.getSubCommandsPath();

      if (subCommandsPath.length === 0 && this.isDefaultCommandSet)
        return this.execute();

      let command: Command | undefined = this;

      while (true) {
        if (subCommandsPath.length === 0) break;
        if (!command) break;

        const keyword = subCommandsPath.shift()!;

        command = command["findChildCommand"](keyword);
      }

      if (command) return command["execute"]();
    } catch (e) {
      console.error(chalk.redBright("An error occurred when running this script."));
      if (e instanceof Error) console.error(e.message);
    }
  }
}
