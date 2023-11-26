import { MapType, OptionType } from "./option";
import { InvalidOptionError } from "./option-error";
export declare function convertOptionValue<T extends OptionType>(value: string | number | boolean | Array<string | number | boolean>, optType: T, optName: string): MapType<T> | InvalidOptionError;
