import { DataType, Type } from "dilswer";
import { html } from "termx-markup";
import { Argument } from "./Arguments/argument";
import { InputFileArg, InputFileHandleArg } from "./Arguments/input-file-arg";
import { MainCommand } from "./Commands/main-command";
import { ExitError } from "./Utils/errors";
import { Out } from "./output";
import { StdInput } from "./stdinput";
/**
 * Initiates and configures the script. This method takes one
 * argument, an initiation callback.
 *
 * @example
 *   configure((mainCommand) => {
 *     mainCommand.setName("my-script");
 *     mainCommand.setMainAction(() => {
 *       return {
 *         run() {
 *           // Here goes the main command implementation
 *         },
 *       };
 *     });
 *
 *     mainCommand.addSubCommand("sub-command", () => {
 *       return {
 *         run() {
 *           // Here goes the sub-command implementation
 *         },
 *       };
 *     });
 *   });
 */
declare function configure(initialize: (mainCommand: MainCommand) => void): Promise<void>;
export { Argument, DataType, ExitError, InputFileArg, InputFileHandleArg, MainCommand, Out, StdInput, Type, configure, html, };
declare const _default: {
    Argument: typeof Argument;
    DataType: {
        readonly Unknown: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"unknown">;
        readonly String: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
        readonly Number: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"number">;
        readonly Int: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"integer">;
        readonly Boolean: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"boolean">;
        readonly Symbol: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"symbol">;
        readonly Function: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"function">;
        readonly Null: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"null">;
        readonly Undefined: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"undefined">;
        readonly StringNumeral: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"stringnumeral">;
        readonly StringInt: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"stringinteger">;
        RecordOf<TS extends import("dilswer").RecordTypeSchema>(args: TS): import("dilswer").RecordOf<TS>;
        Dict<DT extends import("dilswer").AnyDataType[]>(...args: DT): import("dilswer").Dict<DT>;
        ArrayOf<DT_1 extends import("dilswer").AnyDataType[]>(...args: DT_1): import("dilswer").ArrayOf<DT_1>;
        Tuple<DT_2 extends import("dilswer").AnyDataType[]>(...args: DT_2): import("dilswer/dist/types/data-types/data-types").Tuple<DT_2>;
        SetOf<DT_3 extends import("dilswer").AnyDataType[]>(...args: DT_3): import("dilswer").SetOf<DT_3>;
        OneOf<DT_4 extends import("dilswer").AnyDataType[]>(...args: DT_4): import("dilswer").OneOf<DT_4>;
        AllOf<DT_5 extends import("dilswer").AnyDataType[]>(...args: DT_5): import("dilswer").AllOf<DT_5>;
        Literal<V extends string | number | boolean>(value: V): import("dilswer").Literal<V>;
        EnumMember<M extends string | number>(enumMember: M): import("dilswer").EnumMember<M>;
        Enum<T extends string, TEnumValue extends string | number>(enumInstance: { [key in T]: TEnumValue; }): import("dilswer").Enum<TEnumValue>;
        InstanceOf<DT_6 extends new (...args: any[]) => any>(instanceOf: DT_6): import("dilswer/dist/types/data-types/data-types").InstanceOf<DT_6>;
        Custom<VF extends (v: any) => v is any>(validateFunction: VF): import("dilswer").Custom<VF>;
        StringMatching<T_1 extends string>(pattern: RegExp): import("dilswer/dist/types/data-types/data-types").StringMatching<T_1>;
        Circular<DT_7 extends import("dilswer").AnyDataType>(getDataType: (ref: import("dilswer/dist/types/data-types/data-types").CircularRef) => DT_7): import("dilswer/dist/types/data-types/data-types").Circular<DT_7>;
    };
    ExitError: typeof ExitError;
    InputFileArg: typeof InputFileArg;
    InputFileHandleArg: typeof InputFileHandleArg;
    MainCommand: typeof MainCommand;
    Out: typeof Out;
    StdInput: typeof StdInput;
    Type: {
        readonly Unknown: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"unknown">;
        readonly String: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"string">;
        readonly Number: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"number">;
        readonly Int: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"integer">;
        readonly Boolean: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"boolean">;
        readonly Symbol: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"symbol">;
        readonly Function: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"function">;
        readonly Null: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"null">;
        readonly Undefined: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"undefined">;
        readonly StringNumeral: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"stringnumeral">;
        readonly StringInt: import("dilswer/dist/types/data-types/data-types").SimpleDataType<"stringinteger">;
        RecordOf<TS_1 extends import("dilswer").RecordTypeSchema>(args: TS_1): import("dilswer").RecordOf<TS_1>;
        Dict<DT_8 extends import("dilswer").AnyDataType[]>(...args: DT_8): import("dilswer").Dict<DT_8>;
        ArrayOf<DT_1_1 extends import("dilswer").AnyDataType[]>(...args: DT_1_1): import("dilswer").ArrayOf<DT_1_1>;
        Tuple<DT_2_1 extends import("dilswer").AnyDataType[]>(...args: DT_2_1): import("dilswer/dist/types/data-types/data-types").Tuple<DT_2_1>;
        SetOf<DT_3_1 extends import("dilswer").AnyDataType[]>(...args: DT_3_1): import("dilswer").SetOf<DT_3_1>;
        OneOf<DT_4_1 extends import("dilswer").AnyDataType[]>(...args: DT_4_1): import("dilswer").OneOf<DT_4_1>;
        AllOf<DT_5_1 extends import("dilswer").AnyDataType[]>(...args: DT_5_1): import("dilswer").AllOf<DT_5_1>;
        Literal<V_1 extends string | number | boolean>(value: V_1): import("dilswer").Literal<V_1>;
        EnumMember<M_1 extends string | number>(enumMember: M_1): import("dilswer").EnumMember<M_1>;
        Enum<T_2 extends string, TEnumValue_1 extends string | number>(enumInstance: { [key_1 in T_2]: TEnumValue_1; }): import("dilswer").Enum<TEnumValue_1>;
        InstanceOf<DT_6_1 extends new (...args: any[]) => any>(instanceOf: DT_6_1): import("dilswer/dist/types/data-types/data-types").InstanceOf<DT_6_1>;
        Custom<VF_1 extends (v: any) => v is any>(validateFunction: VF_1): import("dilswer").Custom<VF_1>;
        StringMatching<T_1_1 extends string>(pattern: RegExp): import("dilswer/dist/types/data-types/data-types").StringMatching<T_1_1>;
        Circular<DT_7_1 extends import("dilswer").AnyDataType>(getDataType: (ref: import("dilswer/dist/types/data-types/data-types").CircularRef) => DT_7_1): import("dilswer/dist/types/data-types/data-types").Circular<DT_7_1>;
    };
    configure: typeof configure;
    html: typeof html;
};
export default _default;
