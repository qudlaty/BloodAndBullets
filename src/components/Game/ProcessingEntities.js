import { getSquare, setEntityWithinASquare } from './ProcessingSquares';

const arenaSize = 10;

function getNumberWithinBoundaries(value, min, max) {
  if( value < min) value = min;
  if( value > max) value = max;
  return value;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export function moveEntityRandomly(squares, entity) {
  if(!entity.isBreathing) return;
  // modifies entity in-place
  let oldPositionX = entity.position.x;
  let oldPositionY = entity.position.y;

  entity.position.x = entity.position.x + getRandomIntInclusive(-1,1);
  entity.position.y = entity.position.y + getRandomIntInclusive(-1,1);

  entity.position.x = getNumberWithinBoundaries(entity.position.x, 0, arenaSize-1);
  entity.position.y = getNumberWithinBoundaries(entity.position.y, 0, arenaSize-1);

  let newSquare = getSquare(squares, entity.position.x, entity.position.y);

  if (newSquare && newSquare.entity) {
    entity.position.x = oldPositionX;
    entity.position.y = oldPositionY;
  }

  if(
    oldPositionX !== entity.position.x ||
    oldPositionY !== entity.position.y
  ) {
    console.log("MOVED");
    setEntityWithinASquare(squares, oldPositionX, oldPositionY, null);
  }

  // NO RETURN AS IT'S MODIFIED IN-PLACE return entity;
  // WHICH IS A BAD HABIT, BUT OH SO COMFY.
}
