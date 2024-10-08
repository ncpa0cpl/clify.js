"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Clify: () => import_clify.Clify,
  configure: () => import_configure.configure,
  default: () => src_default,
  defineOption: () => import_option.defineOption
});
module.exports = __toCommonJS(src_exports);
var import_clify = require("./clify.cjs");
var import_configure = require("./configure.cjs");
var import_option = require("./options/option.cjs");
var default_export = {
  Clify: import_clify.Clify,
  configure: import_configure.configure,
  defineOption: import_option.defineOption
};
var src_default = default_export;
