"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCommand = void 0;
const command_1 = require("./command");
const default_initializer_1 = require("./default-initializer");
class SubCommand extends command_1.Command {
    constructor(keyword, initialize) {
        super();
        this.define(initialize);
        this.keyword = keyword;
    }
    getPrintableList() {
        this.runInitialize();
        return [this.keyword, this.shortDescription];
    }
    getName() {
        return this.name || this.keyword;
    }
    /**
     * Adds a sub-command for this command. Sub commands can be nested.
     *
     * @example
     *   const command_1 = mainCommand.addSubCommand(
     *     "command_1",
     *     () => ({
     *       run() {
     *         console.log("Sub-command 1 ran.");
     *       },
     *     })
     *   );
     *
     *   const command_2 = command_1.addSubCommand(
     *     "command_2",
     *     () => {
     *       return {
     *         run() {
     *           console.log("Nested sub-command ran.");
     *         },
     *       };
     *     }
     *   );
     *
     *   // CLI: node my-script.js command_1 command_2
     *   // Output: "Nested sub-command ran."
     */
    addSubCommand(keyword, initialize = default_initializer_1.defaultInitializer) {
        const subCommand = new SubCommand(keyword, initialize);
        this.addChildCommand(subCommand);
        return subCommand;
    }
}
exports.SubCommand = SubCommand;
