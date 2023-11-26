import { configure } from "../../src";

const program = configure((app) => {
  app.main((main) => {
    const input = main.input();
    return async () => {
      const inputValue = input.get();
      await new Promise<any>((res) => {
        process.stdout.write(input.source + ": " + inputValue, res);
      });
    };
  });
});

program.run();
