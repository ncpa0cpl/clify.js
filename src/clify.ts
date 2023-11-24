export type LogMessage = string | number | boolean | null | undefined;
export type LogType = "error" | "warning" | "info";
export type StdinReader = { read(): Promise<string> };
export type Logger = (type: LogType, message: LogMessage[]) => void;

export interface Clify {
  setArgGetter(arggetter: () => string[]): void;
  setLogger(logger: Logger): void;
  setStdinReader(getReader: () => StdinReader): void;
  log(...message: LogMessage[]): void;
  err(...message: LogMessage[]): void;
  warn(...message: LogMessage[]): void;
}

function defaultStdinReader(): StdinReader {
  return {
    read() {
      let data = "";
      const stdin = process.stdin;
      const orgEncoding = stdin.readableEncoding ?? undefined;
      stdin.setEncoding("utf8");
      const onData = (chunk: Buffer) => {
        data += chunk;
      };
      stdin.on("data", onData);
      return new Promise<string>((resolve) => {
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

function defaultLogger(type: LogType, message: LogMessage[]) {
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

export class ClifyGlobals {
  protected static getStdinReader = defaultStdinReader;
  protected static argGetter = defaultArgGetter;
  protected static logger = defaultLogger;

  static setArgGetter(arggetter: () => string[]) {
    this.argGetter = arggetter;
  }

  static setLogger(logger: (type: LogType, message: LogMessage[]) => void) {
    this.logger = logger;
  }

  static setStdinReader(getReader: () => StdinReader) {
    this.getStdinReader = getReader;
  }

  static getArgs() {
    return this.argGetter();
  }

  static err(...message: LogMessage[]) {
    this.logger("error", message);
  }

  static log(...message: LogMessage[]) {
    this.logger("info", message);
  }

  static warn(...message: LogMessage[]) {
    this.logger("warning", message);
  }

  static getStdin(): StdinReader {
    return this.getStdinReader();
  }
}

export const Clify: Clify = ClifyGlobals;
