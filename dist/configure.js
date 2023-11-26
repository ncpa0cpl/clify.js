"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = exports.MainCmd = void 0;
const clify_1 = require("./clify");
const command_1 = require("./commands/command");
const program_1 = require("./program");
const assert_not_async_1 = require("./utils/assert-not-async");
class MainCmd extends command_1.Cmd {
    version;
    programName;
    printVersionInfo() {
        let msg = "";
        if (this.programName != null) {
            msg = `${this.programName} `;
        }
        if (this.version != null) {
            msg += `${this.version} `;
        }
        clify_1.ClifyGlobals.log(msg);
    }
    setVersion(version) {
        this.version = version;
    }
    setName(name) {
        this.programName = name;
    }
    main(initCallback) {
        this.ownAction = initCallback(this);
    }
    getName() {
        return this.programName ?? "";
    }
}
exports.MainCmd = MainCmd;
function configure(configureCallback) {
    const mainCommand = new MainCmd("");
    (0, assert_not_async_1.assertNotAsync)(configureCallback(mainCommand), "configureCallback");
    return new program_1.ClifyProgram(mainCommand);
}
exports.configure = configure;
