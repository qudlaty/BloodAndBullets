import React from "react";

// services
import {
  EntitiesService,
  GameModel,
  GameActionsClassForGameComponent,
  GameState,
  Entity,
  MessageService,
} from "services";

// components
import { Board, MessageBox, Controls, SlideInPanel } from "components";
import TargetedSquareInfo from "./TargetedSquareInfo";
import SelectedEntityInfo from "./SelectedEntityInfo";

// others
// import styles from "./Game.module.scss";
import "./Game.scss";
import "./Game-HUD.scss";

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
    console.log("Initial state dump:", this.state);
  }

  componentDidMount() {
    this.startIfAutoLoopIsOn();
    MessageService.send("Mission loaded");
    GameActions.processInterface();
  }

  startIfAutoLoopIsOn() {
    if (this.state.isAutoLoopOn) {
      GameActions.loop();
    }
  }

  calculateFriendlyActionPoints(): number {
    const startValue = 0;
    const apAdder = (previousValue: number, entity: Entity): number => {
      const result = previousValue + entity.actionPoints;
      return result;
    };
    return EntitiesService.entities
      .filter(entity => entity.isFriendly)
      .reduce(
        apAdder, // takes a previous value and an array element (entity), returns number (next value)
        startValue // start value for only the first iteration
      );
  }

  render() {
    // console.log("Rendering Game. #", this.renderCounter++);
    return (
      <div className="game game-hud">
        <section className="section-details">
          <SelectedEntityInfo
            selected={this.state.selected}
            handleDeselectAllEntities={GameActions.handleDeselectAllEntities}
            onInventoryClick={GameActions.onInventoryClick}
            processInterface={() => GameActions.processInterface()}
          />

          <TargetedSquareInfo
            className="targeted"
            squareNumber={this.state.targetedSquareNumber}
            squares={this.state.squares}
            selected={this.state.selected}
            targeted={this.state.targeted}
            onInventoryClick={GameActions.onInventoryClick}
            processInterface={() => GameActions.processInterface()}
          />
          <div></div>
        </section>
        <main className="section-main">
          <div className="game__board">
            <Board
              squares={this.state.squares}
              entities={this.state.entities}
              onClick={i => GameActions.handleClickV2(i)}
              size={this.state.arenaSize}
              isRotated={this.state.isBoardRotated}
              style={{ fontSize: `${this.state.squareSize}px` }}
            />
            <Controls
              keys={["W", "S", "A", "D", "space"]} // TODO: implement using this.
              onKeyPress={GameActions.handleKeyPress}
            ></Controls>
          </div>
          <section className="section-status">
            <MessageBox />
          </section>
        </main>
        <SlideInPanel title="Actions and Info" initiallyOpen={true}>
          <div className="game__info">
            <div className="actions">
              <button onClick={GameActions.toggleEditorMode}>Editor Mode</button>
              <button onClick={GameModel.saveMap}>Save Map</button>
              <button onClick={() => GameModel.loadMap(GameActions)}>Load Map</button>
              <button onClick={() => GameModel.getMap()}>Generate MAP</button>
              <button onClick={GameActions.toggleRotateBoard}>Rotate Board</button>
              <button onClick={GameActions.zoomIn}>Zoom In (+)</button>
              <button onClick={GameActions.zoomOut}>Zoom Out (-)</button>
              <button onClick={() => GameActions.nuke(40)} className="button-nuke">
                Nuke All
              </button>
              <button onClick={GameActions.ceaseFire}>Cease Fire</button>
              <button onClick={GameActions.executeActions} className="execute_actions">
                Execute Actions
              </button>
              <span className="step-counter">Tick: {this.stepNumber}</span>
              <label className="button auto-cycle">
                <input type="checkbox" checked={this.state.isAutoLoopOn} onChange={GameActions.switchAutoLoop} />
                <span>Auto Cycle</span>
              </label>
              <button onClick={GameActions.nextTick} className="button next_tick">
                Next Tick
              </button>
              <span className="info">
                Enemies alive: {this.state.enemiesAlive} <br />
                Friends alive: {this.state.friendsAlive} <br />
                {this.state.enemiesAlive && !this.state.friendsAlive ? "YOU LOST" : ""}
                {this.state.friendsAlive && !this.state.enemiesAlive ? "YOU WON" : ""}
              </span>
              &nbsp;
              <p className="instructions"></p>
              <span>Friends actions points: {this.calculateFriendlyActionPoints()} </span>
            </div>
          </div>
        </SlideInPanel>
      </div>
    );
  }
}

export default Game;
