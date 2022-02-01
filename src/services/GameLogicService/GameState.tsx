import { Entity, Square } from "services";

/**
 * @description Interface of GameState used in Game Component as state
 *
 */
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
