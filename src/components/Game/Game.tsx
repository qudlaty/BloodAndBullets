import React from "react";

import Board from "../Board";
import EntitiesList from "../EntitiesList";
import TargetedSquareInfo from "./TargetedSquareInfo";
import SelectedEntityInfo from "./SelectedEntityInfo";
import { MessageBox } from "./MessageBox";

import { Entity } from "../../services/EntitiesValues";
import { Square } from "../../services/SquaresService";

import { EntitiesService, SquaresService } from "../../services";

import * as Helpers from "../../helpers";

import GameLogic from "../../services/GameLogicService";
import GameModel from "../../services/GameModelService";

import styles from "./Game.module.scss";

/** Type of GameState */
interface GameState {
  entities: Entity[];
  squares: Square[];

  selected: Entity;
  targeted: Square;
  targetedSquareNumber: number;

  arenaSize: number;
  autoLoop: boolean;
  isBoardRotated: boolean;
  isEditorOn: boolean;
}

/** Game composes all the parts of the interface */
export default class Game extends React.PureComponent<void, GameState> {
  renderCounter: number = 0;
  stepNumber: number = 0;

  constructor(props: void) {
    super(props);

    // Initial VALUE of game state
    this.state = {
      entities: GameModel.entities,
      squares: SquaresService.squares,

      selected: null,
      targeted: null,
      targetedSquareNumber: null,

      arenaSize: 10,
      autoLoop: true,
      isBoardRotated: false,
      isEditorOn: false,
    };
  }

  componentDidMount() {
    EntitiesService.entities = this.state.entities;
    this.loop();
  }

  toggleEditorMode = () => {
    if (!this.state.isEditorOn) {
<<<<<<< Updated upstream
=======
      Helpers.resetGivenFieldsOnACollection(this.state.squares, "blood");
>>>>>>> Stashed changes
      this.setState((prevState) => {
        return { entities: [], isEditorOn: true };
      });
    } else {
      this.setState((prevState) => {
        return { squares: SquaresService.squares, entities: EntitiesService.entities, isEditorOn: false };
      });
    }
  };

  loop = () => {
    this.stepNumber++;
    this.processEntities();
    if (this.state.autoLoop) {
      setTimeout(this.loop, 1000);
    }
  };

  processEntities() {
    this.setState(
      (prevState) => this.calculateNextGameState(prevState),
      () => this.setSquaresAccordingToEntities()
    );
  }

  /**
   * Calculate WHAT EXACTLY? This should probably go into GameLogic
   * @param previousState
   */
  calculateNextGameState(previousState: GameState) {
    let nextState: GameState = previousState;
    let { entities, squares, selected } = nextState;

    EntitiesService.moveEntities();
    //Helpers.resetGivenFieldsOnACollection(squares, "isLit", "isInTwilightZone");
    SquaresService.lightAllSquares();
    entities.forEach((entity) => {
      if (EntitiesService.isEntityShootingProperly(entity)) {
        EntitiesService.fireAShot(entity);
      }
      entity.bleedExternally();

      EntitiesService.stopBreathingForKilledEntity(entity);
      SquaresService.markAvailableDestinationsForSelectedEntity(entity);
      SquaresService.castLightsFromFriendlyEntity(entity);
    });

    return nextState;
  }

  processInterface() {
    this.setState(
      (prevState) => this.calculateNextInterfaceState(prevState),
      () => this.setSquaresAccordingToEntities()
    );
  }

  calculateNextInterfaceState(previousState: GameState) {
    let nextState = previousState;
    let { entities, selected } = nextState;
    entities.forEach((entity) => {
      if (entity == selected) SquaresService.markAvailableDestinationsForSelectedEntity(selected);
    });

    return nextState;
  }

  /** Sets entities within apropriate squares, based on the value of their `position` field
   * This might actually be not-needed, if movement of entities is reflected in their respectable squares
   * Also: entities are no longer rendered within `Square` component
   */
  setSquaresAccordingToEntities() {
    this.setState((previousState) => {
      let squares: Square[] = Helpers.newCopyOfArray(previousState.squares);
      /* 
      Reattach new squares array to the SquaresService 
      This might actually be not-needed, as elements of that array are objects 
      and are referenced in both arrays, so unless we're adding new squares, 
      everything should work without re-attaching
      */
      SquaresService.squares = squares;
      let entities: Entity[] = previousState.entities;

      Helpers.resetGivenFieldsOnACollection(squares, "entity");
      entities.forEach((entity) => {
        SquaresService.setEntityWithinApropriateSquare(entity);
      });

      return { squares };
    });
  }

  nextTick = () => {
    this.setState({ autoLoop: false });
    this.loop();
  };

