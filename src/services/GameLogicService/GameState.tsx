import { Entity, Square } from "services";

/** Type of GameState */
export interface GameState {
  entities: Entity[];
  squares: Square[];
  squareSize: number;
  enemiesAlive: number;

  selected: Entity;
  targeted: Square;
  targetedSquareNumber: number;

  arenaSize: number;
  autoLoop: boolean;
  isBoardRotated: boolean;
  isEditorOn: boolean;
}

export class GameState implements GameState{}
