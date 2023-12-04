const NUMBERS_MAPPING = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const NUMBERS_REVERSED_MAPPING = Object.fromEntries(
  Object.entries(NUMBERS_MAPPING).map(([k, v]) => [
    k.split("").reverse().join(""),
    v,
  ])
);

const WRITTEN_NUMBER_REGEX = new RegExp(Object.keys(NUMBERS_MAPPING).join("|"));
const WRITTEN_NUMBER_REVERSED_REGEX = new RegExp(
  Object.keys(NUMBERS_REVERSED_MAPPING).join("|")
);

export class Calibrator {
  #sum = 0;

  process(line) {
    let num1 = 0;
    let num2 = 0;

    const firstDigitIndex = line
      .split("")
      .findIndex((n) => !Number.isNaN(parseInt(n)));

    const lastDigitIndex = line
      .split("")
      .findLastIndex((n) => !Number.isNaN(parseInt(n)));

    const firstTextMatch = line.match(WRITTEN_NUMBER_REGEX);

    const lastTextMatch = line
      .split("")
      .reverse()
      .join("")
      .match(WRITTEN_NUMBER_REVERSED_REGEX);

    if (
      firstTextMatch &&
      firstTextMatch.index > -1 &&
      firstTextMatch.index < firstDigitIndex
    ) {
      num1 = NUMBERS_MAPPING[firstTextMatch.at(0)];
    } else {
      num1 = line[firstDigitIndex] ?? NUMBERS_MAPPING[firstTextMatch.at(0)];
    }

    if (lastTextMatch && line.length - lastTextMatch.index > lastDigitIndex) {
      num2 = NUMBERS_REVERSED_MAPPING[lastTextMatch.at(0)];
    } else {
      num2 =
        line[lastDigitIndex] ?? NUMBERS_REVERSED_MAPPING[lastTextMatch.at(0)];
    }

    this.#sum += parseInt(`${num1}${num2}`);
  }

  get code() {
    return this.#sum;
  }
}
