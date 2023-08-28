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

// src/Utils/pad-bottom.ts
var pad_bottom_exports = {};
__export(pad_bottom_exports, {
  padBottom: () => padBottom
});
module.exports = __toCommonJS(pad_bottom_exports);
var import_count_char = require("./count-char.cjs");
var padBottom = (text, targetHeight) => {
  const endLineCharCount = (0, import_count_char.countChar)(text, "\n") + 1;
  const paddingLength = Math.max(0, targetHeight - endLineCharCount);
  return `${text}${Array.from({ length: paddingLength }, () => "\n").join("")}`;
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1V0aWxzL3BhZC1ib3R0b20udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGNvdW50Q2hhciB9IGZyb20gXCIuL2NvdW50LWNoYXJcIjtcblxuZXhwb3J0IGNvbnN0IHBhZEJvdHRvbSA9ICh0ZXh0OiBzdHJpbmcsIHRhcmdldEhlaWdodDogbnVtYmVyKSA9PiB7XG4gIGNvbnN0IGVuZExpbmVDaGFyQ291bnQgPSBjb3VudENoYXIodGV4dCwgXCJcXG5cIikgKyAxO1xuXG4gIGNvbnN0IHBhZGRpbmdMZW5ndGggPSBNYXRoLm1heCgwLCB0YXJnZXRIZWlnaHQgLSBlbmRMaW5lQ2hhckNvdW50KTtcblxuICByZXR1cm4gYCR7dGV4dH0ke0FycmF5LmZyb20oeyBsZW5ndGg6IHBhZGRpbmdMZW5ndGggfSwgKCkgPT4gXCJcXG5cIikuam9pbihcIlwiKX1gO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdCQUEwQjtBQUVuQixJQUFNLFlBQVksQ0FBQyxNQUFjLGlCQUF5QjtBQUMvRCxRQUFNLHVCQUFtQiw2QkFBVSxNQUFNLElBQUksSUFBSTtBQUVqRCxRQUFNLGdCQUFnQixLQUFLLElBQUksR0FBRyxlQUFlLGdCQUFnQjtBQUVqRSxTQUFPLEdBQUcsSUFBSSxHQUFHLE1BQU0sS0FBSyxFQUFFLFFBQVEsY0FBYyxHQUFHLE1BQU0sSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQzdFOyIsCiAgIm5hbWVzIjogW10KfQo=
