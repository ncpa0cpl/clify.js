// src/Utils/string-list-length.ts
function stringListLength(strings) {
  return strings.reduce(
    (len, c) => len + Math.max(0, ...c.split("\n").map((l) => l.length)),
    0
  );
}
export {
  stringListLength
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1V0aWxzL3N0cmluZy1saXN0LWxlbmd0aC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ0xpc3RMZW5ndGgoc3RyaW5nczogc3RyaW5nW10pIHtcbiAgcmV0dXJuIHN0cmluZ3MucmVkdWNlKFxuICAgIChsZW4sIGMpID0+IGxlbiArIE1hdGgubWF4KDAsIC4uLmMuc3BsaXQoXCJcXG5cIikubWFwKChsKSA9PiBsLmxlbmd0aCkpLFxuICAgIDBcbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBTyxTQUFTLGlCQUFpQixTQUFtQjtBQUNsRCxTQUFPLFFBQVE7QUFBQSxJQUNiLENBQUMsS0FBSyxNQUFNLE1BQU0sS0FBSyxJQUFJLEdBQUcsR0FBRyxFQUFFLE1BQU0sSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO0FBQUEsSUFDbkU7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
