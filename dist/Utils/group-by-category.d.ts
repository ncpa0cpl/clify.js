export declare function groupByCategory<E extends {
    category?: string;
}>(elems: E[]): [category: string, elems: E[]][];
