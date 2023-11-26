"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClifyProgram = void 0;
const minimist_1 = __importDefault(require("minimist"));
const clify_1 = require("./clify");
class ClifyProgram {
    mainCommand;
    constructor(mainCommand) {
        this.mainCommand = mainCommand;
    }
    init(command, args) {
        if (command != null) {
            const parsedArgs = {
                _: command.split(" "),
                ...args,
            };
            return parsedArgs;
        }
        return (0, minimist_1.default)(clify_1.ClifyGlobals.getArgs());
    }
    findCommand(command) {
        return this.mainCommand.findSubcommand(command);
    }
    run(command, args) {
        const parsedArgs = this.init(command, args);
        if (parsedArgs.version) {
            this.mainCommand.printVersionInfo();
            return Promise.resolve();
        }
        const [cmd, input] = this.findCommand(parsedArgs._);
        if (cmd == null) {
            const errMsg = `Unknown command: ${parsedArgs._.join(" ")}`;
            clify_1.ClifyGlobals.err(errMsg);
            return Promise.resolve(new Error(errMsg));
        }
        return cmd.start(parsedArgs, input);
    }
}
exports.ClifyProgram = ClifyProgram;
