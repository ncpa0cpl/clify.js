export declare class OptionError extends Error {
    protected optionName: string;
    protected customMessage?: string;
    constructor(msg: string, optionName: string);
    toPrintable(): string;
}
export declare class InvalidOptionError extends OptionError {
    protected expected: string;
    protected received: string;
    protected customMessage?: string | undefined;
    constructor(optName: string, expected: string, received: string, customMessage?: string | undefined);
}
export declare class UnspecifiedOptionError extends OptionError {
    protected optionName: string;
    constructor(optionName: string);
}
