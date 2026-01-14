import React from "react";

// services
import {
  EntitiesService,
  GameModel,
  GameActionsClassForGameComponent,
  WorldState,
  Entity,
  MessageService,
} from "services";

// components
import {
  Board,
  MessageBox,
  Controls,
  SlideInPanel,
  HudPanel,
  CursorMessage,
  DragScrollArea,
} from "components";
import TargetedSquareInfo from "./TargetedSquareInfo";
import SelectedEntityInfo from "./SelectedEntityInfo";

// others
import "./Game.scss";
import "./Game-HUD.scss";

let GameActions: GameActionsClassForGameComponent = null;

/** Game composes all the parts of the interface together */
export class Game extends React.PureComponent<void, WorldState> {
  renderCounter: number = 0;
  turnNumber: number = 0;

  constructor(props: void) {
    super(props);

    GameModel.loadBuiltInMap();
    GameModel.loadPredefinedEntitities();
    EntitiesService.setSelected(EntitiesService.findEntityById("Lazer Blady"));

    this.state = new WorldState();

    GameActions = new GameActionsClassForGameComponent(this);
    console.log("Initial state dump:", this.state);
  }

  componentDidMount() {
    this.startIfAutoLoopIsOn();
    MessageService.send("Mission loaded");
    GameActions.processInterface();
    GameActions.startUpdatingClickPositionCssVariables();
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
        <CursorMessage
          messageText={MessageService.cursorMessage}
          messageTimeInMs={1500}
          key={MessageService.cursorMessageNumber}
        ></CursorMessage>
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
        </section>
        <main className="section-main">
          <div className="game__board">
            <DragScrollArea boardIsRotated={this.state.isBoardRotated}>
              <Board
                squares={this.state.squares}
                entities={this.state.entities}
                onClick={i => GameActions.handleClickV2(i)}
                sizeX={this.state.arenaSizeX}
                sizeY={this.state.arenaSizeY}
                isRotated={this.state.isBoardRotated}
                isEditorOn={this.state.isEditorOn}
                style={{ fontSize: `${this.state.squareSize}px` }}
              />
            </DragScrollArea>
          </div>
          <section className="section-status">
            <MessageBox />
            <HudPanel title="=>">
              <button onClick={GameActions.endTurn} className="button next_tick next_turn">
                End Turn
              </button>
            </HudPanel>
          </section>
        </main>
        <SlideInPanel title="Actions" initiallyOpen={true}>
          <div className="game__info">
            <div className="actions">
              <button onClick={GameActions.toggleEditorMode}>Editor Mode</button>
              <button onClick={GameModel.saveMap}>Save Map</button>
              <button onClick={() => GameModel.loadMap(GameActions)}>Load Map</button>
              <button onClick={() => GameModel.generateMAP()}>Generate MAP</button>
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
              <span className="st ep-counter">Turn: {this.turnNumber}</span>
              <label className="button auto-cycle">
                <input
                  type="checkbox"
                  checked={this.state.isAutoLoopOn}
                  onChange={GameActions.switchAutoLoop}
                />
                <span>Auto Cycle</span>
              </label>
              <button onClick={GameActions.endTurn} className="button next_tick next_turn">
                End Turn
              </button>
              {/* <span className="info">
                Enemies alive: {this.state.enemiesAlive} <br />
                Friends alive: {this.state.friendsAlive} <br />
                {this.state.enemiesAlive && !this.state.friendsAlive ? "YOU LOST" : ""}
                {this.state.friendsAlive && !this.state.enemiesAlive ? "YOU WON" : ""}
              </span>
              &nbsp;
              <p className="instructions"></p>
              <span>Friends actions points: {this.calculateFriendlyActionPoints()} </span> */}
              {this.state.isEditorOn && (
                <>
                  <button onClick={() => GameActions.resetMap()} className="button">
                    Reset the map - all floor
                  </button>
                  <button onClick={() => GameActions.resetMap("nothing")} className="button">
                    Reset the map - all nothing
                  </button>
                  <button
                    onClick={() => {
                      this.setState({ mapBrush: "wall" });
                    }}
                    className="button"
                  >
                    MapBrush - Wall
                  </button>
                  <button
                    onClick={() => {
                      this.setState({ mapBrush: "floor" });
                    }}
                    className="button"
                  >
                    MapBrush - Floor
                  </button>
                  <button
                    onClick={() => {
                      this.setState({ mapBrush: null });
                    }}
                    className="button"
                  >
                    MapBrush - OFF
                  </button>
                  <button
                    onClick={() => {
                      GameModel.loadMapIntro();
                      GameActions.processInterface();
                    }}
                    className="button"
                  >
                    Load map: intro
                  </button>
                  <button
                    onClick={() => {
                      GameModel.loadMapA();
                      GameActions.processInterface();
                    }}
                    className="button"
                  >
                    Load map: mapA
                  </button>
                  <button
                    onClick={() => {
                      GameModel.loadTestMap16x16(GameActions);
                      GameActions.processInterface();
                    }}
                    className="button"
                  >
                    Load map: testMap16x16
                  </button>
                  <button
                    onClick={() => {
                      this.setState({ arenaSizeX: this.state.arenaSizeX + 1 });
                      GameActions.processInterface();
                    }}
                    className="button"
                  >
                    Arena Size X +
                  </button>
                  <button
                    onClick={() => {
                      this.state.arenaSizeX > 1 &&
                        this.setState({ arenaSizeX: this.state.arenaSizeX - 1 });
                      GameActions.processInterface();
                    }}
                    className="button"
                  >
                    Arena Size X -
                  </button>
                  <button
                    onClick={() => {
                      this.setState({ arenaSizeY: this.state.arenaSizeY + 1 });
                      GameActions.processInterface();
                    }}
                    className="button"
                  >
                    Arena Size Y +
                  </button>
                  <button
                    onClick={() => {
                      this.state.arenaSizeY > 1 &&
                        this.setState({ arenaSizeY: this.state.arenaSizeY - 1 });
                      GameActions.processInterface();
                    }}
                    className="button"
                  >
                    Arena Size Y -
                  </button>
                </>
              )}
            </div>
          </div>
        </SlideInPanel>
      </div>
    );
  }
}

export default Game;
