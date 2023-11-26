var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/options/option-error.ts
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
  constructor(optName, expected, received, customMessage) {
    super(
      `Invalid option, expected '${expected}', but received '${received}'`,
      optName
    );
    this.expected = expected;
    this.received = received;
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
export {
  InvalidOptionError,
  OptionError,
  UnspecifiedOptionError
};
