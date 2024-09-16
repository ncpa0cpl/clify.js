export {};
declare global {
    interface ObjectConstructor {
        groupBy<T, K extends string | number | symbol>(iterable: Iterable<T>, callback: (item: T) => K): Record<K, T[]>;
    }
}
