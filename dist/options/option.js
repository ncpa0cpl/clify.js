"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineOption = exports.Opt = void 0;
const convert_option_value_1 = require("./convert-option-value");
const option_error_1 = require("./option-error");
class Opt {
    command;
    static define(params) {
        return class extends Opt {
            getInitParams() {
                return params;
            }
        };
    }
    initParams;
    _value;
    _isSet = false;
    _default;
    constructor(command) {
        this.command = command;
        this.initParams = this.getInitParams();
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
        if (this.initParams.name in parsedArgs) {
            const v = (0, convert_option_value_1.convertOptionValue)(parsedArgs[this.initParams.name], this.initParams.type, name);
            if (v instanceof option_error_1.OptionError) {
                return v;
            }
            this._isSet = true;
            this._value = v;
        }
        else if (this.initParams.char != null &&
            this.initParams.char in parsedArgs) {
            this._isSet = true;
            const v = (0, convert_option_value_1.convertOptionValue)(parsedArgs[this.initParams.char], this.initParams.type, name);
            if (v instanceof option_error_1.OptionError) {
                return v;
            }
            this._isSet = true;
            this._value = v;
        }
        else if (this.initParams.required) {
            return new option_error_1.UnspecifiedOptionError(name);
        }
        return this.validate();
    }
    validate() {
        if (this.initParams.validate && this._isSet) {
            const result = this.initParams.validate(this.value);
            if (result === "ok") {
                return null;
            }
            return new option_error_1.InvalidOptionError(this.getName(), result.expected, result.received, result.message);
        }
        return null;
    }
    nameMatches(name) {
        return (this.initParams.name === name ||
            (name.length === 1 && this.initParams.char === name));
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
        }
        else {
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
}
exports.Opt = Opt;
const defineOption = (params) => {
    return Opt.define(params);
};
exports.defineOption = defineOption;
