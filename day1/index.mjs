import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { Calibrator } from "./calibrator.mjs";

const filepath = process.argv[2];

if (!filepath) {
  console.log("Please provide a filepath");
  process.exit(1);
}

const rl = createInterface({
  input: createReadStream(filepath),
  crlfDelay: Infinity,
});

const c = new Calibrator();

rl.on("line", c.process.bind(c));
rl.on("close", () => {
  console.log("Sum:", c.code);
});
