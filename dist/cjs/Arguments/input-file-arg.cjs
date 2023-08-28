"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Arguments/input-file-arg.ts
var input_file_arg_exports = {};
__export(input_file_arg_exports, {
  BaseInputFileArg: () => BaseInputFileArg,
  InputFileArg: () => InputFileArg,
  InputFileHandleArg: () => InputFileHandleArg
});
module.exports = __toCommonJS(input_file_arg_exports);
var import_fs = __toESM(require("fs"));
var import_argument_parser = require("./argument-parser.cjs");
var BaseInputFileArg = class {
  constructor() {
    this._isSet = false;
    import_argument_parser.Arguments.registerFileInputArg(this);
  }
  static setArgumentValue(arg, filepath) {
    return arg.setTo(filepath);
  }
  setTo(filepath) {
    this.filepath = filepath;
    this._isSet = true;
  }
};
var InputFileArg = class _InputFileArg extends BaseInputFileArg {
  constructor(encoding, autoload = true) {
    super();
    this.encoding = encoding;
    this.autoload = autoload;
    _InputFileArg.instance = this;
  }
  setTo(filepath) {
    this.filepath = filepath;
    this._isSet = true;
    if (this.autoload) {
      this.load();
    }
  }
  load() {
    this._value = import_fs.default.readFileSync(
      this.filepath,
      this.encoding
    );
  }
  static access() {
    return this.instance;
  }
  get value() {
    return this._value;
  }
  get isSet() {
    return this._isSet;
  }
};
var InputFileHandleArg = class _InputFileHandleArg extends BaseInputFileArg {
  constructor(mode, autoload = true) {
    super();
    this.mode = mode;
    this.autoload = autoload;
    _InputFileHandleArg.instance = this;
  }
  async setTo(filepath) {
    this.filepath = filepath;
    this._isSet = true;
    if (this.autoload) {
      await this.load();
    }
  }
  async load() {
    this._value = await import_fs.default.promises.open(this.filepath, this.mode);
  }
  static access() {
    return this.instance;
  }
  get value() {
    return this._value;
  }
  get isSet() {
    return this._isSet;
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL0FyZ3VtZW50cy9pbnB1dC1maWxlLWFyZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgQXJndW1lbnRzIH0gZnJvbSBcIi4vYXJndW1lbnQtcGFyc2VyXCI7XG5cbmV4cG9ydCBjbGFzcyBCYXNlSW5wdXRGaWxlQXJnIHtcbiAgc3RhdGljIHNldEFyZ3VtZW50VmFsdWUoXG4gICAgYXJnOiBCYXNlSW5wdXRGaWxlQXJnLFxuICAgIGZpbGVwYXRoOiBzdHJpbmcsXG4gICk6IHZvaWQgfCBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gYXJnLnNldFRvKGZpbGVwYXRoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBmaWxlcGF0aCE6IHN0cmluZztcbiAgcHJvdGVjdGVkIF92YWx1ZSE6IGFueTtcbiAgcHJvdGVjdGVkIF9pc1NldDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIEFyZ3VtZW50cy5yZWdpc3RlckZpbGVJbnB1dEFyZyh0aGlzKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRUbyhmaWxlcGF0aDogc3RyaW5nKTogdm9pZCB8IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuZmlsZXBhdGggPSBmaWxlcGF0aDtcbiAgICB0aGlzLl9pc1NldCA9IHRydWU7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIElucHV0RmlsZUFyZzxcbiAgRSBleHRlbmRzIFwidXRmOFwiIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkLFxuPiBleHRlbmRzIEJhc2VJbnB1dEZpbGVBcmcge1xuICBzdGF0aWMgaW5zdGFuY2U/OiBJbnB1dEZpbGVBcmc8YW55PjtcbiAgcHJvdGVjdGVkIF92YWx1ZSE6IEUgZXh0ZW5kcyBcInV0ZjhcIiA/IHN0cmluZyA6IEJ1ZmZlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVuY29kaW5nPzogRSxcbiAgICBwcml2YXRlIGF1dG9sb2FkOiBib29sZWFuID0gdHJ1ZSxcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICBJbnB1dEZpbGVBcmcuaW5zdGFuY2UgPSB0aGlzO1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHNldFRvKGZpbGVwYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLmZpbGVwYXRoID0gZmlsZXBhdGg7XG4gICAgdGhpcy5faXNTZXQgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMuYXV0b2xvYWQpIHtcbiAgICAgIHRoaXMubG9hZCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbG9hZCgpIHtcbiAgICB0aGlzLl92YWx1ZSA9IGZzLnJlYWRGaWxlU3luYyhcbiAgICAgIHRoaXMuZmlsZXBhdGgsXG4gICAgICB0aGlzLmVuY29kaW5nLFxuICAgICkgYXMgYW55O1xuICB9XG5cbiAgc3RhdGljIGFjY2VzczxFIGV4dGVuZHMgXCJ1dGY4XCIgfCB1bmRlZmluZWQ+KFxuICAgIHRoaXM6IHR5cGVvZiBJbnB1dEZpbGVBcmc8RT4sXG4gICk6IElucHV0RmlsZUFyZzxFPiB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2UgYXMgYW55O1xuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IChFIGV4dGVuZHMgXCJ1dGY4XCIgPyBzdHJpbmcgOiBCdWZmZXIpIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBnZXQgaXNTZXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU2V0O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnB1dEZpbGVIYW5kbGVBcmcgZXh0ZW5kcyBCYXNlSW5wdXRGaWxlQXJnIHtcbiAgc3RhdGljIGluc3RhbmNlPzogSW5wdXRGaWxlSGFuZGxlQXJnO1xuICBwcm90ZWN0ZWQgX3ZhbHVlITogZnMucHJvbWlzZXMuRmlsZUhhbmRsZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG1vZGU/OiBmcy5Nb2RlIHwgdW5kZWZpbmVkLFxuICAgIHByaXZhdGUgYXV0b2xvYWQ6IGJvb2xlYW4gPSB0cnVlLFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIElucHV0RmlsZUhhbmRsZUFyZy5pbnN0YW5jZSA9IHRoaXM7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYXN5bmMgc2V0VG8oZmlsZXBhdGg6IHN0cmluZykge1xuICAgIHRoaXMuZmlsZXBhdGggPSBmaWxlcGF0aDtcbiAgICB0aGlzLl9pc1NldCA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5hdXRvbG9hZCkge1xuICAgICAgYXdhaXQgdGhpcy5sb2FkKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBsb2FkKCkge1xuICAgIHRoaXMuX3ZhbHVlID0gYXdhaXQgZnMucHJvbWlzZXMub3Blbih0aGlzLmZpbGVwYXRoLCB0aGlzLm1vZGUpO1xuICB9XG5cbiAgc3RhdGljIGFjY2VzczxFIGV4dGVuZHMgXCJ1dGY4XCIgfCB1bmRlZmluZWQ+KFxuICAgIHRoaXM6IHR5cGVvZiBJbnB1dEZpbGVBcmc8RT4sXG4gICk6IElucHV0RmlsZUFyZzxFPiB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2UgYXMgYW55O1xuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IGZzLnByb21pc2VzLkZpbGVIYW5kbGUgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIGdldCBpc1NldCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNTZXQ7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBQWU7QUFDZiw2QkFBMEI7QUFFbkIsSUFBTSxtQkFBTixNQUF1QjtBQUFBLEVBWTVCLGNBQWM7QUFGZCxTQUFVLFNBQWtCO0FBRzFCLHFDQUFVLHFCQUFxQixJQUFJO0FBQUEsRUFDckM7QUFBQSxFQWJBLE9BQU8saUJBQ0wsS0FDQSxVQUNzQjtBQUN0QixXQUFPLElBQUksTUFBTSxRQUFRO0FBQUEsRUFDM0I7QUFBQSxFQVVVLE1BQU0sVUFBd0M7QUFDdEQsU0FBSyxXQUFXO0FBQ2hCLFNBQUssU0FBUztBQUFBLEVBQ2hCO0FBQ0Y7QUFFTyxJQUFNLGVBQU4sTUFBTSxzQkFFSCxpQkFBaUI7QUFBQSxFQUl6QixZQUNVLFVBQ0EsV0FBb0IsTUFDNUI7QUFDQSxVQUFNO0FBSEU7QUFDQTtBQUdSLGtCQUFhLFdBQVc7QUFBQSxFQUMxQjtBQUFBLEVBRW1CLE1BQU0sVUFBa0I7QUFDekMsU0FBSyxXQUFXO0FBQ2hCLFNBQUssU0FBUztBQUVkLFFBQUksS0FBSyxVQUFVO0FBQ2pCLFdBQUssS0FBSztBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQUEsRUFFUSxPQUFPO0FBQ2IsU0FBSyxTQUFTLFVBQUFBLFFBQUc7QUFBQSxNQUNmLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUFBLEVBRUEsT0FBTyxTQUVZO0FBQ2pCLFdBQU8sS0FBSztBQUFBLEVBQ2Q7QUFBQSxFQUVBLElBQUksUUFBMEQ7QUFDNUQsV0FBTyxLQUFLO0FBQUEsRUFDZDtBQUFBLEVBRUEsSUFBSSxRQUFpQjtBQUNuQixXQUFPLEtBQUs7QUFBQSxFQUNkO0FBQ0Y7QUFFTyxJQUFNLHFCQUFOLE1BQU0sNEJBQTJCLGlCQUFpQjtBQUFBLEVBSXZELFlBQ1UsTUFDQSxXQUFvQixNQUM1QjtBQUNBLFVBQU07QUFIRTtBQUNBO0FBR1Isd0JBQW1CLFdBQVc7QUFBQSxFQUNoQztBQUFBLEVBRUEsTUFBeUIsTUFBTSxVQUFrQjtBQUMvQyxTQUFLLFdBQVc7QUFDaEIsU0FBSyxTQUFTO0FBRWQsUUFBSSxLQUFLLFVBQVU7QUFDakIsWUFBTSxLQUFLLEtBQUs7QUFBQSxJQUNsQjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLE1BQWMsT0FBTztBQUNuQixTQUFLLFNBQVMsTUFBTSxVQUFBQSxRQUFHLFNBQVMsS0FBSyxLQUFLLFVBQVUsS0FBSyxJQUFJO0FBQUEsRUFDL0Q7QUFBQSxFQUVBLE9BQU8sU0FFWTtBQUNqQixXQUFPLEtBQUs7QUFBQSxFQUNkO0FBQUEsRUFFQSxJQUFJLFFBQTRDO0FBQzlDLFdBQU8sS0FBSztBQUFBLEVBQ2Q7QUFBQSxFQUVBLElBQUksUUFBaUI7QUFDbkIsV0FBTyxLQUFLO0FBQUEsRUFDZDtBQUNGOyIsCiAgIm5hbWVzIjogWyJmcyJdCn0K
