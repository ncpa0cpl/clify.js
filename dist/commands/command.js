"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cmd = void 0;
const clify_1 = require("../clify");
const command_input_1 = require("./command-input");
var CmdConfigState;
(function (CmdConfigState) {
    CmdConfigState[CmdConfigState["HAS_NOTHING"] = 0] = "HAS_NOTHING";
    CmdConfigState[CmdConfigState["HAS_SUBCMD"] = 1] = "HAS_SUBCMD";
    CmdConfigState[CmdConfigState["HAS_INPUT"] = 2] = "HAS_INPUT";
    CmdConfigState[CmdConfigState["HAS_ACTION"] = 4] = "HAS_ACTION";
    CmdConfigState[CmdConfigState["HAS_SUBCMD_INPUT"] = 3] = "HAS_SUBCMD_INPUT";
    CmdConfigState[CmdConfigState["HAS_SUBCMD_ACTION"] = 5] = "HAS_SUBCMD_ACTION";
    CmdConfigState[CmdConfigState["HAS_INPUT_ACTION"] = 6] = "HAS_INPUT_ACTION";
    CmdConfigState[CmdConfigState["HAS_SUBCMD_INPUT_ACTION"] = 7] = "HAS_SUBCMD_INPUT_ACTION";
})(CmdConfigState || (CmdConfigState = {}));
const alphasort = (a, b) => a.localeCompare(b);
class Cmd {
    cmdName;
    parentCommand;
    ownOptions = [];
    ownAction;
    subCommands = [];
    parsedArgs;
    ownInput;
    description = "";
    constructor(cmdName, parentCommand) {
        this.cmdName = cmdName;
        this.parentCommand = parentCommand;
    }
    command(name, initCallback) {
        const cmd = new Cmd(name, this);
        cmd.ownAction = initCallback(cmd);
        this.subCommands.push(cmd);
        return cmd;
    }
    option(Option) {
        const option = new Option(this);
        this.ownOptions.push(option);
        return option;
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
        const subCommand = this.subCommands.find((cmd) => cmd.cmdName === firstCommand);
        if (subCommand == null) {
            if (this.ownInput && command.length === 1) {
                return [this, command[0]];
            }
            return [null, null];
        }
        return subCommand.findSubcommand(command.slice(1));
    }
    getName() {
        let parentName = this.parentCommand?.getName();
        if (parentName != null) {
            return parentName + " " + this.cmdName;
        }
        return this.cmdName;
    }
    printHelp() {
        const log = clify_1.ClifyGlobals.log.bind(clify_1.ClifyGlobals);
        let usage = `Usage: ${this.getName()}`;
        let state = CmdConfigState.HAS_NOTHING;
        if (this.subCommands.length > 0) {
            state |= CmdConfigState.HAS_SUBCMD;
        }
        if (this.ownInput) {
            state |= CmdConfigState.HAS_INPUT;
        }
        if (this.ownAction) {
            state |= CmdConfigState.HAS_ACTION;
        }
        switch (state) {
            case CmdConfigState.HAS_NOTHING:
            case CmdConfigState.HAS_ACTION:
                break;
            case CmdConfigState.HAS_INPUT:
            case CmdConfigState.HAS_INPUT_ACTION:
                // no sub-commands
                usage += " INPUT";
                break;
            case CmdConfigState.HAS_SUBCMD:
                // Has sub-commands, but no action itself
                // so the sub-command is required
                usage += " COMMAND";
                break;
            case CmdConfigState.HAS_SUBCMD_ACTION:
                usage += " COMMAND?";
                break;
            case CmdConfigState.HAS_SUBCMD_INPUT:
                usage += " COMMAND|INPUT";
                break;
            case CmdConfigState.HAS_SUBCMD_INPUT_ACTION:
                usage += " COMMAND|INPUT?";
                break;
        }
        if (this.ownOptions.length > 0) {
            usage += " [...OPTIONS]";
        }
        let commandsList = [];
        if (this.subCommands.length > 0) {
            const cmdNames = this.subCommands.map((cmd) => {
                return `  ${cmd.cmdName}`;
            });
            const longestLen = cmdNames.reduce((a, b) => (a.length > b.length ? a : b), "").length;
            commandsList = cmdNames
                .map((cmd, i) => {
                return cmd.padEnd(longestLen + 4) + this.subCommands[i].description;
            })
                .sort(alphasort);
        }
        let optsList = [];
        if (this.ownOptions.length > 0) {
            const optNames = this.ownOptions.map((arg) => {
                return `  ${arg.getNameWithType()}`;
            });
            const longestLen = optNames.reduce((a, b) => (a.length > b.length ? a : b), "").length;
            optsList = optNames
                .map((arg, i) => {
                return (arg.padEnd(longestLen + 4) + this.ownOptions[i].getDescription());
            })
                .sort(alphasort);
        }
        log(usage);
        if (this.description) {
            log("");
            log(this.description);
        }
        if (commandsList.length > 0) {
            log("");
            log("Commands:");
            for (const cmd of commandsList) {
                log(cmd);
            }
        }
        if (optsList.length > 0) {
            log("");
            log("Options:");
            for (const opt of optsList) {
                log(opt);
            }
        }
    }
    printUnknownArgsMsg(unknownArgs) {
        const logErr = clify_1.ClifyGlobals.err.bind(clify_1.ClifyGlobals);
        logErr("Unknown options:");
        unknownArgs.forEach((arg) => {
            if (arg.length === 1) {
                logErr(`  -${arg}`);
            }
            else {
                logErr(`  --${arg}`);
            }
        });
    }
    printArgumentErrors(errors) {
        const logErr = clify_1.ClifyGlobals.err.bind(clify_1.ClifyGlobals);
        logErr("Invalid options:");
        errors.forEach((err) => {
            logErr(`  ${err.toPrintable()}`);
        });
    }
    async prepare() {
        if ("help" in this.parsedArgs) {
            this.printHelp();
            return "skip";
        }
        // Detect unknown arguments
        const argNames = Object.keys(this.parsedArgs).filter((key) => key !== "_" && key !== "__");
        const unknownArgs = [];
        for (let i = 0; i < argNames.length; i++) {
            const name = argNames[i];
            if (this.ownOptions.some((a) => a.nameMatches(name))) {
                continue;
            }
            unknownArgs.push(name);
        }
        if (unknownArgs.length > 0) {
            this.printUnknownArgsMsg(unknownArgs);
            return "fail";
        }
        // Validate known arguments
        const validationErrors = [];
        for (let i = 0; i < this.ownOptions.length; i++) {
            const err = this.ownOptions[i].init();
            if (err != null) {
                validationErrors.push(err);
            }
        }
        if (validationErrors.length > 0) {
            this.printArgumentErrors(validationErrors);
            return "fail";
        }
        if (this.ownInput) {
            await this.ownInput.prepare();
            return this.ownInput.validate() ? "ok" : "fail";
        }
        return "ok";
    }
    runAction() {
        if (this.ownAction == null) {
            clify_1.ClifyGlobals.warn("Nothing to do.");
            return Promise.resolve(new Error("Nothing to do."));
        }
        return this.ownAction();
    }
    getParsedArgs() {
        return this.parsedArgs;
    }
    async start(parsedArgs, input) {
        this.parsedArgs = parsedArgs;
        this.ownInput?.setArgumentInput(input);
        const r = await this.prepare();
        if (r === "ok") {
            return this.runAction();
        }
        else if (r === "fail") {
            return Promise.resolve(new Error("Command failed"));
        }
    }
}
exports.Cmd = Cmd;
