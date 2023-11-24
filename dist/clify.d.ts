export interface Clify {
    setArgGetter(arggetter: () => string[]): void;
    setLogger(logger: (type: "error" | "message", message: string) => void): void;
}
export type StdinReader = {
    read(): Promise<string>;
};
declare function defaultStdinReader(): StdinReader;
export declare class ClifyGlobals {
    protected static getStdinReader: typeof defaultStdinReader;
    protected static arggetter: () => string[];
    protected static logger: (type: "error" | "message", message: string) => void;
    static setArgGetter(arggetter: () => string[]): void;
    static setLogger(logger: (type: "error" | "message", message: string) => void): void;
    static setStdinReader(getReader: () => StdinReader): void;
    static getArgs(): string[];
    static printError(message: string): void;
    static printMessage(message: string): void;
    static getStdin(): StdinReader;
}
export declare const Clify: Clify;
export {};
