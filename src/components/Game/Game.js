import React from 'react';
import Board from '../Board';
import EntitiesList from '../EntitiesList';
import InspectedSquareInfo from './InspectedSquareInfo'

import { EntitiesService, SquaresService } from '../../services';
import GameLogic from '../../services/GameLogicService'
import GameModel from '../../services/GameModelService'

import * as Helpers from '../../helpers';
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
      entities: GameModel.entities,
      squares: [],
      autoLoop: true,
      selectedSquareNumber: null,
    }
  }

  componentDidMount(){
    this.loop();
  }

  setSquaresAccordingToEntities() {
    this.setState((previousState)=>{
      let squares = JSON.parse(JSON.stringify(previousState.squares));
			Helpers.resetGivenFieldsOnACollection(squares, 'entity');
      previousState.entities.forEach((entity)=>{
        SquaresService.setEntityWithinASquare(
          squares, entity.position.x, entity.position.y, entity
        );
      });

      return {squares};
    });
  }

  calculateNextGameState(previousState) {
    let nextState = JSON.parse(JSON.stringify(previousState));
    let { entities, squares, selected } = nextState;
    EntitiesService.moveEntities(entities, squares, selected);
    entities.forEach(entity => {
      if(EntitiesService.isEntityShootingProperly(entity)) {
        EntitiesService.fireAShot(entities, entity);
      }
      entity = EntitiesService.applyEffectsOfBleeding(entity, squares);
      entity = EntitiesService.stopBreathingForKilledEntities(entity);
      SquaresService.markAvailableDestinationsForSelectedEntity(entity, squares)
    });

    return nextState;
  }
  calculateNextInterfaceState(previousState) {
    let nextState = JSON.parse(JSON.stringify(previousState));
    let { entities, squares, selected } = nextState;

    entities.forEach(entity => {

      SquaresService.markAvailableDestinationsForSelectedEntity(entity, squares)
    });

    return nextState;
  }

  processEntities() {
    this.setState(
      prevState => this.calculateNextGameState(prevState),
      () => this.setSquaresAccordingToEntities()
    );
  }

  processInterface() {
    this.setState(
      prevState => this.calculateNextInterfaceState(prevState),
      () => this.setSquaresAccordingToEntities()
    )
  }

  loop = () => {
    this.stepNumber++;

    this.processEntities();

    if(this.state.autoLoop) {
      setTimeout(this.loop, 1000);
    }
  }

  nextTick = () => {
    this.setState({autoLoop: false});
    this.loop();
  }

  handleBoardClick = (i) => {
    //console.log("CLICKED ", i);
    GameLogic.run();
    const deselectAllEntities = (entities) => {
      entities.forEach((entity) => { entity.active = false; });
    };

    /* this should contain mostly function calls */

    this.setState((previousState) => {
      let localCopyOfPreviousState = JSON.parse(JSON.stringify(previousState));
      let { entities, squares, selected, selectedSquareNumber } = localCopyOfPreviousState;
      selectedSquareNumber = i;

      if(squares[i] && squares[i].entity) {// clicked an entity
        let clickedEntity = squares[i].entity;
        if(selected && !clickedEntity.isFriendly) {


          // that is hostile, while we already have one selected
          if(selected.name === clickedEntity.name) {
            // second click on a hostile entity deselects it
            selected = EntitiesService.setSelected(entities, selected, false);
            console.log(selected);
          } else {// clicked a non-selected hostile entity - attack
            let selectedEntity = EntitiesService.findEntityById(
              entities,
              EntitiesService.getEntityId(selected)
            );
            selectedEntity.targetPosition = clickedEntity.position;
            selectedEntity.isShooting = true;
          }


        } else {// clicked entity is friendly - select it
          deselectAllEntities(entities);
          selected = clickedEntity;
          EntitiesService.setSelected(entities, selected, true);
					Helpers.resetGivenFieldsOnACollection(squares, 'isChosenDestination');
        }

      } else {// clicked an empty square
				if(squares[i] && squares[i].isAvailableDestination) {

					let position = SquaresService.targetSquarePosition(i);
					let entitiesAtGivenPosition = EntitiesService.getEntitiesAtGivenPosition(entities, selected.position);
					let entity = entitiesAtGivenPosition[0];
					entity && (entity.moveDestination = position);
					Helpers.resetGivenFieldsOnACollection(squares, 'isChosenDestination');
					squares[i].isChosenDestination = true;
				} else {
					// selected = null;
					// Helpers.resetGivenFieldsOnACollection(entities, 'active', 'isShooting');
					// Helpers.resetGivenFieldsOnACollection(squares, 'isChosenDestination', 'isAvailableDestination');
				}
      }

      return {entities, squares, selected, selectedSquareNumber}
    }, ()=> {
      this.processInterface();
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

      let entityId = EntitiesService.getEntityId(entity);
      let actualEntity = EntitiesService.findEntityById(entities, entityId);
      let actualItem = EntitiesService.findEntityById(actualEntity.inventory, itemName);

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
          <button onClick={this.nextTick} className="button">Next Tick</button>
          <span className="step-counter">Tick: {this.stepNumber}</span>
          <label className="auto-cycle button">
            <input type="checkbox" checked={this.state.autoLoop ? 'checked' : ''} onChange={this.switchAutoLoop}/>
            <span>Auto Cycle</span>
          </label>
          <ul>
            <li>Click Ellen Replay on the board, to select her.</li>
            <li>Click a target to shoot it.</li>
          </ul>

          <InspectedSquareInfo
            squareNumber = {this.state.selectedSquareNumber}
            squares = {this.state.squares}
            selected = {this.state.selected}
          />

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
