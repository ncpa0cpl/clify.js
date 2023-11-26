import { Cmd, Command, CommandInitCallback } from "./commands/command";
import { Program } from "./program";
interface MainCommand extends Command {
    main(initCallback: CommandInitCallback): void;
    setVersion(version: string): void;
    setName(name: string): void;
    setDescription(description: string): void;
}
export declare class MainCmd extends Cmd implements MainCommand {
    protected version?: string;
    protected programName?: string;
    printVersionInfo(): void;
    setVersion(version: string): void;
    setName(name: string): void;
    main(initCallback: CommandInitCallback): void;
    protected getName(): string;
}
export declare function configure(configureCallback: (mainCommand: MainCommand) => void): Program;
export {};
