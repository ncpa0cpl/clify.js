"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arguments = void 0;
const is_arg_name_1 = require("./Utils/is-arg-name");
const parse_argument_value_1 = require("./Utils/parse-argument-value");
class ArgumentParser {
    constructor() {
        this.subCommands = [];
        this.arguments = new Map();
        const args = process.argv.slice(2);
        this.init(args);
    }
    init(args) {
        while (true) {
            if (args.length === 0)
                break;
            const arg = args.shift();
            if ((0, is_arg_name_1.isArgName)(arg)) {
                if (args[0] && !(0, is_arg_name_1.isArgName)(args[0])) {
                    const argValue = args.shift();
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
    }
    isArgumentSet(argument) {
        return (this.arguments.has(argument["keyword"]) ||
            this.arguments.has(argument["flagChar"]));
    }
    getArgument(argument) {
        if (this.arguments.has(argument["keyword"])) {
            return this.arguments.get(argument["keyword"]);
        }
        if (this.arguments.has(argument["flagChar"])) {
            return this.arguments.get(argument["flagChar"]);
        }
        if (argument["default"] !== undefined) {
            return argument["default"];
        }
        return undefined;
    }
    getSubCommandsPath() {
        return [...this.subCommands];
    }
}
exports.Arguments = new ArgumentParser();
