import React from "react";

import Board from "../Board";
import EntitiesList from "../EntitiesList";
import TargetedSquareInfo from "./TargetedSquareInfo";
import SelectedEntityInfo from "./SelectedEntityInfo";
import { MessageBox } from "./MessageBox";

import { Entity } from "../../services/Entities";
import { Square } from "../../services/SquaresService";

import { EntitiesService, SquaresService } from "../../services";
import Entities from "../../services/EntitiesValues";
import * as Helpers from "../../helpers";

import GameLogic from "../../services/GameLogicService";
import GameModel from "../../services/GameModelService";

import styles from "./Game.module.scss";

/** Type of GameState */
export interface GameState {
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
    EntitiesService.entities = Entities;

    this.state = {
      entities: EntitiesService.entities,
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
    GameModel.loadBuiltInMap();
    this.loop();
  }

  toggleEditorMode = () => {
    if (!this.state.isEditorOn) {
      Helpers.resetGivenFieldsOnACollection(this.state.squares, "blood", "entity");
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
      (prevState) => GameLogic.calculateNextGameState(prevState),
      () => this.setSquaresAccordingToEntities()
    );
  }

  processInterface() {
    this.setState(
      (prevState) => GameLogic.calculateNextInterfaceState(prevState),
      () => this.setSquaresAccordingToEntities()
    );
  }

  /** Sets entities within apropriate squares, based on the value of their `position` field
   * This might actually be not-needed, if movement of entities is reflected in their respectable squares
   * Also: entities are no longer rendered within `Square` component
   */
  setSquaresAccordingToEntities() {
    this.setState((prevState) => GameLogic.syncSquaresWithEntities(prevState));
  }

  nextTick = () => {
    this.setState({ autoLoop: false });
    this.loop();
  };

  newHandleClick = (squareIndex: number) => {
    this.setState((state) => {
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
    this.setState(
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

  render() {
    // console.log("Rendering Game. #", this.renderCounter++);
    return (
      <div className={styles.game}>
        <p>
          L2P: Click friendly entity on the map, twice. Then click a target square to move, or target entity to attack.
        </p>
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
            <button onClick={GameModel.saveMap} className={styles.button}>
              Save Map
            </button>
            <button onClick={GameModel.loadMap} className={styles.button}>
              Load Map
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
