import * as Helpers from '../helpers/Helpers';
const arenaSize = 10;

export function getSquare (squares, x, y) {
  return squares[targetSquareIndex(x, y, arenaSize)];
}

export function setSquare(squares, x, y, value) {
  squares[targetSquareIndex(x, y)] = value;
}

export function targetSquareIndex(x, y) {
  return y * arenaSize + x;
}

export function targetSquarePosition(squareIndex) {
  let x,y;
	y = Math.floor(squareIndex / arenaSize);
	x = (squareIndex % arenaSize);
	return {x, y};
}

export function setEntityWithinASquare(squares, x, y, entity) {
  let target = targetSquareIndex(x, y);
  if(!squares[target]) {
    squares[target] = {};
  }
  squares[target].entity = entity;
}

export function addBlood(square, amount) {
  if(!square) {square = {}};
  if(!square.blood) {
    square.blood = amount;
  } else {
    square.blood += amount;
  }
}

export function markSquareAsTargeted (squares, squareIndex){
  if(!squares[squareIndex]) {
    squares[squareIndex] = {};
  }
  squares[squareIndex].isTargeted = true;
}

export function markAvailableDestinationsForSelectedEntity(entity, squares) {

  if(entity.active) {
    let {x,y} = entity.position;

    Helpers.resetGivenFieldsOnACollection(squares, 'isAvailableDestination');

    for(let j = y - 1; j <= y + 1; j++){
      if( j < 0 || j >= arenaSize){
        continue
      }
      for(let i = x - 1; i <= x + 1; i++){
        if( i < 0 || i >= arenaSize || (i === x && j === y)){
          continue
        }

        let square = this.getSquare(squares, i, j );
        if(!square) {square={}}
        square.isAvailableDestination = true;
        this.setSquare(squares, i, j, square);
      }
    }
  }
}
