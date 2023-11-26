"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnspecifiedOptionError = exports.InvalidOptionError = exports.OptionError = void 0;
class OptionError extends Error {
    optionName;
    customMessage;
    constructor(msg, optionName) {
        super(msg);
        this.optionName = optionName;
    }
    toPrintable() {
        return `${this.customMessage ?? this.message}: ${this.optionName}`;
    }
}
exports.OptionError = OptionError;
class InvalidOptionError extends OptionError {
    expected;
    received;
    customMessage;
    constructor(optName, expected, received, customMessage) {
        super(`Invalid option, expected '${expected}', but received '${received}'`, optName);
        this.expected = expected;
        this.received = received;
        this.customMessage = customMessage;
        this.name = "InvalidOptionError";
    }
}
exports.InvalidOptionError = InvalidOptionError;
class UnspecifiedOptionError extends OptionError {
    optionName;
    constructor(optionName) {
        super(`Unspecified option`, optionName);
        this.optionName = optionName;
        this.name = "UnspecifiedOptionError";
    }
}
exports.UnspecifiedOptionError = UnspecifiedOptionError;
