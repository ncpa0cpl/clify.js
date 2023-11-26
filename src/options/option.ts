import { Cmd } from "../commands/command";
import { convertOptionValue } from "./convert-option-value";
import {
  InvalidOptionError,
  OptionError,
  UnspecifiedOptionError,
} from "./option-error";

type BaseTypes = "string" | "number" | "int" | "boolean" | "unknown";
export type OptionType = BaseTypes | [BaseTypes];

export type MapType<T extends OptionType> = T extends BaseTypes
  ? {
      string: string;
      number: number;
      int: number;
      boolean: boolean;
      unknown: string | number | boolean;
    }[T]
  : T extends Array<infer U extends BaseTypes>
  ? MapType<U>[]
  : never;

export type OptionInitParams<T extends OptionType, R extends boolean> = {
  type: T;
  name: string;
  char?: string;
  description?: string;
  required?: R;
  default?: MapType<T>;
  validate?(
    value: MapType<T>
  ): "ok" | { expected: string; received: string; message?: string };
};

export interface Option<T extends OptionType, R extends boolean> {
  readonly value: R extends true ? MapType<T> : MapType<T> | undefined;
  readonly isSet: boolean;
  setDefault(value: MapType<T>): Option<T, R>;
}

export type OptConstructor<T extends OptionType, R extends boolean> = new (
  command: Cmd
) => Option<T, R>;

export abstract class Opt<T extends OptionType, R extends boolean> {
  static define<T extends OptionType, R extends boolean>(
    params: OptionInitParams<T, R>
  ): OptConstructor<T, R> {
    return class extends Opt<T, R> {
      getInitParams(): OptionInitParams<T, R> {
        return params;
      }
    };
  }

  protected initParams: OptionInitParams<T, R>;
  protected _value: MapType<T> | undefined;
  protected _isSet: boolean = false;
  protected _default: MapType<T> | undefined;

  constructor(protected command: Cmd) {
    this.initParams = this.getInitParams();
  }

  abstract getInitParams(): OptionInitParams<T, R>;

  get value(): any {
    return this._isSet ? this._value : this._default;
  }

  get isSet(): boolean {
    return this._isSet;
  }

  setDefault(value: MapType<T>): this {
    this._default = value;
    return this;
  }

  init(): null | OptionError {
    const name = this.getName();
    const parsedArgs = this.command.getParsedArgs();

    this._default = this.initParams.default;

    if (this.initParams.name in parsedArgs) {
      const v = convertOptionValue<T>(
        parsedArgs[this.initParams.name],
        this.initParams.type,
        name
      );

      if (v instanceof OptionError) {
        return v;
      }

      this._isSet = true;
      this._value = v;
    } else if (
      this.initParams.char != null &&
      this.initParams.char in parsedArgs
    ) {
      this._isSet = true;
      const v = convertOptionValue<T>(
        parsedArgs[this.initParams.char],
        this.initParams.type,
        name
      );

      if (v instanceof OptionError) {
        return v;
      }

      this._isSet = true;
      this._value = v;
    } else if (this.initParams.required && this._default == null) {
      return new UnspecifiedOptionError(name);
    }

    return this.validate();
  }

  validate(): null | OptionError {
    if (this.initParams.validate && this._isSet) {
      const result = this.initParams.validate(this.value);
      if (result === "ok") {
        return null;
      }

      return new InvalidOptionError(
        this.getName(),
        result.expected,
        result.received,
        result.message
      );
    }

    return null;
  }

  nameMatches(name: string): boolean {
    return (
      this.initParams.name === name ||
      (name.length === 1 && this.initParams.char === name)
    );
  }

  getName(): string {
    if (this.initParams.char != null) {
      return `--${this.initParams.name}, -${this.initParams.char}`;
    }
    return `--${this.initParams.name}`;
  }

  getNameWithType(): string {
    if (this.initParams.type === "boolean") {
      if (this.initParams.char != null) {
        return `--${this.initParams.name}, -${this.initParams.char}`;
      }
      return `--${this.initParams.name}`;
    }

    let typeStr: string;
    if (Array.isArray(this.initParams.type)) {
      typeStr = "..." + this.initParams.type[0]!;
    } else {
      typeStr = this.initParams.type;
    }

    if (this.initParams.char != null) {
      return `--${this.initParams.name}, -${this.initParams.char} <${typeStr}>`;
    }
    return `--${this.initParams.name} <${typeStr}>`;
  }

  getDescription(): string {
    return this.initParams.description || "";
  }
}

export function defineOption<T extends OptionType>(
  params: OptionInitParams<T, boolean> & {
    default?: undefined;
    required?: false;
  }
): OptConstructor<T, false>;
export function defineOption<T extends OptionType>(
  params: OptionInitParams<T, boolean> & {
    default?: undefined;
    required: true;
  }
): OptConstructor<T, true>;
export function defineOption<T extends OptionType>(
  params: OptionInitParams<T, boolean> & { default: MapType<T> }
): OptConstructor<T, true>;
export function defineOption<T extends OptionType, R extends boolean = false>(
  params: OptionInitParams<T, R>
): OptConstructor<T, R> {
  return Opt.define(params);
}
