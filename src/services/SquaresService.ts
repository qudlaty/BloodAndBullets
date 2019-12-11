import * as Helpers from '../helpers/Helpers';
import { Entity, Position } from './EntitiesValues';

const arenaSize: number = 10;

export interface Square {
  entity?: Entity
  isChosenDestination?: boolean
  isAvailableDestination?: boolean
  isTargeted?: boolean
  blood?: number
}

class SquaresServiceClass {

  squares: Square[]

  getSquare(x: number, y: number): Square {
    return this.squares[this.targetSquareIndex(x, y)];
  }

  setSquare(x: number, y: number, value): void {
    this.squares[this.targetSquareIndex(x, y)] = value;
  }

  targetSquareIndex(x: number, y:number): number {
    return y * arenaSize + x;
  }

  targetSquarePosition(squareIndex: number): Position {
    let x: number,y: number;
    y = Math.floor(squareIndex / arenaSize);
    x = (squareIndex % arenaSize);
    return {x, y};
  }

  setEntityWithinApropriateSquare(entity: Entity): void {
    this.setEntityWithinASquare(
      entity.position.x, entity.position.y, entity
    );
  }

  setEntityWithinASquare(x: number, y: number, entity: Entity) {
    let target: number = this.targetSquareIndex(x, y);
    if(!this.squares[target]) {
      this.squares[target] = {};
    }
    this.squares[target].entity = entity;
  }

  addBlood(square: Square, amount: number) {
    if(!square) {square = {}};
    if(!square.blood) {
      square.blood = amount;
    } else {
      square.blood += amount;
    }
  }
  markSquareAsTargeted(squareIndex: number): void{
    Helpers.resetGivenFieldsOnACollection(this.squares, 'isTargeted');

    //TODO: Move initialization of a square into a method
    if(!this.squares[squareIndex]) {
      this.squares[squareIndex] = {};
    }
    this.squares[squareIndex].isTargeted = true;
  }

  markAvailableDestinationsForSelectedEntity(entity: Entity): void {
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

          let square: Square = this.getSquare(i, j);
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
