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

// src/configure.ts
var configure_exports = {};
__export(configure_exports, {
  MainCmd: () => MainCmd,
  configure: () => configure
});
module.exports = __toCommonJS(configure_exports);
var import_clify = require("./clify.cjs");
var import_command = require("./commands/command.cjs");
var import_program = require("./program.cjs");
var import_assert_not_async = require("./utils/assert-not-async.cjs");
var MainCmd = class extends import_command.Cmd {
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
    import_clify.ClifyGlobals.log(msg);
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
  (0, import_assert_not_async.assertNotAsync)(configureCallback(mainCommand), "configureCallback");
  return new import_program.ClifyProgram(mainCommand);
}
