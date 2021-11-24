"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCommand = void 0;
var command_1 = require("./command");
var default_initializer_1 = require("./default-initializer");
var SubCommand = /** @class */ (function (_super) {
    __extends(SubCommand, _super);
    function SubCommand(keyword, initialize) {
        var _this = _super.call(this) || this;
        _this.define(initialize);
        _this.keyword = keyword;
        return _this;
    }
    SubCommand.prototype.getPrintableList = function () {
        this.runInitialize();
        return [this.keyword, this.shortDescription];
    };
    SubCommand.prototype.getName = function () {
        return this.name || this.keyword;
    };
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
    SubCommand.prototype.addSubCommand = function (keyword, initialize) {
        if (initialize === void 0) { initialize = default_initializer_1.defaultInitializer; }
        var subCommand = new SubCommand(keyword, initialize);
        this.addChildCommand(subCommand);
        return subCommand;
    };
    return SubCommand;
}(command_1.Command));
exports.SubCommand = SubCommand;
