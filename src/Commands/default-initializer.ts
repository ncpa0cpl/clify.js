import type { Command } from "./command";

export function defaultInitializer(this: Command) {
  const self = this;

  return {
    run() {
      self.printHelpMessage();
    },
  };
}
