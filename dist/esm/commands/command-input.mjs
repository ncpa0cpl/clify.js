var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/commands/command-input.ts
import { ClifyGlobals } from "../clify.mjs";
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
    const stdin = ClifyGlobals.getStdin();
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
export {
  CmdInput
};
