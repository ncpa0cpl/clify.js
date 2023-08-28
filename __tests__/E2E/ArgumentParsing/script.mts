import {
  Argument,
  InputFileArg,
  InputFileHandleArg,
  Out,
  Type,
  configure,
  html,
} from "../../../src/index";

const StrArg = Argument.define({
  arg: "-f",
  fullArg: "--foo",
  description: "This is an argument FOO",
  dataType: Type.String,
});

const NumArg = Argument.define({
  arg: "-b",
  fullArg: "--bar",
  description: "This is an argument BAR",
  dataType: Type.Number,
});

const BoolArg = Argument.define({
  arg: "-z",
  fullArg: "--baz",
  description: "This is an argument BAZ",
  dataType: Type.Boolean,
});

const InvertBoolArg = Argument.define({
  arg: "-q",
  fullArg: "--qux",
  description: "This is an argument QUX",
  dataType: Type.Boolean,
  boolInvert: true,
});

const ReqStrArg = Argument.define({
  arg: "-f",
  fullArg: "--foo",
  description: "This is a required argument",
  dataType: Type.String,
  require: true,
});

const ReqNumArg = Argument.define({
  arg: "-b",
  fullArg: "--bar",
  description: "This is a required argument",
  dataType: Type.Number,
  require: true,
});

const ReqBoolArg = Argument.define({
  arg: "-z",
  fullArg: "--baz",
  description: "This is a required argument",
  dataType: Type.Boolean,
  require: true,
});

const ArrayArg = Argument.define({
  arg: "-a",
  fullArg: "--array",
  description: "This is an array argument",
  dataType: Type.ArrayOf(Type.String),
});

const UnionArrayArg = Argument.define({
  arg: "-n",
  fullArg: "--union-array",
  description: "This is a union array argument",
  dataType: Type.ArrayOf(Type.String, Type.Boolean),
});

const UnionArg = Argument.define({
  arg: "-u",
  fullArg: "--union",
  description: "This is a union argument",
  dataType: Type.OneOf(Type.String, Type.Number),
});

const LiteralArg = Argument.define({
  arg: "-l",
  fullArg: "--literal",
  description: "This is a literal argument",
  dataType: Type.OneOf(
    Type.Literal("foo"),
    Type.Literal("bar"),
    Type.Literal(0),
    Type.Literal(true),
  ),
});

configure((main) => {
  main.addSubCommand("test-non-required", () => {
    const s = new StrArg();
    const n = new NumArg();
    const b = new BoolArg();

    return {
      run() {
        Out.out(html`
          <line>String: ${String(s.value)}</line>
          <line>Number: ${String(n.value)}</line>
          <line>Boolean: ${String(b.value)}</line>
        `);
      },
    };
  });

  main.addSubCommand("test-required", () => {
    const s = new ReqStrArg();
    const n = new ReqNumArg();
    const b = new ReqBoolArg();

    return {
      run() {
        Out.out(html`
          <line>String: ${s.value}</line>
          <line>Number: ${n.value}</line>
          <line>Boolean: ${b.value}</line>
        `);
      },
    };
  });

  main.addSubCommand("test-bool", () => {
    const b = new BoolArg();

    return {
      run() {
        Out.out(html`
          <line>Boolean: ${b.value} (${typeof b.value})</line>
        `);
      },
    };
  });

  main.addSubCommand("test-invert-bool", () => {
    const b = new InvertBoolArg();

    return {
      run() {
        Out.out(html`
          <line>Boolean: ${b.value} (${typeof b.value})</line>
        `);
      },
    };
  });

  main.addSubCommand("test-num", () => {
    const b = new NumArg();

    return {
      run() {
        Out.out(html`
          <line>Number: ${b.value} (${typeof b.value})</line>
        `);
      },
    };
  });

  main.addSubCommand("test-array", () => {
    const a = new ArrayArg();

    return {
      run() {
        console.log(
          `Array: ${a.value
            ?.map((elem) => `${elem} (${typeof elem})`)
            .join(", ")}`,
        );
      },
    };
  });

  main.addSubCommand("test-union-array", () => {
    const a = new UnionArrayArg();

    return {
      run() {
        Out.out(html`
          <line>
            Array:
            ${a.value
              ?.map((elem) => `${elem} (${typeof elem})`)
              .join(", ")}
          </line>
        `);
      },
    };
  });

  main.addSubCommand("test-union", () => {
    const u = new UnionArg();

    return {
      run() {
        Out.out(html`
          <line>Union: ${u.value} (${typeof u.value})</line>
        `);
      },
    };
  });

  main.addSubCommand("test-literal", () => {
    const l = new LiteralArg();

    return {
      run() {
        Out.out(html`
          <line>Literal: ${l.value} (${typeof l.value})</line>
        `);
      },
    };
  });

  main.addSubCommand("test-file", () => {
    const f = new InputFileArg("utf8");

    return {
      run() {
        Out.out(html`
          <line
            >File:
            <pre>${String(f.value)}</pre>
          </line>
        `);
      },
    };
  });

  main.addSubCommand("test-file-with-flag", () => {
    const bool = new ReqBoolArg();
    const f = new InputFileArg("utf8");

    return {
      run() {
        Out.out(html`
          <line>Boolean: ${bool.value}</line>
          <line
            >File:
            <pre>${String(f.value)}</pre>
          </line>
        `);
      },
    };
  });

  main.addSubCommand("test-file-handle", () => {
    const f = new InputFileHandleArg();

    return {
      async run() {
        const lines: string[] = [];

        for await (const line of f.value!.readLines({
          encoding: "utf-8",
        })) {
          lines.push(line);
        }

        Out.out(html`
          <line>
            File:
            <pre>${String(lines.join("\n"))}</pre>
          </line>
        `);
      },
    };
  });

  main.addSubCommand("test-file-handle-with-flag", () => {
    const bool = new ReqBoolArg();
    const f = new InputFileHandleArg();

    return {
      async run() {
        const lines: string[] = [];

        for await (const line of f.value!.readLines({
          encoding: "utf-8",
        })) {
          lines.push(line);
        }

        Out.out(html`
          <line>Boolean: ${bool.value}</line>
          <line>
            File:
            <pre>${String(lines.join("\n"))}</pre>
          </line>
        `);
      },
    };
  });
});
