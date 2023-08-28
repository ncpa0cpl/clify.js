import Readline from "node:readline";

type Stringifyable = {
  toString(): string;
};

const empty: Stringifyable = {
  toString() {
    return "";
  },
};

export class StdInput {
  static instance?: StdInput;

  /**
   * @internal
   */
  static async load(stdi: StdInput) {
    const input = await new Promise<string>((res) => {
      if (process.stdin.isTTY) {
        const lines: string[] = [];

        const rl = Readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });

        if (stdi.multiline) {
          rl.on("line", (line) => {
            lines.push(line);
          }).on("close", () => {
            res(lines.join("\n"));
            rl.close();
            process.stdout.write("\n");
          });
        } else {
          rl.on("line", (line) => {
            res(line);
            rl.close();
          });
        }
      } else {
        const handler = () => {
          const chunks: string[] = [];

          for (
            let chunk = empty;
            chunk != null;
            chunk = process.stdin.read()
          ) {
            chunks.push(chunk.toString());
          }

          res(chunks.join(""));
          process.stdin.off("readable", handler);
        };

        process.stdin.on("readable", handler);
      }
    });

    stdi._value = input;
  }

  private _value!: string;

  constructor(private multiline: boolean = false) {
    StdInput.instance = this;
  }

  get value() {
    return this._value;
  }
}
