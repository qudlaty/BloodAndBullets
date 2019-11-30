import React from 'react';
import * as Helpers from '../../helpers/Helpers';
import {SquaresService, EntitiesService} from '../../services';
import EntityCard from '../EntityCard/EntityCard';

export default class TargetedSquareInfo extends React.Component {

  onMoveClick(selected, targetedSquarePosition){
    EntitiesService.setMoveDestinationOnASelectedEntity(selected, targetedSquarePosition);
    
    let targetedSquare = SquaresService.getSquare(
      targetedSquarePosition.x,
      targetedSquarePosition.y
    );

    targetedSquare.isChosenDestination = true;
    this.props.processInterface();
  }

    render(){
        //this.props.squareNumber
        let inspectedSquare = this.props.targeted;
        let selected = this.props.selected;
        let targeted = this.props.targeted;

        let targetedSquarePosition = SquaresService.targetSquarePosition(this.props.squareNumber);

        let entityInfo = '';
        let distanceInfo = '';
        let positionInfo = '';
        let bloodInfo = '';
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
          
          if(distanceToSelected !== 0){
            availableActions[0] = <div><button className='button'>Action</button></div>
            if(targeted && targeted.isAvailableDestination){
              availableActions[1] = <div><button onClick={()=> this.onMoveClick(selected, targetedSquarePosition)} className='button'>Move</button></div>
            }
            if(targeted && targeted.entity){
              availableActions[2] = <div><button className='button'>Attack</button></div>
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
        <div className="inspected-square-info" >
          <h3>Target square Info</h3>
            <ul>
                {positionInfo}
                {distanceInfo}
                {bloodInfo}
            </ul>
            {availableActions}
            {entityInfo}
            
        </div>
        );
    }
}
