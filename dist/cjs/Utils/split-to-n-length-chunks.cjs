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

// src/Utils/split-to-n-length-chunks.ts
var split_to_n_length_chunks_exports = {};
__export(split_to_n_length_chunks_exports, {
  splitToNLengthChunks: () => splitToNLengthChunks
});
module.exports = __toCommonJS(split_to_n_length_chunks_exports);
function splitToNLengthChunks(text, n) {
  const charArray = text.split("");
  const chunks = [];
  while (true) {
    const chunk = charArray.splice(0, n);
    if (chunk.length === 0)
      break;
    chunks.push(chunk.join(""));
  }
  return chunks;
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1V0aWxzL3NwbGl0LXRvLW4tbGVuZ3RoLWNodW5rcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGZ1bmN0aW9uIHNwbGl0VG9OTGVuZ3RoQ2h1bmtzKHRleHQ6IHN0cmluZywgbjogbnVtYmVyKSB7XG4gIGNvbnN0IGNoYXJBcnJheSA9IHRleHQuc3BsaXQoXCJcIik7XG5cbiAgY29uc3QgY2h1bmtzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgY29uc3QgY2h1bmsgPSBjaGFyQXJyYXkuc3BsaWNlKDAsIG4pO1xuXG4gICAgaWYgKGNodW5rLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG5cbiAgICBjaHVua3MucHVzaChjaHVuay5qb2luKFwiXCIpKTtcbiAgfVxuXG4gIHJldHVybiBjaHVua3M7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBTyxTQUFTLHFCQUFxQixNQUFjLEdBQVc7QUFDNUQsUUFBTSxZQUFZLEtBQUssTUFBTSxFQUFFO0FBRS9CLFFBQU0sU0FBbUIsQ0FBQztBQUUxQixTQUFPLE1BQU07QUFDWCxVQUFNLFFBQVEsVUFBVSxPQUFPLEdBQUcsQ0FBQztBQUVuQyxRQUFJLE1BQU0sV0FBVztBQUFHO0FBRXhCLFdBQU8sS0FBSyxNQUFNLEtBQUssRUFBRSxDQUFDO0FBQUEsRUFDNUI7QUFFQSxTQUFPO0FBQ1Q7IiwKICAibmFtZXMiOiBbXQp9Cg==
