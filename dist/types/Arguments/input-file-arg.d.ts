/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import fs from "fs";
export declare class BaseInputFileArg {
    static setArgumentValue(arg: BaseInputFileArg, filepath: string): void | Promise<void>;
    protected filepath: string;
    protected _value: any;
    protected _isSet: boolean;
    constructor();
    protected setTo(filepath: string): void | Promise<void>;
}
export declare class InputFileArg<E extends "utf8" | undefined = undefined> extends BaseInputFileArg {
    private encoding?;
    private autoload;
    static instance?: InputFileArg<any>;
    protected _value: E extends "utf8" ? string : Buffer;
    constructor(encoding?: E | undefined, autoload?: boolean);
    protected setTo(filepath: string): void;
    private load;
    static access<E extends "utf8" | undefined>(this: typeof InputFileArg<E>): InputFileArg<E>;
    get value(): (E extends "utf8" ? string : Buffer) | undefined;
    get isSet(): boolean;
}
export declare class InputFileHandleArg extends BaseInputFileArg {
    private mode?;
    private autoload;
    static instance?: InputFileHandleArg;
    protected _value: fs.promises.FileHandle;
    constructor(mode?: fs.Mode | undefined, autoload?: boolean);
    protected setTo(filepath: string): Promise<void>;
    private load;
    static access<E extends "utf8" | undefined>(this: typeof InputFileArg<E>): InputFileArg<E>;
    get value(): fs.promises.FileHandle | undefined;
    get isSet(): boolean;
}
