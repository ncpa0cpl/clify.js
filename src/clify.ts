export type LogMessage = string | number | boolean | null | undefined;
export type LogType = "error" | "warning" | "info";
export type StdinIterator = {
  next(): Promise<Buffer | "done">;
  done(): boolean;
};
export type StdinReader = {
  /**
   * Reads the entire stdin in one go and returns it as a UTF-8 string.
   */
  read(): Promise<string>;
  /**
   * Returns an iterator that reads from stdin.
   */
  getIterator(): StdinIterator;
};
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
    getIterator() {
      let done = false;
      let onNextQueue: ((nextChunk?: Buffer) => void)[] = [];
      const chunks: Buffer[] = [];
      const stdin = process.stdin;

      const onData = (chunk: Buffer) => {
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
        onNextQueue
          .splice(0, onNextQueue.length)
          .forEach((cb) => cb(chunks.shift()));
      };

      stdin.on("data", onData);
      stdin.once("end", onEnd);

      return {
        done() {
          return done && !chunks.length;
        },
        next() {
          if (chunks.length) {
            return Promise.resolve(chunks.shift()!);
          }
          if (done) {
            return Promise.resolve("done");
          }
          return new Promise<Buffer | "done">((resolve) => {
            onNextQueue.push((nextChunk) => {
              if (nextChunk) {
                return resolve(nextChunk);
              }
              return resolve("done");
            });
          });
        },
      };
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
