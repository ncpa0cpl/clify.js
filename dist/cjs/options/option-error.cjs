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

// src/options/option-error.ts
var option_error_exports = {};
__export(option_error_exports, {
  InvalidOptionError: () => InvalidOptionError,
  OptionError: () => OptionError,
  UnspecifiedOptionError: () => UnspecifiedOptionError
});
module.exports = __toCommonJS(option_error_exports);
var OptionError = class extends Error {
  constructor(msg, optionName) {
    super(msg);
    this.optionName = optionName;
    __publicField(this, "customMessage");
  }
  toPrintable() {
    return `${this.customMessage ?? this.message}: ${this.optionName}`;
  }
};
var InvalidOptionError = class extends OptionError {
  constructor(optName, received, expected, customMessage) {
    super(
      expected ? `Invalid option, expected '${expected}', but received '${received}'` : "Invalid option",
      optName
    );
    this.received = received;
    this.expected = expected;
    this.customMessage = customMessage;
    this.name = "InvalidOptionError";
  }
};
var UnspecifiedOptionError = class extends OptionError {
  constructor(optionName) {
    super(`Unspecified option`, optionName);
    this.optionName = optionName;
    this.name = "UnspecifiedOptionError";
  }
};
