export declare class OptionError extends Error {
    protected optionName: string;
    protected customMessage?: string;
    constructor(msg: string, optionName: string);
    toPrintable(): string;
}
export declare class InvalidOptionError extends OptionError {
    protected received: string;
    protected expected?: string | undefined;
    protected customMessage?: string | undefined;
    constructor(optName: string, received: string, expected?: string | undefined, customMessage?: string | undefined);
}
export declare class UnspecifiedOptionError extends OptionError {
    protected optionName: string;
    constructor(optionName: string);
}
