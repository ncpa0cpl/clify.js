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

// src/Utils/pad-right.ts
var pad_right_exports = {};
__export(pad_right_exports, {
  padRight: () => padRight
});
module.exports = __toCommonJS(pad_right_exports);
function padRight(text, options) {
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
    return `${line}${Array.from({ length: paddingLength }, () => " ").join(
      ""
    )}`;
  });
  return paddedLines.join("\n");
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1V0aWxzL3BhZC1yaWdodC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGZ1bmN0aW9uIHBhZFJpZ2h0KFxuICB0ZXh0OiBzdHJpbmcsXG4gIG9wdGlvbnM6XG4gICAgfCB7IHBhZGRpbmdMZW5ndGg/OiB1bmRlZmluZWQ7IHRhcmdldFdpZHRoOiBudW1iZXIgfVxuICAgIHwgeyBwYWRkaW5nTGVuZ3RoOiBudW1iZXI7IHRhcmdldFdpZHRoPzogdW5kZWZpbmVkIH1cbikge1xuICBpZiAob3B0aW9ucy5wYWRkaW5nTGVuZ3RoICE9PSB1bmRlZmluZWQpXG4gICAgb3B0aW9ucy5wYWRkaW5nTGVuZ3RoID0gTWF0aC5tYXgoMCwgb3B0aW9ucy5wYWRkaW5nTGVuZ3RoKTtcblxuICBpZiAob3B0aW9ucy50YXJnZXRXaWR0aCAhPT0gdW5kZWZpbmVkKVxuICAgIG9wdGlvbnMudGFyZ2V0V2lkdGggPSBNYXRoLm1heCgwLCBvcHRpb25zLnRhcmdldFdpZHRoKTtcblxuICBjb25zdCB0ZXh0TGluZXMgPSB0ZXh0LnNwbGl0KFwiXFxuXCIpO1xuXG4gIGNvbnN0IHBhZGRlZExpbmVzID0gdGV4dExpbmVzLm1hcCgobGluZSkgPT4ge1xuICAgIGxldCBwYWRkaW5nTGVuZ3RoID0gb3B0aW9ucy5wYWRkaW5nTGVuZ3RoID8/IDA7XG5cbiAgICBpZiAob3B0aW9ucy50YXJnZXRXaWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAob3B0aW9ucy50YXJnZXRXaWR0aCA8PSBsaW5lLmxlbmd0aClcbiAgICAgICAgcmV0dXJuIGxpbmUuc2xpY2UoMCwgb3B0aW9ucy50YXJnZXRXaWR0aCk7XG5cbiAgICAgIHBhZGRpbmdMZW5ndGggPSBvcHRpb25zLnRhcmdldFdpZHRoIC0gbGluZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke2xpbmV9JHtBcnJheS5mcm9tKHsgbGVuZ3RoOiBwYWRkaW5nTGVuZ3RoIH0sICgpID0+IFwiIFwiKS5qb2luKFxuICAgICAgXCJcIlxuICAgICl9YDtcbiAgfSk7XG5cbiAgcmV0dXJuIHBhZGRlZExpbmVzLmpvaW4oXCJcXG5cIik7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBTyxTQUFTLFNBQ2QsTUFDQSxTQUdBO0FBQ0EsTUFBSSxRQUFRLGtCQUFrQjtBQUM1QixZQUFRLGdCQUFnQixLQUFLLElBQUksR0FBRyxRQUFRLGFBQWE7QUFFM0QsTUFBSSxRQUFRLGdCQUFnQjtBQUMxQixZQUFRLGNBQWMsS0FBSyxJQUFJLEdBQUcsUUFBUSxXQUFXO0FBRXZELFFBQU0sWUFBWSxLQUFLLE1BQU0sSUFBSTtBQUVqQyxRQUFNLGNBQWMsVUFBVSxJQUFJLENBQUMsU0FBUztBQUMxQyxRQUFJLGdCQUFnQixRQUFRLGlCQUFpQjtBQUU3QyxRQUFJLFFBQVEsZ0JBQWdCLFFBQVc7QUFDckMsVUFBSSxRQUFRLGVBQWUsS0FBSztBQUM5QixlQUFPLEtBQUssTUFBTSxHQUFHLFFBQVEsV0FBVztBQUUxQyxzQkFBZ0IsUUFBUSxjQUFjLEtBQUs7QUFBQSxJQUM3QztBQUVBLFdBQU8sR0FBRyxJQUFJLEdBQUcsTUFBTSxLQUFLLEVBQUUsUUFBUSxjQUFjLEdBQUcsTUFBTSxHQUFHLEVBQUU7QUFBQSxNQUNoRTtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELFNBQU8sWUFBWSxLQUFLLElBQUk7QUFDOUI7IiwKICAibmFtZXMiOiBbXQp9Cg==
