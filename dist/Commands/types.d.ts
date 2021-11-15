export declare type CommandImplementation = {
    run(): void;
};
export declare type CommandInitializeCallback = () => CommandImplementation & {
    displayName?: string;
    commandDescription?: string;
    shortDescription?: string;
};
export declare type MainCommandInitializeCallback = () => CommandImplementation & {
    displayName?: string;
    commandDescription?: string;
};
