export declare class ClifyError extends Error {
    constructor(msg: string);
}
export declare class InitError extends ClifyError {
    constructor();
}
export declare class ExitError extends Error {
    readonly code: number;
    constructor(code: number, msg: string);
}
