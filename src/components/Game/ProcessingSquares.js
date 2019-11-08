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
