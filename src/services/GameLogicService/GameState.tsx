import { Entity, Square, EntitiesService, SquaresService } from "services";

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
  actionPoints: number;
}

export class GameState implements GameState{
  constructor() {
    Object.assign(this,
      {
        entities: EntitiesService.entities,
        squares: SquaresService.squares,
        squareSize: 40,
        selected: EntitiesService.findEntityById("Lazer Blady"),
        targeted: null,
        targetedSquareNumber: null,
        enemiesAlive: null,
        arenaSize: 10,
        autoLoop: false,
        isBoardRotated: false,
        isEditorOn: false,
        actionPoints: 2,
      }
    );
  }
}
