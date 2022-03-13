import React from "react";

// services
import { EntitiesService, SquaresService, GameModel, GameActionsClassForGameComponent, GameState, Entity } from "services";

// components
import { Board, MessageBox } from "components";
import TargetedSquareInfo from "./TargetedSquareInfo";
import SelectedEntityInfo from "./SelectedEntityInfo";

// others
import styles from "./Game.module.scss";

let GameActions = null;

/** Game composes all the parts of the interface together */
export class Game extends React.PureComponent<void, GameState> {
  renderCounter: number = 0;
  stepNumber: number = 0;

  constructor(props: void) {
    super(props);

    GameModel.loadBuiltInMap();
    GameModel.loadPredefinedEntitities();
    EntitiesService.setSelected(EntitiesService.findEntityById("Lazer Blady"), true);

    this.state = new GameState();

    GameActions = new GameActionsClassForGameComponent(this);
    console.log('Initial state dump:', this.state);
  }

  componentDidMount() {
    this.startIfAutoLoopIsOn();
  }

  startIfAutoLoopIsOn(){
    if(this.state.isAutoLoopOn){
      GameActions.loop();
    }
  }

  calculateFriendlyActionPoints(): number{
    let startValue = 0;
    let apAdder = (previousValue: number, entity: Entity): number => {
      let result = previousValue + entity.actionPoints;
      return result;
    };
    return EntitiesService.entities.filter(entity => entity.isFriendly).reduce(
      apAdder, // takes a previous value and an array element (entity), returns number (next value)
      startValue // start value for only the first iteration
    );
  }

  render() {
    // console.log("Rendering Game. #", this.renderCounter++);
    return (
      <div className={styles.game}>
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
            <div className={styles.action_row}>
              <button onClick={GameActions.toggleEditorMode}>
                Editor Mode
              </button>
              <button onClick={GameModel.saveMap}>
                Save Map
              </button>
              <button onClick={()=> GameModel.loadMap(GameActions)}>
                Load Map
              </button>
            </div>

            <div className={styles.action_row}>
              <button onClick={GameActions.toggleRotateBoard}>
                Rotate Board
              </button>
              <button onClick={GameActions.zoomIn}>
                Zoom In (+)
              </button>
              <button onClick={GameActions.zoomOut}>
                Zoom Out (-)
              </button>
            </div>
            <div className={styles.action_row}>
              <button onClick={() => GameActions.nuke(40)} className={styles["button-nuke"]}>
                Nuke All
              </button>
              <button onClick={GameActions.ceaseFire}>
                Cease Fire
              </button>
              <button onClick={GameActions.executeActions} className={styles.execute_actions}>
                Execute Actions
              </button>
            </div>

            <div className={styles.action_row}>
              <span className={styles["step-counter"]}>Tick: {this.stepNumber}</span>

              <label className={` ${styles.button} ${styles["auto-cycle"]}`}>
                <input type="checkbox" checked={this.state.isAutoLoopOn} onChange={GameActions.switchAutoLoop} />
                <span>Auto Cycle</span>
              </label>

              <button onClick={GameActions.nextTick} className={styles.button + ' '+ styles.next_tick}>
                Next Tick
              </button>

            </div>

            <div className={styles.action_row}>
            <span>
                Enemies to kill: {this.state.enemiesAlive}
                {this.state.enemiesAlive ? '' : " Great Job. YOU WON." }
                {this.state.selected && this.state.selected.isAlive ? '' : " Damn. YOU DIED."
                  // TODO: calculate alive friendlies or a lose condition script here.
                }
              </span>
              &nbsp;
              <p className="instructions">

              </p>
              <span>Friendly actions points: {this.calculateFriendlyActionPoints()} </span>

            </div>
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
