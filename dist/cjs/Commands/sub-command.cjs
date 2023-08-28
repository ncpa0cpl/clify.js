"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Commands/sub-command.ts
var sub_command_exports = {};
__export(sub_command_exports, {
  SubCommand: () => SubCommand
});
module.exports = __toCommonJS(sub_command_exports);
var import_command = require("./command.cjs");
var import_default_initializer = require("./default-initializer.cjs");
var SubCommand = class _SubCommand extends import_command.Command {
  constructor(keyword, initialize) {
    super();
    this.keyword = keyword;
    this.define(initialize);
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
   *     }),
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
   *     },
   *   );
   *
   *   // CLI: node my-script.js command_1 command_2
   *   // Output: "Nested sub-command ran."
   */
  addSubCommand(keyword, initialize = import_default_initializer.defaultInitializer) {
    const subCommand = new _SubCommand(keyword, initialize);
    this.addChildCommand(subCommand);
    return subCommand;
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL0NvbW1hbmRzL3N1Yi1jb21tYW5kLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZFwiO1xuaW1wb3J0IHsgZGVmYXVsdEluaXRpYWxpemVyIH0gZnJvbSBcIi4vZGVmYXVsdC1pbml0aWFsaXplclwiO1xuaW1wb3J0IHR5cGUgeyBDb21tYW5kSW5pdGlhbGl6ZUNhbGxiYWNrIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIFN1YkNvbW1hbmQgZXh0ZW5kcyBDb21tYW5kIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHJlYWRvbmx5IGtleXdvcmQ6IHN0cmluZyxcbiAgICBpbml0aWFsaXplOiBDb21tYW5kSW5pdGlhbGl6ZUNhbGxiYWNrLFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZGVmaW5lKGluaXRpYWxpemUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFByaW50YWJsZUxpc3QoKSB7XG4gICAgdGhpcy5ydW5Jbml0aWFsaXplKCk7XG4gICAgcmV0dXJuIFt0aGlzLmtleXdvcmQsIHRoaXMuc2hvcnREZXNjcmlwdGlvbl07XG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWUgfHwgdGhpcy5rZXl3b3JkO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBzdWItY29tbWFuZCBmb3IgdGhpcyBjb21tYW5kLiBTdWIgY29tbWFuZHMgY2FuIGJlIG5lc3RlZC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogICBjb25zdCBjb21tYW5kXzEgPSBtYWluQ29tbWFuZC5hZGRTdWJDb21tYW5kKFxuICAgKiAgICAgXCJjb21tYW5kXzFcIixcbiAgICogICAgICgpID0+ICh7XG4gICAqICAgICAgIHJ1bigpIHtcbiAgICogICAgICAgICBjb25zb2xlLmxvZyhcIlN1Yi1jb21tYW5kIDEgcmFuLlwiKTtcbiAgICogICAgICAgfSxcbiAgICogICAgIH0pLFxuICAgKiAgICk7XG4gICAqXG4gICAqICAgY29uc3QgY29tbWFuZF8yID0gY29tbWFuZF8xLmFkZFN1YkNvbW1hbmQoXG4gICAqICAgICBcImNvbW1hbmRfMlwiLFxuICAgKiAgICAgKCkgPT4ge1xuICAgKiAgICAgICByZXR1cm4ge1xuICAgKiAgICAgICAgIHJ1bigpIHtcbiAgICogICAgICAgICAgIGNvbnNvbGUubG9nKFwiTmVzdGVkIHN1Yi1jb21tYW5kIHJhbi5cIik7XG4gICAqICAgICAgICAgfSxcbiAgICogICAgICAgfTtcbiAgICogICAgIH0sXG4gICAqICAgKTtcbiAgICpcbiAgICogICAvLyBDTEk6IG5vZGUgbXktc2NyaXB0LmpzIGNvbW1hbmRfMSBjb21tYW5kXzJcbiAgICogICAvLyBPdXRwdXQ6IFwiTmVzdGVkIHN1Yi1jb21tYW5kIHJhbi5cIlxuICAgKi9cbiAgYWRkU3ViQ29tbWFuZChcbiAgICBrZXl3b3JkOiBzdHJpbmcsXG4gICAgaW5pdGlhbGl6ZTogQ29tbWFuZEluaXRpYWxpemVDYWxsYmFjayA9IGRlZmF1bHRJbml0aWFsaXplcixcbiAgKSB7XG4gICAgY29uc3Qgc3ViQ29tbWFuZCA9IG5ldyBTdWJDb21tYW5kKGtleXdvcmQsIGluaXRpYWxpemUpO1xuICAgIHRoaXMuYWRkQ2hpbGRDb21tYW5kKHN1YkNvbW1hbmQpO1xuICAgIHJldHVybiBzdWJDb21tYW5kO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBd0I7QUFDeEIsaUNBQW1DO0FBRzVCLElBQU0sYUFBTixNQUFNLG9CQUFtQix1QkFBUTtBQUFBLEVBQ3RDLFlBQ2tCLFNBQ2hCLFlBQ0E7QUFDQSxVQUFNO0FBSFU7QUFJaEIsU0FBSyxPQUFPLFVBQVU7QUFBQSxFQUN4QjtBQUFBLEVBRVUsbUJBQW1CO0FBQzNCLFNBQUssY0FBYztBQUNuQixXQUFPLENBQUMsS0FBSyxTQUFTLEtBQUssZ0JBQWdCO0FBQUEsRUFDN0M7QUFBQSxFQUVBLFVBQVU7QUFDUixXQUFPLEtBQUssUUFBUSxLQUFLO0FBQUEsRUFDM0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQTZCQSxjQUNFLFNBQ0EsYUFBd0MsK0NBQ3hDO0FBQ0EsVUFBTSxhQUFhLElBQUksWUFBVyxTQUFTLFVBQVU7QUFDckQsU0FBSyxnQkFBZ0IsVUFBVTtBQUMvQixXQUFPO0FBQUEsRUFDVDtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
