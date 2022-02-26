import { GameModel, GameModelClass } from "services/GameModelService";
import { GameState } from "./GameState";

import { SquaresService, Square } from "services/SquaresService";
import { EntitiesService, Entity } from "services/EntitiesService";
import * as Helpers from "helpers";

/**
 * @description Assorted methods required to run the game logic
 */
class GameLogicClass {
  model: GameModelClass;

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
    nextState.actionPoints = 2;

    EntitiesService.moveEntities();
    //Helpers.resetGivenFieldsOnACollection(squares, "isLit", "isInTwilightZone");
    //SquaresService.lightAllSquares();
    entities.forEach(this.processAnEntity);

    nextState.enemiesAlive = this.calculateNumberOfAliveEnemies(entities);
    return nextState;
  }

  calculeteNextGameStateAfterExecute(previousState: GameState): GameState{
    if(previousState.actionPoints == 0) return previousState;
    let nextState: GameState = previousState;
    let { entities } = nextState;
    nextState.actionPoints--;

    //EntitiesService.moveEntities();

    this.processAnEntity(nextState.selected);

    nextState.enemiesAlive = this.calculateNumberOfAliveEnemies(entities);
    return nextState;
  }

  processAnEntity(entity) { // Entity processing function
    EntitiesService.moveEntityIntoChosenDestination(entity);
    EntitiesService.stopShootingWhenForbidden(entity);
    if (EntitiesService.isEntityShootingAtSomethingAlive(entity)) {
      EntitiesService.fireAShot(entity);
    }
    EntitiesService.ceaseFireNextTickIfNoAliveTargets(entity);

    entity.bleedExternally();

    EntitiesService.stopBreathingForKilledEntity(entity);

    SquaresService.markAvailableDestinationsForSelectedEntity(entity);
    console.log('procesing', entity)
    // SquaresService.castLightsFromFriendlyEntity(entity);
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
