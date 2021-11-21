import type { ArgumentContext } from "./types";
import { isArgName } from "./Utils/is-arg-name";
import { parseArgumentValue } from "./Utils/parse-argument-value";

class ArgumentParser {
  private subCommands: string[] = [];
  private arguments = new Map<string, string | boolean>();

  constructor() {
    const args = process.argv.slice(2);

    this.init(args);
  }

  private init(args: string[]) {
    while (true) {
      if (args.length === 0) break;

      const arg = args.shift()!;

      if (isArgName(arg)) {
        if (args[0] && !isArgName(args[0])) {
          const argValue = args.shift()!;
          this.arguments.set(arg, parseArgumentValue(argValue));
        } else {
          this.arguments.set(arg, true);
        }
      } else {
        this.subCommands.push(arg);
      }
    }

    Object.freeze(this.arguments);
    Object.freeze(this.subCommands);
  }

  isArgumentSet(argument: ArgumentContext<any, any>) {
    return (
      this.arguments.has(argument["keyword"]) ||
      this.arguments.has(argument["flagChar"])
    );
  }

  getArgument(
    argument: ArgumentContext<any, any>
  ): string | number | boolean | undefined {
    if (this.arguments.has(argument["keyword"])) {
      return this.arguments.get(argument["keyword"])!;
    }

    if (this.arguments.has(argument["flagChar"])) {
      return this.arguments.get(argument["flagChar"])!;
    }

    if (argument["default"] !== undefined) {
      return argument["default"];
    }

    return undefined;
  }

  getSubCommandsPath() {
    return [...this.subCommands];
  }
}

export const Arguments = new ArgumentParser();
