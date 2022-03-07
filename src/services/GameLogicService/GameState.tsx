import { Entity, Square, EntitiesService, SquaresService } from "services";

/**
 * @description Interface of GameState used in Game Component as state
 *
 */
export interface GameState {
  entities: Entity[];
  squares: Square[];
  selected: Entity;
  targeted: Square;
  targetedSquareNumber: number;

  arenaSize: number;
  squareSize: number;
  enemiesAlive: number;

  isAutoLoopOn: boolean;
  isBoardRotated: boolean;
  isEditorOn: boolean;
}

export class GameState implements GameState{
  constructor() {
    Object.assign(this,
      {
        entities: EntitiesService.entities,
        squares: SquaresService.squares,
        selected: EntitiesService.findEntityById("Lazer Blady"),
        targeted: null,
        targetedSquareNumber: null,

        arenaSize: 10,
        squareSize: 40,
        enemiesAlive: null,

        isAutoLoopOn: true,
        isBoardRotated: false,
        isEditorOn: false,
      }
    );
  }
}
