// src/stdinput.ts
import Readline from "node:readline";
var empty = {
  toString() {
    return "";
  }
};
var StdInput = class _StdInput {
  constructor(multiline = false) {
    this.multiline = multiline;
    _StdInput.instance = this;
  }
  /**
   * @internal
   */
  static async load(stdi) {
    const input = await new Promise((res) => {
      if (process.stdin.isTTY) {
        const lines = [];
        const rl = Readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
        if (stdi.multiline) {
          rl.on("line", (line) => {
            lines.push(line);
          }).on("close", () => {
            res(lines.join("\n"));
            rl.close();
            process.stdout.write("\n");
          });
        } else {
          rl.on("line", (line) => {
            res(line);
            rl.close();
          });
        }
      } else {
        const handler = () => {
          const chunks = [];
          for (let chunk = empty; chunk != null; chunk = process.stdin.read()) {
            chunks.push(chunk.toString());
          }
          res(chunks.join(""));
          process.stdin.off("readable", handler);
        };
        process.stdin.on("readable", handler);
      }
    });
    stdi._value = input;
  }
  get value() {
    return this._value;
  }
};
export {
  StdInput
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3N0ZGlucHV0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhZGxpbmUgZnJvbSBcIm5vZGU6cmVhZGxpbmVcIjtcblxudHlwZSBTdHJpbmdpZnlhYmxlID0ge1xuICB0b1N0cmluZygpOiBzdHJpbmc7XG59O1xuXG5jb25zdCBlbXB0eTogU3RyaW5naWZ5YWJsZSA9IHtcbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH0sXG59O1xuXG5leHBvcnQgY2xhc3MgU3RkSW5wdXQge1xuICBzdGF0aWMgaW5zdGFuY2U/OiBTdGRJbnB1dDtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgbG9hZChzdGRpOiBTdGRJbnB1dCkge1xuICAgIGNvbnN0IGlucHV0ID0gYXdhaXQgbmV3IFByb21pc2U8c3RyaW5nPigocmVzKSA9PiB7XG4gICAgICBpZiAocHJvY2Vzcy5zdGRpbi5pc1RUWSkge1xuICAgICAgICBjb25zdCBsaW5lczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBjb25zdCBybCA9IFJlYWRsaW5lLmNyZWF0ZUludGVyZmFjZSh7XG4gICAgICAgICAgaW5wdXQ6IHByb2Nlc3Muc3RkaW4sXG4gICAgICAgICAgb3V0cHV0OiBwcm9jZXNzLnN0ZG91dCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHN0ZGkubXVsdGlsaW5lKSB7XG4gICAgICAgICAgcmwub24oXCJsaW5lXCIsIChsaW5lKSA9PiB7XG4gICAgICAgICAgICBsaW5lcy5wdXNoKGxpbmUpO1xuICAgICAgICAgIH0pLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xuICAgICAgICAgICAgcmVzKGxpbmVzLmpvaW4oXCJcXG5cIikpO1xuICAgICAgICAgICAgcmwuY2xvc2UoKTtcbiAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKFwiXFxuXCIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJsLm9uKFwibGluZVwiLCAobGluZSkgPT4ge1xuICAgICAgICAgICAgcmVzKGxpbmUpO1xuICAgICAgICAgICAgcmwuY2xvc2UoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBjaHVua3M6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGNodW5rID0gZW1wdHk7XG4gICAgICAgICAgICBjaHVuayAhPSBudWxsO1xuICAgICAgICAgICAgY2h1bmsgPSBwcm9jZXNzLnN0ZGluLnJlYWQoKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgY2h1bmtzLnB1c2goY2h1bmsudG9TdHJpbmcoKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVzKGNodW5rcy5qb2luKFwiXCIpKTtcbiAgICAgICAgICBwcm9jZXNzLnN0ZGluLm9mZihcInJlYWRhYmxlXCIsIGhhbmRsZXIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHByb2Nlc3Muc3RkaW4ub24oXCJyZWFkYWJsZVwiLCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHN0ZGkuX3ZhbHVlID0gaW5wdXQ7XG4gIH1cblxuICBwcml2YXRlIF92YWx1ZSE6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG11bHRpbGluZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgU3RkSW5wdXQuaW5zdGFuY2UgPSB0aGlzO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLE9BQU8sY0FBYztBQU1yQixJQUFNLFFBQXVCO0FBQUEsRUFDM0IsV0FBVztBQUNULFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUFFTyxJQUFNLFdBQU4sTUFBTSxVQUFTO0FBQUEsRUF1RHBCLFlBQW9CLFlBQXFCLE9BQU87QUFBNUI7QUFDbEIsY0FBUyxXQUFXO0FBQUEsRUFDdEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQW5EQSxhQUFhLEtBQUssTUFBZ0I7QUFDaEMsVUFBTSxRQUFRLE1BQU0sSUFBSSxRQUFnQixDQUFDLFFBQVE7QUFDL0MsVUFBSSxRQUFRLE1BQU0sT0FBTztBQUN2QixjQUFNLFFBQWtCLENBQUM7QUFFekIsY0FBTSxLQUFLLFNBQVMsZ0JBQWdCO0FBQUEsVUFDbEMsT0FBTyxRQUFRO0FBQUEsVUFDZixRQUFRLFFBQVE7QUFBQSxRQUNsQixDQUFDO0FBRUQsWUFBSSxLQUFLLFdBQVc7QUFDbEIsYUFBRyxHQUFHLFFBQVEsQ0FBQyxTQUFTO0FBQ3RCLGtCQUFNLEtBQUssSUFBSTtBQUFBLFVBQ2pCLENBQUMsRUFBRSxHQUFHLFNBQVMsTUFBTTtBQUNuQixnQkFBSSxNQUFNLEtBQUssSUFBSSxDQUFDO0FBQ3BCLGVBQUcsTUFBTTtBQUNULG9CQUFRLE9BQU8sTUFBTSxJQUFJO0FBQUEsVUFDM0IsQ0FBQztBQUFBLFFBQ0gsT0FBTztBQUNMLGFBQUcsR0FBRyxRQUFRLENBQUMsU0FBUztBQUN0QixnQkFBSSxJQUFJO0FBQ1IsZUFBRyxNQUFNO0FBQUEsVUFDWCxDQUFDO0FBQUEsUUFDSDtBQUFBLE1BQ0YsT0FBTztBQUNMLGNBQU0sVUFBVSxNQUFNO0FBQ3BCLGdCQUFNLFNBQW1CLENBQUM7QUFFMUIsbUJBQ00sUUFBUSxPQUNaLFNBQVMsTUFDVCxRQUFRLFFBQVEsTUFBTSxLQUFLLEdBQzNCO0FBQ0EsbUJBQU8sS0FBSyxNQUFNLFNBQVMsQ0FBQztBQUFBLFVBQzlCO0FBRUEsY0FBSSxPQUFPLEtBQUssRUFBRSxDQUFDO0FBQ25CLGtCQUFRLE1BQU0sSUFBSSxZQUFZLE9BQU87QUFBQSxRQUN2QztBQUVBLGdCQUFRLE1BQU0sR0FBRyxZQUFZLE9BQU87QUFBQSxNQUN0QztBQUFBLElBQ0YsQ0FBQztBQUVELFNBQUssU0FBUztBQUFBLEVBQ2hCO0FBQUEsRUFRQSxJQUFJLFFBQVE7QUFDVixXQUFPLEtBQUs7QUFBQSxFQUNkO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
