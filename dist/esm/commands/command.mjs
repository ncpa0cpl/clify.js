var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/commands/command.ts
import { ClifyGlobals } from "../clify.mjs";
import {
  DEFAULT_CATEGORY
} from "../options/option.mjs";
import { CmdInput, CmdInputStream } from "./command-input.mjs";
var alphasort = (a, b) => a.localeCompare(b);
var Cmd = class _Cmd {
  constructor(cmdName, parentCommand) {
    this.cmdName = cmdName;
    this.parentCommand = parentCommand;
    __publicField(this, "ownOptions", []);
    __publicField(this, "ownAction");
    __publicField(this, "subCommands", []);
    __publicField(this, "parsedArgs");
    __publicField(this, "ownInput");
    __publicField(this, "description", "");
  }
  command(name, initCallback) {
    const cmd = new _Cmd(name, this);
    cmd.ownAction = initCallback(cmd);
    this.subCommands.push(cmd);
    return cmd;
  }
  option(Option2) {
    const option = new Option2(this);
    this.ownOptions.push(option);
    return option;
  }
  input(options) {
    if (this.ownInput != null) {
      if (options != null) {
        this.ownInput.setOptions(options);
      }
      return this.ownInput;
    }
    return this.ownInput = new CmdInput(this, options);
  }
  inputStream(options) {
    if (this.ownInput != null) {
      if (options != null) {
        this.ownInput.setOptions(options);
      }
      return this.ownInput;
    }
    return this.ownInput = new CmdInputStream(this, options);
  }
  setDescription(description) {
    this.description = description;
  }
  findSubcommand(command) {
    if (command.length === 0) {
      return [this, null];
    }
    const [firstCommand] = command;
    const subCommand = this.subCommands.find(
      (cmd) => cmd.cmdName === firstCommand
    );
    if (subCommand == null) {
      if (this.ownInput && command.length === 1) {
        return [this, command[0]];
      }
      return [null, null];
    }
    return subCommand.findSubcommand(command.slice(1));
  }
  getName() {
    let parentName = this.parentCommand?.getName();
    if (parentName != null) {
      return parentName + " " + this.cmdName;
    }
    return this.cmdName;
  }
  printHelp() {
    const log = ClifyGlobals.log.bind(ClifyGlobals);
    let usage = `Usage: ${this.getName()}`;
    let state = 0 /* HAS_NOTHING */;
    if (this.subCommands.length > 0) {
      state |= 1 /* HAS_SUBCMD */;
    }
    if (this.ownInput) {
      state |= 2 /* HAS_INPUT */;
    }
    if (this.ownAction) {
      state |= 4 /* HAS_ACTION */;
    }
    const inputName = this.ownInput?.getName() ?? "INPUT";
    switch (state) {
      case 0 /* HAS_NOTHING */:
      case 4 /* HAS_ACTION */:
        break;
      case 2 /* HAS_INPUT */:
      case 6 /* HAS_INPUT_ACTION */:
        usage += ` ${inputName}`;
        break;
      case 1 /* HAS_SUBCMD */:
        usage += " COMMAND";
        break;
      case 5 /* HAS_SUBCMD_ACTION */:
        usage += " COMMAND?";
        break;
      case 3 /* HAS_SUBCMD_INPUT */:
        usage += ` COMMAND|${inputName}`;
        break;
      case 7 /* HAS_SUBCMD_INPUT_ACTION */:
        usage += ` COMMAND|${inputName}?`;
        break;
    }
    if (this.ownOptions.length > 0) {
      usage += " [...OPTIONS]";
    }
    let commandsList = [];
    if (this.subCommands.length > 0) {
      const cmdNames = this.subCommands.map((cmd) => {
        return `  ${cmd.cmdName}`;
      });
      const longestLen = cmdNames.reduce(
        (a, b) => a.length > b.length ? a : b,
        ""
      ).length;
      commandsList = cmdNames.map((cmd, i) => {
        return cmd.padEnd(longestLen + 4) + this.subCommands[i].description;
      }).sort(alphasort);
    }
    let defOptsList = [];
    const categorisedOpts = [];
    if (this.ownOptions.length > 0) {
      const optionsByCategory = Object.groupBy(
        this.ownOptions,
        (opt) => opt.getCategory()
      );
      for (const category of Reflect.ownKeys(optionsByCategory)) {
        const options = optionsByCategory[category];
        const optNames = options.map((arg) => {
          return `  ${arg.getNameWithType()}`;
        });
        const longestLen = optNames.reduce(
          (a, b) => a.length > b.length ? a : b,
          ""
        ).length;
        const lines = optNames.map((arg, i) => {
          return arg.padEnd(longestLen + 4) + options[i].getDescription();
        }).sort(alphasort);
        if (category === DEFAULT_CATEGORY) {
          defOptsList = lines;
        } else {
          categorisedOpts.push([category, lines]);
        }
      }
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
    if (defOptsList.length > 0 || categorisedOpts.length > 0) {
      log("");
      log("Options:");
      for (const opt of defOptsList) {
        log(opt);
      }
      for (const [category, lines] of categorisedOpts) {
        log("");
        log(category + ":");
        for (const l of lines) {
          log(l);
        }
      }
    }
  }
  printUnknownArgsMsg(unknownArgs) {
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
  printArgumentErrors(errors) {
    const logErr = ClifyGlobals.err.bind(ClifyGlobals);
    logErr("Invalid options:");
    errors.forEach((err) => {
      logErr(`  ${err.toPrintable()}`);
    });
  }
  async prepare() {
    if ("help" in this.parsedArgs) {
      this.printHelp();
      return "skip";
    }
    const argNames = Object.keys(this.parsedArgs).filter(
      (key) => key !== "_" && key !== "__"
    );
    const unknownArgs = [];
    for (let i = 0; i < argNames.length; i++) {
      const name = argNames[i];
      if (this.ownOptions.some((a) => a.nameMatches(name))) {
        continue;
      }
      unknownArgs.push(name);
    }
    if (unknownArgs.length > 0) {
      this.printUnknownArgsMsg(unknownArgs);
      return "fail";
    }
    const validationErrors = [];
    for (let i = 0; i < this.ownOptions.length; i++) {
      const err = this.ownOptions[i].init();
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
  runAction() {
    if (this.ownAction == null) {
      ClifyGlobals.warn("Nothing to do.");
      return Promise.resolve(new Error("Nothing to do."));
    }
    return this.ownAction();
  }
  getParsedArgs() {
    return this.parsedArgs;
  }
  async start(parsedArgs, input) {
    this.parsedArgs = parsedArgs;
    this.ownInput?.setArgumentInput(input);
    const r = await this.prepare();
    if (r === "ok") {
      return this.runAction();
    } else if (r === "fail") {
      return Promise.resolve(new Error("Command failed"));
    }
  }
};
export {
  Cmd
};
