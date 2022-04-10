"use strict";
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
var chalk_1 = __importDefault(require("chalk"));
var argument_1 = require("../Arguments/argument");
var group_by_category_1 = require("../Utils/group-by-category");
var print_lists_1 = require("../Utils/print-lists");
var HelpFlag = argument_1.Argument.define({
    flagChar: "-h",
    keyword: "--help",
    dataType: "boolean",
    displayName: "help",
    description: "Show this help message.",
});
var Command = /** @class */ (function () {
    function Command() {
        this.childCommands = [];
        this.implementation = undefined;
        this.initialize = undefined;
        this.description = "";
        this.shortDescription = "";
        this.name = "";
    }
    Command.initHelpArg = function () {
        if (!Command.helpArgument) {
            Command.helpArgument = new HelpFlag();
        }
    };
    Command.prototype.setImplementation = function (impl) {
        this.implementation = impl;
    };
    Command.prototype.runInitialize = function () {
        Command.initHelpArg();
        if (this.initialize && !this.implementation) {
            argument_1.Argument["startCommandInitialization"]();
            try {
                var data = this.initialize();
                this.setImplementation(data);
                if (data.commandDescription)
                    this.description = data.commandDescription;
                if (data.shortDescription)
                    this.shortDescription = data.shortDescription;
                if (data.displayName)
                    this.name = data.displayName;
            }
            finally {
                argument_1.Argument["endCommandInitialization"]();
            }
        }
    };
    Command.prototype.define = function (initialize) {
        this.initialize = initialize;
    };
    Command.prototype.execute = function () {
        var _a;
        this.runInitialize();
        if (((_a = Command.helpArgument) === null || _a === void 0 ? void 0 : _a.isSet) && Command.helpArgument.value === true)
            return this.printHelpMessage();
        argument_1.Argument["validateArguments"]();
        if (this.implementation)
            return this.implementation.run();
    };
    Command.prototype.addChildCommand = function (c) {
        if (this.findChildCommand(c["keyword"])) {
            throw new Error(chalk_1.default.red("Internal Error:") + " There cannot be multiple commands with the same keyword.");
        }
        this.childCommands.push(c);
    };
    Command.prototype.findChildCommand = function (keyword) {
        return this.childCommands.find(function (c) { return c["keyword"] === keyword; });
    };
    Command.prototype.getName = function () {
        return this.name;
    };
    Command.prototype.printHelpMessage = function () {
        var e_1, _a;
        var argsInfo = (0, group_by_category_1.groupByCategory)(argument_1.Argument["getArgumentsInfo"]());
        var commandName = this.getName();
        if (this.description) {
            (0, print_lists_1.printLists)([[commandName + ":", this.description]]);
        }
        else if (this.shortDescription) {
            (0, print_lists_1.printLists)([[commandName + ":", this.shortDescription]]);
        }
        else {
            (0, print_lists_1.printLists)([[commandName + ":"]]);
        }
        if (this.childCommands.length > 0) {
            console.log("\nCommands:");
            (0, print_lists_1.printLists)(this.childCommands.map(function (child) { return child["getPrintableList"](); }), true);
        }
        console.log("\nArguments:");
        try {
            for (var argsInfo_1 = __values(argsInfo), argsInfo_1_1 = argsInfo_1.next(); !argsInfo_1_1.done; argsInfo_1_1 = argsInfo_1.next()) {
                var _b = __read(argsInfo_1_1.value, 2), category = _b[0], args = _b[1];
                if (category.length > 0)
                    console.log("\n" + category + ":");
                (0, print_lists_1.printLists)(args.map(function (arg) { return [arg.flagChar, arg.keyword, arg.description]; }), true);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (argsInfo_1_1 && !argsInfo_1_1.done && (_a = argsInfo_1.return)) _a.call(argsInfo_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Sets the description of this command that will be displayed
     * when looking up the `--help` for this command.
     */
    Command.prototype.setDescription = function (description) {
        this.description = description;
    };
    /**
     * Sets the name that will be displayed for this Command in the
     * command line interface.
     */
    Command.prototype.setDisplayName = function (name) {
        this.name = name;
    };
    return Command;
}());
exports.Command = Command;
