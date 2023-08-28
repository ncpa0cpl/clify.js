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

// src/Utils/count-char.ts
var count_char_exports = {};
__export(count_char_exports, {
  countChar: () => countChar
});
module.exports = __toCommonJS(count_char_exports);
var countChar = (str, char) => {
  let count = 0;
  for (const c of str) {
    if (c === char)
      count++;
  }
  return count;
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1V0aWxzL2NvdW50LWNoYXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBjb25zdCBjb3VudENoYXIgPSAoc3RyOiBzdHJpbmcsIGNoYXI6IHN0cmluZykgPT4ge1xuICBsZXQgY291bnQgPSAwO1xuICBmb3IgKGNvbnN0IGMgb2Ygc3RyKSB7XG4gICAgaWYgKGMgPT09IGNoYXIpIGNvdW50Kys7XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFPLElBQU0sWUFBWSxDQUFDLEtBQWEsU0FBaUI7QUFDdEQsTUFBSSxRQUFRO0FBQ1osYUFBVyxLQUFLLEtBQUs7QUFDbkIsUUFBSSxNQUFNO0FBQU07QUFBQSxFQUNsQjtBQUNBLFNBQU87QUFDVDsiLAogICJuYW1lcyI6IFtdCn0K
