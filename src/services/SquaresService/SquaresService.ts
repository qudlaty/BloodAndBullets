import * as Helpers from "helpers";
import { Square } from "./SquareClass";
import { Entity, Position } from "services/EntitiesService";

class SquaresServiceClass {
  arenaSize: number = 10; // TODO: This should be defined ELSEWHERE

  squares: Square[] = [];

  constructor() {
    let i = this.arenaSize * this.arenaSize;
    while (i-- !== 0) {
      this.initializeSquareAtIndexIfEmpty(i);
    }
  }

  getSquareFromPosition(x: number, y: number): Square {
    return this.squares[this.getSquareIndexFromPosition(x, y)];
  }

  setSquareValueAtPosition(x: number, y: number, value): void {
    this.squares[this.getSquareIndexFromPosition(x, y)] = value;
  }

  getSquareIndexFromPosition(x: number, y: number): number {
    return y * this.arenaSize + x;
  }

  getSquarePositionFromIndex(squareIndex: number): Position {
    let x: number, y: number;
    y = Math.floor(squareIndex / this.arenaSize);
    x = squareIndex % this.arenaSize;
    return { x, y };
  }

  setEntityWithinApropriateSquare(entity: Entity): void {
    this.setEntityWithinASquareAtPosition(entity.position.x, entity.position.y, entity);
  }

  setEntityWithinASquareAtPosition(x: number, y: number, entity: Entity) {
    let squareIndex: number = this.getSquareIndexFromPosition(x, y);
    this.initializeSquareAtIndexIfEmpty(squareIndex);
    this.squares[squareIndex].entity = entity;
    if(!Array.isArray(this.squares[squareIndex].entities)){
      this.squares[squareIndex].entities = [];
    }
    this.squares[squareIndex].entities.push(entity);
  }

  addBloodToSquare(square: Square, amount: number) {
    if (!square.blood) {
      square.blood = amount;
    } else {
      square.blood += amount;
    }
  }

  markSquareAtIndexAsTargeted(squareIndex: number): void {
    Helpers.resetGivenFieldsOnACollection(this.squares, "isTargeted");
    this.initializeSquareAtIndexIfEmpty(squareIndex);
    this.squares[squareIndex].isTargeted = true;
  }

  markSquareAtIndexAsAttacked(squareIndex: number): void {
    Helpers.resetGivenFieldsOnACollection(this.squares, "isAttacked");
    this.initializeSquareAtIndexIfEmpty(squareIndex);
    this.squares[squareIndex].isAttacked = true;
  }

  markSquareAtIndexAsChosenDestination(squareIndex: number): void {
    Helpers.resetGivenFieldsOnACollection(this.squares, "isChosenDestination");
    this.initializeSquareAtIndexIfEmpty(squareIndex);
    this.squares[squareIndex].isChosenDestination = true;
  }


  initializeSquareAtIndexIfEmpty(squareIndex: number) {
    if (!this.squares[squareIndex]) {
      this.squares[squareIndex] = new Square();
    }
  }

  markAvailableDestinationsForSelectedEntity(entity: Entity): void {
    if (entity.active) {
      let { x, y } = entity.position;

      Helpers.resetGivenFieldsOnACollection(this.squares, "isAvailableDestination");

      for (let j = y - 1; j <= y + 1; j++) {
        if (j < 0 || j >= this.arenaSize) {
          continue;
        }
        for (let i = x - 1; i <= x + 1; i++) {
          if (i < 0 || i >= this.arenaSize || (i === x && j === y)) {
            continue;
          }

          let square: Square = this.getSquareFromPosition(i, j);
          if (this.isSquareEnterableByFriendlyUnits(square)) {
            square.isAvailableDestination = true;
          }

          this.setSquareValueAtPosition(i, j, square);
        }
      }
    }
  }

  isTargetSquareEnterable(targetSquare: Square): boolean {
    let unpassableEntitiesInThisSquare = targetSquare.entities && targetSquare.entities.filter(i =>{
      return !i.isPassable && i.isAlive;
    })
    return  !(unpassableEntitiesInThisSquare && unpassableEntitiesInThisSquare.length);
  }

  isSquareEnterableByFriendlyUnits = square => [
    'floor',
    'monster-filter',
  ].includes(square.squareType);

  lightAllSquares(): void {
    this.squares.forEach((square) => (square.isLit = true));
  }
  castLightsFromFriendlyEntity(entity: Entity): void {
    if (entity.isFriendly) {
      let { x, y } = entity.position;

      for (let j = y - 2; j <= y + 2; j++) {
        if (j < 0 || j >= this.arenaSize) {
          continue;
        }
        for (let i = x - 2; i <= x + 2; i++) {
          if (i < 0 || i >= this.arenaSize) {
            continue;
          }

          let square: Square = this.getSquareFromPosition(i, j);

          square.isInTwilightZone = true;
          this.setSquareValueAtPosition(i, j, square);
        }
      }

      for (let j = y - 1; j <= y + 1; j++) {
        if (j < 0 || j >= this.arenaSize) {
          continue;
        }
        for (let i = x - 1; i <= x + 1; i++) {
          if (i < 0 || i >= this.arenaSize) {
            continue;
          }

          let square: Square = this.getSquareFromPosition(i, j);

          square.isLit = true;
          this.setSquareValueAtPosition(i, j, square);
        }
      }
    }
  }
}

export const SquaresService = new SquaresServiceClass();
