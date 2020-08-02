/** This file contains all the click-handling logic for the Game */
/* Handling of particular events is delegated to proper services */

import * as Helpers from "../../helpers";
import { Component } from "react";
import Game from "./Game";
import { Entity, EntitiesService, Square, SquaresService, GameLogic, GameModel } from "../../services";

let component = null;
export class GameActionsClass {
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

  newHandleClick = (squareIndex: number) => {
    component.setState(
      (state) => {
        let { squares, entities, selected, targeted, isEditorOn, targetedSquareNumber: selectedSquareNumber } = state;
        let previousTargeted = targeted;
        targeted = squares[squareIndex];
        selectedSquareNumber = squareIndex;
        const doubleClick = () => previousTargeted === targeted;
        SquaresService.markSquareAsTargeted(squareIndex);

        if (isEditorOn) {
          switch (targeted.squareType) {
            case "floor":
              targeted.squareType = "wall";
              break;
            case "wall":
              targeted.squareType = "nothing";
              break;
            case "nothing":
            default:
              targeted.squareType = "floor";
          }
        }

        /** Setting move destination while clicking on empty square */
        if (doubleClick() && targeted.isAvailableDestination) {
          selected.setMoveDestinationSquare(squareIndex);
        }

        /** To be able to deselect */
        if (doubleClick() || selected) {
          if (!selected && targeted.entity) {
            // Selecting
            selected = EntitiesService.selectEntityFromGivenSquare(selected, targeted);
            //targeted = undefined;
          } else if (Helpers.isSelectedTargeted(selected, targeted)) {
            // Deselecting if not selecting
            GameLogic.deselectAllEntities();
            selected = undefined;
          }
        }

        // setting attack
        if (doubleClick() && selected && targeted.entity && selected !== targeted.entity) {
          selected.attackPosition(SquaresService.targetSquarePosition(squareIndex));
        }

        return { squares, entities, selected, targeted, targetedSquareNumber: selectedSquareNumber };
      },
      () => this.processInterface()
    );
  };

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
