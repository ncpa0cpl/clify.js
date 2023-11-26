import { Cmd } from "../commands/command";
import { OptionError } from "./option-error";
type BaseTypes = "string" | "number" | "int" | "boolean" | "unknown";
export type OptionType = BaseTypes | [BaseTypes];
export type MapType<T extends OptionType> = T extends BaseTypes ? {
    string: string;
    number: number;
    int: number;
    boolean: boolean;
    unknown: string | number | boolean;
}[T] : T extends Array<infer U extends BaseTypes> ? MapType<U>[] : never;
export type OptionInitParams<T extends OptionType, R extends boolean> = {
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
export interface Option<T extends OptionType, R extends boolean> {
    readonly value: R extends true ? MapType<T> : MapType<T> | undefined;
    readonly isSet: boolean;
    setDefault(value: MapType<T>): Option<T, R>;
}
export type OptConstructor<T extends OptionType, R extends boolean> = new (command: Cmd) => Option<T, R>;
export declare abstract class Opt<T extends OptionType, R extends boolean> {
    protected command: Cmd;
    static define<T extends OptionType, R extends boolean>(params: OptionInitParams<T, R>): OptConstructor<T, R>;
    protected initParams: OptionInitParams<T, R>;
    protected _value: MapType<T> | undefined;
    protected _isSet: boolean;
    protected _default: MapType<T> | undefined;
    constructor(command: Cmd);
    abstract getInitParams(): OptionInitParams<T, R>;
    get value(): any;
    get isSet(): boolean;
    setDefault(value: MapType<T>): this;
    init(): null | OptionError;
    validate(): null | OptionError;
    nameMatches(name: string): boolean;
    getName(): string;
    getNameWithType(): string;
    getDescription(): string;
}
export declare const defineOption: <T extends OptionType, R extends boolean = false>(params: OptionInitParams<T, R>) => OptConstructor<T, R>;
export {};
