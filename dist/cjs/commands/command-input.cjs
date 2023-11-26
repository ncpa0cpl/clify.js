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

// src/commands/command-input.ts
var command_input_exports = {};
__export(command_input_exports, {
  CmdInput: () => CmdInput
});
module.exports = __toCommonJS(command_input_exports);
var import_clify = require("../clify.cjs");
var CmdInput = class {
  constructor(command) {
    this.command = command;
    __publicField(this, "argumentInput", null);
    __publicField(this, "stdinInput", null);
    __publicField(this, "_source", null);
  }
  setArgumentInput(value) {
    this.argumentInput = value;
    if (value != null) {
      this._source = "argument";
    }
  }
  async prepare() {
    if (this.argumentInput != null) {
      return;
    }
    const stdin = import_clify.ClifyGlobals.getStdin();
    this._source = "stdin";
    this.stdinInput = await stdin.read();
  }
  validate() {
    return this.argumentInput != null || this.stdinInput != null;
  }
  get() {
    return this.argumentInput ?? this.stdinInput;
  }
  get source() {
    return this._source;
  }
};
