"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clify = exports.ClifyGlobals = void 0;
function defaultStdinReader() {
    return {
        read() {
            let data = "";
            const stdin = process.stdin;
            const orgEncoding = stdin.readableEncoding ?? undefined;
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
class ClifyGlobals {
    static getStdinReader = defaultStdinReader;
    static argGetter = defaultArgGetter;
    static logger = defaultLogger;
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
}
exports.ClifyGlobals = ClifyGlobals;
exports.Clify = ClifyGlobals;
