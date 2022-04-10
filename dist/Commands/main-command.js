"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainCommand = void 0;
const path_1 = __importDefault(require("path"));
const argument_parser_1 = require("../Arguments/argument-parser");
const command_1 = require("./command");
const default_initializer_1 = require("./default-initializer");
const sub_command_1 = require("./sub-command");
class MainCommand extends command_1.Command {
    static init() {
        return new MainCommand();
    }
    constructor() {
        super();
        const scriptPath = process.argv[1];
        this.name = path_1.default.parse(scriptPath).name;
        this.define(default_initializer_1.defaultInitializer);
    }
    start() {
        const subCommandsPath = argument_parser_1.Arguments.getSubCommandsPath();
        if (subCommandsPath.length === 0)
            return this.execute();
        let command = this;
        while (true) {
            if (subCommandsPath.length === 0)
                break;
            if (!command)
                break;
            const keyword = subCommandsPath.shift();
            command = command["findChildCommand"](keyword);
        }
        if (command)
            return command["execute"]();
    }
    /**
     * Sets the default behavior for this script when started from
     * the CLI without any sub-commands.
     */
    setMainAction(initialize) {
        this.define(initialize);
    }
    /**
     * Creates a sub-command for this script.
     *
     * @example
     *   mainCommand.addSubCommand("cmdName", () => {
     *     return {
     *       run() {
     *         console.log("Sub Command ran.");
     *       },
     *     };
     *   });
     *
     *   // CLI: node my-script.js cmdName
     *   // Output: "Sub Command ran."
     */
    addSubCommand(keyword, initialize = default_initializer_1.defaultInitializer) {
        const subCommand = new sub_command_1.SubCommand(keyword, initialize);
        this.addChildCommand(subCommand);
        return subCommand;
    }
}
exports.MainCommand = MainCommand;
