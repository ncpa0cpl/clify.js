import { StdinIterator } from "../clify";
import { Cmd, InputOptions } from "./command";
export declare class CmdInputBase {
    protected command: Cmd;
    protected options: InputOptions;
    protected argumentInput: string | null;
    protected stdinInput: string | null;
    protected _source: "argument" | "stdin" | null;
    constructor(command: Cmd, options?: InputOptions);
    setOptions(options: InputOptions): void;
    setArgumentInput(value: string | null): void;
    prepare(): Promise<boolean>;
    validate(): boolean;
    get(): any;
    getName(): string | undefined;
    get source(): "argument" | "stdin";
}
export declare class CmdInput extends CmdInputBase {
    prepare(): Promise<boolean>;
    get(): string | null;
}
export declare class CmdInputStream extends CmdInputBase {
    protected stdinIter: StdinIterator | null;
    prepare(): Promise<boolean>;
    get(): StdinIterator | string | null;
}
