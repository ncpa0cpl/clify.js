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

// src/Commands/command.ts
var command_exports = {};
__export(command_exports, {
  Command: () => Command
});
module.exports = __toCommonJS(command_exports);
var import_dilswer = require("dilswer");
var import_termx_markup = require("termx-markup");
var import_argument = require("../Arguments/argument.cjs");
var import_argument_parser = require("../Arguments/argument-parser.cjs");
var import_errors = require("../Utils/errors.cjs");
var import_group_by_category = require("../Utils/group-by-category.cjs");
var import_print_lists = require("../Utils/print-lists.cjs");
var import_output = require("../output.cjs");
var import_stdinput = require("../stdinput.cjs");
var HelpArg = import_argument.Argument.define({
  arg: "-h",
  fullArg: "--help",
  dataType: import_dilswer.Type.Boolean,
  description: "Show this help message."
});
var Command = class _Command {
  constructor() {
    this.childCommands = [];
    this.implementation = void 0;
    this.initialize = void 0;
    this.description = "";
    this.shortDescription = "";
    this.name = "";
  }
  static initHelpArg() {
    if (!_Command.helpArgument) {
      _Command.helpArgument = new HelpArg();
    }
  }
  setImplementation(impl) {
    this.implementation = impl;
  }
  /**
   * @internal
   */
  runInitialize() {
    import_argument.Argument.startCommandInitialization();
    try {
      _Command.initHelpArg();
      if (this.initialize && !this.implementation) {
        const data = this.initialize();
        this.setImplementation(data);
        if (data.commandDescription)
          this.description = data.commandDescription;
        if (data.shortDescription)
          this.shortDescription = data.shortDescription;
        if (data.displayName)
          this.name = data.displayName;
      }
    } finally {
      import_argument.Argument.endCommandInitialization();
    }
  }
  /**
   * @internal
   */
  define(initialize) {
    this.initialize = initialize;
  }
  /**
   * @internal
   */
  async execute(args) {
    this.runInitialize();
    await import_argument_parser.Arguments.parseArguments(args);
    if (_Command.helpArgument.value === true)
      return this.printHelpMessage();
    if (!import_argument_parser.Arguments.hasFileInputArg() && import_stdinput.StdInput.instance) {
      await import_stdinput.StdInput.load(import_stdinput.StdInput.instance);
    }
    import_argument_parser.Arguments.validateAll();
    if (this.implementation) {
      return this.implementation.run();
    }
  }
  /**
   * @internal
   */
  addChildCommand(c) {
    if (this.findChildCommand(c.keyword)) {
      import_output.Out.err(import_termx_markup.html`
        <span color="lightRed">Internal Error</span>
        <line>
          Command with the name "${c.keyword}" already exists.
        </line>
      `);
      throw new import_errors.InitError();
    }
    this.childCommands.push(c);
  }
  /**
   * @internal
   */
  findChildCommand(keyword) {
    return this.childCommands.find((c) => c.keyword === keyword);
  }
  getName() {
    return this.name;
  }
  /**
   * @internal
   */
  printHelpMessage() {
    const argsInfo = (0, import_group_by_category.groupByCategory)(import_argument.Argument.getArgumentsInfo());
    const commandName = this.getName();
    if (this.childCommands.length > 0) {
      if (import_argument_parser.Arguments.hasFileInputArg()) {
        import_output.Out.out(import_termx_markup.html`
          <span>${commandName} [COMMAND] [OPTION]... [FILE]</span>
        `);
      } else {
        import_output.Out.out(import_termx_markup.html`
          <span>${commandName} [COMMAND] [OPTION]...</span>
        `);
      }
    } else {
      if (import_argument_parser.Arguments.hasFileInputArg()) {
        import_output.Out.out(import_termx_markup.html`
          <span>${commandName} [OPTION]... [FILE]</span>
        `);
      } else {
        import_output.Out.out(import_termx_markup.html` <span>${commandName} [OPTION]...</span> `);
      }
    }
    import_output.Out.out("");
    if (this.description) {
      import_output.Out.out(import_termx_markup.html` <span>${this.description}</span> `);
    } else if (this.shortDescription) {
      import_output.Out.out(import_termx_markup.html` <span>${this.shortDescription}</span> `);
    }
    if (this.childCommands.length > 0) {
      import_output.Out.out(import_termx_markup.html` <span bold>Commands:</span> `);
      (0, import_print_lists.printLists)(
        this.childCommands.map(
          (child) => child["getPrintableList"]()
        ),
        true
      );
      import_output.Out.out(import_termx_markup.html` <span></span> `);
    }
    import_output.Out.out(import_termx_markup.html` <span bold>Arguments:</span> `);
    for (const [category, args] of argsInfo) {
      if (category.length > 0) {
        import_output.Out.out(import_termx_markup.html` <span bold>${category}:</span> `);
      }
      (0, import_print_lists.printLists)(
        args.map((arg) => [
          arg.arg ?? "",
          arg.fullArg ?? "",
          arg.description
        ]),
        true
      );
    }
  }
  /**
   * Sets the description of this command that will be displayed when
   * looking up the `--help` for this command.
   */
  setDescription(description) {
    this.description = description;
  }
  /**
   * Sets the name that will be displayed for this Command in the
   * command line interface.
   */
  setDisplayName(name) {
    this.name = name;
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL0NvbW1hbmRzL2NvbW1hbmQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IFR5cGUgfSBmcm9tIFwiZGlsc3dlclwiO1xuaW1wb3J0IHsgaHRtbCB9IGZyb20gXCJ0ZXJteC1tYXJrdXBcIjtcbmltcG9ydCB7IEFyZ3VtZW50IH0gZnJvbSBcIi4uL0FyZ3VtZW50cy9hcmd1bWVudFwiO1xuaW1wb3J0IHsgQXJndW1lbnRzIH0gZnJvbSBcIi4uL0FyZ3VtZW50cy9hcmd1bWVudC1wYXJzZXJcIjtcbmltcG9ydCB7IEluaXRFcnJvciB9IGZyb20gXCIuLi9VdGlscy9lcnJvcnNcIjtcbmltcG9ydCB7IGdyb3VwQnlDYXRlZ29yeSB9IGZyb20gXCIuLi9VdGlscy9ncm91cC1ieS1jYXRlZ29yeVwiO1xuaW1wb3J0IHsgcHJpbnRMaXN0cyB9IGZyb20gXCIuLi9VdGlscy9wcmludC1saXN0c1wiO1xuaW1wb3J0IHsgT3V0IH0gZnJvbSBcIi4uL291dHB1dFwiO1xuaW1wb3J0IHsgU3RkSW5wdXQgfSBmcm9tIFwiLi4vc3RkaW5wdXRcIjtcbmltcG9ydCB0eXBlIHsgU3ViQ29tbWFuZCB9IGZyb20gXCIuL3N1Yi1jb21tYW5kXCI7XG5pbXBvcnQgdHlwZSB7XG4gIENvbW1hbmRJbXBsZW1lbnRhdGlvbixcbiAgQ29tbWFuZEluaXRpYWxpemVDYWxsYmFjayxcbn0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgSGVscEFyZyA9IEFyZ3VtZW50LmRlZmluZSh7XG4gIGFyZzogXCItaFwiLFxuICBmdWxsQXJnOiBcIi0taGVscFwiLFxuICBkYXRhVHlwZTogVHlwZS5Cb29sZWFuLFxuICBkZXNjcmlwdGlvbjogXCJTaG93IHRoaXMgaGVscCBtZXNzYWdlLlwiLFxufSk7XG5cbmV4cG9ydCBjbGFzcyBDb21tYW5kIHtcbiAgcHJpdmF0ZSBzdGF0aWMgaGVscEFyZ3VtZW50OiBBcmd1bWVudDx0eXBlb2YgVHlwZS5Cb29sZWFuLCBmYWxzZT47XG5cbiAgcHJpdmF0ZSBzdGF0aWMgaW5pdEhlbHBBcmcoKSB7XG4gICAgaWYgKCFDb21tYW5kLmhlbHBBcmd1bWVudCkge1xuICAgICAgQ29tbWFuZC5oZWxwQXJndW1lbnQgPSBuZXcgSGVscEFyZygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hpbGRDb21tYW5kczogU3ViQ29tbWFuZFtdID0gW107XG4gIHByaXZhdGUgaW1wbGVtZW50YXRpb246IENvbW1hbmRJbXBsZW1lbnRhdGlvbiB8IHVuZGVmaW5lZCA9XG4gICAgdW5kZWZpbmVkO1xuICBwcml2YXRlIGluaXRpYWxpemU6IENvbW1hbmRJbml0aWFsaXplQ2FsbGJhY2sgfCB1bmRlZmluZWQgPVxuICAgIHVuZGVmaW5lZDtcblxuICBwcm90ZWN0ZWQgZGVzY3JpcHRpb24gPSBcIlwiO1xuICBwcm90ZWN0ZWQgc2hvcnREZXNjcmlwdGlvbiA9IFwiXCI7XG4gIHByb3RlY3RlZCBuYW1lID0gXCJcIjtcblxuICBwcml2YXRlIHNldEltcGxlbWVudGF0aW9uKGltcGw6IENvbW1hbmRJbXBsZW1lbnRhdGlvbikge1xuICAgIHRoaXMuaW1wbGVtZW50YXRpb24gPSBpbXBsO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcHVibGljIHJ1bkluaXRpYWxpemUoKSB7XG4gICAgQXJndW1lbnQuc3RhcnRDb21tYW5kSW5pdGlhbGl6YXRpb24oKTtcbiAgICB0cnkge1xuICAgICAgQ29tbWFuZC5pbml0SGVscEFyZygpO1xuXG4gICAgICBpZiAodGhpcy5pbml0aWFsaXplICYmICF0aGlzLmltcGxlbWVudGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmluaXRpYWxpemUoKTtcblxuICAgICAgICB0aGlzLnNldEltcGxlbWVudGF0aW9uKGRhdGEpO1xuXG4gICAgICAgIGlmIChkYXRhLmNvbW1hbmREZXNjcmlwdGlvbilcbiAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGF0YS5jb21tYW5kRGVzY3JpcHRpb247XG4gICAgICAgIGlmIChkYXRhLnNob3J0RGVzY3JpcHRpb24pXG4gICAgICAgICAgdGhpcy5zaG9ydERlc2NyaXB0aW9uID0gZGF0YS5zaG9ydERlc2NyaXB0aW9uO1xuICAgICAgICBpZiAoZGF0YS5kaXNwbGF5TmFtZSkgdGhpcy5uYW1lID0gZGF0YS5kaXNwbGF5TmFtZTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgQXJndW1lbnQuZW5kQ29tbWFuZEluaXRpYWxpemF0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcHVibGljIGRlZmluZShpbml0aWFsaXplOiBDb21tYW5kSW5pdGlhbGl6ZUNhbGxiYWNrKSB7XG4gICAgdGhpcy5pbml0aWFsaXplID0gaW5pdGlhbGl6ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHB1YmxpYyBhc3luYyBleGVjdXRlKGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5ydW5Jbml0aWFsaXplKCk7XG4gICAgYXdhaXQgQXJndW1lbnRzLnBhcnNlQXJndW1lbnRzKGFyZ3MpO1xuXG4gICAgaWYgKENvbW1hbmQuaGVscEFyZ3VtZW50LnZhbHVlID09PSB0cnVlKVxuICAgICAgcmV0dXJuIHRoaXMucHJpbnRIZWxwTWVzc2FnZSgpO1xuXG4gICAgaWYgKCFBcmd1bWVudHMuaGFzRmlsZUlucHV0QXJnKCkgJiYgU3RkSW5wdXQuaW5zdGFuY2UpIHtcbiAgICAgIGF3YWl0IFN0ZElucHV0LmxvYWQoU3RkSW5wdXQuaW5zdGFuY2UpO1xuICAgIH1cblxuICAgIEFyZ3VtZW50cy52YWxpZGF0ZUFsbCgpO1xuXG4gICAgaWYgKHRoaXMuaW1wbGVtZW50YXRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmltcGxlbWVudGF0aW9uLnJ1bigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHB1YmxpYyBhZGRDaGlsZENvbW1hbmQoYzogU3ViQ29tbWFuZCkge1xuICAgIGlmICh0aGlzLmZpbmRDaGlsZENvbW1hbmQoYy5rZXl3b3JkKSkge1xuICAgICAgT3V0LmVycihodG1sYFxuICAgICAgICA8c3BhbiBjb2xvcj1cImxpZ2h0UmVkXCI+SW50ZXJuYWwgRXJyb3I8L3NwYW4+XG4gICAgICAgIDxsaW5lPlxuICAgICAgICAgIENvbW1hbmQgd2l0aCB0aGUgbmFtZSBcIiR7Yy5rZXl3b3JkfVwiIGFscmVhZHkgZXhpc3RzLlxuICAgICAgICA8L2xpbmU+XG4gICAgICBgKTtcbiAgICAgIHRocm93IG5ldyBJbml0RXJyb3IoKTtcbiAgICB9XG5cbiAgICB0aGlzLmNoaWxkQ29tbWFuZHMucHVzaChjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHB1YmxpYyBmaW5kQ2hpbGRDb21tYW5kKGtleXdvcmQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmNoaWxkQ29tbWFuZHMuZmluZCgoYykgPT4gYy5rZXl3b3JkID09PSBrZXl3b3JkKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBwdWJsaWMgcHJpbnRIZWxwTWVzc2FnZSgpIHtcbiAgICBjb25zdCBhcmdzSW5mbyA9IGdyb3VwQnlDYXRlZ29yeShBcmd1bWVudC5nZXRBcmd1bWVudHNJbmZvKCkpO1xuICAgIGNvbnN0IGNvbW1hbmROYW1lID0gdGhpcy5nZXROYW1lKCk7XG5cbiAgICBpZiAodGhpcy5jaGlsZENvbW1hbmRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChBcmd1bWVudHMuaGFzRmlsZUlucHV0QXJnKCkpIHtcbiAgICAgICAgT3V0Lm91dChodG1sYFxuICAgICAgICAgIDxzcGFuPiR7Y29tbWFuZE5hbWV9IFtDT01NQU5EXSBbT1BUSU9OXS4uLiBbRklMRV08L3NwYW4+XG4gICAgICAgIGApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgT3V0Lm91dChodG1sYFxuICAgICAgICAgIDxzcGFuPiR7Y29tbWFuZE5hbWV9IFtDT01NQU5EXSBbT1BUSU9OXS4uLjwvc3Bhbj5cbiAgICAgICAgYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChBcmd1bWVudHMuaGFzRmlsZUlucHV0QXJnKCkpIHtcbiAgICAgICAgT3V0Lm91dChodG1sYFxuICAgICAgICAgIDxzcGFuPiR7Y29tbWFuZE5hbWV9IFtPUFRJT05dLi4uIFtGSUxFXTwvc3Bhbj5cbiAgICAgICAgYCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBPdXQub3V0KGh0bWxgIDxzcGFuPiR7Y29tbWFuZE5hbWV9IFtPUFRJT05dLi4uPC9zcGFuPiBgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBPdXQub3V0KFwiXCIpO1xuXG4gICAgaWYgKHRoaXMuZGVzY3JpcHRpb24pIHtcbiAgICAgIE91dC5vdXQoaHRtbGAgPHNwYW4+JHt0aGlzLmRlc2NyaXB0aW9ufTwvc3Bhbj4gYCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNob3J0RGVzY3JpcHRpb24pIHtcbiAgICAgIE91dC5vdXQoaHRtbGAgPHNwYW4+JHt0aGlzLnNob3J0RGVzY3JpcHRpb259PC9zcGFuPiBgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jaGlsZENvbW1hbmRzLmxlbmd0aCA+IDApIHtcbiAgICAgIE91dC5vdXQoaHRtbGAgPHNwYW4gYm9sZD5Db21tYW5kczo8L3NwYW4+IGApO1xuICAgICAgcHJpbnRMaXN0cyhcbiAgICAgICAgdGhpcy5jaGlsZENvbW1hbmRzLm1hcCgoY2hpbGQpID0+XG4gICAgICAgICAgY2hpbGRbXCJnZXRQcmludGFibGVMaXN0XCJdKCksXG4gICAgICAgICksXG4gICAgICAgIHRydWUsXG4gICAgICApO1xuICAgICAgT3V0Lm91dChodG1sYCA8c3Bhbj48L3NwYW4+IGApO1xuICAgIH1cblxuICAgIE91dC5vdXQoaHRtbGAgPHNwYW4gYm9sZD5Bcmd1bWVudHM6PC9zcGFuPiBgKTtcblxuICAgIGZvciAoY29uc3QgW2NhdGVnb3J5LCBhcmdzXSBvZiBhcmdzSW5mbykge1xuICAgICAgaWYgKGNhdGVnb3J5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgT3V0Lm91dChodG1sYCA8c3BhbiBib2xkPiR7Y2F0ZWdvcnl9Ojwvc3Bhbj4gYCk7XG4gICAgICB9XG5cbiAgICAgIHByaW50TGlzdHMoXG4gICAgICAgIGFyZ3MubWFwKChhcmcpID0+IFtcbiAgICAgICAgICBhcmcuYXJnID8/IFwiXCIsXG4gICAgICAgICAgYXJnLmZ1bGxBcmcgPz8gXCJcIixcbiAgICAgICAgICBhcmcuZGVzY3JpcHRpb24sXG4gICAgICAgIF0pLFxuICAgICAgICB0cnVlLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZGVzY3JpcHRpb24gb2YgdGhpcyBjb21tYW5kIHRoYXQgd2lsbCBiZSBkaXNwbGF5ZWQgd2hlblxuICAgKiBsb29raW5nIHVwIHRoZSBgLS1oZWxwYCBmb3IgdGhpcyBjb21tYW5kLlxuICAgKi9cbiAgcHVibGljIHNldERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uOiBzdHJpbmcpIHtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbmFtZSB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGZvciB0aGlzIENvbW1hbmQgaW4gdGhlXG4gICAqIGNvbW1hbmQgbGluZSBpbnRlcmZhY2UuXG4gICAqL1xuICBwdWJsaWMgc2V0RGlzcGxheU5hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXFCO0FBQ3JCLDBCQUFxQjtBQUNyQixzQkFBeUI7QUFD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
