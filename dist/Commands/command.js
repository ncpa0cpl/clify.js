"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const chalk_1 = __importDefault(require("chalk"));
const argument_1 = require("../Arguments/argument");
const group_by_category_1 = require("../Utils/group-by-category");
const print_lists_1 = require("../Utils/print-lists");
const HelpFlag = argument_1.Argument.define({
    flagChar: "-h",
    keyword: "--help",
    dataType: "boolean",
    displayName: "help",
    description: "Show this help message.",
});
class Command {
    constructor() {
        this.childCommands = [];
        this.implementation = undefined;
        this.initialize = undefined;
        this.description = "";
        this.shortDescription = "";
        this.name = "";
    }
    static initHelpArg() {
        if (!Command.helpArgument) {
            Command.helpArgument = new HelpFlag();
        }
    }
    setImplementation(impl) {
        this.implementation = impl;
    }
    runInitialize() {
        argument_1.Argument["startCommandInitialization"]();
        try {
            Command.initHelpArg();
            if (this.initialize && !this.implementation) {
                const data = this.initialize();
                this.setImplementation(data);
                if (data.commandDescription)
                    this.description = data.commandDescription;
                if (data.shortDescription)
                    this.shortDescription = data.shortDescription;
                if (data.displayName)
                    this.name = data.displayName;
            }
        }
        finally {
            argument_1.Argument["endCommandInitialization"]();
        }
    }
    define(initialize) {
        this.initialize = initialize;
    }
    execute() {
        var _a;
        this.runInitialize();
        if (((_a = Command.helpArgument) === null || _a === void 0 ? void 0 : _a.isSet) && Command.helpArgument.value === true)
            return this.printHelpMessage();
        argument_1.Argument["validateArguments"]();
        if (this.implementation)
            return this.implementation.run();
    }
    addChildCommand(c) {
        if (this.findChildCommand(c["keyword"])) {
            throw new Error(`${chalk_1.default.red("Internal Error:")} There cannot be multiple commands with the same keyword.`);
        }
        this.childCommands.push(c);
    }
    findChildCommand(keyword) {
        return this.childCommands.find((c) => c["keyword"] === keyword);
    }
    getName() {
        return this.name;
    }
    printHelpMessage() {
        const argsInfo = (0, group_by_category_1.groupByCategory)(argument_1.Argument["getArgumentsInfo"]());
        const commandName = this.getName();
        if (this.description) {
            (0, print_lists_1.printLists)([[`${commandName}:`, this.description]]);
        }
        else if (this.shortDescription) {
            (0, print_lists_1.printLists)([[`${commandName}:`, this.shortDescription]]);
        }
        else {
            (0, print_lists_1.printLists)([[`${commandName}:`]]);
        }
        if (this.childCommands.length > 0) {
            console.log("\nCommands:");
            (0, print_lists_1.printLists)(this.childCommands.map((child) => child["getPrintableList"]()), true);
        }
        console.log("\nArguments:");
        for (const [category, args] of argsInfo) {
            if (category.length > 0)
                console.log(`\n${category}:`);
            (0, print_lists_1.printLists)(args.map((arg) => [arg.flagChar, arg.keyword, arg.description]), true);
        }
    }
    /**
     * Sets the description of this command that will be displayed
     * when looking up the `--help` for this command.
     */
    setDescription(description) {
        this.description = description;
    }
    /**
     * Sets the name that will be displayed for this Command in the
     * command line interface.
     */
    setDisplayName(name) {
        this.name = name;
    }
}
exports.Command = Command;
