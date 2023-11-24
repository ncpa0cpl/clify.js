export declare class ArgumentError extends Error {
    protected expected: string;
    protected received: string;
    protected customMessage?: string | undefined;
    constructor(expected: string, received: string, customMessage?: string | undefined);
}
