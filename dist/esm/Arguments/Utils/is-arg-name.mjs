// src/Arguments/Utils/is-arg-name.ts
function isArgName(value) {
  if (value[0] !== "-") {
    return false;
  }
  if (value[1] === "-") {
    return true;
  }
  return value.length < 3;
}
export {
  isArgName
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vc3JjL0FyZ3VtZW50cy9VdGlscy9pcy1hcmctbmFtZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGZ1bmN0aW9uIGlzQXJnTmFtZSh2YWx1ZTogc3RyaW5nKTogdmFsdWUgaXMgYC0ke3N0cmluZ31gIHtcbiAgaWYgKHZhbHVlWzBdICE9PSBcIi1cIikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh2YWx1ZVsxXSA9PT0gXCItXCIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZS5sZW5ndGggPCAzO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFPLFNBQVMsVUFBVSxPQUFzQztBQUM5RCxNQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUs7QUFDcEIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUs7QUFDcEIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPLE1BQU0sU0FBUztBQUN4QjsiLAogICJuYW1lcyI6IFtdCn0K
