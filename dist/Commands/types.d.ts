export type CommandImplementation = {
    run(): void;
};
export type CommandInitializeCallback = () => CommandImplementation & {
    displayName?: string;
    commandDescription?: string;
    shortDescription?: string;
};
export type MainCommandInitializeCallback = () => CommandImplementation & {
    displayName?: string;
    commandDescription?: string;
};
