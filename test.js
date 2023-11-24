const minimist = require("minimist");

const parsedArgs = minimist(process.argv.slice(2));

// console.log(JSON.stringify(parsedArgs, null, 2));

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

const reader = defaultStdinReader();

reader.read().then((inp) => console.log("input:", inp));
