var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/clify.ts
function defaultStdinReader() {
  return {
    read() {
      let data = "";
      const stdin = process.stdin;
      const orgEncoding = stdin.readableEncoding ?? void 0;
      stdin.setEncoding("utf8");
      const onData = (chunk) => {
        data += chunk;
      };
      stdin.on("data", onData);
      return new Promise((resolve) => {
        stdin.once("end", () => {
          stdin.removeListener("data", onData);
          stdin.setEncoding(orgEncoding);
          resolve(data);
        });
      });
    }
  };
}
function defaultArgGetter() {
  return process.argv.slice(2);
}
function defaultLogger(type, message) {
  switch (type) {
    case "info":
      console.log(...message);
      break;
    case "error":
      console.error(...message);
      break;
    case "warning":
      console.warn(...message);
      break;
  }
}
var ClifyGlobals = class {
  static setArgGetter(arggetter) {
    this.argGetter = arggetter;
  }
  static setLogger(logger) {
    this.logger = logger;
  }
  static setStdinReader(getReader) {
    this.getStdinReader = getReader;
  }
  static getArgs() {
    return this.argGetter();
  }
  static err(...message) {
    this.logger("error", message);
  }
  static log(...message) {
    this.logger("info", message);
  }
  static warn(...message) {
    this.logger("warning", message);
  }
  static getStdin() {
    return this.getStdinReader();
  }
};
__publicField(ClifyGlobals, "getStdinReader", defaultStdinReader);
__publicField(ClifyGlobals, "argGetter", defaultArgGetter);
__publicField(ClifyGlobals, "logger", defaultLogger);
var Clify = ClifyGlobals;
export {
  Clify,
  ClifyGlobals
};
