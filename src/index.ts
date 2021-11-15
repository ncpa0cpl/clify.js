import { MainCommand } from "./Commands/main-command";

const mainCommand = new MainCommand();

function configure(initializer: (mainCommand: MainCommand) => void) {
  initializer(mainCommand);
  mainCommand["start"]();
}

const script = {
  configure,
};

export { configure };

export default script;
