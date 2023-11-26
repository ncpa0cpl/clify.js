// src/program.ts
import minimist from "minimist";
import { ClifyGlobals } from "./clify.mjs";
var ClifyProgram = class {
  constructor(mainCommand) {
    this.mainCommand = mainCommand;
  }
  init(command, args) {
    if (command != null) {
      const parsedArgs = {
        _: command.split(" "),
        ...args
      };
      return parsedArgs;
    }
    return minimist(ClifyGlobals.getArgs());
  }
  findCommand(command) {
    return this.mainCommand.findSubcommand(command);
  }
  run(command, args) {
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
};
export {
  ClifyProgram
};
