import React, { ReactElement, DOMElement } from 'react';
import * as Helpers from '../../helpers/Helpers';
import {SquaresService, EntitiesService} from '../../services';
import EntityCard from '../EntityCard/EntityCard';
import { Square } from '../../services/SquaresService';
import { Entity, Position } from '../../services/EntitiesValues';

interface TargetedSquareInfoProps {
  className: string
  squareNumber: number
  squares: Square[]
  selected: Entity
  targeted: Square
  onInventoryClick: Function
  processInterface: Function
}

export default class TargetedSquareInfo extends React.Component<TargetedSquareInfoProps> {

  onMoveClick(selected: Entity, targetedSquarePosition: Position) {
    //EntitiesService.setMoveDestinationOnASelectedEntity(selected, targetedSquarePosition);
    selected.setMoveDestinationPosition(targetedSquarePosition);
    let targetedSquare: Square = SquaresService.getSquare(
      targetedSquarePosition.x,
      targetedSquarePosition.y
    );

    targetedSquare.isChosenDestination = true;
    this.props.processInterface();
  }

  onAttackClick(selected: Entity, targetedSquarePosition: Position) {
    selected.attackPosition(targetedSquarePosition);
    this.props.processInterface();
  }  

  render(){
    if(!this.props.targeted || Helpers.isSelectedTargeted(this.props.selected, this.props.targeted)){
      return null;
    }

    //this.props.squareNumber
    let inspectedSquare = this.props.targeted;
    let selected: Entity = this.props.selected;
    let targeted: Square = this.props.targeted;

    let targetedSquarePosition = SquaresService.targetSquarePosition(this.props.squareNumber);

    let entityInfo;
    let distanceInfo;
    let positionInfo;
    let bloodInfo;
    let availableActions = [];

    if(targeted && targeted.entity) {
      entityInfo = <EntityCard onInventoryClick={this.props.onInventoryClick} entity={targeted.entity} />
    }

    if(selected) {
      let distanceToSelected = Helpers.calculateDistance(
        targetedSquarePosition.x - selected.position.x,
        targetedSquarePosition.y - selected.position.y
      );
      
      distanceInfo = (
        <li>
          Distance to selected: {~~distanceToSelected}
        </li>
      );
      
      if(distanceToSelected !== 0) {
        if(targeted && targeted.isAvailableDestination){
          availableActions[0] = <button onClick={()=> this.onMoveClick(selected, targetedSquarePosition)} className='button'>Move</button>
        }
        if(targeted && targeted.entity){
          availableActions[1] = <button onClick={()=> this.onAttackClick(selected, targetedSquarePosition)} className='button'>Attack</button>
        }  
      }
    }

    if(targetedSquarePosition) {
      positionInfo = <li>Position: [ {targetedSquarePosition.x}, {targetedSquarePosition.y} ] </li>
    }

    if(inspectedSquare && inspectedSquare.blood) {
      bloodInfo = <li>Blood amount: {inspectedSquare.blood}</li>
    }

    return (
      <div className={this.props.className}>
        <strong>Target square Info</strong>
        <div>{entityInfo}</div>
        <div>{availableActions}</div>
        <ul>
          {positionInfo}
          {distanceInfo}
          {bloodInfo}
        </ul>
      </div>
    );
  }
}
