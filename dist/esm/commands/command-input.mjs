var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/commands/command-input.ts
import { ClifyGlobals } from "../clify.mjs";
var CmdInputBase = class {
  constructor(command, options = {}) {
    this.command = command;
    this.options = options;
    __publicField(this, "argumentInput", null);
    __publicField(this, "stdinInput", null);
    __publicField(this, "_source", null);
  }
  setOptions(options) {
    this.options = options;
  }
  setArgumentInput(value) {
    this.argumentInput = value;
    if (value != null) {
      this._source = "argument";
    }
  }
  async prepare() {
    if (this.argumentInput != null) {
      return false;
    }
    if (this.options.stdin === false) {
      return false;
    }
    if (this.options.stdin === "non-tty-only") {
      if (process.stdin.isTTY) {
        return false;
      }
    }
    return true;
  }
  validate() {
    return this.argumentInput != null || this.stdinInput != null;
  }
  get() {
  }
  getName() {
    return this.options.name;
  }
  get source() {
    return this._source;
  }
};
var CmdInput = class extends CmdInputBase {
  async prepare() {
    if (await super.prepare()) {
      const stdin = ClifyGlobals.getStdin();
      this._source = "stdin";
      this.stdinInput = await stdin.read();
      return true;
    }
    return false;
  }
  get() {
    return this.argumentInput ?? this.stdinInput ?? null;
  }
};
var CmdInputStream = class extends CmdInputBase {
  constructor() {
    super(...arguments);
    __publicField(this, "stdinIter", null);
  }
  async prepare() {
    if (await super.prepare()) {
      const stdin = ClifyGlobals.getStdin();
      this._source = "stdin";
      this.stdinIter = await stdin.getIterator();
      return true;
    }
    return false;
  }
  get() {
    return this.argumentInput ?? this.stdinIter ?? null;
  }
};
export {
  CmdInput,
  CmdInputBase,
  CmdInputStream
};
