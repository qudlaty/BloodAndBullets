import React from 'react';
import Board from '../Board';
import EntitiesList from '../EntitiesList';
import EntitiesValues from './EntitiesValues';

import * as ProcessingEntities from './ProcessingEntities';
import * as ProcessingSquares from './ProcessingSquares';

import './Game.scss';

export default class Game extends React.PureComponent {
  renderCounter = 0
  stepNumber = 0

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
  }

  componentDidMount(){
    this.loop();
  }

  setSquaresAccordingToEntities() {
    this.setState((previousState)=>{
      let squares = JSON.parse(JSON.stringify(previousState.squares));
      previousState.entities.forEach((entity)=>{
        ProcessingSquares.setEntityWithinASquare(
          squares, entity.position.x, entity.position.y, entity
        );
      });

      return {squares};
    });
  }

  loop = () => {
    this.stepNumber++;
    this.setState( (previousState) => {
      // new copy of entities based on up-to-date state
      let localCopyOfPreviousState = JSON.parse(JSON.stringify(previousState));
      let { entities, squares } = localCopyOfPreviousState;

      let JR = ProcessingEntities.findEntityById(entities, "John Rambo");
      let OP = ProcessingEntities.findEntityById(entities, "Squid");
      ProcessingEntities.moveEntityRandomly(squares, JR);
      ProcessingEntities.moveEntityRandomly(squares, OP);

      return {entities: entities, squares: squares};
    });

    this.processEntities();
    if(this.state.autoLoop) {
      setTimeout(this.loop, 1000);
    }
  }

  nextTurn = () => {
    this.setState({autoLoop: false});
    this.loop();
  }

  processEntities(){
    //console.log("Processing entities");
    this.setState((state) => {
      let localCopyOfEntities = JSON.parse(JSON.stringify(state.entities));
      let localCopyOfSquares = JSON.parse(JSON.stringify(state.squares));
      localCopyOfEntities.forEach(entity => {

        if(entity.isShooting && entity.targetPosition && (
          entity.targetPosition.x !== entity.position.x ||
          entity.targetPosition.y !== entity.position.y
        )) {// We are shooting and not targetting ourselves

          // should probably call a "calculateDamageApplied" method
          let damageApplied = 0;
          if(entity.rounds !== "empty" && entity.rounds > 0) {// if we still have ammo
            // spending ammo
            console.log("firing");
            entity.rounds--;
            damageApplied = entity.damage;
          } else if(entity.rounds === 0) {
            // stop shooting when magazine is empty
            entity.rounds = "empty";
            entity.isShooting = false;
            entity.damageApplied = 0;
          } else if(entity.rounds === "empty") {
            // when ordered to shoot with "empty" magazine state, load ammo instead
            entity.rounds = entity.maxRounds;
            entity.isShooting = false;
            entity.damageApplied = 0;
          }

          /*
          Searching for such an entity that its position is equal to our target position.
          */
          let targetEntities = localCopyOfEntities.filter((potentialTargetEntity) => {
            return (
              potentialTargetEntity.position.x === entity.targetPosition.x &&
              potentialTargetEntity.position.y === entity.targetPosition.y
            );
          });
          // console.log(targetEntities);
          // Processing found target entities
          targetEntities.forEach((targetEntity) => {
            // should probably call a "shoot" method
            // console.log("applying damage")
            if(damageApplied) {
              targetEntity.isBleeding = true;
            };
            targetEntity.hp -= damageApplied;
            if(targetEntity.hp <= 0) {
              entity.isShooting = false;
              console.log("target eliminated");
              return;
            }
          });

        }

        if(entity.isBleeding){
          if(entity.hp > 0){
            entity.hp -= 1;
            let square = ProcessingSquares.getSquare(localCopyOfSquares, entity.position.x, entity.position.y);
            ProcessingSquares.addBlood(square, 1);
          }
          console.log(entity.position.x, entity.position.y);
        }

        if(entity.hp <= 0){
          entity.hp = 0;
          entity.isBreathing = false;
        }

      });
      return {entities: localCopyOfEntities, squares: localCopyOfSquares}
    },
      () => {
        this.setSquaresAccordingToEntities();
      }
    );

  }

  setSelected(entities, selected, value) {
    let selectedInEntities = ProcessingEntities.findEntityById(
      entities,
      ProcessingEntities.getEntityId(selected)
    );
    if(value) {
      selected.active = value;
    } else {
      selected = null;
      console.log("Nullified:", selected);
    }
    selectedInEntities.active = value;
    return selected;
  }

  handleBoardClick = (i) => {
    //console.log("CLICKED ", i);
    const deselectAllEntities = (entities) => {
      entities.forEach((entity) => { entity.active = false; });
    };


    /* this should contain mostly function calls */


    this.setState((previousState) => {
      let localCopyOfPreviousState = JSON.parse(JSON.stringify(previousState));
      let { entities, squares, selected } = localCopyOfPreviousState;

      if(squares[i] && squares[i].entity) {// clicked an entity
        if(selected && !squares[i].entity.isFriendly) {
          // that is hostile, while we already have one selected
          if(selected.name === previousState.squares[i].entity.name) {
            // second click on a hostile entity deselects it
            selected = this.setSelected(entities, selected, false);
            console.log(selected);
          } else {// clicked a non-selected hostile entity - attack
            let selectedEntity = ProcessingEntities.findEntityById(
              entities,
              ProcessingEntities.getEntityId(selected)
            );
            selectedEntity.targetPosition =
              previousState.squares[i].entity.position;

            selectedEntity.isShooting = true;
          }

        } else {// clicked entity is friendly - select it
          deselectAllEntities(entities);
          selected = squares[i].entity;
          this.setSelected(entities, selected, true);
        }

      } else {// clicked an empty square
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

  nuke = (dmg) => {
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

  toggleRotateBoard = () => {
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
          <button onClick={this.nextTurn} className="button">Next Step</button>
          <span className="step-counter">Turn: {this.stepNumber}</span>
          <label className="auto-cycle button">
            <input type="checkbox" checked={this.state.autoLoop ? 'checked' : ''} onChange={this.switchAutoLoop}/>
            <span>Auto Cycle</span>
          </label>
          <ul>
            <li>Click Ellen Replay on the board, to select her.</li>
            <li>Click a target to shoot it.</li>
          </ul>
        </div>
        <div className="game-list">
          <EntitiesList
            entities={this.state.entities}
          />
        </div>
      </div>
    );
  }
};
