"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Argument = void 0;
var chalk_1 = __importDefault(require("chalk"));
var compare_strings_1 = require("../Utils/compare-strings");
var argument_parser_1 = require("./argument-parser");
var FLOATING_NUMBER_REGEX = /^[+-]?([0-9]*[.])?[0-9]+$/;
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
var Argument = /** @class */ (function () {
    function Argument() {
        if (!Argument.isCommandInitializing()) {
            this.throwInternalError("Arguments must be initialized within the Command init callback.");
        }
        this.context = this.init();
        this._value = this.getArgumentValue();
        this._isSet = argument_parser_1.Arguments.isArgumentSet(this.context);
    }
    Argument.hasMultipleArgumentsWithKeywordOrFlag = function (keyword, flag) {
        return (Argument.initiatedArguments.filter(function (arg) {
            return arg.context.keyword === keyword || arg.context.flagChar === flag;
        }).length > 1);
    };
    Argument.startCommandInitialization = function () {
        Argument._isCommandInitializing = true;
    };
    Argument.endCommandInitialization = function () {
        Argument._isCommandInitializing = false;
    };
    Argument.isCommandInitializing = function () {
        return Argument._isCommandInitializing;
    };
    Argument.getArgumentsInfo = function () {
        return Argument.initiatedArguments
            .sort(function (arg_0, arg_1) {
            return (0, compare_strings_1.compareStrings)({ numCompare: true })(arg_0.context.flagChar, arg_1.context.flagChar);
        })
            .map(function (arg) {
            var _a;
            return ({
                flagChar: arg.context.flagChar,
                keyword: arg.context.keyword,
                description: (_a = arg.context.description) !== null && _a !== void 0 ? _a : "",
                category: arg.context.category,
            });
        });
    };
    Argument.validateArguments = function () {
        var e_1, _a;
        try {
            for (var _b = __values(Argument.initiatedArguments), _c = _b.next(); !_c.done; _c = _b.next()) {
                var arg = _c.value;
                arg.validate();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Argument.define = function (initData) {
        var Arg = /** @class */ (function (_super) {
            __extends(Arg, _super);
            function Arg() {
                var _this = _super.call(this) || this;
                Argument.initiatedArguments.push(_this);
                return _this;
            }
            Arg.prototype.init = function () {
                return initData;
            };
            return Arg;
        }(Argument));
        return Arg;
    };
    Argument.prototype.ensureDataType = function (v) {
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
    };
    Argument.prototype.validate = function () {
        var keywordRegex = /^--[a-zA-Z]+(-[a-zA-Z]+)*$/;
        var flagRegex = /^-[a-zA-Z]{1}$/;
        if (!keywordRegex.test(this.context.keyword)) {
            this.throwInternalError("Incorrect Argument definition: invalid keyword (" + this.context.keyword + ")");
        }
        if (!flagRegex.test(this.context.flagChar)) {
            this.throwInternalError("Incorrect Argument definition: invalid flag character (" + this.context.flagChar + ")");
        }
        if (Argument.hasMultipleArgumentsWithKeywordOrFlag(this.context.keyword, this.context.flagChar)) {
            this.throwInternalError("Duplicate argument instances declared within a Command.");
        }
        if (this.context.require && this._value === undefined) {
            this.throwArgumentError("Argument must be specified.");
        }
        this.value;
    };
    Argument.prototype.getName = function () {
        return this.context.displayName || this.context.keyword;
    };
    Argument.prototype.getArgumentValue = function () {
        var argValue = argument_parser_1.Arguments.getArgument(this.context);
        return this.ensureDataType(argValue);
    };
    Argument.prototype.throwArgumentError = function (message) {
        var name = this.getName();
        throw new Error(chalk_1.default.red("Argument Error") + " [" + chalk_1.default.yellow(name) + "]: " + message);
    };
    Argument.prototype.throwInternalError = function (message) {
        var name = this.getName();
        throw new Error(chalk_1.default.red("Argument Error") + " [" + chalk_1.default.yellow(name) + "]: " + message);
    };
    Object.defineProperty(Argument.prototype, "value", {
        /**
         * Value of the argument, this is the value specified in the
         * CLI command arguments or the default value of the Argument.
         */
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Argument.prototype, "isSet", {
        /**
         * Defines if the Argument has been set as a part of the CLI
         * command argument.
         *
         * Setting the Argument default value does not affect this property.
         */
        get: function () {
            return this._isSet;
        },
        enumerable: false,
        configurable: true
    });
    Argument.prototype.setDefault = function (v) {
        this.context.default = v;
        this._value = this.getArgumentValue();
    };
    Argument._isCommandInitializing = false;
    Argument.initiatedArguments = [];
    return Argument;
}());
exports.Argument = Argument;
