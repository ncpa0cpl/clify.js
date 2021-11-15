"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arguments = void 0;
var is_arg_name_1 = require("./Utils/is-arg-name");
var parse_argument_value_1 = require("./Utils/parse-argument-value");
var ArgumentParser = /** @class */ (function () {
    function ArgumentParser() {
        this.subCommands = [];
        this.arguments = new Map();
        var args = process.argv.slice(2);
        this.init(args);
    }
    ArgumentParser.prototype.init = function (args) {
        while (true) {
            if (args.length === 0)
                break;
            var arg = args.shift();
            if ((0, is_arg_name_1.isArgName)(arg)) {
                if (args[0] && !(0, is_arg_name_1.isArgName)(args[0])) {
                    var argValue = args.shift();
                    this.arguments.set(arg, (0, parse_argument_value_1.parseArgumentValue)(argValue));
                }
                else {
                    this.arguments.set(arg, true);
                }
            }
            else {
                this.subCommands.push(arg);
            }
        }
        Object.freeze(this.arguments);
        Object.freeze(this.subCommands);
    };
    ArgumentParser.prototype.isArgumentSet = function (argument) {
        return (this.arguments.has(argument["keyword"]) ||
            this.arguments.has(argument["flagChar"]));
    };
    ArgumentParser.prototype.getArgument = function (argument, throwError) {
        if (this.arguments.has(argument["keyword"])) {
            return this.arguments.get(argument["keyword"]);
        }
        if (this.arguments.has(argument["flagChar"])) {
            return this.arguments.get(argument["flagChar"]);
        }
        if (argument["default"] !== undefined) {
            return argument["default"];
        }
        if (argument["require"] === true) {
            throwError("Missing required argument.");
        }
        return undefined;
    };
    ArgumentParser.prototype.getSubCommandsPath = function () {
        return __spreadArray([], this.subCommands, true);
    };
    return ArgumentParser;
}());
exports.Arguments = new ArgumentParser();
