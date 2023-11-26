# clify.js

## Basic Usage

```ts
#!/usr/bin/env node
import { Clify, configure } from 'clify.js';

const program = configure(program => {
    program.setVersion('1.0.0');
    program.setDescription('A simple cli program');
    program.setName('my-script');

    program.main((cmd) => {
        const input = cmd.input();

        return () => {
            Clify.log(`Input: <${input.get()}>`)
        };
    });
});

program.run();
```

Get help:

```sh
$ ./my-script --help
    Usage: my-script INPUT

    A simple cli program
```

Run it:

```sh
$ ./my-script "command input string"
    Input: <command input string>
```
    
## Options

Create Option definition:

```ts
import { defineOption } from 'clify.js';

const OutfileOption = defineOption({
    name: 'outfile',
    char: 'o',
    description: 'Path to the output file',
    type: 'string',
    required: true,
});
```

Use it in the program:

```ts
const program = configure(program => {
    program.setVersion('1.0.0');
    program.setDescription('A simple cli program');
    program.setName('my-script');

    program.main((cmd) => {
        const outfile = cmd.option(OutfileOption);

        return () => {
            Clify.log(`Outfile: <${outfile.value}>`)
        };
    });
});
```

Get help:

```sh
$ ./my-script --help
    Usage: my-script INPUT [...OPTIONS]

    A simple cli program

    Options:
        -o, --outfile <string>    Path to the output file
```

Run it:

```sh
$ ./my-script --outfile output.txt
    Outfile: <output.txt>
```

## Commands

```ts
import { configure, defineOption } from 'clify.js';

const QuietOption = defineOption({
    name: 'quiet',
    char: 'q',
    description: 'Do not output anything',
    type: 'boolean',
    default: false,
});

const program = configure(program => {
    program.setVersion('1.0.0');
    program.setDescription('A simple cli program');
    program.setName('my-script');

    program.command('cmd', (cmd) => {
        const input = cmd.input();
        const quiet = cmd.option(QuietOption);

        return () => {
            if (!quiet.value) {
                Clify.log(`Input: <${input.get()}>`)
            }
        };
    });
});
```

Get help:

```sh
$ ./my-script --help
    Usage: my-script COMMAND

    A simple cli program

    Commands:
        cmd

$ ./my-script cmd --help
    Usage: my-script cmd [...OPTIONS]

    Options:
        --quiet, -q    Do not output anything
```

Run it:

```sh
$ ./my-script cmd "command input string"
    Input: <command input string>
```

```sh
$ ./my-script cmd --quiet "command input string"
```

## Nested Commands

```ts
import { configure } from 'clify.js';

const program = configure(program => {
    program.setVersion('1.0.0');
    program.setDescription('A simple cli program');
    program.setName('my-script');

    const cmd = program.command('cmd', (cmd) => {
        return () => {}
    });

    cmd.command('foo', (cmd) => {
        return () => {
            Clify.log('Hi from foo!');
        }
    });
});
```

Get help:

```sh
$ ./my-script --help
    Usage: my-script COMMAND

    A simple cli program

    Commands:
        cmd
$ ./my-script cmd --help
    Usage: my-script cmd COMMAND

    Commands:
        foo
$ ./my-script cmd foo --help
    Usage: my-script cmd foo
```

Run it:

```sh
$ ./my-script cmd foo
    Hi from foo!
```