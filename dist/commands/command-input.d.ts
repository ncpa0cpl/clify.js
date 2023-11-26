import { Cmd } from "./command";
export declare class CmdInput {
    protected command: Cmd;
    protected argumentInput: string | null;
    protected stdinInput: string | null;
    protected _source: "argument" | "stdin" | null;
    constructor(command: Cmd);
    setArgumentInput(value: string | null): void;
    prepare(): Promise<void>;
    validate(): boolean;
    get(): string;
    get source(): "argument" | "stdin";
}
