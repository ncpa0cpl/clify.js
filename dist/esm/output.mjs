// src/output.ts
import { Output } from "termx-markup";
function stdoutPrint(text) {
  process.stdout.write(text + "\n");
}
function stderrPrint(text) {
  process.stderr.write(text + "\n");
}
var Out = class {
  static {
    this.stdout = new Output(stdoutPrint);
  }
  static {
    this.stderr = new Output(stderrPrint);
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
export {
  Out
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL291dHB1dC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgT3V0cHV0IH0gZnJvbSBcInRlcm14LW1hcmt1cFwiO1xuXG5mdW5jdGlvbiBzdGRvdXRQcmludCh0ZXh0OiBzdHJpbmcpIHtcbiAgcHJvY2Vzcy5zdGRvdXQud3JpdGUodGV4dCArIFwiXFxuXCIpO1xufVxuXG5mdW5jdGlvbiBzdGRlcnJQcmludCh0ZXh0OiBzdHJpbmcpIHtcbiAgcHJvY2Vzcy5zdGRlcnIud3JpdGUodGV4dCArIFwiXFxuXCIpO1xufVxuXG5leHBvcnQgY2xhc3MgT3V0IHtcbiAgcHJpdmF0ZSBzdGF0aWMgc3Rkb3V0ID0gbmV3IE91dHB1dChzdGRvdXRQcmludCk7XG4gIHByaXZhdGUgc3RhdGljIHN0ZGVyciA9IG5ldyBPdXRwdXQoc3RkZXJyUHJpbnQpO1xuXG4gIHByaXZhdGUgc3RhdGljIGRpc3BsYXlMb2dzID0gdHJ1ZTtcbiAgcHJpdmF0ZSBzdGF0aWMgZGlzcGxheURlYnVncyA9IHRydWU7XG4gIHByaXZhdGUgc3RhdGljIGRpc3BsYXlFcnJvcnMgPSB0cnVlO1xuICBwcml2YXRlIHN0YXRpYyBkaXNwbGF5V2FybmluZ3MgPSB0cnVlO1xuICBwcml2YXRlIHN0YXRpYyBkaXNwbGF5T3V0cHV0ID0gdHJ1ZTtcblxuICBwdWJsaWMgc3RhdGljIHNldExvZ0xldmVsKFxuICAgIHNob3VsZERpc3BsYXk6IEFycmF5PFwibG9nXCIgfCBcImVyclwiIHwgXCJ3YXJuXCIgfCBcIm91dFwiIHwgXCJkZWJ1Z1wiPixcbiAgKSB7XG4gICAgdGhpcy5kaXNwbGF5TG9ncyA9IHNob3VsZERpc3BsYXkuaW5jbHVkZXMoXCJsb2dcIik7XG4gICAgdGhpcy5kaXNwbGF5RXJyb3JzID0gc2hvdWxkRGlzcGxheS5pbmNsdWRlcyhcImVyclwiKTtcbiAgICB0aGlzLmRpc3BsYXlXYXJuaW5ncyA9IHNob3VsZERpc3BsYXkuaW5jbHVkZXMoXCJ3YXJuXCIpO1xuICAgIHRoaXMuZGlzcGxheU91dHB1dCA9IHNob3VsZERpc3BsYXkuaW5jbHVkZXMoXCJvdXRcIik7XG4gICAgdGhpcy5kaXNwbGF5RGVidWdzID0gc2hvdWxkRGlzcGxheS5pbmNsdWRlcyhcImRlYnVnXCIpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBsb2coLi4uYXJnczogc3RyaW5nW10pIHtcbiAgICBpZiAodGhpcy5kaXNwbGF5TG9ncykge1xuICAgICAgdGhpcy5zdGRvdXQucHJpbnQoLi4uYXJncyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlcnIoLi4uYXJnczogc3RyaW5nW10pIHtcbiAgICBpZiAodGhpcy5kaXNwbGF5RXJyb3JzKSB7XG4gICAgICB0aGlzLnN0ZGVyci5wcmludCguLi5hcmdzKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHdhcm4oLi4uYXJnczogc3RyaW5nW10pIHtcbiAgICBpZiAodGhpcy5kaXNwbGF5V2FybmluZ3MpIHtcbiAgICAgIHRoaXMuc3RkZXJyLnByaW50KC4uLmFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgb3V0KC4uLmFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgaWYgKHRoaXMuZGlzcGxheU91dHB1dCkge1xuICAgICAgdGhpcy5zdGRvdXQucHJpbnQoLi4uYXJncyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBkZWJ1ZyguLi5hcmdzOiBzdHJpbmdbXSkge1xuICAgIGlmICh0aGlzLmRpc3BsYXlEZWJ1Z3MpIHtcbiAgICAgIHRoaXMuc3Rkb3V0LnByaW50KC4uLmFyZ3MpO1xuICAgIH1cbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsY0FBYztBQUV2QixTQUFTLFlBQVksTUFBYztBQUNqQyxVQUFRLE9BQU8sTUFBTSxPQUFPLElBQUk7QUFDbEM7QUFFQSxTQUFTLFlBQVksTUFBYztBQUNqQyxVQUFRLE9BQU8sTUFBTSxPQUFPLElBQUk7QUFDbEM7QUFFTyxJQUFNLE1BQU4sTUFBVTtBQUFBLEVBQ2Y7QUFBQSxTQUFlLFNBQVMsSUFBSSxPQUFPLFdBQVc7QUFBQTtBQUFBLEVBQzlDO0FBQUEsU0FBZSxTQUFTLElBQUksT0FBTyxXQUFXO0FBQUE7QUFBQSxFQUU5QztBQUFBLFNBQWUsY0FBYztBQUFBO0FBQUEsRUFDN0I7QUFBQSxTQUFlLGdCQUFnQjtBQUFBO0FBQUEsRUFDL0I7QUFBQSxTQUFlLGdCQUFnQjtBQUFBO0FBQUEsRUFDL0I7QUFBQSxTQUFlLGtCQUFrQjtBQUFBO0FBQUEsRUFDakM7QUFBQSxTQUFlLGdCQUFnQjtBQUFBO0FBQUEsRUFFL0IsT0FBYyxZQUNaLGVBQ0E7QUFDQSxTQUFLLGNBQWMsY0FBYyxTQUFTLEtBQUs7QUFDL0MsU0FBSyxnQkFBZ0IsY0FBYyxTQUFTLEtBQUs7QUFDakQsU0FBSyxrQkFBa0IsY0FBYyxTQUFTLE1BQU07QUFDcEQsU0FBSyxnQkFBZ0IsY0FBYyxTQUFTLEtBQUs7QUFDakQsU0FBSyxnQkFBZ0IsY0FBYyxTQUFTLE9BQU87QUFBQSxFQUNyRDtBQUFBLEVBRUEsT0FBYyxPQUFPLE1BQWdCO0FBQ25DLFFBQUksS0FBSyxhQUFhO0FBQ3BCLFdBQUssT0FBTyxNQUFNLEdBQUcsSUFBSTtBQUFBLElBQzNCO0FBQUEsRUFDRjtBQUFBLEVBRUEsT0FBYyxPQUFPLE1BQWdCO0FBQ25DLFFBQUksS0FBSyxlQUFlO0FBQ3RCLFdBQUssT0FBTyxNQUFNLEdBQUcsSUFBSTtBQUFBLElBQzNCO0FBQUEsRUFDRjtBQUFBLEVBRUEsT0FBYyxRQUFRLE1BQWdCO0FBQ3BDLFFBQUksS0FBSyxpQkFBaUI7QUFDeEIsV0FBSyxPQUFPLE1BQU0sR0FBRyxJQUFJO0FBQUEsSUFDM0I7QUFBQSxFQUNGO0FBQUEsRUFFQSxPQUFjLE9BQU8sTUFBZ0I7QUFDbkMsUUFBSSxLQUFLLGVBQWU7QUFDdEIsV0FBSyxPQUFPLE1BQU0sR0FBRyxJQUFJO0FBQUEsSUFDM0I7QUFBQSxFQUNGO0FBQUEsRUFFQSxPQUFjLFNBQVMsTUFBZ0I7QUFDckMsUUFBSSxLQUFLLGVBQWU7QUFDdEIsV0FBSyxPQUFPLE1BQU0sR0FBRyxJQUFJO0FBQUEsSUFDM0I7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
