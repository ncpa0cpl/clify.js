import { ClifyGlobals } from "./clify";
import { Cmd, Command, CommandInitCallback } from "./commands/command";
import { ClifyProgram, Program } from "./program";
import { assertNotAsync } from "./utils/assert-not-async";

interface MainCommand extends Command {
  main(initCallback: CommandInitCallback): void;
  setVersion(version: string): void;
  setName(name: string): void;
  setDescription(description: string): void;
}

export class MainCmd extends Cmd implements MainCommand {
  protected version?: string;
  protected programName?: string;

  printVersionInfo(): void {
    let msg = "";
    if (this.programName != null) {
      msg = `${this.programName} `;
    }
    if (this.version != null) {
      msg += `${this.version} `;
    }

    ClifyGlobals.log(msg);
  }

  setVersion(version: string): void {
    this.version = version;
  }

  setName(name: string): void {
    this.programName = name;
  }

  main(initCallback: CommandInitCallback): void {
    this.ownAction = initCallback(this);
  }

  protected override getName(): string {
    return this.programName ?? "";
  }
}

export function configure(
  configureCallback: (mainCommand: MainCommand) => void,
): Program {
  const mainCommand = new MainCmd("");
  assertNotAsync(configureCallback(mainCommand), "configureCallback");
  return new ClifyProgram(mainCommand);
}
