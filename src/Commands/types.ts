export type CommandImplementation = { run(): void };

export type CommandInitiator = () => CommandImplementation & {
  name?: string;
  commandDescription?: string;
  shortDescription?: string;
};
