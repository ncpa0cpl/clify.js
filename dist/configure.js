"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
const command_1 = require("./command");
const program_1 = require("./program");
class MainCmd extends command_1.Cmd {
    main(initCallback) {
        this.ownAction = initCallback(this);
    }
}
function configure(configureCallback) {
    const mainCommand = new MainCmd("");
    assertNotAsync(configureCallback(mainCommand), "configureCallback");
    return new program_1.ClifyProgram(mainCommand);
}
exports.configure = configure;
