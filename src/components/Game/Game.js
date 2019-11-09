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
			this.resetGivenFieldsOnACollection(squares, 'entity');
      previousState.entities.forEach((entity)=>{
        ProcessingSquares.setEntityWithinASquare(
          squares, entity.position.x, entity.position.y, entity
        );
      });

      return {squares};

    });
  }


  calculateNextGameState(previousState) {
    let nextState = JSON.parse(JSON.stringify(previousState));
    let { entities, squares, selected } = nextState;

    this.moveEntities(entities, squares, selected);

    entities.forEach(entity => {
      // this check should probably occur upon target verification
      if(this.isEntityShootingProperly(entity)) {
        // We are shooting and not targetting ourselves
        this.fireAShot(entities, entity);
      }

      entity = this.applyEffectsOfBleeding(entity, squares);
      entity = this.stopBreathingForKilledEntities(entity);
			this.markAvailableDestinationsForSelectedEntity(entity, squares)
    });

    return nextState;
  }

	resetGivenFieldsOnACollection(collection, ...fieldNames) {
		collection.forEach(
      item => {
        fieldNames.forEach(fieldName => {
          item && (item[fieldName] = false)
        });

      }
    );
	}

	markAvailableDestinationsForSelectedEntity(entity, squares, ) {

		if(entity.active) {
			let {x,y} = entity.position;

			this.resetGivenFieldsOnACollection(squares, 'isAvailableDestination');

			for(let j = y - 1; j <= y + 1; j++){
				if( j < 0 || j >= this.state.arenaSize){
					continue
				}
				for(let i = x - 1; i <= x + 1; i++){
					if( i < 0 || i >= this.state.arenaSize || (i == x && j == y)){
						continue
					}

					let square = ProcessingSquares.getSquare(squares, i, j );
					if(!square) {square={}}
					square.isAvailableDestination = true;
					ProcessingSquares.setSquare(squares, i, j, square);
				}
			}
		}
	}

  moveEntities(entities, squares, selected) {
		entities.forEach(
			entity => this.moveEntityIntoChosenDestinations(
				selected, entity
			)
		);
    let JR = ProcessingEntities.findEntityById(entities, "John Rambo");
    let OP = ProcessingEntities.findEntityById(entities, "Squid");
    ProcessingEntities.moveEntityRandomly(squares, JR);
    ProcessingEntities.moveEntityRandomly(squares, OP);

  }
	moveEntityIntoChosenDestinations(selected, entity){
		if(entity.isBreathing && entity.moveDestination) {
			entity.position = entity.moveDestination;
			selected.position = entity.position;
			delete entity.moveDestination;
		}
	}

  stopBreathingForKilledEntities(entity) {
    if(entity && entity.hp <= 0){
      entity.isBreathing = false;
      entity.hp = 0;
    }
    return entity;
  }

  applyEffectsOfBleeding(entity, squares) {
    if(entity.bleeding && entity.hp > 0) {
      entity.hp -= entity.bleeding ;
      let square = ProcessingSquares.getSquare(squares, entity.position.x, entity.position.y);
      ProcessingSquares.addBlood(square, entity.bleeding);
      entity.bleeding -= entity.bleedingReductionPerTurn || 1;
    }
    return entity;
  }

  isEntityShootingProperly(entity) {
    return entity.isShooting && entity.targetPosition && (
      entity.targetPosition.x !== entity.position.x ||
      entity.targetPosition.y !== entity.position.y
    );
  }

  getEntitiesAtGivenPosition(entities, targetPosition) {
    return entities.filter((potentialTargetEntity) => {
      return (
        potentialTargetEntity.position.x === targetPosition.x &&
        potentialTargetEntity.position.y === targetPosition.y
      );
    });
  }

  applyDamageToTargetEntity(targetEntity, damage) {
    if(damage) {
      targetEntity.hp -= damage;
      targetEntity.bleeding = 5;
    }
  }

  ceaseFireNextTurnIfTargetIsKilled(entity, targetEntity) {
    if(targetEntity.hp < 0) {
      //entity.isShooting = false;
      entity.ceaseFire = true;
    }
  }

  checkAmmoAndCalculateDamageApplied(entity) {
    let damageApplied = 0;
    if(entity.rounds !== "empty" && entity.rounds > 0) {// if we still have ammo
      entity.rounds--;
      damageApplied = entity.damage;
    }
    if(entity.rounds === 0) {
      entity.rounds = "empty";
    } else if(entity.rounds === "empty") {
      // when ordered to shoot with "empty" magazine state, load ammo instead
      entity.rounds = entity.maxRounds;
      entity.isShooting = false;
      entity.damageApplied = 0;
    }
    return damageApplied;
  }

  fireAShot(entities, entity) {
    if(entity.ceaseFire) {
      entity.isShooting = false;
      entity.ceaseFire = false;
      return;
    }
    let damageApplied = this.checkAmmoAndCalculateDamageApplied(entity);
    let targetEntities =
      this.getEntitiesAtGivenPosition(entities, entity.targetPosition);
    targetEntities.forEach((targetEntity) => {
      this.applyDamageToTargetEntity(targetEntity, damageApplied);
      this.ceaseFireNextTurnIfTargetIsKilled(entity, targetEntity);
    });
  }

  processEntities() {
    this.setState(
      prevState => this.calculateNextGameState(prevState),
      () => this.setSquaresAccordingToEntities()
    );
  }

  loop = () => {
    this.stepNumber++;

    this.processEntities();

    if(this.state.autoLoop) {
      setTimeout(this.loop, 1000);
    }
  }

  nextTurn = () => {
    this.setState({autoLoop: false});
    this.loop();
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
					this.resetGivenFieldsOnACollection(squares, 'isChosenDestination');
        }

      } else {// clicked an empty square
        /* Deselecting and stopping fire on all entities */
				if(squares[i] && squares[i].isAvailableDestination) {

					let position = ProcessingSquares.targetSquarePosition(i);
					let entitiesAtGivenPosition = this.getEntitiesAtGivenPosition(entities, selected.position);
					let entity = entitiesAtGivenPosition[0];
					entity && (entity.moveDestination = position);
					this.resetGivenFieldsOnACollection(squares, 'isChosenDestination');
					squares[i].isChosenDestination = true;
				} else {
					selected = null;
					this.resetGivenFieldsOnACollection(entities, 'active', 'isShooting');
					this.resetGivenFieldsOnACollection(squares, 'isChosenDestination', 'isAvailableDestination');
				}
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

  onInventoryClick = (entity, itemName) => {
    this.setState((prevState) => {
      let nextState = JSON.parse(JSON.stringify(prevState));
      let {entities} = nextState;

      let entityId = ProcessingEntities.getEntityId(entity);
      let actualEntity = ProcessingEntities.findEntityById(entities, entityId);
      let actualItem = ProcessingEntities.findEntityById(actualEntity.inventory, itemName);

      actualEntity.equipment.hands = actualItem;

      return nextState
    });

    console.log(entity, itemName);
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
            onInventoryClick= {this.onInventoryClick}
          />
        </div>
      </div>
    );
  }
};
