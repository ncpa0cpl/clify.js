import { ClifyGlobals } from "../clify";
import { Cmd } from "./command";

export class CmdInput {
  protected argumentInput: string | null = null;
  protected stdinInput: string | null = null;
  protected _source: "argument" | "stdin" | null = null;

  constructor(protected command: Cmd) {}

  public setArgumentInput(value: string | null) {
    this.argumentInput = value;
    if (value != null) {
      this._source = "argument";
    }
  }

  public async prepare(): Promise<void> {
    if (this.argumentInput != null) {
      return;
    }

    const stdin = ClifyGlobals.getStdin();
    this._source = "stdin";
    this.stdinInput = await stdin.read();
  }

  public validate(): boolean {
    return this.argumentInput != null || this.stdinInput != null;
  }

  public get(): string {
    return this.argumentInput ?? this.stdinInput!;
  }

  public get source(): "argument" | "stdin" {
    return this._source!;
  }
}
