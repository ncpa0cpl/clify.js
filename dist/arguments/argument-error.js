"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentError = void 0;
class ArgumentError extends Error {
    expected;
    received;
    customMessage;
    constructor(expected, received, customMessage) {
        super(`Invalid argument, expected ${expected}, but received ${received}.`);
        this.expected = expected;
        this.received = received;
        this.customMessage = customMessage;
        this.name = "ArgumentError";
    }
}
exports.ArgumentError = ArgumentError;
