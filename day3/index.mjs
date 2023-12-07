import { readFileSync } from "node:fs";

const filepath = process.argv[2];

if (!filepath) {
  console.log("Please provide a filepath");
  process.exit(1);
}

const raw = readFileSync(filepath, "utf-8");
const content = raw.split("\n").map((x) => x.trim().split(""));

const DIR_VECTORS = [
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [0, -1],
  [-1, -1],
  [-1, 0],
];

function get(i, j, [y, x]) {
  return content[i + y]?.[j + x];
}

function isCharNumber(char) {
  return !Number.isNaN(parseInt(char));
}

function s1() {
  let sum = 0;

  for (let y = 0; y < content.length; ++y) {
    const row = content[y];

    let isNumber = false;
    let isValid = false;
    let currentNumber = "";

    for (let x = 0; x < row.length; ++x) {
      isNumber = isCharNumber(row[x]);

      if (!isNumber && isValid) {
        sum += parseInt(currentNumber);
      }

      if (!isNumber) {
        currentNumber = "";
        isValid = false;
      }

      if (isNumber && !isValid) {
        isValid = DIR_VECTORS.some(([dy, dx]) => {
          const char = get(y, x, [dy, dx]);
          const isSymbol =
            char !== "." && !isCharNumber(char) && char !== undefined;
          return isSymbol;
        });
      }

      if (isNumber) {
        currentNumber += row[x];
      }
    }

    if (isNumber && isValid) {
      sum += parseInt(currentNumber);
    }
  }

  return sum;
}

function s2() {
  return content
    .map((row, y) =>
      row.reduce((sum, char, x) => {
        if (char !== "*") {
          return sum;
        }

        const pairs = new Set();
        DIR_VECTORS.forEach(([dy, dx]) => {
          const c = get(y, x, [dy, dx]);

          if (isCharNumber(c)) {
            let currentNumber = c;

            let ipos = 1;
            while (isCharNumber(get(y, x, [dy, dx + ipos]))) {
              currentNumber = currentNumber + get(y, x, [dy, dx + ipos]);
              ipos++;
            }

            let ineg = -1;
            while (isCharNumber(get(y, x, [dy, dx + ineg]))) {
              currentNumber = get(y, x, [dy, dx + ineg]) + currentNumber;
              ineg--;
            }

            pairs.add(
              `x: ${x + dx + ineg + 1} - ${x + dx + ipos + 1}, y: ${
                y + dy
              } @ ${currentNumber}`
            );
          }
        });

        if (pairs.size === 2) {
          const [a, b] = pairs;
          sum += a.split(" @ ").at(1) * b.split(" @ ").at(1);
        }

        return sum;
      }, 0)
    )
    .reduce((a, b) => a + b);
}

console.log("Part 1:", s1());
console.log("Part 2:", s2());
