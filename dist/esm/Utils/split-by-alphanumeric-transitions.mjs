// src/Utils/split-by-alphanumeric-transitions.ts
import { isNumerical } from "./is-numerical.mjs";
function splitByAlphanumericTransitions(str) {
  const results = [];
  const lastChar = () => results[results.length - 1];
  const addChar = (char) => results[results.length - 1] += char;
  const addNextWord = (char) => results.push(char);
  for (const char of str.split("")) {
    const lastCharacter = lastChar();
    if (lastCharacter === void 0) {
      addNextWord(char);
      continue;
    }
    if (isNumerical(char) === isNumerical(lastCharacter)) {
      addChar(char);
      continue;
    }
    addNextWord(char);
  }
  return results;
}
export {
  splitByAlphanumericTransitions
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1V0aWxzL3NwbGl0LWJ5LWFscGhhbnVtZXJpYy10cmFuc2l0aW9ucy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgaXNOdW1lcmljYWwgfSBmcm9tIFwiLi9pcy1udW1lcmljYWxcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0QnlBbHBoYW51bWVyaWNUcmFuc2l0aW9ucyhzdHI6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgY29uc3QgcmVzdWx0czogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdCBsYXN0Q2hhciA9ICgpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4gcmVzdWx0c1tyZXN1bHRzLmxlbmd0aCAtIDFdO1xuXG4gIGNvbnN0IGFkZENoYXIgPSAoY2hhcjogc3RyaW5nKSA9PiAocmVzdWx0c1tyZXN1bHRzLmxlbmd0aCAtIDFdICs9IGNoYXIpO1xuXG4gIGNvbnN0IGFkZE5leHRXb3JkID0gKGNoYXI6IHN0cmluZykgPT4gcmVzdWx0cy5wdXNoKGNoYXIpO1xuXG4gIGZvciAoY29uc3QgY2hhciBvZiBzdHIuc3BsaXQoXCJcIikpIHtcbiAgICBjb25zdCBsYXN0Q2hhcmFjdGVyID0gbGFzdENoYXIoKTtcblxuICAgIGlmIChsYXN0Q2hhcmFjdGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGFkZE5leHRXb3JkKGNoYXIpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGlzTnVtZXJpY2FsKGNoYXIpID09PSBpc051bWVyaWNhbChsYXN0Q2hhcmFjdGVyKSkge1xuICAgICAgYWRkQ2hhcihjaGFyKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGFkZE5leHRXb3JkKGNoYXIpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsU0FBUyxtQkFBbUI7QUFFckIsU0FBUywrQkFBK0IsS0FBdUI7QUFDcEUsUUFBTSxVQUFvQixDQUFDO0FBRTNCLFFBQU0sV0FBVyxNQUEwQixRQUFRLFFBQVEsU0FBUyxDQUFDO0FBRXJFLFFBQU0sVUFBVSxDQUFDLFNBQWtCLFFBQVEsUUFBUSxTQUFTLENBQUMsS0FBSztBQUVsRSxRQUFNLGNBQWMsQ0FBQyxTQUFpQixRQUFRLEtBQUssSUFBSTtBQUV2RCxhQUFXLFFBQVEsSUFBSSxNQUFNLEVBQUUsR0FBRztBQUNoQyxVQUFNLGdCQUFnQixTQUFTO0FBRS9CLFFBQUksa0JBQWtCLFFBQVc7QUFDL0Isa0JBQVksSUFBSTtBQUNoQjtBQUFBLElBQ0Y7QUFFQSxRQUFJLFlBQVksSUFBSSxNQUFNLFlBQVksYUFBYSxHQUFHO0FBQ3BELGNBQVEsSUFBSTtBQUNaO0FBQUEsSUFDRjtBQUVBLGdCQUFZLElBQUk7QUFBQSxFQUNsQjtBQUVBLFNBQU87QUFDVDsiLAogICJuYW1lcyI6IFtdCn0K
