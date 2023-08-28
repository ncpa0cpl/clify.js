"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Commands/main-command.ts
var main_command_exports = {};
__export(main_command_exports, {
  MainCommand: () => MainCommand
});
module.exports = __toCommonJS(main_command_exports);
var import_path = __toESM(require("path"));
var import_is_arg_name = require("../Arguments/Utils/is-arg-name.cjs");
var import_argument_parser = require("../Arguments/argument-parser.cjs");
var import_command = require("./command.cjs");
var import_default_initializer = require("./default-initializer.cjs");
var import_sub_command = require("./sub-command.cjs");
var MainCommand = class extends import_command.Command {
  constructor() {
    super();
    this.options = {};
    const scriptPath = process.argv[1];
    this.name = import_path.default.parse(scriptPath).name;
    this.define(import_default_initializer.defaultInitializer);
  }
  parseCliCommand() {
    const args = process.argv.slice(2);
    let command = this;
    let i = 0;
    for (; i < args.length; i++) {
      const cmdName = args[i];
      if (!command || (0, import_is_arg_name.isArgName)(cmdName))
        break;
      const cmdReplacement = command.findChildCommand(cmdName);
      if (cmdReplacement) {
        command = cmdReplacement;
      } else {
        break;
      }
    }
    const rest = [];
    for (; i < args.length; i++) {
      rest.push(args[i]);
    }
    return [command, rest];
  }
  /**
   * @internal
   */
  start() {
    const [command, args] = this.parseCliCommand();
    return command.execute(args);
  }
  /**
   * Sets the default behavior for this script when started from the
   * CLI without any sub-commands.
   */
  setMainAction(initialize) {
    this.define(initialize);
  }
  /**
   * Creates a sub-command for this script.
   *
   * @example
   *   mainCommand.addSubCommand("cmdName", () => {
   *     return {
   *       run() {
   *         console.log("Sub Command ran.");
   *       },
   *     };
   *   });
   *
   *   // CLI: node my-script.js cmdName
   *   // Output: "Sub Command ran."
   */
  addSubCommand(keyword, initialize = import_default_initializer.defaultInitializer) {
    const subCommand = new import_sub_command.SubCommand(keyword, initialize);
    this.addChildCommand(subCommand);
    return subCommand;
  }
  setOptions(opt) {
    this.options = opt;
    import_argument_parser.Arguments.allowUnrecognized(
      this.options.allowUnrecognizedArguments ?? false
    );
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL0NvbW1hbmRzL21haW4tY29tbWFuZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGlzQXJnTmFtZSB9IGZyb20gXCIuLi9Bcmd1bWVudHMvVXRpbHMvaXMtYXJnLW5hbWVcIjtcbmltcG9ydCB7IEFyZ3VtZW50cyB9IGZyb20gXCIuLi9Bcmd1bWVudHMvYXJndW1lbnQtcGFyc2VyXCI7XG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZFwiO1xuaW1wb3J0IHsgZGVmYXVsdEluaXRpYWxpemVyIH0gZnJvbSBcIi4vZGVmYXVsdC1pbml0aWFsaXplclwiO1xuaW1wb3J0IHsgU3ViQ29tbWFuZCB9IGZyb20gXCIuL3N1Yi1jb21tYW5kXCI7XG5pbXBvcnQgdHlwZSB7XG4gIENvbW1hbmRJbml0aWFsaXplQ2FsbGJhY2ssXG4gIE1haW5Db21tYW5kSW5pdGlhbGl6ZUNhbGxiYWNrLFxufSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgdHlwZSBNYWluQ29tbWFuZE9wdGlvbnMgPSB7XG4gIC8qKlxuICAgKiBXaGVuIGVuYWJsZWQsIHNjcmlwdCB3aWxsIGlnbm9yZSBhbnkgaW52YWxpZCBhcmd1bWVudHMgd2l0aG91dFxuICAgKiBwcmludGluZyBlcnJvcnMuXG4gICAqL1xuICBhbGxvd1VucmVjb2duaXplZEFyZ3VtZW50cz86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgY2xhc3MgTWFpbkNvbW1hbmQgZXh0ZW5kcyBDb21tYW5kIHtcbiAgcHJpdmF0ZSBvcHRpb25zOiBNYWluQ29tbWFuZE9wdGlvbnMgPSB7fTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnN0IHNjcmlwdFBhdGggPSBwcm9jZXNzLmFyZ3ZbMV07XG5cbiAgICB0aGlzLm5hbWUgPSBwYXRoLnBhcnNlKHNjcmlwdFBhdGgpLm5hbWU7XG5cbiAgICB0aGlzLmRlZmluZShkZWZhdWx0SW5pdGlhbGl6ZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUNsaUNvbW1hbmQoKSB7XG4gICAgY29uc3QgYXJncyA9IHByb2Nlc3MuYXJndi5zbGljZSgyKTtcblxuICAgIGxldCBjb21tYW5kOiBDb21tYW5kID0gdGhpcztcblxuICAgIGxldCBpID0gMDtcbiAgICBmb3IgKDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNtZE5hbWUgPSBhcmdzW2ldITtcbiAgICAgIGlmICghY29tbWFuZCB8fCBpc0FyZ05hbWUoY21kTmFtZSkpIGJyZWFrO1xuXG4gICAgICBjb25zdCBjbWRSZXBsYWNlbWVudCA9IGNvbW1hbmQuZmluZENoaWxkQ29tbWFuZChjbWROYW1lKTtcblxuICAgICAgaWYgKGNtZFJlcGxhY2VtZW50KSB7XG4gICAgICAgIGNvbW1hbmQgPSBjbWRSZXBsYWNlbWVudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3Q6IHN0cmluZ1tdID0gW107XG5cbiAgICBmb3IgKDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3QucHVzaChhcmdzW2ldISk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtjb21tYW5kLCByZXN0XSBhcyBjb25zdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHB1YmxpYyBzdGFydCgpIHtcbiAgICBjb25zdCBbY29tbWFuZCwgYXJnc10gPSB0aGlzLnBhcnNlQ2xpQ29tbWFuZCgpO1xuXG4gICAgcmV0dXJuIGNvbW1hbmQuZXhlY3V0ZShhcmdzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBkZWZhdWx0IGJlaGF2aW9yIGZvciB0aGlzIHNjcmlwdCB3aGVuIHN0YXJ0ZWQgZnJvbSB0aGVcbiAgICogQ0xJIHdpdGhvdXQgYW55IHN1Yi1jb21tYW5kcy5cbiAgICovXG4gIHNldE1haW5BY3Rpb24oaW5pdGlhbGl6ZTogTWFpbkNvbW1hbmRJbml0aWFsaXplQ2FsbGJhY2spIHtcbiAgICB0aGlzLmRlZmluZShpbml0aWFsaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgc3ViLWNvbW1hbmQgZm9yIHRoaXMgc2NyaXB0LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiAgIG1haW5Db21tYW5kLmFkZFN1YkNvbW1hbmQoXCJjbWROYW1lXCIsICgpID0+IHtcbiAgICogICAgIHJldHVybiB7XG4gICAqICAgICAgIHJ1bigpIHtcbiAgICogICAgICAgICBjb25zb2xlLmxvZyhcIlN1YiBDb21tYW5kIHJhbi5cIik7XG4gICAqICAgICAgIH0sXG4gICAqICAgICB9O1xuICAgKiAgIH0pO1xuICAgKlxuICAgKiAgIC8vIENMSTogbm9kZSBteS1zY3JpcHQuanMgY21kTmFtZVxuICAgKiAgIC8vIE91dHB1dDogXCJTdWIgQ29tbWFuZCByYW4uXCJcbiAgICovXG4gIGFkZFN1YkNvbW1hbmQoXG4gICAga2V5d29yZDogc3RyaW5nLFxuICAgIGluaXRpYWxpemU6IENvbW1hbmRJbml0aWFsaXplQ2FsbGJhY2sgPSBkZWZhdWx0SW5pdGlhbGl6ZXIsXG4gICkge1xuICAgIGNvbnN0IHN1YkNvbW1hbmQgPSBuZXcgU3ViQ29tbWFuZChrZXl3b3JkLCBpbml0aWFsaXplKTtcbiAgICB0aGlzLmFkZENoaWxkQ29tbWFuZChzdWJDb21tYW5kKTtcbiAgICByZXR1cm4gc3ViQ29tbWFuZDtcbiAgfVxuXG4gIHNldE9wdGlvbnMob3B0OiBNYWluQ29tbWFuZE9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHQ7XG4gICAgQXJndW1lbnRzLmFsbG93VW5yZWNvZ25pemVkKFxuICAgICAgdGhpcy5vcHRpb25zLmFsbG93VW5yZWNvZ25pemVkQXJndW1lbnRzID8/IGZhbHNlLFxuICAgICk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFBaUI7QUFDakIseUJBQTBCO0FBQzFCLDZCQUEwQjtBQUMxQixxQkFBd0I7QUFDeEIsaUNBQW1DO0FBQ25DLHlCQUEyQjtBQWNwQixJQUFNLGNBQU4sY0FBMEIsdUJBQVE7QUFBQSxFQUd2QyxjQUFjO0FBQ1osVUFBTTtBQUhSLFNBQVEsVUFBOEIsQ0FBQztBQUlyQyxVQUFNLGFBQWEsUUFBUSxLQUFLLENBQUM7QUFFakMsU0FBSyxPQUFPLFlBQUFBLFFBQUssTUFBTSxVQUFVLEVBQUU7QUFFbkMsU0FBSyxPQUFPLDZDQUFrQjtBQUFBLEVBQ2hDO0FBQUEsRUFFUSxrQkFBa0I7QUFDeEIsVUFBTSxPQUFPLFFBQVEsS0FBSyxNQUFNLENBQUM7QUFFakMsUUFBSSxVQUFtQjtBQUV2QixRQUFJLElBQUk7QUFDUixXQUFPLElBQUksS0FBSyxRQUFRLEtBQUs7QUFDM0IsWUFBTSxVQUFVLEtBQUssQ0FBQztBQUN0QixVQUFJLENBQUMsZUFBVyw4QkFBVSxPQUFPO0FBQUc7QUFFcEMsWUFBTSxpQkFBaUIsUUFBUSxpQkFBaUIsT0FBTztBQUV2RCxVQUFJLGdCQUFnQjtBQUNsQixrQkFBVTtBQUFBLE1BQ1osT0FBTztBQUNMO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxVQUFNLE9BQWlCLENBQUM7QUFFeEIsV0FBTyxJQUFJLEtBQUssUUFBUSxLQUFLO0FBQzNCLFdBQUssS0FBSyxLQUFLLENBQUMsQ0FBRTtBQUFBLElBQ3BCO0FBRUEsV0FBTyxDQUFDLFNBQVMsSUFBSTtBQUFBLEVBQ3ZCO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLTyxRQUFRO0FBQ2IsVUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLEtBQUssZ0JBQWdCO0FBRTdDLFdBQU8sUUFBUSxRQUFRLElBQUk7QUFBQSxFQUM3QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNQSxjQUFjLFlBQTJDO0FBQ3ZELFNBQUssT0FBTyxVQUFVO0FBQUEsRUFDeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQWlCQSxjQUNFLFNBQ0EsYUFBd0MsK0NBQ3hDO0FBQ0EsVUFBTSxhQUFhLElBQUksOEJBQVcsU0FBUyxVQUFVO0FBQ3JELFNBQUssZ0JBQWdCLFVBQVU7QUFDL0IsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVBLFdBQVcsS0FBeUI7QUFDbEMsU0FBSyxVQUFVO0FBQ2YscUNBQVU7QUFBQSxNQUNSLEtBQUssUUFBUSw4QkFBOEI7QUFBQSxJQUM3QztBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
