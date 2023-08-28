export class ClifyError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "ClifyError";
  }
}

export class InitError extends ClifyError {
  constructor() {
    super("Script Initialization Error");
    this.name = "InitError";
  }
}

export class ExitError extends Error {
  constructor(
    public readonly code: number,
    msg: string,
  ) {
    super(msg);
    this.name = "ExitError";
  }
}
