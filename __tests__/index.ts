import { Argument } from "../src";
import clify from "../src/index";

const Arg1 = Argument.define({
  flagChar: "-a",
  keyword: "--arg-a",
  description: "This is an argument A",
  require: true,
});

clify.configure((main) => {
  main.setMainAction(() => {
    const a = new Arg1();

    a.setDefault("abc");

    return {
      run() {
        console.log(a.value);
      },
    };
  });
});
