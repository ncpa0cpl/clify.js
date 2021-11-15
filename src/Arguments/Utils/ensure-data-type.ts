import type { ArgumentDataType, TypeOfArg } from "../types";

const FLOATING_NUMBER_REGEX = /^[+-]?([0-9]*[.])?[0-9]+$/;

export function ensureDataType<DT extends ArgumentDataType | undefined>(
  v: string | number | boolean | undefined,
  isRequired: boolean,
  dataType?: DT
): TypeOfArg<DT> | undefined {
  if (!isRequired && v === undefined) return v;

  switch (dataType) {
    case "boolean":
      // @ts-expect-error
      if (typeof v === "boolean") return v;
      // @ts-expect-error
      if (v === "0" || v === 0) return false;
      // @ts-expect-error
      if (v === "1" || v === 1) return true;
      throw new Error("Argument value is not of expected type.");
    case "number":
      // @ts-expect-error
      if (typeof v === "number") return v;
      if (typeof v === "string" && FLOATING_NUMBER_REGEX.test(v))
        // @ts-expect-error
        return Number(v);
      throw new Error("Argument value is not of expected type.");
    case "string":
      // @ts-expect-error
      if (typeof v === "string") return v;
      throw new Error("Argument value is not of expected type.");
    default:
      // @ts-expect-error
      return v;
  }
}
