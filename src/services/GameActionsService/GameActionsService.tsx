/** This file contains most of the click-handling logic for the Game */
/* Handling of particular events is delegated to proper services */

import * as Helpers from "helpers";
import { Entity, EntitiesService, SquaresService, GameLogic, Position } from "services";
import { GameState } from "services/GameLogicService";

let component = null;
/**
 * @description Class with methods designed to operate on Game Component state.
 * @requires Game component to be passed to constructor.
 * @example let gameActions = new GameActionsClass(this);
 */
export class GameActionsClassForGameComponent {
  constructor(that) {
    component = that;
  }
  toggleEditorMode = () => {
    if (!component.state.isEditorOn) {
      Helpers.resetGivenFieldsOnACollection(component.state.squares, "blood", "entity");
      component.setState((prevState) => {
        return { entities: [], isEditorOn: true };
      });
    } else {
      component.setState((prevState) => {
        return { squares: SquaresService.squares, entities: EntitiesService.entities, isEditorOn: false };
      });
    }
  };

  loop = () => {
    component.stepNumber++;

    Helpers.resetGivenFieldsOnACollection(EntitiesService.entities, 'targetPosition', 'isShooting');
    Helpers.resetGivenFieldsOnACollection(SquaresService.squares, 'isAttacked');
    this.drawAggro();
    this.processEntities();
    if (component.state.autoLoop) {
      setTimeout(this.loop, 1000);
    }
  };

  processEntities() {
    component.setState(
      (prevState) => GameLogic.calculateNextGameState(prevState),
      () => this.setSquaresAccordingToEntities()
    );
  }

  processInterface() {
    component.setState(
      (prevState) => GameLogic.calculateNextInterfaceState(prevState),
      () => this.setSquaresAccordingToEntities()
    );
  }

  /** Sets entities within apropriate squares, based on the value of their `position` field
   * This might actually be not-needed, if movement of entities is reflected in their respectable squares
   * Also: entities are no longer rendered within `Square` component
   */
  setSquaresAccordingToEntities() {
    component.setState((prevState) => GameLogic.syncSquaresWithEntities(prevState));
  }

  nextTick = () => {
    component.setState({ autoLoop: false });
    this.loop();
  };

  executeActions = () => {
    component.setState(
      (prevState) => GameLogic.calculeteNextGameStateAfterExecute(prevState),
      () => this.setSquaresAccordingToEntities()
    );
    this.processInterface();
  }

  handleClickV2 = (squareIndex: number) => {
    component.setState(
      (state: GameState) => {
        let { squares, entities, selected, targeted, isEditorOn, targetedSquareNumber: selectedSquareNumber } = state;
        let previousTargeted = targeted;
        targeted = squares[squareIndex];
        selectedSquareNumber = squareIndex;
        const doubleClick = () => previousTargeted === targeted;
        SquaresService.markSquareAtIndexAsTargeted(squareIndex);

        if (isEditorOn) {
          switch (targeted.squareType) {
            case "floor":
              targeted.squareType = "wall";
              break;
            case "wall":
              targeted.squareType = "nothing";
              break;
            case "nothing":
              targeted.squareType = "monster-filter";
              break;
            case "monster-filter":
              targeted.squareType = "floor";
              break;
          }
        }

        /** Setting move destination while clicking on empty square */
        if (doubleClick() && targeted.isAvailableDestination) {
          selected.setMoveDestinationSquare(squareIndex);
          delete selected.targetPosition;
          delete selected.isShooting;
          Helpers.resetGivenFieldsOnACollection(squares,'isAttacked')
        }

        /** To be able to deselect */
        if (doubleClick() || selected) {
          if (!selected && targeted.entity) {
            // Selecting
            selected = EntitiesService.selectEntityFromGivenSquare(selected, targeted);
            //targeted = undefined;
          } else if (Helpers.isSelectedTargeted(selected, targeted)) {
            // Deselecting if not selecting
            /* // DISABLE DOUBLECLICK DESELECT
            GameLogic.deselectAllEntities();
            selected = undefined;
            // */
          }
        }

        // setting attack
        if (doubleClick() && selected && targeted.entity && selected !== targeted.entity) {
          let targetSquarePosition = SquaresService.getSquarePositionFromIndex(squareIndex);
          selected.attackPosition(targetSquarePosition);
          SquaresService.markSquareAtIndexAsAttacked(squareIndex);
          delete selected.moveDestination;
          Helpers.resetGivenFieldsOnACollection(squares, 'isChosenDestination');
        }

        return { squares, entities, selected, targeted, targetedSquareNumber: selectedSquareNumber };
      },
      () => this.processInterface()
    );
  };

  drawAggro() {
    EntitiesService.entities.forEach((entity)=>{
      if(entity.isFriendly) return;
      entity.isShooting = false;
      this.aggro(entity.name);
    })
  }

  aggro = (name) => {
    let actor = EntitiesService.findEntityById(name);
    let position = actor.position;
    let closeEntities = this.findEntitiesThatAreClose(position);
    let entitiesToAttack = closeEntities.filter(entity => entity.hp > 0);
    if(entitiesToAttack.length) {
      let firstAmongThem = entitiesToAttack[0];
      actor.attackPosition(firstAmongThem.position);
    }
  }

  findEntitiesThatAreClose(position: Position){
    let {x, y} = position;
    let entities: Entity[] = [];
    for (let j = y - 1; j <= y + 1; j++) {
      if (j < 0 || j >= SquaresService.arenaSize) {
        continue;
      }
      for (let i = x - 1; i <= x + 1; i++) {
        if (i < 0 || i >= SquaresService.arenaSize || (i === x && j === y)) {
          continue;
        }
        let newlyFoundEntities = EntitiesService.getEntitiesAtGivenPosition({x: i, y: j})
        entities = entities.concat(newlyFoundEntities);
      }
    }

    return entities;
  }

  nuke = (dmg: number) => {
    component.setState(
      (state) => {
        let { entities } = state;

        entities.forEach((entity) => {
          entity.hp = entity.hp - dmg;
        });

        return { entities };
      },
      () => {
        this.processEntities();
      }
    );
  };

  toggleRotateBoard = () => {
    component.setState({ isBoardRotated: !component.state.isBoardRotated });
  };

  switchAutoLoop = () => {
    component.setState(
      (previousState) => {
        return { autoLoop: !previousState.autoLoop };
      },
      () => {
        if (component.state.autoLoop) {
          this.loop();
        }
      }
    );
  };

  onInventoryClick = (entity: Entity, itemName: string) => {
    component.setState((prevState) => {
      let entities = [].concat(prevState.entities);
      EntitiesService.entities = entities;
      let entityId = EntitiesService.getEntityId(entity);
      let actualEntity = EntitiesService.findEntityById(entityId);
      //let actualItem = EntitiesService.findItemOnEntity(actualEntity, itemName);

      if (actualEntity.equipment.hands && actualEntity.equipment.hands.name === itemName) {
        actualEntity.unEquipFromHands();
      } else {
        actualEntity.equipInHands(itemName);
      }

      return { entities };
    });
    console.log(entity, itemName);
  };

  handleDeselectAllEntities = () => {
    component.setState(
      (state) => {
        let { squares, entities, selected } = state;

        GameLogic.deselectAllEntities();
        selected = undefined;

        return { squares, entities, selected };
      },
      () => {
        //this.processEntities();
      }
    );
  };

  ceaseFire = () => {
    Helpers.resetGivenFieldsOnACollection(EntitiesService.entities, "isShooting");
    this.processInterface();
  };
}
