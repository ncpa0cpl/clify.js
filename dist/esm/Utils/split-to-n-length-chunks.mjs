// src/Utils/split-to-n-length-chunks.ts
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
export {
  splitToNLengthChunks
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1V0aWxzL3NwbGl0LXRvLW4tbGVuZ3RoLWNodW5rcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGZ1bmN0aW9uIHNwbGl0VG9OTGVuZ3RoQ2h1bmtzKHRleHQ6IHN0cmluZywgbjogbnVtYmVyKSB7XG4gIGNvbnN0IGNoYXJBcnJheSA9IHRleHQuc3BsaXQoXCJcIik7XG5cbiAgY29uc3QgY2h1bmtzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgY29uc3QgY2h1bmsgPSBjaGFyQXJyYXkuc3BsaWNlKDAsIG4pO1xuXG4gICAgaWYgKGNodW5rLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG5cbiAgICBjaHVua3MucHVzaChjaHVuay5qb2luKFwiXCIpKTtcbiAgfVxuXG4gIHJldHVybiBjaHVua3M7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQU8sU0FBUyxxQkFBcUIsTUFBYyxHQUFXO0FBQzVELFFBQU0sWUFBWSxLQUFLLE1BQU0sRUFBRTtBQUUvQixRQUFNLFNBQW1CLENBQUM7QUFFMUIsU0FBTyxNQUFNO0FBQ1gsVUFBTSxRQUFRLFVBQVUsT0FBTyxHQUFHLENBQUM7QUFFbkMsUUFBSSxNQUFNLFdBQVc7QUFBRztBQUV4QixXQUFPLEtBQUssTUFBTSxLQUFLLEVBQUUsQ0FBQztBQUFBLEVBQzVCO0FBRUEsU0FBTztBQUNUOyIsCiAgIm5hbWVzIjogW10KfQo=
