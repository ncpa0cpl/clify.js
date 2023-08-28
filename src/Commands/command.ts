import { Type } from "dilswer";
import { html } from "termx-markup";
import { Argument } from "../Arguments/argument";
import { Arguments } from "../Arguments/argument-parser";
import { InitError } from "../Utils/errors";
import { groupByCategory } from "../Utils/group-by-category";
import { printLists } from "../Utils/print-lists";
import { Out } from "../output";
import { StdInput } from "../stdinput";
import type { SubCommand } from "./sub-command";
import type {
  CommandImplementation,
  CommandInitializeCallback,
} from "./types";

const HelpArg = Argument.define({
  arg: "-h",
  fullArg: "--help",
  dataType: Type.Boolean,
  description: "Show this help message.",
});

export class Command {
  private static helpArgument: Argument<typeof Type.Boolean, false>;

  private static initHelpArg() {
    if (!Command.helpArgument) {
      Command.helpArgument = new HelpArg();
    }
  }

  private childCommands: SubCommand[] = [];
  private implementation: CommandImplementation | undefined =
    undefined;
  private initialize: CommandInitializeCallback | undefined =
    undefined;

  protected description = "";
  protected shortDescription = "";
  protected name = "";

  private setImplementation(impl: CommandImplementation) {
    this.implementation = impl;
  }

  /**
   * @internal
   */
  public runInitialize() {
    Argument.startCommandInitialization();
    try {
      Command.initHelpArg();

      if (this.initialize && !this.implementation) {
        const data = this.initialize();

        this.setImplementation(data);

        if (data.commandDescription)
          this.description = data.commandDescription;
        if (data.shortDescription)
          this.shortDescription = data.shortDescription;
        if (data.displayName) this.name = data.displayName;
      }
    } finally {
      Argument.endCommandInitialization();
    }
  }

  /**
   * @internal
   */
  public define(initialize: CommandInitializeCallback) {
    this.initialize = initialize;
  }

  /**
   * @internal
   */
  public async execute(args: string[]) {
    this.runInitialize();
    await Arguments.parseArguments(args);

    if (Command.helpArgument.value === true)
      return this.printHelpMessage();

    if (!Arguments.hasFileInputArg() && StdInput.instance) {
      await StdInput.load(StdInput.instance);
    }

    Arguments.validateAll();

    if (this.implementation) {
      return this.implementation.run();
    }
  }

  /**
   * @internal
   */
  public addChildCommand(c: SubCommand) {
    if (this.findChildCommand(c.keyword)) {
      Out.err(html`
        <span color="lightRed">Internal Error</span>
        <line>
          Command with the name "${c.keyword}" already exists.
        </line>
      `);
      throw new InitError();
    }

    this.childCommands.push(c);
  }

  /**
   * @internal
   */
  public findChildCommand(keyword: string) {
    return this.childCommands.find((c) => c.keyword === keyword);
  }

  protected getName() {
    return this.name;
  }

  /**
   * @internal
   */
  public printHelpMessage() {
    const argsInfo = groupByCategory(Argument.getArgumentsInfo());
    const commandName = this.getName();

    if (this.childCommands.length > 0) {
      if (Arguments.hasFileInputArg()) {
        Out.out(html`
          <span>${commandName} [COMMAND] [OPTION]... [FILE]</span>
        `);
      } else {
        Out.out(html`
          <span>${commandName} [COMMAND] [OPTION]...</span>
        `);
      }
    } else {
      if (Arguments.hasFileInputArg()) {
        Out.out(html`
          <span>${commandName} [OPTION]... [FILE]</span>
        `);
      } else {
        Out.out(html` <span>${commandName} [OPTION]...</span> `);
      }
    }

    Out.out("");

    if (this.description) {
      Out.out(html` <span>${this.description}</span> `);
    } else if (this.shortDescription) {
      Out.out(html` <span>${this.shortDescription}</span> `);
    }

    if (this.childCommands.length > 0) {
      Out.out(html` <span bold>Commands:</span> `);
      printLists(
        this.childCommands.map((child) =>
          child["getPrintableList"](),
        ),
        true,
      );
      Out.out(html` <span></span> `);
    }

    Out.out(html` <span bold>Arguments:</span> `);

    for (const [category, args] of argsInfo) {
      if (category.length > 0) {
        Out.out(html` <span bold>${category}:</span> `);
      }

      printLists(
        args.map((arg) => [
          arg.arg ?? "",
          arg.fullArg ?? "",
          arg.description,
        ]),
        true,
      );
    }
  }

  /**
   * Sets the description of this command that will be displayed when
   * looking up the `--help` for this command.
   */
  public setDescription(description: string) {
    this.description = description;
  }

  /**
   * Sets the name that will be displayed for this Command in the
   * command line interface.
   */
  public setDisplayName(name: string) {
    this.name = name;
  }
}
