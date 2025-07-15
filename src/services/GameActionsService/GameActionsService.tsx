/** This file contains most of the click-handling logic for the Game */
/* Handling of particular events is delegated to proper services */

import { Game } from "components";
import * as Helpers from "helpers";
import { Entity, EntitiesService, SquaresService, GameLogic, Position, MessageService, MessageLevel } from "services";
import { WorldState } from "services/GameLogicService";
import { Square } from "services/SquaresService";

let gameComponent: Game = null;
/**
 * @description Class with methods designed to operate on Game Component state.
 * @requires Game component to be passed to constructor.
 * @example let gameActions = new GameActionsClass(this); // run inside the GameComponent
 */
export class GameActionsClassForGameComponent {
  constructor(that) {
    gameComponent = that;
  }

  entitiesProcessingLoopIntervalHandle = null;
  playerActionTime: number = 1000; //in milliseconds

  toggleEditorMode = () => {
    if (!gameComponent.state.isEditorOn) {
      Helpers.resetGivenFieldsOnACollection(gameComponent.state.squares, "blood", "entity");
      gameComponent.setState(prevState => {
        return { entities: [], isEditorOn: true };
      });
    } else {
      gameComponent.setState(prevState => {
        return { squares: SquaresService.squares, entities: EntitiesService.entities, isEditorOn: false };
      });
    }
  };

  zoomIn() {
    gameComponent.setState(prevState => {
      return { squareSize: prevState.squareSize + 5 };
    });
  }

  zoomOut() {
    gameComponent.setState(prevState => {
      return { squareSize: prevState.squareSize - 5 };
    });
  }

  get isTurnInProgress() {
    return this.entitiesProcessingLoopIntervalHandle;
  }

  loop = () => {
    console.debug("Attempting loop");
    if (this.isTurnInProgress) {
      setTimeout(this.loop, 1000);
      return;
    }
    console.debug("Executing nextStep");
    this.nextTurn();
    if (gameComponent.state.isAutoLoopOn) {
      console.debug("Scheduling next loop step in 1s");
      setTimeout(this.loop, 1000);
    }
  };

  endTurn = () => {
    gameComponent.setState({ isAutoLoopOn: false });
    this.nextTurn(); // TODO should not be run if processing loop is in progress
  };

  nextTurn() {
    gameComponent.turnNumber++;
    console.info("Starting processing turn #", gameComponent.turnNumber);
    EntitiesService.refillActionPointsForAllEntities();
    EntitiesService.rechargeWeaponsForAllEntities();

    Helpers.resetGivenFieldsOnACollection(EntitiesService.entities, "targetPosition", "isShooting");
    Helpers.resetGivenFieldsOnACollection(SquaresService.squares, "isAttacked");
    this.processEntities();
  }

  processEntities() {
    this.drawAggro();
    // EntitiesService.moveEntities();
    this.entitiesProcessingLoopIntervalHandle = setInterval(() => this.processNextUnprocessedEntity(), 100);
  }

  processNextUnprocessedEntity() {
    const entitiesForProcessing = EntitiesService.entities.filter(
      entity => !entity.isFriendly && entity.isAlive && entity.actionPoints > 0
    );
    if (entitiesForProcessing.length) {
      const entityForThisTurn = entitiesForProcessing[0];
      this.setNewStateAfterProcessingChosenEntity(entityForThisTurn);
    } else {
      // all are processed
      clearInterval(this.entitiesProcessingLoopIntervalHandle);
      this.entitiesProcessingLoopIntervalHandle = null;
      console.log("All entities processed.");
    }
  }

  setNewStateAfterProcessingChosenEntity(entity) {
    gameComponent.setState(
      prevState => GameLogic.calculateNextWorldStateAfterProcessingAGivenEntity(prevState, entity),
      () => this.setSquaresAccordingToEntities()
    );
    this.processInterface();
  }

  executeActions = () => {
    MessageService.send(`Executing actions`, MessageLevel.debug);
    gameComponent.setState(
      prevState => GameLogic.calculateNextWorldStateAfterProcessingAGivenEntity(prevState, EntitiesService.selected),
      () => this.afterExecuteActions()
    );
    this.processInterface();
  };

  afterExecuteActions = () => {
    // setTimeout(() => {
    //   delete state.selected.targetPosition;
    //   this.processInterface();
    // },this.playerActionTime);
    // Helpers.resetGivenFieldsOnACollection(squares,'isAttacked');

    this.setSquaresAccordingToEntities();
  };

  processInterface() {
    console.debug("Processing Interface");
    gameComponent.setState(
      prevState => GameLogic.calculateNextInterfaceState(prevState),
      () => {
        if (gameComponent.state.isEditorOn) {
          this.refreshSquares();
        } else {
          this.setSquaresAccordingToEntities();
        }
      }
    );
  }

  setSelectedInStateAccordingToSelectedInEntitiesService() {
    gameComponent.setState(prevState => {
      const selected = EntitiesService.selected;
      return { selected: selected };
    });
  }

  /** Sets entities within apropriate squares, based on the value of their `position` field
   * This might actually be not-needed, if movement of entities is reflected in their respectable squares
   * Also: entities are no longer rendered within `Square` component
   */
  setSquaresAccordingToEntities() {
    gameComponent.setState(prevState => GameLogic.syncSquaresWithEntities(prevState));
  }

  refreshSquares() {
    gameComponent.setState(prevState => GameLogic.reSyncSquares(prevState));
  }

  handleKeyPress = param => {
    console.log(param);
    switch (param) {
      case "space":
        this.executeActions();
        break;
      default:
    }
  };

