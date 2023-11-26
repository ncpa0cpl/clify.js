import { spawn } from "child_process";
import { execa } from "execa";
import { describe, expect, it } from "vitest";

const EXEC_OPTS = {
  cwd: __dirname,
  env: {
    NODE_OPTIONS: "-r ts-node/register",
  },
};

async function runProgram(vargs: string[]) {
  const proc = await execa(
    "node",
    ["input-program.ts"].concat(vargs),
    EXEC_OPTS
  );

  return {
    stdout: proc.stdout,
    stderr: proc.stderr,
  };
}

async function runWithStdin(...stdin: string[]) {
  const proc = execa("node", ["input-program.ts"], EXEC_OPTS);

  await new Promise<void>((res, rej) => {
    proc.on("spawn", async () => {
      try {
        for (const [idx, line] of stdin.entries()) {
          await new Promise<void>((res2, rej2) => {
            if (idx === stdin.length - 1) {
              proc.stdin!.end(line, () => res2());
            } else {
              proc.stdin!.write(line, (err) => {
                if (err) rej2(err);
                else res2();
              });
            }
          });
        }
        res();
      } catch (err) {
        rej(err);
      }
    });
  });

  const { stdout, stderr } = await proc;

  return {
    stdout: stdout,
    stderr: stderr,
  };
}

async function runWithShPipedData(cmdToPipe: string, vargs: string[]) {
  const command = `${cmdToPipe} ${vargs
    .map((v) => (v.includes(" ") ? `"${v}"` : v))
    .join(" ")} | node input-program.ts`;

  const proc = spawn(command, {
    ...EXEC_OPTS,
    shell: true,
    timeout: 1000,
  });

  const stdout: string[] = [];
  const stderr: string[] = [];

  const stdoutListener = (chunk: Buffer) => {
    stdout.push(chunk.toString());
  };

  const stderrListener = (chunk: Buffer) => {
    stderr.push(chunk.toString());
  };

  proc.stdout!.on("data", stdoutListener);
  proc.stderr!.on("data", stderrListener);

  await new Promise<void>((res, rej) => {
    proc.on("close", (code) => {
      if (code === 0) res();
      else rej(new Error(`Process exited with code ${code}`));
    });
  });

  proc.stdout!.off("data", stdoutListener);
  proc.stderr!.off("data", stderrListener);

  return {
    stdout: stdout.join(""),
    stderr: stderr.join(""),
  };
}

describe("input", () => {
  it("via command argument", async () => {
    const result = await runProgram(["input-file.txt"]);

    expect(result.stderr).toBe("");
    expect(result.stdout).toBe("argument: input-file.txt");
  });

  describe("via stdin", () => {
    it("stdin provided programmatically via node", async () => {
      const result = await runWithStdin(
        "file1.txt\n",
        "file2.txt\n",
        "file3.txt"
      );

      expect(result.stderr).toBe("");
      expect(result.stdout).toBe("stdin: file1.txt\nfile2.txt\nfile3.txt");
    });

    it("stdin provided via shell pipe", async () => {
      const result = await runWithShPipedData("echo", ["Hello world!"]);

      expect(result.stderr).toBe("");
      expect(result.stdout).toBe("stdin: Hello world!\n");
    });
  });
});
