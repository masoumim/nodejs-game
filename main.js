const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(gameBoard){
    this._gameBoard = gameBoard;
    this._playerPositionRow = 0;
    this._playerPositionCol = 0;
  }

  // Prints out the game board
  print(){
  // Clear the board first
  process.stdout.write("\u001b[2J\u001b[0;0H");

  // Print game board
  for(let i = 0; i < this._gameBoard.length; i++){
    console.log(this._gameBoard[i].join(''));
  }
 }

get playerPositionRow(){
  return this._playerPositionRow;
}

get playerPositionCol(){
  return this._playerPositionCol;
}

  // Updates the field
   updateGameBoard(row, col){
    this._gameBoard[row][col] = pathCharacter;
  }


 moveDown(){
   console.log('move down called!');
   this._playerPositionRow += 1;
 }
}


const field = new Field([
  [pathCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter],
  [fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter],
  [fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter],
  [fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter],
  [fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter],
  [fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, hat]
  ]);

  field.print();

// START GAME LOOP HERE

// Get user input
let input = prompt('Which way would you like to move? ');

// Move player (use switch statement here)
if(input === 'd'){
  field.moveDown();
}

// Update field
field.updateGameBoard(field.playerPositionRow, field.playerPositionCol);

// re-draw the field
field.print();

// END GAME LOOP

console.log('hello');

// test change