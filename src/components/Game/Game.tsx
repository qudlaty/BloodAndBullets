import React from "react";
import * as dat from "dat.gui";

import Board from "../Board";
import EntitiesList from "../EntitiesList";
import TargetedSquareInfo from "./TargetedSquareInfo";
import SelectedEntityInfo from "./SelectedEntityInfo";
import { MessageBox } from "./MessageBox";
import { GameActionsClass } from "./GameActions";
import { Entity, EntitiesService, Square, SquaresService, GameLogic, GameModel } from "../../services";

import styles from "./Game.module.scss";
import { GameState } from "./GameState";

let GameActions = null;

/** Game composes all the parts of the interface */
export default class Game extends React.PureComponent<void, GameState> {
  renderCounter: number = 0;
  stepNumber: number = 0;
  dat;

  constructor(props: void) {
    super(props);

    GameModel.loadBuiltInMap();
    GameModel.loadPredefinedEntitities();
    this.dat = new dat.GUI();
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
    GameActions = new GameActionsClass(this);
  }

  componentDidMount() {
    GameActions.loop();
  }

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
            onClick={(i) => GameActions.newHandleClick(i)}
            size={this.state.arenaSize}
            isRotated={this.state.isBoardRotated}
          />
        </div>

        <div className={styles.game__info}>
          <div className={styles.actions}>
            <button onClick={GameActions.toggleEditorMode} className={styles.button}>
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
                GameActions.nuke(40);
              }}
              className={`${styles.button} ${styles["button-nuke"]}`}
            >
              Nuke All
            </button>
            <button onClick={GameActions.ceaseFire} className={styles.button}>
              Cease Fire
            </button>

            <button onClick={GameActions.toggleRotateBoard} className={styles.button}>
              Rotate Board
            </button>
            <button onClick={GameActions.nextTick} className={styles.button}>
              Next Tick
            </button>

            <span className={styles["step-counter"]}>Tick: {this.stepNumber}</span>

            <label className={` ${styles.button} ${styles["auto-cycle"]}`}>
              <input type="checkbox" checked={this.state.autoLoop} onChange={GameActions.switchAutoLoop} />
              <span>Auto Cycle</span>
            </label>
          </div>

          <div className={styles["interaction-container"]}>
            <SelectedEntityInfo
              selected={this.state.selected}
              handleDeselectAllEntities={GameActions.handleDeselectAllEntities}
              onInventoryClick={GameActions.onInventoryClick}
              processInterface={() => GameActions.processInterface()}
            />

            <TargetedSquareInfo
              className={styles.targeted}
              squareNumber={this.state.targetedSquareNumber}
              squares={this.state.squares}
              selected={this.state.selected}
              targeted={this.state.targeted}
              onInventoryClick={GameActions.onInventoryClick}
              processInterface={() => GameActions.processInterface()}
            />
            <div></div>
          </div>
          <MessageBox />
        </div>

        <div className={styles.game__list}>
          <EntitiesList
            entities={this.state.entities}
            onInventoryClick={GameActions.onInventoryClick}
            processInterface={() => GameActions.processInterface()}
          />
        </div>
      </div>
    );
  }
}
