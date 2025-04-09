import { Entity, Square, EntitiesService, SquaresService } from "services";
import GameLogic from "./GameLogicService";

/**
 * @description Interface of GameState used in Game Component as state
 *
 */
export interface WorldState {
  entities: Entity[];
  squares: Square[];
  selected: Entity;
  targeted: Square;
  targetedSquareNumber: number;

  arenaSize: number;
  squareSize: number;
  enemiesAlive: number;
  friendsAlive: number;

  isAutoLoopOn: boolean;
  isBoardRotated: boolean;
  isEditorOn: boolean;
  areEnemiesSelectable: boolean;
}

export class WorldState implements WorldState {
  constructor() {
    Object.assign(this, {
      entities: EntitiesService.entities,
      squares: SquaresService.squares,
      selected: EntitiesService.selected,
      targeted: null,
      targetedSquareNumber: null,

      arenaSize: 10,
      squareSize: 40,
      enemiesAlive: GameLogic.calculateNumberOfAliveEnemies(EntitiesService.entities),
      friendsAlive: GameLogic.calculateNumberOfAliveFriends(EntitiesService.entities),

      isAutoLoopOn: false,
      isBoardRotated: false,
      isEditorOn: false,
      areEnemiesSelectable: true,
    });
  }
}
