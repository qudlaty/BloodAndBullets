import React from 'react';
import Board from '../Board';
import EntitiesList from '../EntitiesList';
import EntitiesValues from './EntitiesValues';
import './Game.scss';

export default class Game extends React.PureComponent {
  /*
    We have `state.entities` and we have `squares`,
    both of which are representing the actual state of the game.
    Perhaps we should keep squares within the state.
  */
  renderCounter = 0
  stepNumber = 0
  //squares = Array(5*5).fill(null)

  constructor(props) {
    super(props);

    // Initial value of game state
    this.state = {
      selected: null,
      arenaSize: 10,
      isBoardRotated: false,
      entities: EntitiesValues,
      squares: [],
      autoLoop: true,
    }

    this.loop = this.loop.bind(this);
    this.getSquare = this.getSquare.bind(this);
    this.setSquare = this.setSquare.bind(this);
    this.toggleRotateBoard = this.toggleRotateBoard.bind(this);
  }

  componentDidMount(){
    this.loop();
  }

  setSquaresAccordingToEntities() {
    this.setState((previousState)=>{
      let squares = JSON.parse(JSON.stringify(previousState.squares));
      //let squares = previousState.squares;

      previousState.entities.forEach((entity)=>{
        this.setSquare(squares, entity.position.x, entity.position.y, entity);
      });

      return {squares};
    });
  }

  getSquare(squares, x, y) {
    return squares[this.targetSquareIndex(x, y)];
  }

  setSquare(squares, x, y, value) {
    squares[this.targetSquareIndex(x, y)] = value;
  }

  targetSquareIndex(x, y) {
    return y * this.state.arenaSize + x;
  }

  loop() {
    this.stepNumber++;
    this.setState( (previousState) => {
      // new copy of entities based on up-to-date state
      let localCopyOfPreviousState = JSON.parse(JSON.stringify(previousState));
      let { entities, squares } = localCopyOfPreviousState;

      let JR = entities[0];// a reference to JR
      if(JR.isBreathing){
        // John Rambo AI
        // changing the original JR entity within entities array
        this.moveEntityRandomly(squares, JR);
      }
      //console.log(entities);
      return {entities: entities, squares: squares};
    });

    this.processEntities();
    if(this.state.autoLoop) {
      setTimeout(this.loop, 1000);
    }
  }

  moveEntityRandomly(squares, entity) {
    // modifies entity in-place
    let oldPositionX = entity.position.x;
    let oldPositionY = entity.position.y;

    entity.position.x = entity.position.x +
      (Math.floor(Math.random()*2)) -
      (Math.floor(Math.random()*2));
    entity.position.y = entity.position.y +
      (Math.floor(Math.random()*2)) -
      (Math.floor(Math.random()*2));

    if(entity.position.x < 0) entity.position.x = 0;
    if(entity.position.y < 0) entity.position.y = 0;
    if(entity.position.x > this.state.arenaSize - 1) entity.position.x = this.state.arenaSize - 1;
    if(entity.position.y > this.state.arenaSize - 1) entity.position.y = this.state.arenaSize - 1;

    let newSquare = this.getSquare(squares, entity.position.x, entity.position.y);

    if (newSquare) {
      entity.position.x = oldPositionX;
      entity.position.y = oldPositionY;
    }

    if(
      oldPositionX !== entity.position.x ||
      oldPositionY !== entity.position.y
    ) {
      this.setSquare(squares, oldPositionX, oldPositionY, null);
    }

    // NO RETURN AS IT'S MODIFIED IN-PLACE return entity;
    // WHICH IS A BAD HABIT, BUT OH SO COMFY.
  }

