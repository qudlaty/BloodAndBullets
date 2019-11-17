import React from 'react';
import * as Helpers from '../../helpers'
import {SquaresService} from '../../services'

export default class InspectedSquareInfo extends React.Component {

    render(){
        //this.props.squareNumber
        let inspectedSquare = this.props.squares[this.props.squareNumber];
        let selected = this.props.selected;

        if(!inspectedSquare) {
            return <span>Nothing</span>
        }
        let squarePosition = SquaresService.targetSquarePosition(this.props.squareNumber);

        let distanceInfo = '';
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

        return (
        <div>
            <h3>Square Info</h3>
            <ul>
                {distanceInfo}
                <li>
                    Blood amount: {~~inspectedSquare.blood}
                </li>
            </ul>
        </div>
        );
    }
}
