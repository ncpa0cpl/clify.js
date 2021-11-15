export type ArgumentKeyword = `--${string}`;
export type ArgumentFlagChar = `-${string}`;
export type ArgumentDataType = "string" | "number" | "boolean";

export type TypeOfArg<DT extends ArgumentDataType | undefined> =
  TypeIsUndefined<DT> extends true
    ? string | number | boolean | undefined
    : // @ts-expect-error
      {
        string: string;
        number: number;
        boolean: boolean;
      }[DT];

export type TypeIsUndefined<T> = [Exclude<T, undefined>] extends [never]
  ? true
  : false;

export type ReWrap<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type Constructor<T> = new () => T;
