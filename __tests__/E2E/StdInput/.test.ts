import path from "path";
import { NodeCommand, execute } from "../command";

const s = (filename) => path.resolve(__dirname, filename);

describe("StdInput", () => {
  it("should loopback piped input", async () => {
    const cmd = await execute(
      `echo 'hello world' | node --loader @swc-node/register/esm ${s(
        "script.mts",
      )} loopback`,
    );

    expect(cmd.ecode).toBe(0);
    expect(cmd.stdout).toBe("hello world\n");
    expect(cmd.stderr).toBe("");
  });

  it("should allow writing to the stdin", async () => {
    const cmd = new NodeCommand(s("script.mts"), "loopback");

    const promise = cmd.run();

    cmd.writeStdin("This is a test");

    const ecode = await promise;

    const out = cmd.getStdio();
    const err = cmd.getStderr();

    expect(ecode).toBe(0);
    expect(out).toBe("This is a test\n");
    expect(err).toBe("");
  });
});