  newHandleClick = (squareIndex: number) => {
    this.setState((state) => {
      let { squares, entities, selected, targeted, targetedSquareNumber: selectedSquareNumber } = state;
      let previousTargeted = targeted;
      targeted = squares[squareIndex];
      selectedSquareNumber = squareIndex;
      const doubleClick = () => previousTargeted === targeted;
      SquaresService.markSquareAsTargeted(squareIndex);

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
          this.deselectAllEntities();
          selected = undefined;
        }
      }

      // setting attack
      if (doubleClick() && selected && targeted.entity && selected !== targeted.entity) {
        selected.attackPosition(SquaresService.targetSquarePosition(squareIndex));
      }

      return { squares, entities, selected, targeted, targetedSquareNumber: selectedSquareNumber };
    }, this.processInterface);
  };

  nuke = (dmg: number) => {
    this.setState(
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
    this.setState({ isBoardRotated: !this.state.isBoardRotated });
  };

  switchAutoLoop = () => {
    this.setState(
      (previousState) => {
        return { autoLoop: !previousState.autoLoop };
      },
      () => {
        if (this.state.autoLoop) {
          this.loop();
        }
      }
    );
  };

  onInventoryClick = (entity: Entity, itemName: string) => {
    this.setState((prevState) => {
      let entities = [].concat(prevState.entities);
      EntitiesService.entities = entities;
      let entityId = EntitiesService.getEntityId(entity);
      let actualEntity = EntitiesService.findEntityById(entityId);
      let actualItem = EntitiesService.findItemOnEntity(actualEntity, itemName);

      if (actualEntity.equipment.hands && actualEntity.equipment.hands.name == itemName) {
        actualEntity.unEquipFromHands();
      } else {
        actualEntity.equipInHands(itemName);
      }

      return { entities };
    });
    console.log(entity, itemName);
  };

  handleDeselectAllEntities = () => {
    this.setState(
      (state) => {
        let { squares, entities, selected } = state;

        this.deselectAllEntities();
        selected = undefined;

        return { squares, entities, selected };
      },
      () => {
        //this.processEntities();
      }
    );
  };

  deselectAllEntities = () => {
    Helpers.resetGivenFieldsOnACollection(EntitiesService.entities, "active");
    Helpers.resetGivenFieldsOnACollection(SquaresService.squares, "isChosenDestination", "isAvailableDestination");
  };

  ceaseFire = () => {
    this.setState(
      (state) => {
        let { squares, entities, selected } = state;

        Helpers.resetGivenFieldsOnACollection(entities, "isShooting");

        return { squares, entities, selected };
      },
      () => {
        this.processInterface();
      }
    );
  };

  render() {
    // console.log("Rendering Game. #", this.renderCounter++);
    return (
      <div className={styles.game}>
        <div className={styles.game__board}>
          <Board
            squares={this.state.squares}
            entities={this.state.entities}
            onClick={(i) => this.newHandleClick(i)}
            size={this.state.arenaSize}
            isRotated={this.state.isBoardRotated}
          />
        </div>

        <div className={styles.game__info}>
          <div className={styles.actions}>
            <button onClick={this.toggleEditorMode} className={styles.button}>
              Editor Mode
            </button>
            <button
              onClick={() => {
                this.nuke(40);
              }}
              className={`${styles.button} ${styles["button-nuke"]}`}
            >
              Nuke All
            </button>
            <button onClick={this.ceaseFire} className={styles.button}>
              Cease Fire
            </button>

            <button onClick={this.toggleRotateBoard} className={styles.button}>
              Rotate Board
            </button>
            <button onClick={this.nextTick} className={styles.button}>
              Next Tick
            </button>

            <span className={styles["step-counter"]}>Tick: {this.stepNumber}</span>

            <label className={` ${styles.button} ${styles["auto-cycle"]}`}>
              <input type="checkbox" checked={this.state.autoLoop} onChange={this.switchAutoLoop} />
              <span>Auto Cycle</span>
            </label>
          </div>

          <div className={styles["interaction-container"]}>
            <SelectedEntityInfo
              selected={this.state.selected}
              handleDeselectAllEntities={this.handleDeselectAllEntities}
              onInventoryClick={this.onInventoryClick}
              processInterface={() => this.processInterface()}
            />

            <TargetedSquareInfo
              className={styles.targeted}
              squareNumber={this.state.targetedSquareNumber}
              squares={this.state.squares}
              selected={this.state.selected}
              targeted={this.state.targeted}
              onInventoryClick={this.onInventoryClick}
              processInterface={() => this.processInterface()}
            />
            <div></div>
          </div>
          <MessageBox />
        </div>

        <div className={styles.game__list}>
          <EntitiesList
            entities={this.state.entities}
            onInventoryClick={this.onInventoryClick}
            processInterface={() => this.processInterface()}
          />
        </div>
      </div>
    );
  }
}
