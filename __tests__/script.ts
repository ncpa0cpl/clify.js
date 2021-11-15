import script from "../src";
import { Argument } from "../src/Arguments/argument";

const InputArgument = Argument.define({
  flagChar: "-i",
  keyword: "--input",
  dataType: "string",
  require: true,
  description: "This argument is providing a filepath.",
});

const InputArgument2 = Argument.define({
  flagChar: "-i",
  keyword: "--input",
  description: "This argument is providing a filepath.",
});

const VerboseArgument = Argument.define({
  flagChar: "-v",
  keyword: "--verbose",
  dataType: "boolean",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin justo eros, malesuada eu volutpat ac, egestas sed dui. Nunc eget ante sollicitudin, consequat nibh at, varius erat. Mauris in luctus ex, sed porttitor sem. Donec eu est non lectus venenatis ornare. Vestibulum dui ex, lobortis eu faucibus ac, posuere non felis. Sed consequat elit ac turpis molestie accumsan. ",
});

const YetAnotherArgument = Argument.define({
  flagChar: "-y",
  keyword: "--yaa",
  description: "Yet another argument.",
});

script.configure((mainCommand) => {
  mainCommand.setName("TestScript");
  mainCommand.setDescription("This is a test script.");

  mainCommand.setMainAction(() => {
    const input = new InputArgument();

    return {
      run() {
        console.log(`Provided input: ${input.value}`);
      },
    };
  });

  const subCommand = mainCommand.addSubCommand("subcommand", () => {
    const verbose = new VerboseArgument();

    return {
      shortDescription: "Do something",
      run() {
        console.log(`You set verbose to ${verbose.value}`);
      },
    };
  });

  const subSubCommand = subCommand.addSubCommand("nested", () => {
    const yaa = new YetAnotherArgument();

    return {
      commandDescription: "This is a description of a nested command.",
      shortDescription: "Yet another nested command",
      run() {},
    };
  });
});
