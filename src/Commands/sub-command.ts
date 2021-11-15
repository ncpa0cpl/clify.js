import { Command } from "./command";
import type { CommandInitiator } from "./types";

export class SubCommand extends Command {
  protected keyword: string;

  constructor(keyword: string, initiator: CommandInitiator) {
    super();
    this.define(initiator);

    this.keyword = keyword;
  }

  protected getPrintableList() {
    this.initiate();
    return [this.keyword, this.shortDescription];
  }

  getName() {
    return this.name || this.keyword;
  }

  addSubCommand(keyword: string, initiator: CommandInitiator) {
    const subCommand = new SubCommand(keyword, initiator);
    this.addChildCommand(subCommand);
    return subCommand;
  }
}
