/// <reference types="node" />
export type LogMessage = string | number | boolean | null | undefined;
export type LogType = "error" | "warning" | "info";
export type StdinIterator = {
    next(): Promise<Buffer | "done">;
    done(): boolean;
};
export type StdinReader = {
    /**
     * Reads the entire stdin in one go and returns it as a UTF-8 string.
     */
    read(): Promise<string>;
    /**
     * Returns an iterator that reads from stdin.
     */
    getIterator(): StdinIterator;
};
export type Logger = (type: LogType, message: LogMessage[]) => void;
export interface Clify {
    setArgGetter(arggetter: () => string[]): void;
    setLogger(logger: Logger): void;
    setStdinReader(getReader: () => StdinReader): void;
    log(...message: LogMessage[]): void;
    err(...message: LogMessage[]): void;
    warn(...message: LogMessage[]): void;
}
declare function defaultStdinReader(): StdinReader;
declare function defaultArgGetter(): string[];
declare function defaultLogger(type: LogType, message: LogMessage[]): void;
export declare class ClifyGlobals {
    protected static getStdinReader: typeof defaultStdinReader;
    protected static argGetter: typeof defaultArgGetter;
    protected static logger: typeof defaultLogger;
    static setArgGetter(arggetter: () => string[]): void;
    static setLogger(logger: (type: LogType, message: LogMessage[]) => void): void;
    static setStdinReader(getReader: () => StdinReader): void;
    static getArgs(): string[];
    static err(...message: LogMessage[]): void;
    static log(...message: LogMessage[]): void;
    static warn(...message: LogMessage[]): void;
    static getStdin(): StdinReader;
}
export declare const Clify: Clify;
export {};
