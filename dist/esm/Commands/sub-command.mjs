// src/Commands/sub-command.ts
import { Command } from "./command.mjs";
import { defaultInitializer } from "./default-initializer.mjs";
var SubCommand = class _SubCommand extends Command {
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
  addSubCommand(keyword, initialize = defaultInitializer) {
    const subCommand = new _SubCommand(keyword, initialize);
    this.addChildCommand(subCommand);
    return subCommand;
  }
};
export {
  SubCommand
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL0NvbW1hbmRzL3N1Yi1jb21tYW5kLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZFwiO1xuaW1wb3J0IHsgZGVmYXVsdEluaXRpYWxpemVyIH0gZnJvbSBcIi4vZGVmYXVsdC1pbml0aWFsaXplclwiO1xuaW1wb3J0IHR5cGUgeyBDb21tYW5kSW5pdGlhbGl6ZUNhbGxiYWNrIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIFN1YkNvbW1hbmQgZXh0ZW5kcyBDb21tYW5kIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHJlYWRvbmx5IGtleXdvcmQ6IHN0cmluZyxcbiAgICBpbml0aWFsaXplOiBDb21tYW5kSW5pdGlhbGl6ZUNhbGxiYWNrLFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZGVmaW5lKGluaXRpYWxpemUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFByaW50YWJsZUxpc3QoKSB7XG4gICAgdGhpcy5ydW5Jbml0aWFsaXplKCk7XG4gICAgcmV0dXJuIFt0aGlzLmtleXdvcmQsIHRoaXMuc2hvcnREZXNjcmlwdGlvbl07XG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWUgfHwgdGhpcy5rZXl3b3JkO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBzdWItY29tbWFuZCBmb3IgdGhpcyBjb21tYW5kLiBTdWIgY29tbWFuZHMgY2FuIGJlIG5lc3RlZC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogICBjb25zdCBjb21tYW5kXzEgPSBtYWluQ29tbWFuZC5hZGRTdWJDb21tYW5kKFxuICAgKiAgICAgXCJjb21tYW5kXzFcIixcbiAgICogICAgICgpID0+ICh7XG4gICAqICAgICAgIHJ1bigpIHtcbiAgICogICAgICAgICBjb25zb2xlLmxvZyhcIlN1Yi1jb21tYW5kIDEgcmFuLlwiKTtcbiAgICogICAgICAgfSxcbiAgICogICAgIH0pLFxuICAgKiAgICk7XG4gICAqXG4gICAqICAgY29uc3QgY29tbWFuZF8yID0gY29tbWFuZF8xLmFkZFN1YkNvbW1hbmQoXG4gICAqICAgICBcImNvbW1hbmRfMlwiLFxuICAgKiAgICAgKCkgPT4ge1xuICAgKiAgICAgICByZXR1cm4ge1xuICAgKiAgICAgICAgIHJ1bigpIHtcbiAgICogICAgICAgICAgIGNvbnNvbGUubG9nKFwiTmVzdGVkIHN1Yi1jb21tYW5kIHJhbi5cIik7XG4gICAqICAgICAgICAgfSxcbiAgICogICAgICAgfTtcbiAgICogICAgIH0sXG4gICAqICAgKTtcbiAgICpcbiAgICogICAvLyBDTEk6IG5vZGUgbXktc2NyaXB0LmpzIGNvbW1hbmRfMSBjb21tYW5kXzJcbiAgICogICAvLyBPdXRwdXQ6IFwiTmVzdGVkIHN1Yi1jb21tYW5kIHJhbi5cIlxuICAgKi9cbiAgYWRkU3ViQ29tbWFuZChcbiAgICBrZXl3b3JkOiBzdHJpbmcsXG4gICAgaW5pdGlhbGl6ZTogQ29tbWFuZEluaXRpYWxpemVDYWxsYmFjayA9IGRlZmF1bHRJbml0aWFsaXplcixcbiAgKSB7XG4gICAgY29uc3Qgc3ViQ29tbWFuZCA9IG5ldyBTdWJDb21tYW5kKGtleXdvcmQsIGluaXRpYWxpemUpO1xuICAgIHRoaXMuYWRkQ2hpbGRDb21tYW5kKHN1YkNvbW1hbmQpO1xuICAgIHJldHVybiBzdWJDb21tYW5kO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsMEJBQTBCO0FBRzVCLElBQU0sYUFBTixNQUFNLG9CQUFtQixRQUFRO0FBQUEsRUFDdEMsWUFDa0IsU0FDaEIsWUFDQTtBQUNBLFVBQU07QUFIVTtBQUloQixTQUFLLE9BQU8sVUFBVTtBQUFBLEVBQ3hCO0FBQUEsRUFFVSxtQkFBbUI7QUFDM0IsU0FBSyxjQUFjO0FBQ25CLFdBQU8sQ0FBQyxLQUFLLFNBQVMsS0FBSyxnQkFBZ0I7QUFBQSxFQUM3QztBQUFBLEVBRUEsVUFBVTtBQUNSLFdBQU8sS0FBSyxRQUFRLEtBQUs7QUFBQSxFQUMzQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBNkJBLGNBQ0UsU0FDQSxhQUF3QyxvQkFDeEM7QUFDQSxVQUFNLGFBQWEsSUFBSSxZQUFXLFNBQVMsVUFBVTtBQUNyRCxTQUFLLGdCQUFnQixVQUFVO0FBQy9CLFdBQU87QUFBQSxFQUNUO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
