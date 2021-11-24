import { Argument } from "../src";
import clify from "../src/index";

const Arg1 = Argument.define({
  flagChar: "-a",
  keyword: "--arg-a",
  description: "This is an argument A",
  require: true,
});

clify.configure((main) => {
  main
    .addSubCommand("foo")
    .addSubCommand("bar")
    .addSubCommand("baz", () => {
      return {
        run() {
          console.log("this is baz");
        },
      };
    });
});
