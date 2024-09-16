export type { Logger, LogMessage, LogType, StdinReader } from "./clify";
export type {
  Command,
  CommandInitCallback,
  CommandInitPhase,
  CommandInput,
} from "./commands/command";
export type { Option } from "./options/option";
export type { Program } from "./program";

import { Clify } from "./clify";
import { configure } from "./configure";
import { defineOption } from "./options/option";

export { Clify, configure, defineOption };

const default_export = {
  Clify,
  configure,
  defineOption,
};

export default default_export;
