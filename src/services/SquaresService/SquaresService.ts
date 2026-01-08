import * as Helpers from "helpers";
import { Square } from "./SquareClass";
import { Entity, Position } from "services/EntitiesService";
import { MessageLevel, MessageService } from "services/MessageService";

class SquaresServiceClass {
  arenaSizeX: number = 10;
  arenaSizeY: number = 10;

  squares: Square[] = [];

  constructor() {
    let i = this.arenaSizeX * this.arenaSizeY;
    while (i-- !== 0) {
      this.initializeSquareAtIndexIfEmpty(i);
    }
  }

  setArenaSize(arenaSizeX: number, arenaSizeY: number) {
    this.arenaSizeX = arenaSizeX;
    this.arenaSizeY = arenaSizeY;
  }

  getSquareFromPosition(x: number, y: number): Square {
    return this.squares[this.getSquareIndexFromPosition(x, y)];
  }

  setSquareValueAtPosition(x: number, y: number, value): void {
    this.squares[this.getSquareIndexFromPosition(x, y)] = value;
  }

  getSquareIndexFromPosition(x: number, y: number): number {
    return y * this.arenaSizeX + x;
  }

  getSquarePositionFromIndex(squareIndex: number): Position {
    const y = Math.floor(squareIndex / this.arenaSizeY);
    const x = squareIndex % this.arenaSizeX;
    return { x, y };
  }

  setEntityWithinApropriateSquare(entity: Entity): void {
    this.setEntityWithinASquareAtPosition(entity.position.x, entity.position.y, entity);
  }

  setEntityWithinASquareAtPosition(x: number, y: number, entity: Entity) {
    const squareIndex: number = this.getSquareIndexFromPosition(x, y);
    this.initializeSquareAtIndexIfEmpty(squareIndex);
    // this.squares[squareIndex].entity = entity;
    if (!this.squares[squareIndex].entities) {
      this.squares[squareIndex].entities = [];
    }

    if (!Array.isArray(this.squares[squareIndex].entities)) {
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

    const squareCoords: Position = this.getSquarePositionFromIndex(squareIndex);
    MessageService.send(
      `Targetting square #${squareIndex} at ${squareCoords.x},${squareCoords.y}`,
      MessageLevel.debug
    );
  }

  markSquareAtIndexAsAttacked(squareIndex: number): void {
    Helpers.resetGivenFieldsOnACollection(this.squares, "isAttacked");
    this.initializeSquareAtIndexIfEmpty(squareIndex);
    this.squares[squareIndex].isAttacked = true;

    const squareCoords: Position = this.getSquarePositionFromIndex(squareIndex);
    MessageService.send(
      `Marking square #${squareIndex} at ${squareCoords.x},${squareCoords.y} as attacked`,
      MessageLevel.debug
    );
  }

  markSquareAtIndexAsChosenDestination(squareIndex: number): void {
    Helpers.resetGivenFieldsOnACollection(this.squares, "isChosenDestination");
    this.initializeSquareAtIndexIfEmpty(squareIndex);
    this.squares[squareIndex].isChosenDestination = true;

    const squareCoords: Position = this.getSquarePositionFromIndex(squareIndex);
    MessageService.send(
      `Marking square #${squareIndex} at ${squareCoords.x},${squareCoords.y} as chosen destination`,
      MessageLevel.debug
    );
  }

  initializeSquareAtIndexIfEmpty(squareIndex: number) {
    if (!this.squares[squareIndex]) {
      this.squares[squareIndex] = new Square(squareIndex);
      this.squares[squareIndex].position = this.getSquarePositionFromIndex(squareIndex);
    }
  }

  markAvailableDestinationsForSelectedEntity(entity: Entity): void {
    if (entity.active) {
      const { x, y } = entity.position;

      Helpers.resetGivenFieldsOnACollection(this.squares, "isAvailableDestination");

      for (let j = y - 1; j <= y + 1; j++) {
        if (j < 0 || j >= this.arenaSizeY) {
          continue;
        }
        for (let i = x - 1; i <= x + 1; i++) {
          if (i < 0 || i >= this.arenaSizeX || (i === x && j === y)) {
            continue;
          }

          const square: Square = this.getSquareFromPosition(i, j);
          if (this.isSquareEnterableByFriendlyUnits(square)) {
            square.isAvailableDestination = true;
          }

          this.setSquareValueAtPosition(i, j, square);
        }
      }
    }
  }

  isTargetSquareEnterable(targetSquare: Square): boolean {
    const unpassableEntitiesInThisSquare =
      targetSquare.entities &&
      targetSquare.entities.filter(entity => !entity.isPassable && entity.isAlive);
    return !(unpassableEntitiesInThisSquare && unpassableEntitiesInThisSquare.length);
  }

  isSquareEnterableByFriendlyUnits = square =>
    ["floor", "monster-filter"].includes(square.squareType);

  lightAllSquares(): void {
    this.squares.forEach(square => (square.isLit = true));
  }
  castLightsFromFriendlyEntity(entity: Entity): void {
    if (entity.isFriendly) {
      const { x, y } = entity.position;

      for (let j = y - 2; j <= y + 2; j++) {
        if (j < 0 || j >= this.arenaSizeY) {
          continue;
        }
        for (let i = x - 2; i <= x + 2; i++) {
          if (i < 0 || i >= this.arenaSizeX) {
            continue;
          }

          const square: Square = this.getSquareFromPosition(i, j);

          square.isInTwilightZone = true;
          this.setSquareValueAtPosition(i, j, square);
        }
      }

      for (let j = y - 1; j <= y + 1; j++) {
        if (j < 0 || j >= this.arenaSizeY) {
          continue;
        }
        for (let i = x - 1; i <= x + 1; i++) {
          if (i < 0 || i >= this.arenaSizeX) {
            continue;
          }

          const square: Square = this.getSquareFromPosition(i, j);

          square.isLit = true;
          this.setSquareValueAtPosition(i, j, square);
        }
      }
    }
  }
}

export const SquaresService = new SquaresServiceClass();
