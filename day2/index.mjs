import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { SolverOne, SolverTwo } from "./solver.mjs";

const filepath = process.argv[2];

if (!filepath) {
  console.log("Please provide a filepath");
  process.exit(1);
}

const rl = createInterface({
  input: createReadStream(filepath),
  crlfDelay: Infinity,
});

const s = new SolverTwo();

rl.on("line", s.process.bind(s));
rl.on("close", () => {
  console.log("Sum:", s.sum);
});
