import React from 'react';
import Board from '../Board';
import EntitiesList from '../EntitiesList';
import TargetedSquareInfo from './TargetedSquareInfo'

import { EntitiesService, SquaresService } from '../../services';
import GameLogic from '../../services/GameLogicService'
import GameModel from '../../services/GameModelService'

import * as Helpers from '../../helpers';
import './Game.scss';

import { Entity, Weapon } from '../../services/EntitiesValues';
import { Square } from '../../services/SquaresService';
import EntityCard from '../EntityCard/EntityCard';
import SelectedEntityInfo from './SelectedEntityInfo';
import { MessageBox } from './MessageBox';

interface GameState {
  targeted: Square,
  selected: Entity,
  arenaSize: number,
  isBoardRotated: boolean,
  entities: Entity[]
  squares: Square[],
  autoLoop: boolean,
  selectedSquareNumber: number,
}

export default class Game extends React.PureComponent<void, GameState> {
  renderCounter: number = 0
  stepNumber: number = 0

  constructor(props) {
    super(props);

    // Initial VALUE of game state
    this.state = {
      targeted: null,
      selected: null,
      arenaSize: 10,
      isBoardRotated: false,
      entities: GameModel.entities,
      squares: SquaresService.squares,
      autoLoop: true,
      selectedSquareNumber: null,
      
    }
  }

  componentDidMount(){
    //this.state.squares =SquaresService.squares;
    EntitiesService.entities = this.state.entities;
    this.loop();
  }

  setSquaresAccordingToEntities() {
    this.setState((previousState)=>{
      let squares: Square[] = [].concat(previousState.squares);
      let entities: Entity[] = previousState.entities;

      SquaresService.squares = squares;
      Helpers.resetGivenFieldsOnACollection(squares, 'entity');
      entities.forEach((entity)=>{
        SquaresService.setEntityWithinApropriateSquare(entity);
      });

      return { squares };
    });
  }

  calculateNextGameState(previousState: GameState) {
    let nextState: GameState = previousState;
    let { entities, squares, selected } = nextState;

    EntitiesService.moveEntities();
    entities.forEach(entity => {
      if(EntitiesService.isEntityShootingProperly(entity)) {
        EntitiesService.fireAShot(entity);
      }
      entity.bleedExternally();

      EntitiesService.stopBreathingForKilledEntity(entity);
      SquaresService.markAvailableDestinationsForSelectedEntity(entity)
    });

    return nextState;
  }

  calculateNextInterfaceState(previousState: GameState) {
    let nextState = previousState;
    let { entities } = nextState;

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

  isSelectedTargeted = (selected: Entity, targeted: Square): boolean => {
    if(selected && targeted && targeted.entity && selected.name === targeted.entity.name) {
      return true;
    }else {
      return false;
    }
  }

  newHandleClick = (squareIndex: number) => {
    this.setState( (state) => {
      let {squares, entities, selected, targeted, selectedSquareNumber} = state;
      let previousTargeted = targeted;
      targeted = squares[squareIndex];
      SquaresService.markSquareAsTargeted(squareIndex);

      if(previousTargeted === targeted || selected) {
        if(!selected) {
          selected = EntitiesService.selectEntityFromGivenSquare(selected, targeted);
          targeted = undefined;
        } else if(this.isSelectedTargeted(selected, targeted)){
          console.log('deselecting ')
          this.deselectAllEntities();
          selected = undefined;
        }
        selectedSquareNumber = squareIndex;
      }

      return {squares, entities, selected, targeted, selectedSquareNumber};
    }, this.processInterface );
  }


  nuke = (dmg: number) => {
    this.setState( (state) => {
      let { entities } = state;

      entities.forEach(entity => {
        entity.hp = entity.hp - dmg;
      });

      return {entities}
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
    }, ()=>{
      if(this.state.autoLoop) {
        this.loop();
      }
    });
  }

  onInventoryClick = (entity, itemName) => {
    this.setState((prevState) => {
      let entities = [].concat(prevState.entities);

      let entityId = EntitiesService.getEntityId(entity);
      let actualEntity = EntitiesService.findEntityById(entityId);
      let actualItem = EntitiesService.findItemOnEntity(actualEntity, itemName);

      actualEntity.equipment.hands = actualItem;

      if(actualItem instanceof Weapon){
        actualEntity.hasWeapon = true;
      }
      return {entities};
    });
    console.log(entity, itemName);
  }

  handleDeselectAllEntities = () => {
    this.setState( (state) => {
      let {squares, entities, selected} = state;

      this.deselectAllEntities();
      selected = undefined;
      
      return {squares, entities, selected}
    }, () => {
      //this.processEntities();
    });
  }

  deselectAllEntities = () => {
    Helpers.resetGivenFieldsOnACollection(EntitiesService.entities, 'active');
    Helpers.resetGivenFieldsOnACollection(SquaresService.squares, 'isChosenDestination', 'isAvailableDestination');
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

          <div className="actions">
            <button onClick={()=>{this.nuke(40);}} className="button button-nuke">Nuke All</button>
            <button onClick={this.ceaseFire} className="button">Cease Fire</button>

            <button onClick={this.toggleRotateBoard} className="button">Rotate Board</button>
            <button onClick={this.nextTick} className="button">Next Tick</button>

            <span className="step-counter">Tick: {this.stepNumber}</span>
            <label className="auto-cycle button">
              <input type="checkbox" checked={this.state.autoLoop} onChange={this.switchAutoLoop}/>
              <span>Auto Cycle</span>
            </label>
          </div>

          <div className="interaction-container">

            <SelectedEntityInfo 
              selected = {this.state.selected}
              handleDeselectAllEntities = {this.handleDeselectAllEntities}
              onInventoryClick = {this.onInventoryClick}            
            />

            <TargetedSquareInfo
              className="targeted"
              squareNumber = {this.state.selectedSquareNumber}
              squares = {this.state.squares}
              selected = {this.state.selected}
              targeted = {this.state.targeted}
              onInventoryClick = {this.onInventoryClick}
              processInterface = {()=> this.processInterface()}
            />
            <div>
              
            </div>

          </div>
          <MessageBox />
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
