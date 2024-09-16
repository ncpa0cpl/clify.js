var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/options/option.ts
import { convertOptionValue } from "./convert-option-value.mjs";
import {
  InvalidOptionError,
  OptionError,
  UnspecifiedOptionError
} from "./option-error.mjs";
var DEFAULT_CATEGORY = Symbol("default_category");
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
      const v = convertOptionValue(
        parsedArgs[this.initParams.name],
        this.initParams.type,
        name
      );
      if (v instanceof OptionError) {
        return v;
      }
      this._isSet = true;
      this._value = v;
    } else if (this.initParams.char != null && this.initParams.char in parsedArgs) {
      this._isSet = true;
      const v = convertOptionValue(
        parsedArgs[this.initParams.char],
        this.initParams.type,
        name
      );
      if (v instanceof OptionError) {
        return v;
      }
      this._isSet = true;
      this._value = v;
    } else if (this.initParams.required && this._default == null) {
      return new UnspecifiedOptionError(name);
    }
    return this.validate();
  }
  validate() {
    if (this.initParams.validate && this._isSet) {
      const result = this.initParams.validate(this.value);
      if (result === "ok") {
        return null;
      }
      return new InvalidOptionError(
        this.getName(),
        String(this.value),
        result.expected,
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
  getCategory() {
    if (this.initParams.category == null) {
      return DEFAULT_CATEGORY;
    }
    return this.initParams.category;
  }
};
function defineOption(params) {
  return Opt.define(params);
}
export {
  DEFAULT_CATEGORY,
  Opt,
  defineOption
};
