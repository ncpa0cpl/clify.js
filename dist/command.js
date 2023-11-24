"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cmd = void 0;
const command_input_1 = require("./command-input");
class Cmd {
    name;
    ownArguments = [];
    ownAction;
    subCommands = [];
    parsedArgs;
    ownInput;
    description = "";
    constructor(name) {
        this.name = name;
    }
    command(name, initCallback) {
        const cmd = new Cmd(name);
        this.ownAction = initCallback(cmd);
        this.subCommands.push(cmd);
        return this;
    }
    arg(arg) {
        const argument = new arg(this);
        this.ownArguments.push(argument);
        return argument;
    }
    input() {
        if (this.ownInput != null) {
            return this.ownInput;
        }
        return (this.ownInput = new command_input_1.CmdInput(this));
    }
    setDescription(description) {
        this.description = description;
    }
    findSubcommand(command) {
        if (command.length === 0) {
            return [this, null];
        }
        const [firstCommand] = command;
        const subCommand = this.subCommands.find((cmd) => cmd.name === firstCommand);
        if (subCommand == null) {
            if (this.ownInput && command.length === 1) {
                return [this, command[0]];
            }
            return [null, null];
        }
        return subCommand.findSubcommand(command.slice(1));
    }
    printHelp() { }
    printUnknownArgsMsg(unknownArgs) { }
    printArgumentErrors(errors) { }
    async prepare() {
        if ("help" in this.parsedArgs) {
            this.printHelp();
            return false;
        }
        // Detect unknown arguments
        const argNames = Object.keys(this.parsedArgs).filter((key) => key !== "_" && key !== "__");
        const unknownArgs = [];
        for (let i = 0; i < argNames.length; i++) {
            const name = argNames[i];
            if (this.ownArguments.some((a) => a.nameMatches(name))) {
                continue;
            }
            unknownArgs.push(name);
        }
        if (unknownArgs.length > 0) {
            this.printUnknownArgsMsg(unknownArgs);
            return false;
        }
        // Validate known arguments
        const validationErrors = [];
        for (let i = 0; i < this.ownArguments.length; i++) {
            const err = this.ownArguments[i].init();
            if (err != null) {
                validationErrors.push(err);
            }
        }
        if (validationErrors.length > 0) {
            this.printArgumentErrors(validationErrors);
            return false;
        }
        if (this.ownInput) {
            await this.ownInput.prepare();
            return this.ownInput.validate();
        }
        return true;
    }
    runAction() {
        if (this.ownAction == null) {
            return;
        }
        return this.ownAction();
    }
    getParsedArgs() {
        return this.parsedArgs;
    }
    async start(parsedArgs, input) {
        this.parsedArgs = parsedArgs;
        this.ownInput?.setArgumentInput(input);
        if (await this.prepare()) {
            return this.runAction();
        }
        else {
            return Promise.resolve(new Error("Command failed"));
        }
    }
}
exports.Cmd = Cmd;
