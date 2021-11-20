import { Argument } from "../src";
import clify from "../src/index";

const Arg1 = Argument.define({
  flagChar: "-a",
  keyword: "--arg-a",
  description: "This is an argument A",
});

const Arg2 = Argument.define({
  flagChar: "-b",
  keyword: "--arg-b",
  description: "This is an argument B",
});

const Arg3 = Argument.define({
  flagChar: "-c",
  keyword: "--arg-c",
  description: "This is an argument C",
  // category: "First Category",
});

const Arg4 = Argument.define({
  flagChar: "-d",
  keyword: "--arg-d",
  description: "This is an argument D",
  category: "Category",
});

const Arg5 = Argument.define({
  flagChar: "-e",
  keyword: "--arg-e",
  description: "This is an argument E",
  category: "Category",
});

const Arg6 = Argument.define({
  flagChar: "-f",
  keyword: "--arg-f",
  description: "This is an argument F",
  category: "Category",
});

clify.configure((main) => {
  main.setMainAction(() => {
    new Arg2();
    new Arg3();
    new Arg1();
    new Arg5();
    new Arg6();
    new Arg4();

    return { run() {} };
  });
});
