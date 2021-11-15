"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainCommand = exports.Argument = exports.configure = void 0;
var chalk_1 = __importDefault(require("chalk"));
var argument_1 = require("./Arguments/argument");
Object.defineProperty(exports, "Argument", { enumerable: true, get: function () { return argument_1.Argument; } });
var main_command_1 = require("./Commands/main-command");
Object.defineProperty(exports, "MainCommand", { enumerable: true, get: function () { return main_command_1.MainCommand; } });
var mainCommand = main_command_1.MainCommand["init"]();
/**
 * Initiates and configures the script. This method takes one
 * argument, an initiation callback.
 *
 * @example
 *   configure((mainCommand) => {
 *     mainCommand.setName("my-script");
 *     mainCommand.setMainAction(() => {
 *       return {
 *         run() {
 *           // Here goes the main command implementation
 *         },
 *       };
 *     });
 *
 *     mainCommand.addSubCommand("sub-command", () => {
 *       return {
 *         run() {
 *           // Here goes the sub-command implementation
 *         },
 *       };
 *     });
 *   });
 */
function configure(initialize) {
    try {
        initialize(mainCommand);
        mainCommand["start"]();
    }
    catch (e) {
        console.error(chalk_1.default.redBright("An error occurred when running this script."));
        if (e instanceof Error)
            console.error(e.message);
    }
}
exports.configure = configure;
exports.default = { configure: configure, Argument: argument_1.Argument, MainCommand: main_command_1.MainCommand };
