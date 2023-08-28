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

// src/Utils/pad-left.ts
var pad_left_exports = {};
__export(pad_left_exports, {
  padLeft: () => padLeft
});
module.exports = __toCommonJS(pad_left_exports);
function padLeft(text, options) {
  if (options.paddingLength !== void 0)
    options.paddingLength = Math.max(0, options.paddingLength);
  if (options.targetWidth !== void 0)
    options.targetWidth = Math.max(0, options.targetWidth);
  const textLines = text.split("\n");
  const paddedLines = textLines.map((line) => {
    let paddingLength = options.paddingLength ?? 0;
    if (options.targetWidth !== void 0) {
      if (options.targetWidth <= line.length)
        return line.slice(0, options.targetWidth);
      paddingLength = options.targetWidth - line.length;
    }
    return `${Array.from({ length: paddingLength }, () => " ").join(
      ""
    )}${line}`;
  });
  return paddedLines.join("\n");
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1V0aWxzL3BhZC1sZWZ0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZnVuY3Rpb24gcGFkTGVmdChcbiAgdGV4dDogc3RyaW5nLFxuICBvcHRpb25zOlxuICAgIHwgeyBwYWRkaW5nTGVuZ3RoPzogdW5kZWZpbmVkOyB0YXJnZXRXaWR0aDogbnVtYmVyIH1cbiAgICB8IHsgcGFkZGluZ0xlbmd0aDogbnVtYmVyOyB0YXJnZXRXaWR0aD86IHVuZGVmaW5lZCB9XG4pIHtcbiAgaWYgKG9wdGlvbnMucGFkZGluZ0xlbmd0aCAhPT0gdW5kZWZpbmVkKVxuICAgIG9wdGlvbnMucGFkZGluZ0xlbmd0aCA9IE1hdGgubWF4KDAsIG9wdGlvbnMucGFkZGluZ0xlbmd0aCk7XG5cbiAgaWYgKG9wdGlvbnMudGFyZ2V0V2lkdGggIT09IHVuZGVmaW5lZClcbiAgICBvcHRpb25zLnRhcmdldFdpZHRoID0gTWF0aC5tYXgoMCwgb3B0aW9ucy50YXJnZXRXaWR0aCk7XG5cbiAgY29uc3QgdGV4dExpbmVzID0gdGV4dC5zcGxpdChcIlxcblwiKTtcblxuICBjb25zdCBwYWRkZWRMaW5lcyA9IHRleHRMaW5lcy5tYXAoKGxpbmUpID0+IHtcbiAgICBsZXQgcGFkZGluZ0xlbmd0aCA9IG9wdGlvbnMucGFkZGluZ0xlbmd0aCA/PyAwO1xuXG4gICAgaWYgKG9wdGlvbnMudGFyZ2V0V2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKG9wdGlvbnMudGFyZ2V0V2lkdGggPD0gbGluZS5sZW5ndGgpXG4gICAgICAgIHJldHVybiBsaW5lLnNsaWNlKDAsIG9wdGlvbnMudGFyZ2V0V2lkdGgpO1xuXG4gICAgICBwYWRkaW5nTGVuZ3RoID0gb3B0aW9ucy50YXJnZXRXaWR0aCAtIGxpbmUubGVuZ3RoO1xuICAgIH1cblxuICAgIHJldHVybiBgJHtBcnJheS5mcm9tKHsgbGVuZ3RoOiBwYWRkaW5nTGVuZ3RoIH0sICgpID0+IFwiIFwiKS5qb2luKFxuICAgICAgXCJcIlxuICAgICl9JHtsaW5lfWA7XG4gIH0pO1xuXG4gIHJldHVybiBwYWRkZWRMaW5lcy5qb2luKFwiXFxuXCIpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQU8sU0FBUyxRQUNkLE1BQ0EsU0FHQTtBQUNBLE1BQUksUUFBUSxrQkFBa0I7QUFDNUIsWUFBUSxnQkFBZ0IsS0FBSyxJQUFJLEdBQUcsUUFBUSxhQUFhO0FBRTNELE1BQUksUUFBUSxnQkFBZ0I7QUFDMUIsWUFBUSxjQUFjLEtBQUssSUFBSSxHQUFHLFFBQVEsV0FBVztBQUV2RCxRQUFNLFlBQVksS0FBSyxNQUFNLElBQUk7QUFFakMsUUFBTSxjQUFjLFVBQVUsSUFBSSxDQUFDLFNBQVM7QUFDMUMsUUFBSSxnQkFBZ0IsUUFBUSxpQkFBaUI7QUFFN0MsUUFBSSxRQUFRLGdCQUFnQixRQUFXO0FBQ3JDLFVBQUksUUFBUSxlQUFlLEtBQUs7QUFDOUIsZUFBTyxLQUFLLE1BQU0sR0FBRyxRQUFRLFdBQVc7QUFFMUMsc0JBQWdCLFFBQVEsY0FBYyxLQUFLO0FBQUEsSUFDN0M7QUFFQSxXQUFPLEdBQUcsTUFBTSxLQUFLLEVBQUUsUUFBUSxjQUFjLEdBQUcsTUFBTSxHQUFHLEVBQUU7QUFBQSxNQUN6RDtBQUFBLElBQ0YsQ0FBQyxHQUFHLElBQUk7QUFBQSxFQUNWLENBQUM7QUFFRCxTQUFPLFlBQVksS0FBSyxJQUFJO0FBQzlCOyIsCiAgIm5hbWVzIjogW10KfQo=
