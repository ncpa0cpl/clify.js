// src/index.ts
import { Clify } from "./clify.mjs";
import { configure } from "./configure.mjs";
import { defineOption } from "./options/option.mjs";
var default_export = {
  Clify,
  configure,
  defineOption
};
var src_default = default_export;
export {
  Clify,
  configure,
  src_default as default,
  defineOption
};
