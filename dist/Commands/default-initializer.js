"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultInitializer = void 0;
function defaultInitializer() {
    const self = this;
    return {
        run() {
            self["printHelpMessage"]();
        },
    };
}
exports.defaultInitializer = defaultInitializer;
