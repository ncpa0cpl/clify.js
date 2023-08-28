import { Output } from "termx-markup";

function stdoutPrint(text: string) {
  process.stdout.write(text + "\n");
}

function stderrPrint(text: string) {
  process.stderr.write(text + "\n");
}

export class Out {
  private static stdout = new Output(stdoutPrint);
  private static stderr = new Output(stderrPrint);

  private static displayLogs = true;
  private static displayDebugs = true;
  private static displayErrors = true;
  private static displayWarnings = true;
  private static displayOutput = true;

  public static setLogLevel(
    shouldDisplay: Array<"log" | "err" | "warn" | "out" | "debug">,
  ) {
    this.displayLogs = shouldDisplay.includes("log");
    this.displayErrors = shouldDisplay.includes("err");
    this.displayWarnings = shouldDisplay.includes("warn");
    this.displayOutput = shouldDisplay.includes("out");
    this.displayDebugs = shouldDisplay.includes("debug");
  }

  public static log(...args: string[]) {
    if (this.displayLogs) {
      this.stdout.print(...args);
    }
  }

  public static err(...args: string[]) {
    if (this.displayErrors) {
      this.stderr.print(...args);
    }
  }

  public static warn(...args: string[]) {
    if (this.displayWarnings) {
      this.stderr.print(...args);
    }
  }

  public static out(...args: string[]) {
    if (this.displayOutput) {
      this.stdout.print(...args);
    }
  }

  public static debug(...args: string[]) {
    if (this.displayDebugs) {
      this.stdout.print(...args);
    }
  }
}
