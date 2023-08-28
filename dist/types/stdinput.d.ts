export declare class StdInput {
    private multiline;
    static instance?: StdInput;
    private _value;
    constructor(multiline?: boolean);
    get value(): string;
}
