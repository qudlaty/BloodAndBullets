import React from 'react';
import * as Helpers from '../../helpers/Helpers';
import {SquaresService} from '../../services';
import EntityCard from '../EntityCard/EntityCard';

export default class TargetedSquareInfo extends React.Component {

    render(){
        //this.props.squareNumber
        let inspectedSquare = this.props.targeted;
        let selected = this.props.selected;
        let targeted = this.props.targeted;

        let squarePosition = SquaresService.targetSquarePosition(this.props.squareNumber);

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
            squarePosition.x - selected.position.x,
            squarePosition.y - selected.position.y
          );
          
          distanceInfo = (
            <li>
              Distance to selected: {~~distanceToSelected}
            </li>
          );
          
          if(distanceToSelected !== 0){
            availableActions[0] = <div><button>Action</button></div>
            if(targeted && targeted.isAvailableDestination){
              availableActions[1] = <div><button>Move</button></div>
            }
            if(targeted && targeted.entity){
              availableActions[2] = <div><button>Attack</button></div>
            }
            
            }
        }

        if(squarePosition) {
          positionInfo = <li>Position: [ {squarePosition.x}, {squarePosition.y} ] </li>
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
