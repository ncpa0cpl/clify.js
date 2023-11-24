"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineArg = exports.ArgumentImpl = void 0;
const argument_error_1 = require("./argument-error");
const convert_arg_1 = require("./convert-arg");
class ArgumentImpl {
    command;
    static define(params) {
        return class extends ArgumentImpl {
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
        const parsedArgs = this.command.getParsedArgs();
        if (this.initParams.name in parsedArgs) {
            const v = (0, convert_arg_1.convertArg)(parsedArgs[this.initParams.name], this.initParams.type);
            if (v instanceof argument_error_1.ArgumentError) {
                return v;
            }
            this._isSet = true;
            this._value = v;
        }
        else if (this.initParams.char != null &&
            this.initParams.char in parsedArgs) {
            this._isSet = true;
            const v = (0, convert_arg_1.convertArg)(parsedArgs[this.initParams.char], this.initParams.type);
            if (v instanceof argument_error_1.ArgumentError) {
                return v;
            }
            this._isSet = true;
            this._value = v;
        }
        return this.validate();
    }
    validate() {
        if (this.initParams.validate && this._isSet) {
            const result = this.initParams.validate(this.value);
            if (result === "ok") {
                return null;
            }
            return new argument_error_1.ArgumentError(result.expected, result.received, result.message);
        }
        return null;
    }
    nameMatches(name) {
        return (this.initParams.name === name ||
            (name.length === 1 && this.initParams.char === name));
    }
}
exports.ArgumentImpl = ArgumentImpl;
const defineArg = (params) => {
    return ArgumentImpl.define(params);
};
exports.defineArg = defineArg;
