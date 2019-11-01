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
      arenaSize: 10,
      isBoardRotated: false,
      entities: EntitiesValues,
      squares: [],
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
    //console.log("settingSquaresAccordingToEntities")
    //New array of squares
    this.squares = Array(this.state.arenaSize*this.state.arenaSize).fill(null);// DRY

    // Copying **references to entities**
    // from state to proper squares according to position
    this.state.entities.forEach((entity)=>{
      this.setSquare(entity.position.x, entity.position.y, entity);
    });
    //console.log("New Squares:", this.squares)
    this.setState((state)=>{
      return {squares: this.squares};
    });
  }

  getSquare(x, y) {
    return this.squares[this.targetSquareIndex(x, y)];
  }

  setSquare(x, y, value) {
    this.squares[this.targetSquareIndex(x, y)] = value;
  }

  targetSquareIndex(x, y) {
    return y * this.state.arenaSize + x;
  }

  loop() {
    this.stepNumber++;
    this.setState( (state) => {
      // new copy of entities based on up-to-date state
      let entities = JSON.parse(JSON.stringify(state.entities));
      let JR = entities[0];// a reference to JR
      if(JR.isBreathing){
        // John Rambo AI
        // changing the original JR entity within entities array
        this.moveEntityRandomly(JR);
      }
      return {entities: entities};
    });

    this.processEntities();
    setTimeout(this.loop, 1000);
  }

  moveEntityRandomly(entity) {
    // modifies entity in-place
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
    // NO RETURN AS IT'S MODIFIED IN-PLACE return entity;
    // WHICH IS A BAD HABIT, BUT OH SO COMFY.
  }

  processEntities(){
    //console.log("Processing entities");
    this.setState((state) => {
      let localCopyOfEntities = JSON.parse(JSON.stringify(state.entities));
      localCopyOfEntities.forEach(entity => {

        if(entity.isShooting && entity.targetPosition) {
          let targetEntities = localCopyOfEntities.filter((potentialTargetEntity) => {
            return potentialTargetEntity.position.x === entity.targetPosition.x &&
            potentialTargetEntity.position.y === entity.targetPosition.y
          });
          console.log(targetEntities);
          targetEntities.forEach((targetEntity) => {
            targetEntity.hp -= entity.damage;
            if(targetEntity.hp <= 0) {
              entity.isShooting = false;
            }
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

  handleBoardClick(i) {
    //console.log("CLICKED ", i);
    var entities = JSON.parse(JSON.stringify(this.state.entities));
    entities.forEach((entity) => {
      entity.active = false;
    })
    if(this.squares[i]) {
      if(this.selected) {
        entities.forEach(entity => {
            entity.targetPosition = this.squares[i].position;
            if(entity.name === "Ellen Ripley") {
              entity.isShooting = true;
            }// FIXME: find the selected entity within entities array and modify it there.
        })
        //this.selected.target
        console.log("TARGET CHOSEN", this.selected.target)
      }
      // console.log("Clicked:", this.squares[i]);
      this.selected = this.squares[i];
      this.selected.active = true;

    } else {
      entities.forEach(entity => {
        entity.isShooting = false;
      })

      this.selected = this.squares[i];
    }

    this.setState({entities: entities});
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
          <span className="selected">Selected: {this.selected && this.selected.name}</span>
          <button
            onClick={
              ()=>{
                this.nuke(40);
              }
            }
            className="button button-nuke"
          >Nuke All</button>
          <button onClick={this.toggleRotateBoard} className="button">Rotate Board</button>
          <ul>
            <li>Click Ellen Ripley on the board, to select her.</li>
            <li>Click a target to shoot it.</li>
          </ul>
        </div>
      </div>
    );
  }
};
