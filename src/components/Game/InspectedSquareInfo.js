import React from 'react';


export default class InspectedSquareInfo extends React.Component {

    render(){
        //this.props.squareNumber
        let inspectedSquare = this.props.squares[this.props.squareNumber];
        if(!inspectedSquare) {
            return <span>Nothing</span>
        }

        return (
        <div>
            <h3>Square Info</h3>
            <ul>
                <li>
                    Distance to selected: 
                </li>
                <li>
                    Blood amount:{inspectedSquare.blood}
                </li>
            </ul> 
        </div>
        );
    }
}