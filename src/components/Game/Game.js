import React from 'react';
import Board from '../Board';
import EntitiesList from '../EntitiesList';
import TargetedSquareInfo from './TargetedSquareInfo'

import { EntitiesService, SquaresService } from '../../services';
import GameLogic from '../../services/GameLogicService'
import GameModel from '../../services/GameModelService'

import * as Helpers from '../../helpers';
import './Game.scss';
import Square from '../Square/Square';

export default class Game extends React.PureComponent {
  renderCounter = 0
  stepNumber = 0

  constructor(props) {
    super(props);

    // Initial value of game state
    this.state = {
      targeted: null,
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
    SquaresService.squares = this.state.squares;
    this.loop();
  }

  setSquaresAccordingToEntities() {
    this.setState((previousState)=>{
      let squares = [].concat(previousState.squares);
      SquaresService.squares = squares;
      console.log('a', squares);
			Helpers.resetGivenFieldsOnACollection(squares, 'entity');
      previousState.entities.forEach((entity)=>{
        SquaresService.setEntityWithinASquare(
          entity.position.x, entity.position.y, entity
        );
      });
      console.log('b', squares);
      return {squares};
    });
  }

  calculateNextGameState(previousState) {
    let nextState = previousState;
    let { entities, squares, selected } = nextState;

    EntitiesService.moveEntities(entities, squares, selected);
    entities.forEach(entity => {
      if(EntitiesService.isEntityShootingProperly(entity)) {
        EntitiesService.fireAShot(entities, entity);
      }
      entity = EntitiesService.applyEffectsOfBleeding(entity, squares);
      entity = EntitiesService.stopBreathingForKilledEntities(entity);
      SquaresService.markAvailableDestinationsForSelectedEntity(entity)
    });

    return nextState;
  }
  calculateNextInterfaceState(previousState) {
    let nextState = previousState;
    let { entities, squares } = nextState;

    entities.forEach(entity => {

      SquaresService.markAvailableDestinationsForSelectedEntity(entity)
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


  newHandleClick = (squareIndex) => {
    this.setState( (state) => {
      let {squares, entities, selected, targeted, selectedSquareNumber} = state;

      targeted = squares[squareIndex];
      SquaresService.markSquareAsTargeted(squareIndex);

      if(!selected) {
        selected = EntitiesService.selectEntityFromGivenSquare(entities, squares, selected, targeted);
      } else if(selected.name === targeted.name){

      }
      selectedSquareNumber = squareIndex;

      console.log(selected, entities);
      return {squares, entities, selected, targeted, selectedSquareNumber};
    }, this.processEntities );
  }


  nuke = (dmg) => {
    //console.log("Nuking")
    this.setState( (state) => {
      let localCopyOfEntities = state.entities;
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
      let entities = [].concat(prevState.entities);

      let entityId = EntitiesService.getEntityId(entity);
      let actualEntity = EntitiesService.findEntityById(entities, entityId);
      let actualItem = EntitiesService.findEntityById(actualEntity.inventory, itemName);

      actualEntity.equipment.hands = actualItem;

      return {entities};
    });
    console.log(entity, itemName);
  }

  deselectAllEntities = () => {
    this.setState( (state) => {

      let {squares, entities, selected} = state;

      Helpers.resetGivenFieldsOnACollection(entities, 'active');
      Helpers.resetGivenFieldsOnACollection(squares, 'isChosenDestination');
      Helpers.resetGivenFieldsOnACollection(squares, 'isAvailableDestination');
      selected = undefined;

      return {squares, entities, selected}
    }, () => {
      //this.processEntities();
    });
  }

  ceaseFire = () => {
    this.setState( (state) => {
      let {squares, entities, selected} = state;

      Helpers.resetGivenFieldsOnACollection(entities, 'isShooting');

      return {squares, entities, selected}
    }, () => {
      this.processInterface();
    });
  }


  render() {
    let boardClassName = this.state.isBoardRotated ? "rotated-board" : "";
    // console.log("Rendering Game. #", this.renderCounter++);
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={(i) => this.newHandleClick(i)}
            size={this.state.arenaSize}
            className={boardClassName}
          />
        </div>

        <div className="game-info">

          <div className="selected">
            Selected: {this.state.selected && this.state.selected.name}
            <button onClick={this.deselectAllEntities} className="button"> Deselect</button>
          </div>
          <div>
            <button onClick={()=>{this.nuke(40);}} className="button button-nuke">Nuke All</button>
            <button onClick={this.ceaseFire} className="button">Cease Fire</button>
          </div>

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

          <TargetedSquareInfo
            squareNumber = {this.state.selectedSquareNumber}
            squares = {this.state.squares}
            selected = {this.state.selected}
            targeted = {this.state.targeted}
            onInventoryClick = {this.onInventoryClick}
            processInterface = {()=> this.processInterface()}
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
