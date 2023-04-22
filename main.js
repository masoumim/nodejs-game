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
  // process.stdout.write("\u001b[2J\u001b[0;0H");

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

get gameBoardCols(){
  return this._gameBoard[0].length;
}

get gameBoardRows(){
  return this._gameBoard.length;
}


// Updates the field
updateGameBoard(row, col){
  this._gameBoard[row][col] = pathCharacter;
}

  // Movement
 moveDown(){ 
  this._playerPositionRow += 1;
 }

 moveUp(){
  this._playerPositionRow -= 1;
  }

 moveLeft(){
  this._playerPositionCol -= 1;
 }

 moveRight(){
  this._playerPositionCol += 1;
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
let gameOver = false;

while(!gameOver){
// Get user input
let input = prompt('Which way would you like to move? ');

// Move player (use switch statement here later):

// DOWN
if(input === 'd'){
  if(field.playerPositionRow < field.gameBoardRows - 1){
    field.moveDown();
  }
  else{
    gameOver = true;
  }  
}
// LEFT
else if(input === 'l'){
  if(field.playerPositionCol > 0){
    field.moveLeft();
  }
  else{
    gameOver = true;
  }
}
// RIGHT
else if(input === 'r'){
  if(field.playerPositionCol < field.gameBoardCols - 1){
    field.moveRight();
  }
  else{
    gameOver = true;
  }
}
// UP
else if(input === 'u'){
  if(field.playerPositionRow > 0){
    field.moveUp();
  }
  else{
    gameOver = true;
  }
}

// Update field
field.updateGameBoard(field.playerPositionRow, field.playerPositionCol);

// re-draw the field
field.print();

// END GAME LOOP
}

console.log('Game Over!');
