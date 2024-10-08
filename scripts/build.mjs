import { build } from "@ncpa0cpl/nodepack";
import path from "path";
import { fileURLToPath, URL } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const p = (arg) => path.resolve(__dirname, "..", arg);

async function main() {
  try {
    await build({
      srcDir: p("src"),
      outDir: p("dist"),
      tsConfig: p("tsconfig.json"),
      formats: ["cjs", "esm", "legacy"],
      target: "es2020",
      declarations: true,
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
