import { Cmd } from "../command";
import { ArgumentError } from "./argument-error";
type BaseTypes = "string" | "number" | "int" | "boolean" | "unknown";
export type ArgumentType = BaseTypes | [BaseTypes];
export type MapType<T extends ArgumentType> = T extends BaseTypes ? {
    string: string;
    number: number;
    int: number;
    boolean: boolean;
    unknown: string | number | boolean;
}[T] : T extends Array<infer U extends BaseTypes> ? MapType<U>[] : never;
export type ArgumentInitParams<T extends ArgumentType, R extends boolean> = {
    type: T;
    name: string;
    char?: string;
    description?: string;
    required?: R;
    default?: MapType<T>;
    validate?(value: MapType<T>): "ok" | {
        expected: string;
        received: string;
        message?: string;
    };
};
export interface Argument<T extends ArgumentType, R extends boolean> {
    readonly value: R extends true ? MapType<T> : MapType<T> | undefined;
    readonly isSet: boolean;
    setDefault(value: MapType<T>): Argument<T, R>;
}
export type ArgConstructor<T extends ArgumentType, R extends boolean> = new (command: Cmd) => Argument<T, R>;
export declare abstract class ArgumentImpl<T extends ArgumentType, R extends boolean> {
    protected command: Cmd;
    static define<T extends ArgumentType, R extends boolean>(params: ArgumentInitParams<T, R>): ArgConstructor<T, R>;
    protected initParams: ArgumentInitParams<T, R>;
    protected _value: MapType<T> | undefined;
    protected _isSet: boolean;
    protected _default: MapType<T> | undefined;
    constructor(command: Cmd);
    abstract getInitParams(): ArgumentInitParams<T, R>;
    get value(): any;
    get isSet(): boolean;
    setDefault(value: MapType<T>): this;
    init(): null | ArgumentError;
    validate(): null | ArgumentError;
    nameMatches(name: string): boolean;
}
export declare const defineArg: <T extends ArgumentType, R extends boolean = false>(params: ArgumentInitParams<T, R>) => ArgConstructor<T, R>;
export {};
