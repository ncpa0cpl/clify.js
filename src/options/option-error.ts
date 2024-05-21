export class OptionError extends Error {
  protected customMessage?: string;

  constructor(msg: string, protected optionName: string) {
    super(msg);
  }

  toPrintable(): string {
    return `${this.customMessage ?? this.message}: ${this.optionName}`;
  }
}

export class InvalidOptionError extends OptionError {
  constructor(
    optName: string,
    protected received: string,
    protected expected?: string,
    protected customMessage?: string
  ) {
    super(
      expected
        ? `Invalid option, expected '${expected}', but received '${received}'`
        : "Invalid option",
      optName
    );
    this.name = "InvalidOptionError";
  }
}

export class UnspecifiedOptionError extends OptionError {
  constructor(protected optionName: string) {
    super(`Unspecified option`, optionName);
    this.name = "UnspecifiedOptionError";
  }
}
