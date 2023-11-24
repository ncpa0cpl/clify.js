import { ArgumentType, MapType } from "./argument";
import { ArgumentError } from "./argument-error";
export declare function convertArg<T extends ArgumentType>(value: string | number | boolean | Array<string | number | boolean>, argType: T): MapType<T> | ArgumentError;
