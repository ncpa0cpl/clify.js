// src/Utils/compare-strings.ts
import { isNumerical } from "./is-numerical.mjs";
import { splitByAlphanumericTransitions } from "./split-by-alphanumeric-transitions.mjs";
function compare(a, b) {
  if (a === b)
    return 0;
  const shorter = a.length > b.length ? b : a;
  for (const index of Array.from(
    { length: shorter.length },
    (_, i) => i
  )) {
    const charCodeA = a.charCodeAt(index);
    const charCodeB = b.charCodeAt(index);
    if (charCodeA < charCodeB)
      return -1;
    if (charCodeA > charCodeB)
      return 1;
  }
  return a.length > b.length ? 1 : -1;
}
function compareWithNumbers(a, b) {
  if (a === b)
    return 0;
  const partsOfA = splitByAlphanumericTransitions(a);
  const partsOfB = splitByAlphanumericTransitions(b);
  const shorter = partsOfA.length > partsOfB.length ? partsOfB : partsOfA;
  for (const index of Array.from(
    { length: shorter.length },
    (_, i) => i
  )) {
    const substringA = partsOfA[index];
    const substringB = partsOfB[index];
    const aIsNumeric = isNumerical(substringA);
    const bIsNumeric = isNumerical(substringB);
    if (aIsNumeric && !bIsNumeric) {
      return -1;
    }
    if (!aIsNumeric && bIsNumeric) {
      return 1;
    }
    if (aIsNumeric && bIsNumeric) {
      const numA = Number(substringA);
      const numB = Number(substringB);
      if (numA < numB)
        return -1;
      if (numA > numB)
        return 1;
    }
    if (!aIsNumeric && !bIsNumeric) {
      const substringCompare = compare(substringA, substringB);
      if (substringCompare !== 0)
        return substringCompare;
    }
  }
  return 0;
}
function compareStrings(arg_0, arg_1) {
  if (typeof arg_0 === "string" && typeof arg_1 === "string") {
    return compare(arg_0, arg_1);
  }
  if (typeof arg_0 === "object" && arg_0 !== null) {
    const numCompare = arg_0["alphanum"] ?? false;
    const reverse = arg_0["reverse"] ?? false;
    if (numCompare) {
      return (a, b) => {
        if (reverse)
          return REVERSE_TABLE[compareWithNumbers(a, b)];
        return compareWithNumbers(a, b);
      };
    }
    return (a, b) => {
      if (reverse)
        return REVERSE_TABLE[compare(a, b)];
      return compare(a, b);
    };
  }
  return compare;
}
var REVERSE_TABLE = {
  "-1": 1,
  "0": 0,
  "1": -1
};
export {
  compareStrings
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1V0aWxzL2NvbXBhcmUtc3RyaW5ncy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgaXNOdW1lcmljYWwgfSBmcm9tIFwiLi9pcy1udW1lcmljYWxcIjtcbmltcG9ydCB7IHNwbGl0QnlBbHBoYW51bWVyaWNUcmFuc2l0aW9ucyB9IGZyb20gXCIuL3NwbGl0LWJ5LWFscGhhbnVtZXJpYy10cmFuc2l0aW9uc1wiO1xuXG5mdW5jdGlvbiBjb21wYXJlKGE6IHN0cmluZywgYjogc3RyaW5nKTogLTEgfCAwIHwgMSB7XG4gIGlmIChhID09PSBiKSByZXR1cm4gMDtcblxuICBjb25zdCBzaG9ydGVyID0gYS5sZW5ndGggPiBiLmxlbmd0aCA/IGIgOiBhO1xuXG4gIGZvciAoY29uc3QgaW5kZXggb2YgQXJyYXkuZnJvbShcbiAgICB7IGxlbmd0aDogc2hvcnRlci5sZW5ndGggfSxcbiAgICAoXywgaSkgPT4gaSxcbiAgKSkge1xuICAgIGNvbnN0IGNoYXJDb2RlQSA9IGEuY2hhckNvZGVBdChpbmRleCk7XG4gICAgY29uc3QgY2hhckNvZGVCID0gYi5jaGFyQ29kZUF0KGluZGV4KTtcblxuICAgIGlmIChjaGFyQ29kZUEgPCBjaGFyQ29kZUIpIHJldHVybiAtMTtcbiAgICBpZiAoY2hhckNvZGVBID4gY2hhckNvZGVCKSByZXR1cm4gMTtcbiAgfVxuXG4gIHJldHVybiBhLmxlbmd0aCA+IGIubGVuZ3RoID8gMSA6IC0xO1xufVxuXG5mdW5jdGlvbiBjb21wYXJlV2l0aE51bWJlcnMoYTogc3RyaW5nLCBiOiBzdHJpbmcpOiAtMSB8IDAgfCAxIHtcbiAgaWYgKGEgPT09IGIpIHJldHVybiAwO1xuXG4gIGNvbnN0IHBhcnRzT2ZBID0gc3BsaXRCeUFscGhhbnVtZXJpY1RyYW5zaXRpb25zKGEpO1xuICBjb25zdCBwYXJ0c09mQiA9IHNwbGl0QnlBbHBoYW51bWVyaWNUcmFuc2l0aW9ucyhiKTtcblxuICBjb25zdCBzaG9ydGVyID1cbiAgICBwYXJ0c09mQS5sZW5ndGggPiBwYXJ0c09mQi5sZW5ndGggPyBwYXJ0c09mQiA6IHBhcnRzT2ZBO1xuXG4gIGZvciAoY29uc3QgaW5kZXggb2YgQXJyYXkuZnJvbShcbiAgICB7IGxlbmd0aDogc2hvcnRlci5sZW5ndGggfSxcbiAgICAoXywgaSkgPT4gaSxcbiAgKSkge1xuICAgIGNvbnN0IHN1YnN0cmluZ0EgPSBwYXJ0c09mQVtpbmRleF07XG4gICAgY29uc3Qgc3Vic3RyaW5nQiA9IHBhcnRzT2ZCW2luZGV4XTtcblxuICAgIGNvbnN0IGFJc051bWVyaWMgPSBpc051bWVyaWNhbChzdWJzdHJpbmdBKTtcbiAgICBjb25zdCBiSXNOdW1lcmljID0gaXNOdW1lcmljYWwoc3Vic3RyaW5nQik7XG5cbiAgICBpZiAoYUlzTnVtZXJpYyAmJiAhYklzTnVtZXJpYykge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIGlmICghYUlzTnVtZXJpYyAmJiBiSXNOdW1lcmljKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICBpZiAoYUlzTnVtZXJpYyAmJiBiSXNOdW1lcmljKSB7XG4gICAgICBjb25zdCBudW1BID0gTnVtYmVyKHN1YnN0cmluZ0EpO1xuICAgICAgY29uc3QgbnVtQiA9IE51bWJlcihzdWJzdHJpbmdCKTtcblxuICAgICAgaWYgKG51bUEgPCBudW1CKSByZXR1cm4gLTE7XG4gICAgICBpZiAobnVtQSA+IG51bUIpIHJldHVybiAxO1xuICAgIH1cblxuICAgIGlmICghYUlzTnVtZXJpYyAmJiAhYklzTnVtZXJpYykge1xuICAgICAgY29uc3Qgc3Vic3RyaW5nQ29tcGFyZSA9IGNvbXBhcmUoc3Vic3RyaW5nQSwgc3Vic3RyaW5nQik7XG4gICAgICBpZiAoc3Vic3RyaW5nQ29tcGFyZSAhPT0gMCkgcmV0dXJuIHN1YnN0cmluZ0NvbXBhcmU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbmZ1bmN0aW9uIGNvbXBhcmVTdHJpbmdzKHN0ckE6IHN0cmluZywgc3RyQjogc3RyaW5nKTogLTEgfCAwIHwgMTtcbmZ1bmN0aW9uIGNvbXBhcmVTdHJpbmdzKG9wdGlvbnM6IHtcbiAgYWxwaGFudW0/OiBib29sZWFuO1xuICByZXZlcnNlPzogYm9vbGVhbjtcbn0pOiAoYTogc3RyaW5nLCBiOiBzdHJpbmcpID0+IC0xIHwgMCB8IDE7XG5mdW5jdGlvbiBjb21wYXJlU3RyaW5ncyhcbiAgYXJnXzA6IHVua25vd24sXG4gIGFyZ18xPzogdW5rbm93bixcbik6IC0xIHwgMCB8IDEgfCAoKGE6IHN0cmluZywgYjogc3RyaW5nKSA9PiAtMSB8IDAgfCAxKSB7XG4gIGlmICh0eXBlb2YgYXJnXzAgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIGFyZ18xID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGNvbXBhcmUoYXJnXzAsIGFyZ18xKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYXJnXzAgPT09IFwib2JqZWN0XCIgJiYgYXJnXzAgIT09IG51bGwpIHtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgY29uc3QgbnVtQ29tcGFyZSA9IGFyZ18wW1wiYWxwaGFudW1cIl0gPz8gZmFsc2U7XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgIGNvbnN0IHJldmVyc2UgPSBhcmdfMFtcInJldmVyc2VcIl0gPz8gZmFsc2U7XG5cbiAgICBpZiAobnVtQ29tcGFyZSkge1xuICAgICAgcmV0dXJuIChhOiBzdHJpbmcsIGI6IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAocmV2ZXJzZSkgcmV0dXJuIFJFVkVSU0VfVEFCTEVbY29tcGFyZVdpdGhOdW1iZXJzKGEsIGIpXTtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVXaXRoTnVtYmVycyhhLCBiKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIChhOiBzdHJpbmcsIGI6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHJldmVyc2UpIHJldHVybiBSRVZFUlNFX1RBQkxFW2NvbXBhcmUoYSwgYildO1xuICAgICAgcmV0dXJuIGNvbXBhcmUoYSwgYik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBjb21wYXJlO1xufVxuXG5jb25zdCBSRVZFUlNFX1RBQkxFID0ge1xuICBcIi0xXCI6IDEsXG4gIFwiMFwiOiAwLFxuICBcIjFcIjogLTEsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgeyBjb21wYXJlU3RyaW5ncyB9O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsbUJBQW1CO0FBQzVCLFNBQVMsc0NBQXNDO0FBRS9DLFNBQVMsUUFBUSxHQUFXLEdBQXVCO0FBQ2pELE1BQUksTUFBTTtBQUFHLFdBQU87QUFFcEIsUUFBTSxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsSUFBSTtBQUUxQyxhQUFXLFNBQVMsTUFBTTtBQUFBLElBQ3hCLEVBQUUsUUFBUSxRQUFRLE9BQU87QUFBQSxJQUN6QixDQUFDLEdBQUcsTUFBTTtBQUFBLEVBQ1osR0FBRztBQUNELFVBQU0sWUFBWSxFQUFFLFdBQVcsS0FBSztBQUNwQyxVQUFNLFlBQVksRUFBRSxXQUFXLEtBQUs7QUFFcEMsUUFBSSxZQUFZO0FBQVcsYUFBTztBQUNsQyxRQUFJLFlBQVk7QUFBVyxhQUFPO0FBQUEsRUFDcEM7QUFFQSxTQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsSUFBSTtBQUNuQztBQUVBLFNBQVMsbUJBQW1CLEdBQVcsR0FBdUI7QUFDNUQsTUFBSSxNQUFNO0FBQUcsV0FBTztBQUVwQixRQUFNLFdBQVcsK0JBQStCLENBQUM7QUFDakQsUUFBTSxXQUFXLCtCQUErQixDQUFDO0FBRWpELFFBQU0sVUFDSixTQUFTLFNBQVMsU0FBUyxTQUFTLFdBQVc7QUFFakQsYUFBVyxTQUFTLE1BQU07QUFBQSxJQUN4QixFQUFFLFFBQVEsUUFBUSxPQUFPO0FBQUEsSUFDekIsQ0FBQyxHQUFHLE1BQU07QUFBQSxFQUNaLEdBQUc7QUFDRCxVQUFNLGFBQWEsU0FBUyxLQUFLO0FBQ2pDLFVBQU0sYUFBYSxTQUFTLEtBQUs7QUFFakMsVUFBTSxhQUFhLFlBQVksVUFBVTtBQUN6QyxVQUFNLGFBQWEsWUFBWSxVQUFVO0FBRXpDLFFBQUksY0FBYyxDQUFDLFlBQVk7QUFDN0IsYUFBTztBQUFBLElBQ1Q7QUFFQSxRQUFJLENBQUMsY0FBYyxZQUFZO0FBQzdCLGFBQU87QUFBQSxJQUNUO0FBRUEsUUFBSSxjQUFjLFlBQVk7QUFDNUIsWUFBTSxPQUFPLE9BQU8sVUFBVTtBQUM5QixZQUFNLE9BQU8sT0FBTyxVQUFVO0FBRTlCLFVBQUksT0FBTztBQUFNLGVBQU87QUFDeEIsVUFBSSxPQUFPO0FBQU0sZUFBTztBQUFBLElBQzFCO0FBRUEsUUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZO0FBQzlCLFlBQU0sbUJBQW1CLFFBQVEsWUFBWSxVQUFVO0FBQ3ZELFVBQUkscUJBQXFCO0FBQUcsZUFBTztBQUFBLElBQ3JDO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFDVDtBQU9BLFNBQVMsZUFDUCxPQUNBLE9BQ3FEO0FBQ3JELE1BQUksT0FBTyxVQUFVLFlBQVksT0FBTyxVQUFVLFVBQVU7QUFDMUQsV0FBTyxRQUFRLE9BQU8sS0FBSztBQUFBLEVBQzdCO0FBRUEsTUFBSSxPQUFPLFVBQVUsWUFBWSxVQUFVLE1BQU07QUFFL0MsVUFBTSxhQUFhLE1BQU0sVUFBVSxLQUFLO0FBRXhDLFVBQU0sVUFBVSxNQUFNLFNBQVMsS0FBSztBQUVwQyxRQUFJLFlBQVk7QUFDZCxhQUFPLENBQUMsR0FBVyxNQUFjO0FBQy9CLFlBQUk7QUFBUyxpQkFBTyxjQUFjLG1CQUFtQixHQUFHLENBQUMsQ0FBQztBQUMxRCxlQUFPLG1CQUFtQixHQUFHLENBQUM7QUFBQSxNQUNoQztBQUFBLElBQ0Y7QUFFQSxXQUFPLENBQUMsR0FBVyxNQUFjO0FBQy9CLFVBQUk7QUFBUyxlQUFPLGNBQWMsUUFBUSxHQUFHLENBQUMsQ0FBQztBQUMvQyxhQUFPLFFBQVEsR0FBRyxDQUFDO0FBQUEsSUFDckI7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNUO0FBRUEsSUFBTSxnQkFBZ0I7QUFBQSxFQUNwQixNQUFNO0FBQUEsRUFDTixLQUFLO0FBQUEsRUFDTCxLQUFLO0FBQ1A7IiwKICAibmFtZXMiOiBbXQp9Cg==
