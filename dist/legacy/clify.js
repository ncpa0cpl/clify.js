"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/clify.ts
var clify_exports = {};
__export(clify_exports, {
  Clify: () => Clify,
  ClifyGlobals: () => ClifyGlobals
});
module.exports = __toCommonJS(clify_exports);
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
    },
    getIterator() {
      let done = false;
      let onNextQueue = [];
      const chunks = [];
      const stdin = process.stdin;
      const onData = (chunk) => {
        const onNext = onNextQueue.shift();
        if (onNext) {
          onNext(chunk);
        } else {
          chunks.push(chunk);
        }
      };
      const onEnd = () => {
        done = true;
        stdin.removeListener("data", onData);
        onNextQueue.splice(0, onNextQueue.length).forEach((cb) => cb(chunks.shift()));
      };
      stdin.on("data", onData);
      stdin.once("end", onEnd);
      return {
        done() {
          return done && !chunks.length;
        },
        next() {
          if (chunks.length) {
            return Promise.resolve(chunks.shift());
          }
          if (done) {
            return Promise.resolve("done");
          }
          return new Promise((resolve) => {
            onNextQueue.push((nextChunk) => {
              if (nextChunk) {
                return resolve(nextChunk);
              }
              return resolve("done");
            });
          });
        }
      };
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
