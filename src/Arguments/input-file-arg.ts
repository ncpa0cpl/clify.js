import fs from "fs";
import { Arguments } from "./argument-parser";

export class BaseInputFileArg {
  static setArgumentValue(
    arg: BaseInputFileArg,
    filepath: string,
  ): void | Promise<void> {
    return arg.setTo(filepath);
  }

  protected filepath!: string;
  protected _value!: any;
  protected _isSet: boolean = false;

  constructor() {
    Arguments.registerFileInputArg(this);
  }

  protected setTo(filepath: string): void | Promise<void> {
    this.filepath = filepath;
    this._isSet = true;
  }
}

export class InputFileArg<
  E extends "utf8" | undefined = undefined,
> extends BaseInputFileArg {
  static instance?: InputFileArg<any>;
  protected _value!: E extends "utf8" ? string : Buffer;

  constructor(
    private encoding?: E,
    private autoload: boolean = true,
  ) {
    super();
    InputFileArg.instance = this;
  }

  protected override setTo(filepath: string) {
    this.filepath = filepath;
    this._isSet = true;

    if (this.autoload) {
      this.load();
    }
  }

  private load() {
    this._value = fs.readFileSync(
      this.filepath,
      this.encoding,
    ) as any;
  }

  static access<E extends "utf8" | undefined>(
    this: typeof InputFileArg<E>,
  ): InputFileArg<E> {
    return this.instance as any;
  }

  get value(): (E extends "utf8" ? string : Buffer) | undefined {
    return this._value;
  }

  get isSet(): boolean {
    return this._isSet;
  }
}

export class InputFileHandleArg extends BaseInputFileArg {
  static instance?: InputFileHandleArg;
  protected _value!: fs.promises.FileHandle;

  constructor(
    private mode?: fs.Mode | undefined,
    private autoload: boolean = true,
  ) {
    super();
    InputFileHandleArg.instance = this;
  }

  protected override async setTo(filepath: string) {
    this.filepath = filepath;
    this._isSet = true;

    if (this.autoload) {
      await this.load();
    }
  }

  private async load() {
    this._value = await fs.promises.open(this.filepath, this.mode);
  }

  static access<E extends "utf8" | undefined>(
    this: typeof InputFileArg<E>,
  ): InputFileArg<E> {
    return this.instance as any;
  }

  get value(): fs.promises.FileHandle | undefined {
    return this._value;
  }

  get isSet(): boolean {
    return this._isSet;
  }
}
