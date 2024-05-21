import { ClifyGlobals, StdinIterator } from "../clify";
import { Cmd, InputOptions } from "./command";

export class CmdInputBase {
  protected argumentInput: string | null = null;
  protected stdinInput: string | null = null;
  protected _source: "argument" | "stdin" | null = null;

  constructor(protected command: Cmd, protected options: InputOptions = {}) {}

  public setOptions(options: InputOptions) {
    this.options = options;
  }

  public setArgumentInput(value: string | null) {
    this.argumentInput = value;
    if (value != null) {
      this._source = "argument";
    }
  }

  public async prepare(): Promise<boolean> {
    if (this.argumentInput != null) {
      return false;
    }

    if (this.options.stdin === false) {
      return false;
    }

    if (this.options.stdin === "non-tty-only") {
      if (process.stdin.isTTY) {
        return false;
      }
    }

    return true;
  }

  public validate(): boolean {
    return this.argumentInput != null || this.stdinInput != null;
  }

  public get(): any {}

  public getName(): string | undefined {
    return this.options.name;
  }

  public get source(): "argument" | "stdin" {
    return this._source!;
  }
}

export class CmdInput extends CmdInputBase {
  public async prepare(): Promise<boolean> {
    if (await super.prepare()) {
      const stdin = ClifyGlobals.getStdin();
      this._source = "stdin";
      this.stdinInput = await stdin.read();
      return true;
    }
    return false;
  }

  public get(): string | null {
    return this.argumentInput ?? this.stdinInput ?? null;
  }
}

export class CmdInputStream extends CmdInputBase {
  protected stdinIter: StdinIterator | null = null;

  public async prepare(): Promise<boolean> {
    if (await super.prepare()) {
      const stdin = ClifyGlobals.getStdin();
      this._source = "stdin";
      this.stdinIter = await stdin.getIterator();
      return true;
    }
    return false;
  }

  public get(): StdinIterator | string | null {
    return this.argumentInput ?? this.stdinIter ?? null;
  }
}
