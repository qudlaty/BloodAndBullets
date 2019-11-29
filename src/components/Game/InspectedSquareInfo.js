import React from 'react';
import * as Helpers from '../../helpers';
import {SquaresService} from '../../services';
import EntityCard from '../EntityCard';

export default class InspectedSquareInfo extends React.Component {

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
        }

        if(squarePosition) {
          positionInfo = <li>Position: [ {squarePosition.x}, {squarePosition.y} ] </li>
        }

        if(inspectedSquare && inspectedSquare.blood) {
          bloodInfo = <li>Blood amount: {inspectedSquare.blood}</li>
        }

        return (
        <div className="inspected-square-info" >
            <h3>Square Info</h3>
            <ul>
                {positionInfo}
                {distanceInfo}
                {bloodInfo}
            </ul>
            {entityInfo}
        </div>
        );
    }
}
