"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotAsync = void 0;
function assertNotAsync(fnr, name) {
    if (fnr instanceof Promise) {
        throw new Error(`'${name}' cannot be asynchronous.`);
    }
}
exports.assertNotAsync = assertNotAsync;
