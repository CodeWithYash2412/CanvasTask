const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this.field = field;
    this.playerX = 0;
    this.playerY = 0;
    this.field[this.playerY][this.playerX] = pathCharacter; // Starting position
  }

  print() {
    this.field.forEach((row) => {
      console.log(row.join(""));
    });
  }

  movePlayer() {
    const direction = prompt(
      "Which way? (u = up, d = down, l = left, r = right): "
    );
    switch (direction) {
      case "u":
        this.playerY -= 1;
        break;
      case "d":
        this.playerY += 1;
        break;
      case "l":
        this.playerX -= 1;
        break;
      case "r":
        this.playerX += 1;
        break;
      default:
        console.log("Invalid input");
        return true; // Continue the game if input is invalid
    }

    // Check if the player is out of bounds
    if (
      this.playerY < 0 ||
      this.playerY >= this.field.length ||
      this.playerX < 0 ||
      this.playerX >= this.field[0].length
    ) {
      console.log("Out of bounds! Game over.");
      return false;
    }

    // Check if the player found the hat
    if (this.field[this.playerY][this.playerX] === hat) {
      console.log("You found your hat! You win!");
      return false;
    }

    // Check if the player fell into a hole
    if (this.field[this.playerY][this.playerX] === hole) {
      console.log("You fell into a hole! Game over.");
      return false;
    }

    // Update the field to mark the player's path
    this.field[this.playerY][this.playerX] = pathCharacter;
    return true;
  }

  runGame() {
    let playing = true;
    while (playing) {
      this.print();
      playing = this.movePlayer();
    }
  }
}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

myField.runGame();

