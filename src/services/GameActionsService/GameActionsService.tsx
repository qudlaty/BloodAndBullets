/** This file contains most of the click-handling logic for the Game */
/* Handling of particular events is delegated to proper services */

import * as Helpers from "helpers";
import { Entity, EntitiesService, SquaresService, GameLogic, Position } from "services";
import { GameState } from "services/GameLogicService";
import { Square } from "services/SquaresService";

let component = null;
/**
 * @description Class with methods designed to operate on Game Component state.
 * @requires Game component to be passed to constructor.
 * @example let gameActions = new GameActionsClass(this); // run inside the GameComponent
 */
export class GameActionsClassForGameComponent {
  constructor(that) {
    component = that;
  }

  entitiesProcessingLoopIntervalHandle = null;
  playerActionTime: number = 1000; //in milliseconds

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

  zoomIn() {
    component.setState((prevState) => {
      return { squareSize: prevState.squareSize + 5 };
    });
  }

  zoomOut() {
    component.setState((prevState) => {
      return { squareSize: prevState.squareSize - 5 };
    });
  }

  get isTurnInProgress() {return this.entitiesProcessingLoopIntervalHandle};

  loop = () => {
    console.debug('Attempting loop')
    if(this.isTurnInProgress) {
      setTimeout(this.loop, 1000);
      return;
    };
    console.debug('Executing nextStep')
    this.nextStep();
    if (component.state.isAutoLoopOn) {
      console.debug('Scheduling next loop step in 1s');
      setTimeout(this.loop, 1000);
    }
  };

  nextTick = () => {
    component.setState({ isAutoLoopOn: false });
    this.nextStep();// TODO should not be run if processing loop is in progress
  };

  nextStep() {
    component.stepNumber++;
    console.info('Starting processing turn #', component.stepNumber)
    EntitiesService.refillActionPointsForAllEntities();
    Helpers.resetGivenFieldsOnACollection(EntitiesService.entities, 'targetPosition', 'isShooting');
    Helpers.resetGivenFieldsOnACollection(SquaresService.squares, 'isAttacked');
    this.processEntities();
  }

  processEntities() {
    this.drawAggro();
    // EntitiesService.moveEntities();
    this.entitiesProcessingLoopIntervalHandle = setInterval(
      () => this.processNextUnprocessedEntity(),
      100
    );
  }

  processNextUnprocessedEntity() {
    let entitiesForProcessing = EntitiesService.entities.filter(
      entity =>
        (!entity.isFriendly && entity.isAlive) &&
        (entity.actionPoints > 0)
    );
    if(entitiesForProcessing.length) {
      let entityForThisTurn = entitiesForProcessing[0];
      this.setNewStateAfterProcessingChosenEntity(entityForThisTurn)
    } else {// all are processed
      clearInterval(this.entitiesProcessingLoopIntervalHandle);
      this.entitiesProcessingLoopIntervalHandle = null;
      console.log('All entities processed.')
    }
  }

  setNewStateAfterProcessingChosenEntity(entity) {
    component.setState(
      (prevState) => GameLogic.calculeteNextGameStateAfterProcessingAGivenEntity(prevState, entity),
      () => this.setSquaresAccordingToEntities()
    );
    this.processInterface();
  }

  executeActions = () => {
    component.setState(
      (prevState) => GameLogic.calculeteNextGameStateAfterProcessingAGivenEntity(prevState, prevState.selected),
      () => this.afterExecuteActions()
    );
    this.processInterface();
  }

  afterExecuteActions = () => {
    let squares = SquaresService.squares;
    let state: GameState = component.state;

    // setTimeout(() => {
    //   delete state.selected.targetPosition;
    //   this.processInterface();
    // },this.playerActionTime);
    // Helpers.resetGivenFieldsOnACollection(squares,'isAttacked');

    this.setSquaresAccordingToEntities();
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

  handleKeyPress = (param) => {
    console.log(param);
    switch (param){
      case "space":
        this.executeActions();
        break;
      default:

    }
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
          selected.setMoveDestinationSquareByNumber(squareIndex);
          delete selected.targetPosition;
          delete selected.isShooting;
          Helpers.resetGivenFieldsOnACollection(squares,'isAttacked');
          this.executeActions();
        }

        if (doubleClick()) {
          if (!selected && targeted.entity &&  targeted.entity.isAlive) {
            // Selecting
            selected = EntitiesService.selectEntityFromGivenSquare(selected, targeted);
            //targeted = undefined;
          } else if (Helpers.isSelectedTargeted(selected, targeted)) {
            // Deselecting if not selecting
            //* // DISABLE DOUBLECLICK DESELECT
            // GameLogic.deselectAllEntities();
            // selected = undefined;
            // */
          }
        }

        function doesSquareHaveAliveEntities(square: Square): boolean {
          return !!(square.entities && square.entities.find(entity => entity.isAlive));
        }
        // setting attack
        if (doubleClick() && selected && doesSquareHaveAliveEntities(targeted) && selected !== targeted.entity) {
          let targetSquarePosition = SquaresService.getSquarePositionFromIndex(squareIndex);
          selected.attackPosition(targetSquarePosition);
          SquaresService.markSquareAtIndexAsAttacked(squareIndex);
          delete selected.moveDestination;
          delete selected.isShooting;
          Helpers.resetGivenFieldsOnACollection(squares, 'isChosenDestination');
          this.executeActions();
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
      this.aggro(entity);
    })
  }

  aggro = (entity: Entity) => {
    // let actor = EntitiesService.findEntityById(name);
    let position = entity.position;
    let closeEntities = this.findEntitiesThatAreClose(position);
    let entitiesToAttack = closeEntities.filter(closeEntity => closeEntity.hp > 0);
    if(entitiesToAttack.length) {
      let firstAmongThem = entitiesToAttack[0];
      entity.attackPosition(firstAmongThem.position);
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
      (previousState: GameState) => {
        let isAutoLoopOn = !previousState.isAutoLoopOn
        console.info('Switching auto loop to', isAutoLoopOn);
        return { isAutoLoopOn };
      },
      () => {
        if (component.state.isAutoLoopOn) {
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
