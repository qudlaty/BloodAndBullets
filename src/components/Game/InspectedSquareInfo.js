import React from 'react';
import * as Helpers from '../../helpers'
import {SquaresService} from '../../services'

export default class InspectedSquareInfo extends React.Component {

    render(){
        //this.props.squareNumber
        let inspectedSquare = this.props.squares[this.props.squareNumber];
        if(!inspectedSquare) {
            return <span>Nothing</span>
        }
        let squarePosition = SquaresService.targetSquarePosition(this.props.squareNumber);
        let distanceToSelected = Helpers.calculateDistance(squarePosition.x, squarePosition.y);

        return (
        <div>
            <h3>Square Info</h3>
            <ul>
                <li>
                    Distance to selected: {~~distanceToSelected}
                </li>
                <li>
                    Blood amount:{inspectedSquare.blood}
                </li>
            </ul> 
        </div>
        );
    }
}