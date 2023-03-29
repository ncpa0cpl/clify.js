"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Argument = void 0;
const chalk_1 = __importDefault(require("chalk"));
const compare_strings_1 = require("../Utils/compare-strings");
const argument_parser_1 = require("./argument-parser");
const FLOATING_NUMBER_REGEX = /^[+-]?([0-9]*[.])?[0-9]+$/;
/**
 * Used to define and access the script or sub-command arguments.
 *
 * @example
 *   // define an Argument
 *   const InputArg = Argument.define({
 *     flagChar: "-i",
 *     keyword: "--input",
 *     dataType: "string",
 *     require: true,
 *     description: "Path to the file.",
 *   });
 *
 *   // access the Argument within a Command
 *   mainCommand.setMainAction(() => {
 *     const input = new InputArg();
 *
 *     return {
 *       run() {
 *         console.log("Processing the file: ", input.value);
 *       },
 *     };
 *   });
 */
class Argument {
    static hasMultipleArgumentsWithKeywordOrFlag(keyword, flag) {
        return (Argument.initiatedArguments.filter((arg) => arg.context.keyword === keyword || arg.context.flagChar === flag).length > 1);
    }
    static startCommandInitialization() {
        Argument._isCommandInitializing = true;
    }
    static endCommandInitialization() {
        Argument._isCommandInitializing = false;
    }
    static isCommandInitializing() {
        return Argument._isCommandInitializing;
    }
    static getArgumentsInfo() {
        return Argument.initiatedArguments
            .sort((arg_0, arg_1) => (0, compare_strings_1.compareStrings)({ numCompare: true })(arg_0.context.flagChar, arg_1.context.flagChar))
            .map((arg) => {
            var _a;
            return ({
                flagChar: arg.context.flagChar,
                keyword: arg.context.keyword,
                description: (_a = arg.context.description) !== null && _a !== void 0 ? _a : "",
                category: arg.context.category,
            });
        });
    }
    static validateArguments() {
        for (const arg of Argument.initiatedArguments) {
            arg.validate();
        }
    }
    static define(initData) {
        class Arg extends Argument {
            constructor() {
                super();
                Argument.initiatedArguments.push(this);
            }
            init() {
                return initData;
            }
        }
        return Arg;
    }
    constructor() {
        if (!Argument.isCommandInitializing()) {
            this.throwInternalError("Arguments must be initialized within the Command init callback.");
        }
        this.context = this.init();
        this._value = this.getArgumentValue();
        this._isSet = argument_parser_1.Arguments.isArgumentSet(this.context);
    }
    ensureDataType(v) {
        // @ts-expect-error
        if (!this.context.require && v === undefined)
            return v;
        switch (this.context.dataType) {
            case "boolean":
                // @ts-expect-error
                if (typeof v === "boolean")
                    return v;
                // @ts-expect-error
                if (v === "0" || v === 0)
                    return false;
                // @ts-expect-error
                if (v === "1" || v === 1)
                    return true;
                this.throwArgumentError('Argument value is not of expected type (boolean). Try one of the following: "true", "false", 0 or 1');
                break;
            case "number":
                // @ts-expect-error
                if (typeof v === "number")
                    return v;
                if (typeof v === "string" && FLOATING_NUMBER_REGEX.test(v))
                    // @ts-expect-error
                    return Number(v);
                this.throwArgumentError("Argument value is not of expected type (number). Try putting in a number value to this argument like: 0, 1, 123, 1.2 or .678");
                break;
            case "string":
                // @ts-expect-error
                if (typeof v === "string")
                    return v;
                this.throwArgumentError("Argument value is not of expected type (string).");
                break;
            default:
                // @ts-expect-error
                return v;
        }
    }
    validate() {
        const keywordRegex = /^--[a-zA-Z]+(-[a-zA-Z]+)*$/;
        const flagRegex = /^-[a-zA-Z]+$/;
        if (!keywordRegex.test(this.context.keyword)) {
            this.throwInternalError(`Incorrect Argument definition: invalid keyword (${this.context.keyword})`);
        }
        if (!flagRegex.test(this.context.flagChar)) {
            this.throwInternalError(`Incorrect Argument definition: invalid flag character (${this.context.flagChar})`);
        }
        if (Argument.hasMultipleArgumentsWithKeywordOrFlag(this.context.keyword, this.context.flagChar)) {
            this.throwInternalError("Duplicate argument instances declared within a Command.");
        }
        if (this.context.require && this.value === undefined) {
            this.throwArgumentError("Argument must be specified.");
        }
        // @ts-expect-error
        this._value = this.ensureDataType(this.value);
    }
    getName() {
        return this.context.displayName || this.context.keyword;
    }
    getArgumentValue() {
        const argValue = argument_parser_1.Arguments.getArgument(this.context);
        return argValue;
    }
    throwArgumentError(message) {
        const name = this.getName();
        throw new Error(`${chalk_1.default.red("Argument Error")} [${chalk_1.default.yellow(name)}]: ${message}`);
    }
    throwInternalError(message) {
        const name = this.getName();
        throw new Error(`${chalk_1.default.red("Argument Error")} [${chalk_1.default.yellow(name)}]: ${message}`);
    }
    /**
     * Value of the argument, this is the value specified in the
     * CLI command arguments or the default value of the Argument.
     */
    get value() {
        return this._value;
    }
    /**
     * Defines if the Argument has been set as a part of the CLI
     * command argument.
     *
     * Setting the Argument default value does not affect this property.
     */
    get isSet() {
        return this._isSet;
    }
    setDefault(v) {
        this.context.default = v;
        this._value = this.getArgumentValue();
    }
}
Argument._isCommandInitializing = false;
Argument.initiatedArguments = [];
exports.Argument = Argument;
