var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/configure.ts
import { ClifyGlobals } from "./clify.mjs";
import { Cmd } from "./commands/command.mjs";
import { ClifyProgram } from "./program.mjs";
import { assertNotAsync } from "./utils/assert-not-async.mjs";
var MainCmd = class extends Cmd {
  constructor() {
    super(...arguments);
    __publicField(this, "version");
    __publicField(this, "programName");
  }
  printVersionInfo() {
    let msg = "";
    if (this.programName != null) {
      msg = `${this.programName} `;
    }
    if (this.version != null) {
      msg += `${this.version} `;
    }
    ClifyGlobals.log(msg);
  }
  setVersion(version) {
    this.version = version;
  }
  setName(name) {
    this.programName = name;
  }
  main(initCallback) {
    this.ownAction = initCallback(this);
  }
  getName() {
    return this.programName ?? "";
  }
};
function configure(configureCallback) {
  const mainCommand = new MainCmd("");
  assertNotAsync(configureCallback(mainCommand), "configureCallback");
  return new ClifyProgram(mainCommand);
}
export {
  MainCmd,
  configure
};
