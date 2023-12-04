const MAX_CUBES = {
  red: 12,
  green: 13,
  blue: 14,
};

export class SolverOne {
  sum = 0;

  process(line) {
    const cubes = {
      blue: 0,
      red: 0,
      green: 0,
    };

    const [gameName, gameInfo] = line.split(": ");

    gameInfo.split("; ").forEach((draw) => {
      draw.split(", ").forEach((x) => {
        const [num, color] = x.split(" ");
        if (parseInt(num) > cubes[color]) {
          cubes[color] = parseInt(num);
        }
      });
    });

    if (
      cubes.red <= MAX_CUBES.red &&
      cubes.green <= MAX_CUBES.green &&
      cubes.blue <= MAX_CUBES.blue
    ) {
      this.sum += parseInt(gameName.split(" ")[1]);
    }
  }
}

export class SolverTwo {
  sum = 0;

  process(line) {
    const cubes = {
      blue: 0,
      red: 0,
      green: 0,
    };

    const [_, gameInfo] = line.split(": ");

    gameInfo.split("; ").forEach((draw) => {
      draw.split(", ").forEach((x) => {
        const [num, color] = x.split(" ");
        if (parseInt(num) > cubes[color]) {
          cubes[color] = parseInt(num);
        }
      });
    });

    this.sum += cubes.red * cubes.green * cubes.blue;
  }
}
