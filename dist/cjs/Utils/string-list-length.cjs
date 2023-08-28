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

// src/Utils/string-list-length.ts
var string_list_length_exports = {};
__export(string_list_length_exports, {
  stringListLength: () => stringListLength
});
module.exports = __toCommonJS(string_list_length_exports);
function stringListLength(strings) {
  return strings.reduce(
    (len, c) => len + Math.max(0, ...c.split("\n").map((l) => l.length)),
    0
  );
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1V0aWxzL3N0cmluZy1saXN0LWxlbmd0aC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ0xpc3RMZW5ndGgoc3RyaW5nczogc3RyaW5nW10pIHtcbiAgcmV0dXJuIHN0cmluZ3MucmVkdWNlKFxuICAgIChsZW4sIGMpID0+IGxlbiArIE1hdGgubWF4KDAsIC4uLmMuc3BsaXQoXCJcXG5cIikubWFwKChsKSA9PiBsLmxlbmd0aCkpLFxuICAgIDBcbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFPLFNBQVMsaUJBQWlCLFNBQW1CO0FBQ2xELFNBQU8sUUFBUTtBQUFBLElBQ2IsQ0FBQyxLQUFLLE1BQU0sTUFBTSxLQUFLLElBQUksR0FBRyxHQUFHLEVBQUUsTUFBTSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7QUFBQSxJQUNuRTtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
