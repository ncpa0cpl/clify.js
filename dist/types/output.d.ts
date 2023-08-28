export declare class Out {
    private static stdout;
    private static stderr;
    private static displayLogs;
    private static displayDebugs;
    private static displayErrors;
    private static displayWarnings;
    private static displayOutput;
    static setLogLevel(shouldDisplay: Array<"log" | "err" | "warn" | "out" | "debug">): void;
    static log(...args: string[]): void;
    static err(...args: string[]): void;
    static warn(...args: string[]): void;
    static out(...args: string[]): void;
    static debug(...args: string[]): void;
}
