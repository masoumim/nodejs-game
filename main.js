/*
Find the hat!
Type 'node main' in the terminal to start the game.
The objective is to navigate your character (*) to the hat (^).
Beware of holes (O) because if you touch one you will fall in.
The controls are: (l)eft, (r)ight, (u)p, (d)own.
*/

const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(gameBoard) {
    this._gameBoard = gameBoard;
    this._playerPositionRow = 0;
    this._playerPositionCol = 0;
    this._gameBoardRows = gameBoard.length;
    this._gameBoardCols = gameBoard[0].length;
  }

  // Prints out the game board
  print() {

    // Clear the board first
    process.stdout.write("\u001b[2J\u001b[0;0H");

    // Print game board
    for (let i = 0; i < this._gameBoard.length; i++) {
      console.log(this._gameBoard[i].join(''));
    }
  }

  get playerPositionRow() {
    return this._playerPositionRow;
  }

  get playerPositionCol() {
    return this._playerPositionCol;
  }

  get gameBoardCols() {
    return this._gameBoard[0].length;
  }

  get gameBoardRows() {
    return this._gameBoard.length;
  }


  // Updates the field
  updateGameBoard(row, col) {
    this._gameBoard[row][col] = pathCharacter;
  }

  // Movement
  moveDown() {
    this._playerPositionRow += 1;
  }

  moveUp() {
    this._playerPositionRow -= 1;
  }

  moveLeft() {
    this._playerPositionCol -= 1;
  }

  moveRight() {
    this._playerPositionCol += 1;
  }

  // Checks for existence of '^' in the game board
  checkHat() {
    for (let i = 0; i < this._gameBoard.length; i++) {
      for (let j = 0; j < this._gameBoard[i].length; j++) {
        if (this._gameBoard[i][j] === '^') {
          return true;
        }
      }
    }
    return false;
  }

  // Returns the number of holes on the gameboard
  holeCount() {
    let holes = 0;
    for (let i = 0; i < this._gameBoard.length; i++) {
      for (let j = 0; j < this._gameBoard[i].length; j++) {
        if (this._gameBoard[i][j] === 'O') {
          holes++;
        }
      }
    }
    return holes;
  }

  // Static method that will generate and return randomized field / gameboard
  static generateField(rows, cols) {
    let gameBoard = new Array(rows);

    for (let i = 0; i < rows; i++) {
      gameBoard[i] = new Array(cols);
      for (let j = 0; j < cols; j++) {
        // Randomize element (either hole or field)
        let element = Math.floor(Math.random() * 101);

        // 5% Chance of generating a hole
        if (element >= 95) {
          element = hole;
        }
        else {
          // 95% chance of generating field
          element = fieldCharacter;
        }
        gameBoard[i][j] = element;
      }
    }

    // Set a random element to be the hat
    let randRow = Math.floor(Math.random() * rows);
    let randCol = Math.floor(Math.random() * cols);
    gameBoard[randRow][randCol] = hat;

    // Set the fist element to be player
    gameBoard[0][0] = pathCharacter;

    return gameBoard;
  }
}

// GAME LOGIC

// Generate randomized field: Generate random value (3 to 15) for cols and rows to pass into the generateField method.
let randRow = Math.floor(Math.random() * 15) + 3;
let randCol = Math.floor(Math.random() * 15) + 3;
let generatedGameBoard = Field.generateField(randRow, randCol);

// Initialize new field object using generated field
const field = new Field(generatedGameBoard);

// Print the gameboard
field.print();

// START GAME LOOP HERE
let gameOver = false;
let startingHoles = field.holeCount();

while (!gameOver) {

  // Get user input
  let input = prompt('Which way would you like to move? ');

  // Move player:

  // DOWN
  if (input === 'd') {
    if (field.playerPositionRow < field.gameBoardRows - 1) {
      field.moveDown();
    }
    else {
      gameOver = true;
    }
  }
  // LEFT
  else if (input === 'l') {
    if (field.playerPositionCol > 0) {
      field.moveLeft();
    }
    else {
      gameOver = true;
    }
  }
  // RIGHT
  else if (input === 'r') {
    if (field.playerPositionCol < field.gameBoardCols - 1) {
      field.moveRight();
    }
    else {
      gameOver = true;
    }
  }
  // UP
  else if (input === 'u') {
    if (field.playerPositionRow > 0) {
      field.moveUp();
    }
    else {
      gameOver = true;
    }
  }

  // Update field
  field.updateGameBoard(field.playerPositionRow, field.playerPositionCol);

  // re-draw the field
  field.print();

  // Check hole count
  if (field.holeCount() < startingHoles) {
    console.log('You fell in a hole!');
    gameOver = true;
  }

  // Check victory
  let victory = field.checkHat()
  if (!victory) {
    console.log('You Win!');
    gameOver = true;
  }

  // END GAME LOOP
}

console.log('Game Over!');
