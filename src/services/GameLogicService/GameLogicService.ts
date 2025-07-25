import { GameModel, GameModelClass } from "services/GameModelService";
import { WorldState } from "./WorldState";

import { SquaresService, Square } from "services/SquaresService";
import { EntitiesService, Entity } from "services/EntitiesService";
import * as Helpers from "helpers";
import { ScriptsService } from "services/ScriptsService";
import { MessageService } from "services";

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

  calculateNextInterfaceState = (previousState: WorldState) => {
    const nextState = previousState;
    const { entities, selected } = nextState;
    entities.forEach(entity => {
      if (entity === selected) SquaresService.markAvailableDestinationsForSelectedEntity(selected);
    });

    return nextState;
  };

  /**
   * Calculate WHAT EXACTLY? This should probably go into GameLogic
   * @param previousState
   */

  calculateNextWorldStateAfterProcessingAGivenEntity(previousState: WorldState, givenEntity: Entity): WorldState {
    if (givenEntity.actionPoints === 0) {
      const entity = givenEntity;
      MessageService.send(`${entity.name} has not enough AP to execute this action`);
      MessageService.setCursorMessage("NO AP");

      return previousState;
    }
    const nextState: WorldState = previousState;
    const { entities } = nextState;
    this.processAnEntity(givenEntity);
    nextState.enemiesAlive = this.calculateNumberOfAliveEnemies(entities);
    nextState.friendsAlive = this.calculateNumberOfAliveFriends(entities);
    ScriptsService.runScripts(givenEntity);

    return nextState;
  }

  processAnEntity(entity) {
    // Entity processing function
    console.log("start procesing", entity);
    EntitiesService.moveEntityRandomly(entity);
    EntitiesService.moveEntityIntoChosenDestination(entity);
    EntitiesService.stopShootingWhenForbidden(entity);
    if (EntitiesService.isEntityTargettingSomethingAlive(entity)) {
      EntitiesService.fireAShot(entity);
    }
    EntitiesService.ceaseFireNextTickIfNoAliveTargets(entity);

    entity.bleedExternally();

    EntitiesService.stopBreathingForKilledEntity(entity);

    SquaresService.markAvailableDestinationsForSelectedEntity(entity);
    console.log("end procesing", entity);
    // SquaresService.castLightsFromFriendlyEntity(entity);
  }

  calculateNumberOfAliveFriends(entities: Entity[]): number {
    return entities.filter(entity => entity.isFriendly && entity.isAlive).length;
  }

  calculateNumberOfAliveEnemies(entities: Entity[]): number {
    let amountOfAliveEnemies = 0;
    entities.forEach(entity => {
      if (entity.isFriendly) {
        return;
      } else if (entity.isAlive) {
        amountOfAliveEnemies++;
      }
    });

    return amountOfAliveEnemies;
  }

  syncSquaresWithEntities = previousState => {
    const squares: Square[] = Helpers.newCopyOfArray(previousState.squares);
    /*
    Reattach new squares array to the SquaresService
    This might actually be not-needed, as elements of that array are objects
    and are referenced in both arrays, so unless we're adding new squares,
    everything should work without re-attaching
    */
    SquaresService.squares = squares;
    const entities: Entity[] = EntitiesService.entities;
    if (entities.length) {
      Helpers.resetGivenFieldsOnACollection(squares, "entity", "entities");
    }
    entities.forEach(entity => {
      SquaresService.setEntityWithinApropriateSquare(entity);
    });

    return { squares, entities };
  };

  reSyncSquares = previousState => {
    const squares: Square[] = Helpers.newCopyOfArray(previousState.squares);
    /*
    Reattach new squares array to the SquaresService
    This might actually be not-needed, as elements of that array are objects
    and are referenced in both arrays, so unless we're adding new squares,
    everything should work without re-attaching
    */
    SquaresService.squares = squares;
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
