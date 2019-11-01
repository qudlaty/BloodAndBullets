import React from 'react';
import Board from '../Board';
import EntitiesList from '../EntitiesList';
import EntitiesValues from './EntitiesValues';
import './Game.scss';

export default class Game extends React.PureComponent {

  renderCounter = 0
  stepNumber = 0
  squares = Array(5*5).fill(null)

  constructor(props) {
    super(props);

    // Initial value of game state
    this.state = {
      arenaSize: 10,
      isBoardRotated: false,
      entities: EntitiesValues,
    }

    this.loop = this.loop.bind(this);
    this.getSquare = this.getSquare.bind(this);
    this.setSquare = this.setSquare.bind(this);
    this.toggleRotateBoard = this.toggleRotateBoard.bind(this);
  }

  componentDidMount(){
    this.setSquaresAccordingToEntities();
    this.loop();
  }

  setSquaresAccordingToEntities() {
    //console.log("settingSquaresAccordingToEntities")
    this.squares = Array(this.state.arenaSize*this.state.arenaSize).fill(null);// DRY
    this.state.entities.forEach((entity)=>{
      this.setSquare(entity.position.x, entity.position.y, entity);
    });
    //console.log("New Squares:", this.squares)
  }

  getSquare(x, y) {
    return this.squares[x * this.state.arenaSize + y];
  }

  setSquare(x, y, value) {
    let targetSquareIndex = y* this.state.arenaSize + x;
    //console.log("Setting square #",targetSquareIndex, "as", square);
    this.squares[targetSquareIndex] = value;
    //console.log("this.squares:", this.squares);
  }

  loop() {
    this.stepNumber++;
    this.setState( (state) => {

      var entities = JSON.parse(JSON.stringify(state.entities));
      var JR = entities[0];

      if(JR.isBreathing){
        //John Rambo AI
        JR.position.x = JR.position.x +
          1 * (Math.floor(Math.random()*2)) -
          1 * (Math.floor(Math.random()*2));
        JR.position.y = JR.position.y +
          1 * (Math.floor(Math.random()*2)) -
          1 * (Math.floor(Math.random()*2));

        if(JR.position.y < 0) JR.position.y = 0;
        if(JR.position.x < 0) JR.position.x = 0;

        if(JR.position.y > this.state.arenaSize - 1) JR.position.y = 4;
        if(JR.position.x > this.state.arenaSize - 1) JR.position.x = 4;
      }
      return {entities: entities};
    });

    //console.log("---");
    //console.log(this.state);
    this.processEntities();
    setTimeout(this.loop, 1000);
  }

  processEntities(){
    //console.log("Processing entities");
    //this.setState({entities: localCopyOfEntities});
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
      //console.log("Processing entities setting state:");
      //console.log(localCopyOfEntities);
      return {entities: localCopyOfEntities}
    });
    this.setSquaresAccordingToEntities();
  }

  handleBoardClick(i) {
    // console.log("CLICKED ", i);
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

        //console.log("hi " + entity.hp);
        entity.hp = entity.hp - dmg;
      });
      // console.log("Nuking setting state")
      // console.log(localCopyOfEntities)
      return {entities: localCopyOfEntities}
    }, () => {

      // console.log('callback after nuking');
      // console.log(this.state);

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
            squares={this.squares}
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
