import * as Helpers from '../helpers/Helpers';

const arenaSize = 10;

class SquaresServiceClass {

  squares

  getSquare (x, y) {
    return this.squares[this.targetSquareIndex(x, y, arenaSize)];
  }

  setSquare(x, y, value) {
    this.squares[this.targetSquareIndex(x, y)] = value;
  }

  targetSquareIndex(x, y) {
    return y * arenaSize + x;
  }

  targetSquarePosition(squareIndex) {
    let x,y;
    y = Math.floor(squareIndex / arenaSize);
    x = (squareIndex % arenaSize);
    return {x, y};
  }

  setEntityWithinApropriateSquare(entity) {
    this.setEntityWithinASquare(
      entity.position.x, entity.position.y, entity
    );
  }

  setEntityWithinASquare(x, y, entity) {
    let target = this.targetSquareIndex(x, y);
    if(!this.squares[target]) {
      this.squares[target] = {};
    }
    this.squares[target].entity = entity;
  }

  addBlood(square, amount) {
    if(!square) {square = {}};
    if(!square.blood) {
      square.blood = amount;
    } else {
      square.blood += amount;
    }
  }
  markSquareAsTargeted (squareIndex){
    Helpers.resetGivenFieldsOnACollection(this.squares, 'isTargeted');
    if(!this.squares[squareIndex]) {
      this.squares[squareIndex] = {};
    }
    this.squares[squareIndex].isTargeted = true;
  }
  markAvailableDestinationsForSelectedEntity(entity) {

    if(entity.active) {
      let {x,y} = entity.position;

      Helpers.resetGivenFieldsOnACollection(this.squares, 'isAvailableDestination');

      for(let j = y - 1; j <= y + 1; j++){
        if( j < 0 || j >= arenaSize){
          continue
        }
        for(let i = x - 1; i <= x + 1; i++){
          if( i < 0 || i >= arenaSize || (i === x && j === y)){
            continue
          }

          let square = this.getSquare(i, j );
          if(!square) {square={}}
          square.isAvailableDestination = true;
          this.setSquare(i, j, square);
        }
      }
    }
  }
}

let SquaresService = new SquaresServiceClass();
export default SquaresService;
