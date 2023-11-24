"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clify = exports.ClifyGlobals = void 0;
function defaultStdinReader() {
    return {
        read() {
            let data = "";
            const stdin = process.stdin;
            stdin.setEncoding("utf8");
            stdin.on("data", (chunk) => {
                data += chunk;
            });
            return new Promise((resolve) => {
                stdin.on("end", () => {
                    resolve(data);
                });
            });
        },
    };
}
class ClifyGlobals {
    static getStdinReader = defaultStdinReader;
    static arggetter = () => process.argv.slice(2);
    static logger = (type, message) => {
        if (type === "error") {
            console.error(message);
        }
        else {
            console.log(message);
        }
    };
    static setArgGetter(arggetter) {
        this.arggetter = arggetter;
    }
    static setLogger(logger) {
        this.logger = logger;
    }
    static setStdinReader(getReader) {
        this.getStdinReader = getReader;
    }
    static getArgs() {
        return this.arggetter();
    }
    static printError(message) {
        this.logger("error", message);
    }
    static printMessage(message) {
        this.logger("message", message);
    }
    static getStdin() {
        return this.getStdinReader();
    }
}
exports.ClifyGlobals = ClifyGlobals;
exports.Clify = ClifyGlobals;
