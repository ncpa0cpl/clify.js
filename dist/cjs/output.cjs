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

// src/output.ts
var output_exports = {};
__export(output_exports, {
  Out: () => Out
});
module.exports = __toCommonJS(output_exports);
var import_termx_markup = require("termx-markup");
function stdoutPrint(text) {
  process.stdout.write(text + "\n");
}
function stderrPrint(text) {
  process.stderr.write(text + "\n");
}
var Out = class {
  static {
    this.stdout = new import_termx_markup.Output(stdoutPrint);
  }
  static {
    this.stderr = new import_termx_markup.Output(stderrPrint);
  }
  static {
    this.displayLogs = true;
  }
  static {
    this.displayDebugs = true;
  }
  static {
    this.displayErrors = true;
  }
  static {
    this.displayWarnings = true;
  }
  static {
    this.displayOutput = true;
  }
  static setLogLevel(shouldDisplay) {
    this.displayLogs = shouldDisplay.includes("log");
    this.displayErrors = shouldDisplay.includes("err");
    this.displayWarnings = shouldDisplay.includes("warn");
    this.displayOutput = shouldDisplay.includes("out");
    this.displayDebugs = shouldDisplay.includes("debug");
  }
  static log(...args) {
    if (this.displayLogs) {
      this.stdout.print(...args);
    }
  }
  static err(...args) {
    if (this.displayErrors) {
      this.stderr.print(...args);
    }
  }
  static warn(...args) {
    if (this.displayWarnings) {
      this.stderr.print(...args);
    }
  }
  static out(...args) {
    if (this.displayOutput) {
      this.stdout.print(...args);
    }
  }
  static debug(...args) {
    if (this.displayDebugs) {
      this.stdout.print(...args);
    }
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL291dHB1dC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgT3V0cHV0IH0gZnJvbSBcInRlcm14LW1hcmt1cFwiO1xuXG5mdW5jdGlvbiBzdGRvdXRQcmludCh0ZXh0OiBzdHJpbmcpIHtcbiAgcHJvY2Vzcy5zdGRvdXQud3JpdGUodGV4dCArIFwiXFxuXCIpO1xufVxuXG5mdW5jdGlvbiBzdGRlcnJQcmludCh0ZXh0OiBzdHJpbmcpIHtcbiAgcHJvY2Vzcy5zdGRlcnIud3JpdGUodGV4dCArIFwiXFxuXCIpO1xufVxuXG5leHBvcnQgY2xhc3MgT3V0IHtcbiAgcHJpdmF0ZSBzdGF0aWMgc3Rkb3V0ID0gbmV3IE91dHB1dChzdGRvdXRQcmludCk7XG4gIHByaXZhdGUgc3RhdGljIHN0ZGVyciA9IG5ldyBPdXRwdXQoc3RkZXJyUHJpbnQpO1xuXG4gIHByaXZhdGUgc3RhdGljIGRpc3BsYXlMb2dzID0gdHJ1ZTtcbiAgcHJpdmF0ZSBzdGF0aWMgZGlzcGxheURlYnVncyA9IHRydWU7XG4gIHByaXZhdGUgc3RhdGljIGRpc3BsYXlFcnJvcnMgPSB0cnVlO1xuICBwcml2YXRlIHN0YXRpYyBkaXNwbGF5V2FybmluZ3MgPSB0cnVlO1xuICBwcml2YXRlIHN0YXRpYyBkaXNwbGF5T3V0cHV0ID0gdHJ1ZTtcblxuICBwdWJsaWMgc3RhdGljIHNldExvZ0xldmVsKFxuICAgIHNob3VsZERpc3BsYXk6IEFycmF5PFwibG9nXCIgfCBcImVyclwiIHwgXCJ3YXJuXCIgfCBcIm91dFwiIHwgXCJkZWJ1Z1wiPixcbiAgKSB7XG4gICAgdGhpcy5kaXNwbGF5TG9ncyA9IHNob3VsZERpc3BsYXkuaW5jbHVkZXMoXCJsb2dcIik7XG4gICAgdGhpcy5kaXNwbGF5RXJyb3JzID0gc2hvdWxkRGlzcGxheS5pbmNsdWRlcyhcImVyclwiKTtcbiAgICB0aGlzLmRpc3BsYXlXYXJuaW5ncyA9IHNob3VsZERpc3BsYXkuaW5jbHVkZXMoXCJ3YXJuXCIpO1xuICAgIHRoaXMuZGlzcGxheU91dHB1dCA9IHNob3VsZERpc3BsYXkuaW5jbHVkZXMoXCJvdXRcIik7XG4gICAgdGhpcy5kaXNwbGF5RGVidWdzID0gc2hvdWxkRGlzcGxheS5pbmNsdWRlcyhcImRlYnVnXCIpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBsb2coLi4uYXJnczogc3RyaW5nW10pIHtcbiAgICBpZiAodGhpcy5kaXNwbGF5TG9ncykge1xuICAgICAgdGhpcy5zdGRvdXQucHJpbnQoLi4uYXJncyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlcnIoLi4uYXJnczogc3RyaW5nW10pIHtcbiAgICBpZiAodGhpcy5kaXNwbGF5RXJyb3JzKSB7XG4gICAgICB0aGlzLnN0ZGVyci5wcmludCguLi5hcmdzKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHdhcm4oLi4uYXJnczogc3RyaW5nW10pIHtcbiAgICBpZiAodGhpcy5kaXNwbGF5V2FybmluZ3MpIHtcbiAgICAgIHRoaXMuc3RkZXJyLnByaW50KC4uLmFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgb3V0KC4uLmFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgaWYgKHRoaXMuZGlzcGxheU91dHB1dCkge1xuICAgICAgdGhpcy5zdGRvdXQucHJpbnQoLi4uYXJncyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBkZWJ1ZyguLi5hcmdzOiBzdHJpbmdbXSkge1xuICAgIGlmICh0aGlzLmRpc3BsYXlEZWJ1Z3MpIHtcbiAgICAgIHRoaXMuc3Rkb3V0LnByaW50KC4uLmFyZ3MpO1xuICAgIH1cbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQXVCO0FBRXZCLFNBQVMsWUFBWSxNQUFjO0FBQ2pDLFVBQVEsT0FBTyxNQUFNLE9BQU8sSUFBSTtBQUNsQztBQUVBLFNBQVMsWUFBWSxNQUFjO0FBQ2pDLFVBQVEsT0FBTyxNQUFNLE9BQU8sSUFBSTtBQUNsQztBQUVPLElBQU0sTUFBTixNQUFVO0FBQUEsRUFDZjtBQUFBLFNBQWUsU0FBUyxJQUFJLDJCQUFPLFdBQVc7QUFBQTtBQUFBLEVBQzlDO0FBQUEsU0FBZSxTQUFTLElBQUksMkJBQU8sV0FBVztBQUFBO0FBQUEsRUFFOUM7QUFBQSxTQUFlLGNBQWM7QUFBQTtBQUFBLEVBQzdCO0FBQUEsU0FBZSxnQkFBZ0I7QUFBQTtBQUFBLEVBQy9CO0FBQUEsU0FBZSxnQkFBZ0I7QUFBQTtBQUFBLEVBQy9CO0FBQUEsU0FBZSxrQkFBa0I7QUFBQTtBQUFBLEVBQ2pDO0FBQUEsU0FBZSxnQkFBZ0I7QUFBQTtBQUFBLEVBRS9CLE9BQWMsWUFDWixlQUNBO0FBQ0EsU0FBSyxjQUFjLGNBQWMsU0FBUyxLQUFLO0FBQy9DLFNBQUssZ0JBQWdCLGNBQWMsU0FBUyxLQUFLO0FBQ2pELFNBQUssa0JBQWtCLGNBQWMsU0FBUyxNQUFNO0FBQ3BELFNBQUssZ0JBQWdCLGNBQWMsU0FBUyxLQUFLO0FBQ2pELFNBQUssZ0JBQWdCLGNBQWMsU0FBUyxPQUFPO0FBQUEsRUFDckQ7QUFBQSxFQUVBLE9BQWMsT0FBTyxNQUFnQjtBQUNuQyxRQUFJLEtBQUssYUFBYTtBQUNwQixXQUFLLE9BQU8sTUFBTSxHQUFHLElBQUk7QUFBQSxJQUMzQjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLE9BQWMsT0FBTyxNQUFnQjtBQUNuQyxRQUFJLEtBQUssZUFBZTtBQUN0QixXQUFLLE9BQU8sTUFBTSxHQUFHLElBQUk7QUFBQSxJQUMzQjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLE9BQWMsUUFBUSxNQUFnQjtBQUNwQyxRQUFJLEtBQUssaUJBQWlCO0FBQ3hCLFdBQUssT0FBTyxNQUFNLEdBQUcsSUFBSTtBQUFBLElBQzNCO0FBQUEsRUFDRjtBQUFBLEVBRUEsT0FBYyxPQUFPLE1BQWdCO0FBQ25DLFFBQUksS0FBSyxlQUFlO0FBQ3RCLFdBQUssT0FBTyxNQUFNLEdBQUcsSUFBSTtBQUFBLElBQzNCO0FBQUEsRUFDRjtBQUFBLEVBRUEsT0FBYyxTQUFTLE1BQWdCO0FBQ3JDLFFBQUksS0FBSyxlQUFlO0FBQ3RCLFdBQUssT0FBTyxNQUFNLEdBQUcsSUFBSTtBQUFBLElBQzNCO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