  processEntities(){
    //console.log("Processing entities");
    this.setState((state) => {
      let localCopyOfEntities = JSON.parse(JSON.stringify(state.entities));
      localCopyOfEntities.forEach(entity => {

        if(entity.isShooting && entity.targetPosition && (
          entity.targetPosition.x !== entity.position.x ||
          entity.targetPosition.y !== entity.position.y
        )) {
          if(entity.rounds-- === 0) {
            entity.isShooting = false;
            entity.rounds = entity.maxRounds;
          }
          /*
          Searching for such an entity that its position is equal to our target position.
          */
          let targetEntities = localCopyOfEntities.filter((potentialTargetEntity) => {
            return potentialTargetEntity.position.x === entity.targetPosition.x &&
            potentialTargetEntity.position.y === entity.targetPosition.y
          });
          //console.log(targetEntities);
          targetEntities.forEach((targetEntity) => {
            if(targetEntity.hp <= 0) {
              entity.isShooting = false;
            }
            targetEntity.hp -= entity.damage;
          });
        }

        if(entity.hp <= 0){
          entity.hp = 0;
          entity.isBreathing = false;
        }

      });
      return {entities: localCopyOfEntities}
    },
      () => {
        this.setSquaresAccordingToEntities();
      }
    );

  }

  getEntityId(entity) {
    return entity.name;
  }

  findEntityById(entities, id) {
    let result = entities.filter((entity) => entity.name === id)[0];
    //console.log("found entity:", result);
    return result;
  }

  setSelected(entities, selected, value) {
    let selectedInEntities = this.findEntityById(entities, this.getEntityId(selected));
    if(value) {
      selected.active = value;
    } else {
      selected = null;
      console.log("Nullified:", selected);
    }
    selectedInEntities.active = value;
    return selected;
  }

  handleBoardClick(i) {
    //console.log("CLICKED ", i);
    const deselectAllEntities = (entities) => {
      entities.forEach((entity) => {
        entity.active = false;
      });
    };
    this.setState((previousState) => {
      let localCopyOfPreviousState = JSON.parse(JSON.stringify(previousState));
      let { entities, squares, selected } = localCopyOfPreviousState;

      if(squares[i]) {
        if(selected && !squares[i].isFriendly) {
          if(selected.name === previousState.squares[i].name) {
            selected = this.setSelected(entities, selected, false);
            console.log(selected);
          } else {
            let selectedEntity = this.findEntityById(entities, this.getEntityId(selected));
            selectedEntity.targetPosition = previousState.squares[i].position;
            if(selectedEntity.hasWeapon ) {
              selectedEntity.isShooting = true;
            }
          }
        } else {
          deselectAllEntities(entities);
          selected = squares[i];
          this.setSelected(entities, selected, true);
        }

      } else {
        /* Deselecting and stopping fire on all entities */
        deselectAllEntities(entities);
        entities.forEach(entity => {
          entity.isShooting = false;
        })
        selected = null;
      }

      return {entities, squares, selected}
    }, ()=> {
      this.processEntities();
    });

  }

  nuke(dmg){
    //console.log("Nuking")
    this.setState( (state) => {
      let localCopyOfEntities = JSON.parse(JSON.stringify(state.entities));
      localCopyOfEntities.forEach(entity => {
        entity.hp = entity.hp - dmg;
      });
      return {entities: localCopyOfEntities}
    }, () => {
      this.processEntities();
    });
  }


  toggleRotateBoard(){
    this.setState({isBoardRotated: !this.state.isBoardRotated});
  }

  switchAutoLoop = () => {
    this.setState((previousState) => {
      return {autoLoop: !previousState.autoLoop};
    },()=>{
      if(this.state.autoLoop) {
        this.loop();
      }
    });
  }

  render() {
    let boardClassName = this.state.isBoardRotated ? "rotated-board" : "";
    //console.log("Rendering Game. #", this.renderCounter++);
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={(i) => this.handleBoardClick(i)}
            size={this.state.arenaSize}
            className={boardClassName}
          />
          <EntitiesList
            entities={this.state.entities}
          />
          <div className="step-counter">{this.stepNumber}</div>
        </div>
        <div className="game-info">
          <span className="selected">Selected: {this.state.selected && this.state.selected.name}</span>
          <button
            onClick={
              ()=>{
                this.nuke(40);
              }
            }
            className="button button-nuke"
          >Nuke All</button>
          <button onClick={this.toggleRotateBoard} className="button">Rotate Board</button>
          <button onClick={this.loop} className="button">Next Step</button>
          <label><input type="checkbox" onChange={this.switchAutoLoop}/> Auto </label>
          <ul>
            <li>Click Ellen Ripley on the board, to select her.</li>
            <li>Click a target to shoot it.</li>
          </ul>
        </div>
      </div>
    );
  }
};
