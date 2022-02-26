import React from "react";
//import * as dat from "dat.gui";

// services
import { EntitiesService, SquaresService, GameModel, GameActionsClassForGameComponent, GameState } from "services";

// components
import { Board, MessageBox } from "components";
import TargetedSquareInfo from "./TargetedSquareInfo";
import SelectedEntityInfo from "./SelectedEntityInfo";


// others
import styles from "./Game.module.scss";

let GameActions = null;

/** Game composes all the parts of the interface */
export class Game extends React.PureComponent<void, GameState> {
  renderCounter: number = 0;
  stepNumber: number = 0;
  //dat;

  constructor(props: void) {
    super(props);

    GameModel.loadBuiltInMap();
    GameModel.loadPredefinedEntitities();
    //this.dat = new dat.GUI();
    this.state = new GameState();
    this.state.selected.active = true;
    GameActions = new GameActionsClassForGameComponent(this);
  }

  componentDidMount() {
    GameActions.loop();
  }

  zoomIn() {
    this.setState((prevState) => {
      return { squareSize: prevState.squareSize + 5 };
    });
  }
  zoomOut() {
    this.setState((prevState) => {
      return { squareSize: prevState.squareSize - 5 };
    });
  }
  render() {
    // console.log("Rendering Game. #", this.renderCounter++);
    return (
      <div className={styles.game}>
        <div className={styles.status}>
          Enemies to kill: {this.state.enemiesAlive}<br></br>
          {this.state.enemiesAlive ? '' : " Great Job. YOU WON." }
          {this.state.selected.isAlive ? '' : " Damn. YOU DIED." }
        </div>
        <p>
          L2P: Click friendly entity on the map, twice. Then click a target square to move, or target entity to attack.
        </p>
        <div className={styles.game__board}>
          <Board
            squares={this.state.squares}
            entities={this.state.entities}
            onClick={(i) => GameActions.handleClickV2(i)}
            size={this.state.arenaSize}
            isRotated={this.state.isBoardRotated}
            style={{fontSize: `${this.state.squareSize}px`}}
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
            <button onClick={()=> GameModel.loadMap(GameActions)} className={styles.button}>
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

            <button onClick={() => this.zoomIn()} className={styles.button}>
              Zoom In (+)
            </button>
            <button onClick={() => this.zoomOut()} className={styles.button}>
              Zoom Out (-)
            </button>

            <button onClick={GameActions.executeActions} className={styles.button}>
              Execute
            </button>




            <label className={` ${styles.button} ${styles["auto-cycle"]}`}>
              <input type="checkbox" checked={this.state.autoLoop} onChange={GameActions.switchAutoLoop} />
              <span>Auto Cycle</span>
            </label>

            <button onClick={GameActions.nextTick} className={styles.button}>
              Next Tick
            </button>

            <span className={styles["step-counter"]}>Tick: {this.stepNumber}</span>

            <span>Actions points: {this.state.selected.actionPoints} </span>
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
      </div>
    );
  }
}

export default Game;
