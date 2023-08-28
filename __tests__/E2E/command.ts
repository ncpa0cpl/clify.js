import {
  ChildProcessWithoutNullStreams,
  exec,
  spawn,
} from "child_process";
import stripAnsi from "strip-ansi";

const DEBUG = process.env.DEBUG === "true";

const removeNodeWarnings = (str) => {
  return str
    .replace(
      /\(node:\d+\) ExperimentalWarning: Custom ESM Loaders is an experimental feature and might change at any time\n/m,
      "",
    )
    .replace(
      "(Use `node --trace-warnings ...` to show where the warning was created)\n",
      "",
    );
};

export class Command {
  protected cwd = __dirname;
  protected stdio = "";
  protected stderr = "";
  protected childProcess?: ChildProcessWithoutNullStreams;

  constructor(
    protected readonly executable: string,
    protected args: string[],
  ) {}

  setCwd(cwd: string): Command {
    this.cwd = cwd;
    return this;
  }

  async run() {
    this.stdio = "";
    this.stderr = "";

    return new Promise<number | null>((resolve) => {
      const child = spawn(this.executable, this.args, {
        env: { DEBUG: DEBUG.toString() },
        cwd: this.cwd,
      });
      this.childProcess = child;

      child.stdout.on("data", (data) => {
        this.stdio += data;
      });

      child.stderr.on("data", (data) => {
        this.stderr += data;
      });

      child.on("exit", (code) => {
        resolve(code);
      });
    });
  }

  writeStdin(data: string) {
    if (this.childProcess) {
      this.childProcess.stdin.write(data + "\n");
      this.childProcess.stdin.end();
    }
  }

  getStdio() {
    return stripAnsi(this.stdio);
  }

  getStderr() {
    return stripAnsi(removeNodeWarnings(this.stderr));
  }
}

export class NodeCommand extends Command {
  constructor(
    private script: string,
    ...args: string[]
  ) {
    super("node", [
      "--loader",
      "@swc-node/register/esm",
      script,
      ...args,
    ]);
  }

  changeArgs(...args: string[]) {
    this.args = [
      "--loader",
      "@swc-node/register/esm",
      this.script,
      ...args,
    ];
  }
}

export const execute = (command: string) => {
  const child = exec(command);

  return new Promise<{
    ecode: number;
    stdout: string;
    stderr: string;
  }>((resolve) => {
    let stdout = "";
    let stderr = "";

    child.stdout!.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr!.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("exit", (code) => {
      resolve({
        ecode: code!,
        stdout: stripAnsi(stdout),
        stderr: removeNodeWarnings(stripAnsi(stderr)),
      });
    });
  });
};
