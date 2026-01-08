import { Entity, Square, EntitiesService, SquaresService } from "services";
import GameLogic from "./GameLogicService";

/**
 * @description Interface of WorldState used in the Game Component as state
 *
 */
export interface WorldState {
  entities: Entity[];
  squares: Square[];
  selected: Entity;
  targeted: Square;
  targetedSquareNumber: number;

  arenaSizeX: number;
  arenaSizeY: number;
  squareSize: number;
  enemiesAlive: number;
  friendsAlive: number;

  isAutoLoopOn: boolean;
  isBoardRotated: boolean;
  isEditorOn: boolean;
  mapBrush: string;
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

      arenaSizeX: 10,
      arenaSizeY: 10,
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
