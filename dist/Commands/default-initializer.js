"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultInitializer = void 0;
function defaultInitializer() {
    var self = this;
    return {
        run: function () {
            self["printHelpMessage"]();
        },
    };
}
exports.defaultInitializer = defaultInitializer;
