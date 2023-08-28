import { Type } from "dilswer";
import { Argument, configure } from "../dist/esm/index.mjs";

const Arg1 = Argument.define({
  flagChar: "-f",
  keyword: "--foo",
  description: "This is an argument A",
  dataType: Type.OneOf(Type.Boolean, Type.Number),
});

configure((main) => {
  main.setMainAction(() => {
    new Arg1();
    return {
      run() {
        const a = Arg1.access().value;
        console.log(a, "(", typeof a, ")");
      },
    };
  });

  main
    .addSubCommand("foo")
    .addSubCommand("bar")
    .addSubCommand("baz", () => {
      new Arg1();
      return {
        run() {
          console.log("this is baz");
        },
      };
    });
});
