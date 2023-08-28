// src/Commands/command.ts
import { Type } from "dilswer";
import { html } from "termx-markup";
import { Argument } from "../Arguments/argument.mjs";
import { Arguments } from "../Arguments/argument-parser.mjs";
import { InitError } from "../Utils/errors.mjs";
import { groupByCategory } from "../Utils/group-by-category.mjs";
import { printLists } from "../Utils/print-lists.mjs";
import { Out } from "../output.mjs";
import { StdInput } from "../stdinput.mjs";
var HelpArg = Argument.define({
  arg: "-h",
  fullArg: "--help",
  dataType: Type.Boolean,
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
    Argument.startCommandInitialization();
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
      Argument.endCommandInitialization();
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
    await Arguments.parseArguments(args);
    if (_Command.helpArgument.value === true)
      return this.printHelpMessage();
    if (!Arguments.hasFileInputArg() && StdInput.instance) {
      await StdInput.load(StdInput.instance);
    }
    Arguments.validateAll();
    if (this.implementation) {
      return this.implementation.run();
    }
  }
  /**
   * @internal
   */
  addChildCommand(c) {
    if (this.findChildCommand(c.keyword)) {
      Out.err(html`
        <span color="lightRed">Internal Error</span>
        <line>
          Command with the name "${c.keyword}" already exists.
        </line>
      `);
      throw new InitError();
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
    const argsInfo = groupByCategory(Argument.getArgumentsInfo());
    const commandName = this.getName();
    if (this.childCommands.length > 0) {
      if (Arguments.hasFileInputArg()) {
        Out.out(html`
          <span>${commandName} [COMMAND] [OPTION]... [FILE]</span>
        `);
      } else {
        Out.out(html`
          <span>${commandName} [COMMAND] [OPTION]...</span>
        `);
      }
    } else {
      if (Arguments.hasFileInputArg()) {
        Out.out(html`
          <span>${commandName} [OPTION]... [FILE]</span>
        `);
      } else {
        Out.out(html` <span>${commandName} [OPTION]...</span> `);
      }
    }
    Out.out("");
    if (this.description) {
      Out.out(html` <span>${this.description}</span> `);
    } else if (this.shortDescription) {
      Out.out(html` <span>${this.shortDescription}</span> `);
    }
    if (this.childCommands.length > 0) {
      Out.out(html` <span bold>Commands:</span> `);
      printLists(
        this.childCommands.map(
          (child) => child["getPrintableList"]()
        ),
        true
      );
      Out.out(html` <span></span> `);
    }
    Out.out(html` <span bold>Arguments:</span> `);
    for (const [category, args] of argsInfo) {
      if (category.length > 0) {
        Out.out(html` <span bold>${category}:</span> `);
      }
      printLists(
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
export {
  Command
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL0NvbW1hbmRzL2NvbW1hbmQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IFR5cGUgfSBmcm9tIFwiZGlsc3dlclwiO1xuaW1wb3J0IHsgaHRtbCB9IGZyb20gXCJ0ZXJteC1tYXJrdXBcIjtcbmltcG9ydCB7IEFyZ3VtZW50IH0gZnJvbSBcIi4uL0FyZ3VtZW50cy9hcmd1bWVudFwiO1xuaW1wb3J0IHsgQXJndW1lbnRzIH0gZnJvbSBcIi4uL0FyZ3VtZW50cy9hcmd1bWVudC1wYXJzZXJcIjtcbmltcG9ydCB7IEluaXRFcnJvciB9IGZyb20gXCIuLi9VdGlscy9lcnJvcnNcIjtcbmltcG9ydCB7IGdyb3VwQnlDYXRlZ29yeSB9IGZyb20gXCIuLi9VdGlscy9ncm91cC1ieS1jYXRlZ29yeVwiO1xuaW1wb3J0IHsgcHJpbnRMaXN0cyB9IGZyb20gXCIuLi9VdGlscy9wcmludC1saXN0c1wiO1xuaW1wb3J0IHsgT3V0IH0gZnJvbSBcIi4uL291dHB1dFwiO1xuaW1wb3J0IHsgU3RkSW5wdXQgfSBmcm9tIFwiLi4vc3RkaW5wdXRcIjtcbmltcG9ydCB0eXBlIHsgU3ViQ29tbWFuZCB9IGZyb20gXCIuL3N1Yi1jb21tYW5kXCI7XG5pbXBvcnQgdHlwZSB7XG4gIENvbW1hbmRJbXBsZW1lbnRhdGlvbixcbiAgQ29tbWFuZEluaXRpYWxpemVDYWxsYmFjayxcbn0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgSGVscEFyZyA9IEFyZ3VtZW50LmRlZmluZSh7XG4gIGFyZzogXCItaFwiLFxuICBmdWxsQXJnOiBcIi0taGVscFwiLFxuICBkYXRhVHlwZTogVHlwZS5Cb29sZWFuLFxuICBkZXNjcmlwdGlvbjogXCJTaG93IHRoaXMgaGVscCBtZXNzYWdlLlwiLFxufSk7XG5cbmV4cG9ydCBjbGFzcyBDb21tYW5kIHtcbiAgcHJpdmF0ZSBzdGF0aWMgaGVscEFyZ3VtZW50OiBBcmd1bWVudDx0eXBlb2YgVHlwZS5Cb29sZWFuLCBmYWxzZT47XG5cbiAgcHJpdmF0ZSBzdGF0aWMgaW5pdEhlbHBBcmcoKSB7XG4gICAgaWYgKCFDb21tYW5kLmhlbHBBcmd1bWVudCkge1xuICAgICAgQ29tbWFuZC5oZWxwQXJndW1lbnQgPSBuZXcgSGVscEFyZygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hpbGRDb21tYW5kczogU3ViQ29tbWFuZFtdID0gW107XG4gIHByaXZhdGUgaW1wbGVtZW50YXRpb246IENvbW1hbmRJbXBsZW1lbnRhdGlvbiB8IHVuZGVmaW5lZCA9XG4gICAgdW5kZWZpbmVkO1xuICBwcml2YXRlIGluaXRpYWxpemU6IENvbW1hbmRJbml0aWFsaXplQ2FsbGJhY2sgfCB1bmRlZmluZWQgPVxuICAgIHVuZGVmaW5lZDtcblxuICBwcm90ZWN0ZWQgZGVzY3JpcHRpb24gPSBcIlwiO1xuICBwcm90ZWN0ZWQgc2hvcnREZXNjcmlwdGlvbiA9IFwiXCI7XG4gIHByb3RlY3RlZCBuYW1lID0gXCJcIjtcblxuICBwcml2YXRlIHNldEltcGxlbWVudGF0aW9uKGltcGw6IENvbW1hbmRJbXBsZW1lbnRhdGlvbikge1xuICAgIHRoaXMuaW1wbGVtZW50YXRpb24gPSBpbXBsO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcHVibGljIHJ1bkluaXRpYWxpemUoKSB7XG4gICAgQXJndW1lbnQuc3RhcnRDb21tYW5kSW5pdGlhbGl6YXRpb24oKTtcbiAgICB0cnkge1xuICAgICAgQ29tbWFuZC5pbml0SGVscEFyZygpO1xuXG4gICAgICBpZiAodGhpcy5pbml0aWFsaXplICYmICF0aGlzLmltcGxlbWVudGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmluaXRpYWxpemUoKTtcblxuICAgICAgICB0aGlzLnNldEltcGxlbWVudGF0aW9uKGRhdGEpO1xuXG4gICAgICAgIGlmIChkYXRhLmNvbW1hbmREZXNjcmlwdGlvbilcbiAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGF0YS5jb21tYW5kRGVzY3JpcHRpb247XG4gICAgICAgIGlmIChkYXRhLnNob3J0RGVzY3JpcHRpb24pXG4gICAgICAgICAgdGhpcy5zaG9ydERlc2NyaXB0aW9uID0gZGF0YS5zaG9ydERlc2NyaXB0aW9uO1xuICAgICAgICBpZiAoZGF0YS5kaXNwbGF5TmFtZSkgdGhpcy5uYW1lID0gZGF0YS5kaXNwbGF5TmFtZTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgQXJndW1lbnQuZW5kQ29tbWFuZEluaXRpYWxpemF0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcHVibGljIGRlZmluZShpbml0aWFsaXplOiBDb21tYW5kSW5pdGlhbGl6ZUNhbGxiYWNrKSB7XG4gICAgdGhpcy5pbml0aWFsaXplID0gaW5pdGlhbGl6ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHB1YmxpYyBhc3luYyBleGVjdXRlKGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5ydW5Jbml0aWFsaXplKCk7XG4gICAgYXdhaXQgQXJndW1lbnRzLnBhcnNlQXJndW1lbnRzKGFyZ3MpO1xuXG4gICAgaWYgKENvbW1hbmQuaGVscEFyZ3VtZW50LnZhbHVlID09PSB0cnVlKVxuICAgICAgcmV0dXJuIHRoaXMucHJpbnRIZWxwTWVzc2FnZSgpO1xuXG4gICAgaWYgKCFBcmd1bWVudHMuaGFzRmlsZUlucHV0QXJnKCkgJiYgU3RkSW5wdXQuaW5zdGFuY2UpIHtcbiAgICAgIGF3YWl0IFN0ZElucHV0LmxvYWQoU3RkSW5wdXQuaW5zdGFuY2UpO1xuICAgIH1cblxuICAgIEFyZ3VtZW50cy52YWxpZGF0ZUFsbCgpO1xuXG4gICAgaWYgKHRoaXMuaW1wbGVtZW50YXRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmltcGxlbWVudGF0aW9uLnJ1bigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHB1YmxpYyBhZGRDaGlsZENvbW1hbmQoYzogU3ViQ29tbWFuZCkge1xuICAgIGlmICh0aGlzLmZpbmRDaGlsZENvbW1hbmQoYy5rZXl3b3JkKSkge1xuICAgICAgT3V0LmVycihodG1sYFxuICAgICAgICA8c3BhbiBjb2xvcj1cImxpZ2h0UmVkXCI+SW50ZXJuYWwgRXJyb3I8L3NwYW4+XG4gICAgICAgIDxsaW5lPlxuICAgICAgICAgIENvbW1hbmQgd2l0aCB0aGUgbmFtZSBcIiR7Yy5rZXl3b3JkfVwiIGFscmVhZHkgZXhpc3RzLlxuICAgICAgICA8L2xpbmU+XG4gICAgICBgKTtcbiAgICAgIHRocm93IG5ldyBJbml0RXJyb3IoKTtcbiAgICB9XG5cbiAgICB0aGlzLmNoaWxkQ29tbWFuZHMucHVzaChjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHB1YmxpYyBmaW5kQ2hpbGRDb21tYW5kKGtleXdvcmQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmNoaWxkQ29tbWFuZHMuZmluZCgoYykgPT4gYy5rZXl3b3JkID09PSBrZXl3b3JkKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBwdWJsaWMgcHJpbnRIZWxwTWVzc2FnZSgpIHtcbiAgICBjb25zdCBhcmdzSW5mbyA9IGdyb3VwQnlDYXRlZ29yeShBcmd1bWVudC5nZXRBcmd1bWVudHNJbmZvKCkpO1xuICAgIGNvbnN0IGNvbW1hbmROYW1lID0gdGhpcy5nZXROYW1lKCk7XG5cbiAgICBpZiAodGhpcy5jaGlsZENvbW1hbmRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChBcmd1bWVudHMuaGFzRmlsZUlucHV0QXJnKCkpIHtcbiAgICAgICAgT3V0Lm91dChodG1sYFxuICAgICAgICAgIDxzcGFuPiR7Y29tbWFuZE5hbWV9IFtDT01NQU5EXSBbT1BUSU9OXS4uLiBbRklMRV08L3NwYW4+XG4gICAgICAgIGApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgT3V0Lm91dChodG1sYFxuICAgICAgICAgIDxzcGFuPiR7Y29tbWFuZE5hbWV9IFtDT01NQU5EXSBbT1BUSU9OXS4uLjwvc3Bhbj5cbiAgICAgICAgYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChBcmd1bWVudHMuaGFzRmlsZUlucHV0QXJnKCkpIHtcbiAgICAgICAgT3V0Lm91dChodG1sYFxuICAgICAgICAgIDxzcGFuPiR7Y29tbWFuZE5hbWV9IFtPUFRJT05dLi4uIFtGSUxFXTwvc3Bhbj5cbiAgICAgICAgYCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBPdXQub3V0KGh0bWxgIDxzcGFuPiR7Y29tbWFuZE5hbWV9IFtPUFRJT05dLi4uPC9zcGFuPiBgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBPdXQub3V0KFwiXCIpO1xuXG4gICAgaWYgKHRoaXMuZGVzY3JpcHRpb24pIHtcbiAgICAgIE91dC5vdXQoaHRtbGAgPHNwYW4+JHt0aGlzLmRlc2NyaXB0aW9ufTwvc3Bhbj4gYCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNob3J0RGVzY3JpcHRpb24pIHtcbiAgICAgIE91dC5vdXQoaHRtbGAgPHNwYW4+JHt0aGlzLnNob3J0RGVzY3JpcHRpb259PC9zcGFuPiBgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jaGlsZENvbW1hbmRzLmxlbmd0aCA+IDApIHtcbiAgICAgIE91dC5vdXQoaHRtbGAgPHNwYW4gYm9sZD5Db21tYW5kczo8L3NwYW4+IGApO1xuICAgICAgcHJpbnRMaXN0cyhcbiAgICAgICAgdGhpcy5jaGlsZENvbW1hbmRzLm1hcCgoY2hpbGQpID0+XG4gICAgICAgICAgY2hpbGRbXCJnZXRQcmludGFibGVMaXN0XCJdKCksXG4gICAgICAgICksXG4gICAgICAgIHRydWUsXG4gICAgICApO1xuICAgICAgT3V0Lm91dChodG1sYCA8c3Bhbj48L3NwYW4+IGApO1xuICAgIH1cblxuICAgIE91dC5vdXQoaHRtbGAgPHNwYW4gYm9sZD5Bcmd1bWVudHM6PC9zcGFuPiBgKTtcblxuICAgIGZvciAoY29uc3QgW2NhdGVnb3J5LCBhcmdzXSBvZiBhcmdzSW5mbykge1xuICAgICAgaWYgKGNhdGVnb3J5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgT3V0Lm91dChodG1sYCA8c3BhbiBib2xkPiR7Y2F0ZWdvcnl9Ojwvc3Bhbj4gYCk7XG4gICAgICB9XG5cbiAgICAgIHByaW50TGlzdHMoXG4gICAgICAgIGFyZ3MubWFwKChhcmcpID0+IFtcbiAgICAgICAgICBhcmcuYXJnID8/IFwiXCIsXG4gICAgICAgICAgYXJnLmZ1bGxBcmcgPz8gXCJcIixcbiAgICAgICAgICBhcmcuZGVzY3JpcHRpb24sXG4gICAgICAgIF0pLFxuICAgICAgICB0cnVlLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZGVzY3JpcHRpb24gb2YgdGhpcyBjb21tYW5kIHRoYXQgd2lsbCBiZSBkaXNwbGF5ZWQgd2hlblxuICAgKiBsb29raW5nIHVwIHRoZSBgLS1oZWxwYCBmb3IgdGhpcyBjb21tYW5kLlxuICAgKi9cbiAgcHVibGljIHNldERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uOiBzdHJpbmcpIHtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbmFtZSB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGZvciB0aGlzIENvbW1hbmQgaW4gdGhlXG4gICAqIGNvbW1hbmQgbGluZSBpbnRlcmZhY2UuXG4gICAqL1xuICBwdWJsaWMgc2V0RGlzcGxheU5hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsWUFBWTtBQUNyQixTQUFTLFlBQVk7QUFDckIsU0FBUyxnQkFBZ0I7QUFDekIsU0FBUyxpQkFBaUI7QUFDMUIsU0FBUyxpQkFBaUI7QUFDMUIsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyxXQUFXO0FBQ3BCLFNBQVMsZ0JBQWdCO0FBT3pCLElBQU0sVUFBVSxTQUFTLE9BQU87QUFBQSxFQUM5QixLQUFLO0FBQUEsRUFDTCxTQUFTO0FBQUEsRUFDVCxVQUFVLEtBQUs7QUFBQSxFQUNmLGFBQWE7QUFDZixDQUFDO0FBRU0sSUFBTSxVQUFOLE1BQU0sU0FBUTtBQUFBLEVBQWQ7QUFTTCxTQUFRLGdCQUE4QixDQUFDO0FBQ3ZDLFNBQVEsaUJBQ047QUFDRixTQUFRLGFBQ047QUFFRixTQUFVLGNBQWM7QUFDeEIsU0FBVSxtQkFBbUI7QUFDN0IsU0FBVSxPQUFPO0FBQUE7QUFBQSxFQWRqQixPQUFlLGNBQWM7QUFDM0IsUUFBSSxDQUFDLFNBQVEsY0FBYztBQUN6QixlQUFRLGVBQWUsSUFBSSxRQUFRO0FBQUEsSUFDckM7QUFBQSxFQUNGO0FBQUEsRUFZUSxrQkFBa0IsTUFBNkI7QUFDckQsU0FBSyxpQkFBaUI7QUFBQSxFQUN4QjtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBS08sZ0JBQWdCO0FBQ3JCLGFBQVMsMkJBQTJCO0FBQ3BDLFFBQUk7QUFDRixlQUFRLFlBQVk7QUFFcEIsVUFBSSxLQUFLLGNBQWMsQ0FBQyxLQUFLLGdCQUFnQjtBQUMzQyxjQUFNLE9BQU8sS0FBSyxXQUFXO0FBRTdCLGFBQUssa0JBQWtCLElBQUk7QUFFM0IsWUFBSSxLQUFLO0FBQ1AsZUFBSyxjQUFjLEtBQUs7QUFDMUIsWUFBSSxLQUFLO0FBQ1AsZUFBSyxtQkFBbUIsS0FBSztBQUMvQixZQUFJLEtBQUs7QUFBYSxlQUFLLE9BQU8sS0FBSztBQUFBLE1BQ3pDO0FBQUEsSUFDRixVQUFFO0FBQ0EsZUFBUyx5QkFBeUI7QUFBQSxJQUNwQztBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtPLE9BQU8sWUFBdUM7QUFDbkQsU0FBSyxhQUFhO0FBQUEsRUFDcEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtBLE1BQWEsUUFBUSxNQUFnQjtBQUNuQyxTQUFLLGNBQWM7QUFDbkIsVUFBTSxVQUFVLGVBQWUsSUFBSTtBQUVuQyxRQUFJLFNBQVEsYUFBYSxVQUFVO0FBQ2pDLGFBQU8sS0FBSyxpQkFBaUI7QUFFL0IsUUFBSSxDQUFDLFVBQVUsZ0JBQWdCLEtBQUssU0FBUyxVQUFVO0FBQ3JELFlBQU0sU0FBUyxLQUFLLFNBQVMsUUFBUTtBQUFBLElBQ3ZDO0FBRUEsY0FBVSxZQUFZO0FBRXRCLFFBQUksS0FBSyxnQkFBZ0I7QUFDdkIsYUFBTyxLQUFLLGVBQWUsSUFBSTtBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBS08sZ0JBQWdCLEdBQWU7QUFDcEMsUUFBSSxLQUFLLGlCQUFpQixFQUFFLE9BQU8sR0FBRztBQUNwQyxVQUFJLElBQUk7QUFBQTtBQUFBO0FBQUEsbUNBR3FCLEVBQUUsT0FBTztBQUFBO0FBQUEsT0FFckM7QUFDRCxZQUFNLElBQUksVUFBVTtBQUFBLElBQ3RCO0FBRUEsU0FBSyxjQUFjLEtBQUssQ0FBQztBQUFBLEVBQzNCO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLTyxpQkFBaUIsU0FBaUI7QUFDdkMsV0FBTyxLQUFLLGNBQWMsS0FBSyxDQUFDLE1BQU0sRUFBRSxZQUFZLE9BQU87QUFBQSxFQUM3RDtBQUFBLEVBRVUsVUFBVTtBQUNsQixXQUFPLEtBQUs7QUFBQSxFQUNkO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLTyxtQkFBbUI7QUFDeEIsVUFBTSxXQUFXLGdCQUFnQixTQUFTLGlCQUFpQixDQUFDO0FBQzVELFVBQU0sY0FBYyxLQUFLLFFBQVE7QUFFakMsUUFBSSxLQUFLLGNBQWMsU0FBUyxHQUFHO0FBQ2pDLFVBQUksVUFBVSxnQkFBZ0IsR0FBRztBQUMvQixZQUFJLElBQUk7QUFBQSxrQkFDRSxXQUFXO0FBQUEsU0FDcEI7QUFBQSxNQUNILE9BQU87QUFDTCxZQUFJLElBQUk7QUFBQSxrQkFDRSxXQUFXO0FBQUEsU0FDcEI7QUFBQSxNQUNIO0FBQUEsSUFDRixPQUFPO0FBQ0wsVUFBSSxVQUFVLGdCQUFnQixHQUFHO0FBQy9CLFlBQUksSUFBSTtBQUFBLGtCQUNFLFdBQVc7QUFBQSxTQUNwQjtBQUFBLE1BQ0gsT0FBTztBQUNMLFlBQUksSUFBSSxjQUFjLFdBQVcsc0JBQXNCO0FBQUEsTUFDekQ7QUFBQSxJQUNGO0FBRUEsUUFBSSxJQUFJLEVBQUU7QUFFVixRQUFJLEtBQUssYUFBYTtBQUNwQixVQUFJLElBQUksY0FBYyxLQUFLLFdBQVcsVUFBVTtBQUFBLElBQ2xELFdBQVcsS0FBSyxrQkFBa0I7QUFDaEMsVUFBSSxJQUFJLGNBQWMsS0FBSyxnQkFBZ0IsVUFBVTtBQUFBLElBQ3ZEO0FBRUEsUUFBSSxLQUFLLGNBQWMsU0FBUyxHQUFHO0FBQ2pDLFVBQUksSUFBSSxtQ0FBbUM7QUFDM0M7QUFBQSxRQUNFLEtBQUssY0FBYztBQUFBLFVBQUksQ0FBQyxVQUN0QixNQUFNLGtCQUFrQixFQUFFO0FBQUEsUUFDNUI7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUNBLFVBQUksSUFBSSxxQkFBcUI7QUFBQSxJQUMvQjtBQUVBLFFBQUksSUFBSSxvQ0FBb0M7QUFFNUMsZUFBVyxDQUFDLFVBQVUsSUFBSSxLQUFLLFVBQVU7QUFDdkMsVUFBSSxTQUFTLFNBQVMsR0FBRztBQUN2QixZQUFJLElBQUksbUJBQW1CLFFBQVEsV0FBVztBQUFBLE1BQ2hEO0FBRUE7QUFBQSxRQUNFLEtBQUssSUFBSSxDQUFDLFFBQVE7QUFBQSxVQUNoQixJQUFJLE9BQU87QUFBQSxVQUNYLElBQUksV0FBVztBQUFBLFVBQ2YsSUFBSTtBQUFBLFFBQ04sQ0FBQztBQUFBLFFBQ0Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBTU8sZUFBZSxhQUFxQjtBQUN6QyxTQUFLLGNBQWM7QUFBQSxFQUNyQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNTyxlQUFlLE1BQWM7QUFDbEMsU0FBSyxPQUFPO0FBQUEsRUFDZDtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
