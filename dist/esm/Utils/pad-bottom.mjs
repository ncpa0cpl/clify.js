// src/Utils/pad-bottom.ts
import { countChar } from "./count-char.mjs";
var padBottom = (text, targetHeight) => {
  const endLineCharCount = countChar(text, "\n") + 1;
  const paddingLength = Math.max(0, targetHeight - endLineCharCount);
  return `${text}${Array.from({ length: paddingLength }, () => "\n").join("")}`;
};
export {
  padBottom
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1V0aWxzL3BhZC1ib3R0b20udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGNvdW50Q2hhciB9IGZyb20gXCIuL2NvdW50LWNoYXJcIjtcblxuZXhwb3J0IGNvbnN0IHBhZEJvdHRvbSA9ICh0ZXh0OiBzdHJpbmcsIHRhcmdldEhlaWdodDogbnVtYmVyKSA9PiB7XG4gIGNvbnN0IGVuZExpbmVDaGFyQ291bnQgPSBjb3VudENoYXIodGV4dCwgXCJcXG5cIikgKyAxO1xuXG4gIGNvbnN0IHBhZGRpbmdMZW5ndGggPSBNYXRoLm1heCgwLCB0YXJnZXRIZWlnaHQgLSBlbmRMaW5lQ2hhckNvdW50KTtcblxuICByZXR1cm4gYCR7dGV4dH0ke0FycmF5LmZyb20oeyBsZW5ndGg6IHBhZGRpbmdMZW5ndGggfSwgKCkgPT4gXCJcXG5cIikuam9pbihcIlwiKX1gO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxTQUFTLGlCQUFpQjtBQUVuQixJQUFNLFlBQVksQ0FBQyxNQUFjLGlCQUF5QjtBQUMvRCxRQUFNLG1CQUFtQixVQUFVLE1BQU0sSUFBSSxJQUFJO0FBRWpELFFBQU0sZ0JBQWdCLEtBQUssSUFBSSxHQUFHLGVBQWUsZ0JBQWdCO0FBRWpFLFNBQU8sR0FBRyxJQUFJLEdBQUcsTUFBTSxLQUFLLEVBQUUsUUFBUSxjQUFjLEdBQUcsTUFBTSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDN0U7IiwKICAibmFtZXMiOiBbXQp9Cg==
