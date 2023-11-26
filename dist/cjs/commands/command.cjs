"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/commands/command.ts
var command_exports = {};
__export(command_exports, {
  Cmd: () => Cmd
});
module.exports = __toCommonJS(command_exports);
var import_clify = require("../clify.cjs");
var import_command_input = require("./command-input.cjs");
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
  option(Option) {
    const option = new Option(this);
    this.ownOptions.push(option);
    return option;
  }
  input() {
    if (this.ownInput != null) {
      return this.ownInput;
    }
    return this.ownInput = new import_command_input.CmdInput(this);
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
    const log = import_clify.ClifyGlobals.log.bind(import_clify.ClifyGlobals);
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
    switch (state) {
      case 0 /* HAS_NOTHING */:
      case 4 /* HAS_ACTION */:
        break;
      case 2 /* HAS_INPUT */:
      case 6 /* HAS_INPUT_ACTION */:
        usage += " INPUT";
        break;
      case 1 /* HAS_SUBCMD */:
        usage += " COMMAND";
        break;
      case 5 /* HAS_SUBCMD_ACTION */:
        usage += " COMMAND?";
        break;
      case 3 /* HAS_SUBCMD_INPUT */:
        usage += " COMMAND|INPUT";
        break;
      case 7 /* HAS_SUBCMD_INPUT_ACTION */:
        usage += " COMMAND|INPUT?";
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
    let optsList = [];
    if (this.ownOptions.length > 0) {
      const optNames = this.ownOptions.map((arg) => {
        return `  ${arg.getNameWithType()}`;
      });
      const longestLen = optNames.reduce(
        (a, b) => a.length > b.length ? a : b,
        ""
      ).length;
      optsList = optNames.map((arg, i) => {
        return arg.padEnd(longestLen + 4) + this.ownOptions[i].getDescription();
      }).sort(alphasort);
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
  printUnknownArgsMsg(unknownArgs) {
    const logErr = import_clify.ClifyGlobals.err.bind(import_clify.ClifyGlobals);
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
    const logErr = import_clify.ClifyGlobals.err.bind(import_clify.ClifyGlobals);
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
      import_clify.ClifyGlobals.warn("Nothing to do.");
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
