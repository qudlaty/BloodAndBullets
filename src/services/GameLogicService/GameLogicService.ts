import { GameModel } from "services/GameModelService";
import { GameState } from "./GameState";

import { SquaresService, Square } from "services/SquaresService";
import { EntitiesService, Entity } from "services/EntitiesService";
import * as Helpers from "helpers";

/**
 * @description Assorted methods required to run the game logic
 */
class GameLogicClass {
  model;

  constructor() {
    this.model = GameModel;
  }

  run = () => {
    console.log("Running Game Logic");
    console.log(GameModel.entities);
  };

  calculateNextInterfaceState = (previousState: GameState) => {
    let nextState = previousState;
    let { entities, selected } = nextState;
    entities.forEach((entity) => {
      if (entity === selected) SquaresService.markAvailableDestinationsForSelectedEntity(selected);
    });

    return nextState;
  };

  /**
   * Calculate WHAT EXACTLY? This should probably go into GameLogic
   * @param previousState
   */
  calculateNextGameState(previousState: GameState) {
    let nextState: GameState = previousState;
    let { entities } = nextState;

    EntitiesService.moveEntities();
    //Helpers.resetGivenFieldsOnACollection(squares, "isLit", "isInTwilightZone");
    //SquaresService.lightAllSquares();
    entities.forEach((entity) => {
      if (EntitiesService.isEntityShootingProperly(entity)) {
        EntitiesService.fireAShot(entity);
      }
      entity.bleedExternally();

      EntitiesService.stopBreathingForKilledEntity(entity);

      SquaresService.markAvailableDestinationsForSelectedEntity(entity);
      // SquaresService.castLightsFromFriendlyEntity(entity);
    });

    nextState.enemiesAlive = this.calculateNumberOfAliveEnemies(entities);
    console.log(nextState.enemiesAlive);
    return nextState;
  }

  calculateNumberOfAliveEnemies(entities: Entity[]):number {
    let amountOfAliveEnemies = 0;
    entities.forEach((entity) => {
      if(entity.isFriendly) {
        return;
      } else if(entity.isAlive) {
        amountOfAliveEnemies++;
      }
    });

    return amountOfAliveEnemies;
  }

  syncSquaresWithEntities = (previousState) => {
    let squares: Square[] = Helpers.newCopyOfArray(previousState.squares);
    /*
    Reattach new squares array to the SquaresService
    This might actually be not-needed, as elements of that array are objects
    and are referenced in both arrays, so unless we're adding new squares,
    everything should work without re-attaching
    */
    SquaresService.squares = squares;
    let entities: Entity[] = previousState.entities;
    if (entities.length) {
      Helpers.resetGivenFieldsOnACollection(squares, "entity");
    }
    entities.forEach((entity) => {
      SquaresService.setEntityWithinApropriateSquare(entity);
    });

    return { squares };
  };

  deselectAllEntities = () => {
    Helpers.resetGivenFieldsOnACollection(EntitiesService.entities, "active");
    Helpers.resetGivenFieldsOnACollection(SquaresService.squares, "isChosenDestination", "isAvailableDestination");
  };

  ceaseFire = () => {
    Helpers.resetGivenFieldsOnACollection(GameModel.entities, "isShooting");
  };
}

export const GameLogic = new GameLogicClass();
export default GameLogic;
