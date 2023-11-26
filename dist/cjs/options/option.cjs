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

// src/options/option.ts
var option_exports = {};
__export(option_exports, {
  Opt: () => Opt,
  defineOption: () => defineOption
});
module.exports = __toCommonJS(option_exports);
var import_convert_option_value = require("./convert-option-value.cjs");
var import_option_error = require("./option-error.cjs");
var Opt = class _Opt {
  constructor(command) {
    this.command = command;
    __publicField(this, "initParams");
    __publicField(this, "_value");
    __publicField(this, "_isSet", false);
    __publicField(this, "_default");
    this.initParams = this.getInitParams();
  }
  static define(params) {
    return class extends _Opt {
      getInitParams() {
        return params;
      }
    };
  }
  get value() {
    return this._isSet ? this._value : this._default;
  }
  get isSet() {
    return this._isSet;
  }
  setDefault(value) {
    this._default = value;
    return this;
  }
  init() {
    const name = this.getName();
    const parsedArgs = this.command.getParsedArgs();
    this._default = this.initParams.default;
    if (this.initParams.name in parsedArgs) {
      const v = (0, import_convert_option_value.convertOptionValue)(
        parsedArgs[this.initParams.name],
        this.initParams.type,
        name
      );
      if (v instanceof import_option_error.OptionError) {
        return v;
      }
      this._isSet = true;
      this._value = v;
    } else if (this.initParams.char != null && this.initParams.char in parsedArgs) {
      this._isSet = true;
      const v = (0, import_convert_option_value.convertOptionValue)(
        parsedArgs[this.initParams.char],
        this.initParams.type,
        name
      );
      if (v instanceof import_option_error.OptionError) {
        return v;
      }
      this._isSet = true;
      this._value = v;
    } else if (this.initParams.required && this._default == null) {
      return new import_option_error.UnspecifiedOptionError(name);
    }
    return this.validate();
  }
  validate() {
    if (this.initParams.validate && this._isSet) {
      const result = this.initParams.validate(this.value);
      if (result === "ok") {
        return null;
      }
      return new import_option_error.InvalidOptionError(
        this.getName(),
        result.expected,
        result.received,
        result.message
      );
    }
    return null;
  }
  nameMatches(name) {
    return this.initParams.name === name || name.length === 1 && this.initParams.char === name;
  }
  getName() {
    if (this.initParams.char != null) {
      return `--${this.initParams.name}, -${this.initParams.char}`;
    }
    return `--${this.initParams.name}`;
  }
  getNameWithType() {
    if (this.initParams.type === "boolean") {
      if (this.initParams.char != null) {
        return `--${this.initParams.name}, -${this.initParams.char}`;
      }
      return `--${this.initParams.name}`;
    }
    let typeStr;
    if (Array.isArray(this.initParams.type)) {
      typeStr = "..." + this.initParams.type[0];
    } else {
      typeStr = this.initParams.type;
    }
    if (this.initParams.char != null) {
      return `--${this.initParams.name}, -${this.initParams.char} <${typeStr}>`;
    }
    return `--${this.initParams.name} <${typeStr}>`;
  }
  getDescription() {
    return this.initParams.description || "";
  }
};
function defineOption(params) {
  return Opt.define(params);
}
