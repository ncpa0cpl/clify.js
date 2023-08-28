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

// src/Arguments/Utils/is-arg-name.ts
var is_arg_name_exports = {};
__export(is_arg_name_exports, {
  isArgName: () => isArgName
});
module.exports = __toCommonJS(is_arg_name_exports);
function isArgName(value) {
  if (value[0] !== "-") {
    return false;
  }
  if (value[1] === "-") {
    return true;
  }
  return value.length < 3;
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vc3JjL0FyZ3VtZW50cy9VdGlscy9pcy1hcmctbmFtZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGZ1bmN0aW9uIGlzQXJnTmFtZSh2YWx1ZTogc3RyaW5nKTogdmFsdWUgaXMgYC0ke3N0cmluZ31gIHtcbiAgaWYgKHZhbHVlWzBdICE9PSBcIi1cIikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh2YWx1ZVsxXSA9PT0gXCItXCIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZS5sZW5ndGggPCAzO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQU8sU0FBUyxVQUFVLE9BQXNDO0FBQzlELE1BQUksTUFBTSxDQUFDLE1BQU0sS0FBSztBQUNwQixXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksTUFBTSxDQUFDLE1BQU0sS0FBSztBQUNwQixXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU8sTUFBTSxTQUFTO0FBQ3hCOyIsCiAgIm5hbWVzIjogW10KfQo=
