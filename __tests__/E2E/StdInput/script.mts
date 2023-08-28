import { Out, StdInput, configure, html } from "../../../src/index";

configure((main) => {
  main.addSubCommand("loopback", () => {
    const stdin = new StdInput();

    return {
      run() {
        Out.out(html`<line>${stdin.value}</line>`);
      },
    };
  });
});