  handleClickV2 = (squareIndex: number) => {
    gameComponent.setState(
      (state: WorldState) => {
        let { selected, targeted, targetedSquareNumber: selectedSquareNumber } = state;
        const { squares, entities, isEditorOn } = state;
        const previousTargeted = targeted;
        targeted = squares[squareIndex];
        selectedSquareNumber = squareIndex;
        const doubleClick = () => previousTargeted === targeted;

        SquaresService.markSquareAtIndexAsTargeted(squareIndex);

        selected && (selected.isShooting = false);

        if (isEditorOn) {
          const squareCoords = targeted.position;
          MessageService.send(
            `Editing square #${squareIndex} at ${squareCoords.x},${squareCoords.y}`,
            MessageLevel.debug
          );
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
        } else {
          // setting attack
          if (doubleClick() && selected && doesSquareHaveAliveEntities(targeted)) {
            const targetSquarePosition = SquaresService.getSquarePositionFromIndex(squareIndex);
            selected.attackPosition(targetSquarePosition);
            SquaresService.markSquareAtIndexAsAttacked(squareIndex);
            delete selected.moveDestination;
            delete selected.isShooting;
            Helpers.resetGivenFieldsOnACollection(squares, "isChosenDestination");
            this.executeActions();
          } else if (doubleClick() && targeted.isAvailableDestination) {
            /** Setting move destination while clicking on empty square */
            selected.setMoveDestinationSquareByNumber(squareIndex);
            delete selected.targetPosition;
            delete selected.isShooting;
            Helpers.resetGivenFieldsOnACollection(squares, "isAttacked");
            this.executeActions();
          }

          if (doubleClick()) {
            const targetEntity = targeted?.entities?.length && targeted?.entities[0];
            if (!selected && targetEntity?.isAlive && (targetEntity?.isFriendly || state.areEnemiesSelectable)) {
              // Selecting
              selected = EntitiesService.selectEntityFromGivenSquare(selected, targeted);
              //targeted = undefined;
              MessageService.send(
                `Selecting an entity ${selected.name} at ${selected.position.x},${selected.position.y}`,
                MessageLevel.debug
              );
              EntitiesService.setSelected(selected);
              this.setSelectedInStateAccordingToSelectedInEntitiesService();
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
        }
        return { squares, entities, selected, targeted, targetedSquareNumber: selectedSquareNumber };
      },
      () => this.processInterface()
    );
  };

  drawAggro() {
    EntitiesService.entities.forEach(entity => {
      if (entity.isFriendly) return;
      entity.isShooting = false;
      this.aggro(entity);
    });
  }

  aggro = (entity: Entity) => {
    // let actor = EntitiesService.findEntityById(name);
    const position = entity.position;
    const closeEntities = this.findEntitiesThatAreClose(position);
    const entitiesToAttack = closeEntities.filter(closeEntity => closeEntity.hp > 0);
    if (entitiesToAttack.length) {
      const firstAmongThem = entitiesToAttack[0];
      entity.attackPosition(firstAmongThem.position);
    }
  };

  findEntitiesThatAreClose(position: Position) {
    const { x, y } = position;
    let entities: Entity[] = [];
    for (let j = y - 1; j <= y + 1; j++) {
      if (j < 0 || j >= SquaresService.arenaSize) {
        continue;
      }
      for (let i = x - 1; i <= x + 1; i++) {
        if (i < 0 || i >= SquaresService.arenaSize || (i === x && j === y)) {
          continue;
        }
        const newlyFoundEntities = EntitiesService.getEntitiesAtGivenPosition({ x: i, y: j });
        entities = entities.concat(newlyFoundEntities);
      }
    }

    return entities;
  }

  nuke = (dmg: number) => {
    gameComponent.setState(
      state => {
        const { entities } = state;

        entities.forEach(entity => {
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
    gameComponent.setState({ isBoardRotated: !gameComponent.state.isBoardRotated });
  };

  switchAutoLoop = () => {
    gameComponent.setState(
      (previousState: WorldState) => {
        const isAutoLoopOn = !previousState.isAutoLoopOn;
        console.info("Switching auto loop to", isAutoLoopOn);
        return { isAutoLoopOn };
      },
      () => {
        if (gameComponent.state.isAutoLoopOn) {
          this.loop();
        }
      }
    );
  };

  onInventoryClick = (entity: Entity, itemName: string) => {
    gameComponent.setState(prevState => {
      const entities = [].concat(prevState.entities);
      EntitiesService.entities = entities;
      const entityId = EntitiesService.getEntityId(entity);
      const actualEntity = EntitiesService.findEntityById(entityId);
      //let actualItem = EntitiesService.findItemOnEntity(actualEntity, itemName);

      if (actualEntity.equipment.hands && actualEntity.equipment.hands.name === itemName) {
        actualEntity.unEquipFromHands();
      } else {
        actualEntity.equipInHands(itemName);
      }
      actualEntity.isShooting = false;

      return { entities };
    });
    console.log(entity, itemName);
  };

  handleDeselectAllEntities = () => {
    gameComponent.setState(
      state => {
        let { selected } = state;
        const { squares, entities } = state;

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

  startUpdatingClickPositionCssVariables = () => {
    const updateClickPositionCssVariables = (x: number, y: number) => {
      console.debug("CLICK EVENT AT:", x, y);
      document.documentElement.style.setProperty("--mouse-click-position-x", x + "px");
      document.documentElement.style.setProperty("--mouse-click-position-y", y + "px");
    };

    document.addEventListener(
      "click", //
      event => updateClickPositionCssVariables(event.clientX, event.clientY)
    );
  };

  resetMap = () => {
    Helpers.resetGivenFieldsOnACollection(SquaresService.squares, "isAvailableDestination");
    Helpers.setGivenFieldOnACollection(SquaresService.squares, "squareType", "floor");
    this.processInterface();
  };
}
