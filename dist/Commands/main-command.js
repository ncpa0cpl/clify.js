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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainCommand = void 0;
var path_1 = __importDefault(require("path"));
var argument_parser_1 = require("../Arguments/argument-parser");
var command_1 = require("./command");
var sub_command_1 = require("./sub-command");
var MainCommand = /** @class */ (function (_super) {
    __extends(MainCommand, _super);
    function MainCommand() {
        var _this = _super.call(this) || this;
        _this.isDefaultCommandSet = false;
        var scriptPath = process.argv[1];
        _this.name = path_1.default.parse(scriptPath).name;
        return _this;
    }
    MainCommand.init = function () {
        return new MainCommand();
    };
    MainCommand.prototype.start = function () {
        var subCommandsPath = argument_parser_1.Arguments.getSubCommandsPath();
        if (subCommandsPath.length === 0 && this.isDefaultCommandSet)
            return this.execute();
        var command = this;
        while (true) {
            if (subCommandsPath.length === 0)
                break;
            if (!command)
                break;
            var keyword = subCommandsPath.shift();
            command = command["findChildCommand"](keyword);
        }
        if (command)
            return command["execute"]();
    };
    /**
     * Sets the default behavior for this script when started from
     * the CLI without any sub-commands.
     */
    MainCommand.prototype.setMainAction = function (initialize) {
        this.define(initialize);
        this.isDefaultCommandSet = true;
    };
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
    MainCommand.prototype.addSubCommand = function (keyword, initialize) {
        var subCommand = new sub_command_1.SubCommand(keyword, initialize);
        this.addChildCommand(subCommand);
        return subCommand;
    };
    return MainCommand;
}(command_1.Command));
exports.MainCommand = MainCommand;
