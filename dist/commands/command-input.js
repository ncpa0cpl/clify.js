"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmdInput = void 0;
const clify_1 = require("../clify");
class CmdInput {
    command;
    argumentInput = null;
    stdinInput = null;
    _source = null;
    constructor(command) {
        this.command = command;
    }
    setArgumentInput(value) {
        this.argumentInput = value;
        if (value != null) {
            this._source = "argument";
        }
    }
    async prepare() {
        if (this.argumentInput != null) {
            return;
        }
        const stdin = clify_1.ClifyGlobals.getStdin();
        this._source = "stdin";
        this.stdinInput = await stdin.read();
    }
    validate() {
        return this.argumentInput != null || this.stdinInput != null;
    }
    get() {
        return this.argumentInput ?? this.stdinInput;
    }
    get source() {
        return this._source;
    }
}
exports.CmdInput = CmdInput;
