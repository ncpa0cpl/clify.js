import { Command, CommandInitCallback } from "./command";
import { Program } from "./program";
interface MainCommand extends Command {
    main(initCallback: CommandInitCallback): void;
}
export declare function configure(configureCallback: (mainCommand: MainCommand) => void): Program;
export {};
