declare function compareStrings(strA: string, strB: string): -1 | 0 | 1;
declare function compareStrings(options: {
    alphanum?: boolean;
    reverse?: boolean;
}): (a: string, b: string) => -1 | 0 | 1;
export { compareStrings };
