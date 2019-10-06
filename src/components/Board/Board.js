import React from 'react';
import Square from '../Square';
import './Board.css';

export default class Board extends React.PureComponent {
  renderCounter = 0

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    console.log("Handles Click on Board", i);
    this.props.onClick(i);
  }

  renderSquare(i, rowId, colId) {
    return (
      <Square 
        key={i}
        squareId={i}
        value={this.props.squares[i] && this.props.squares[i].value} 
        rowNumber={rowId}
        colNumber={colId}
        onClick={this.handleClick}
      />
    );
  }

  render() {
    console.log("Rendering Board #", this.renderCounter++);
    let cellId=0; 
    let rowId=0;
    let colId;
    let rows = Array(this.props.size).fill(null).map((row, number) => {
      colId = 0;
      let cells = Array(this.props.size).fill(null).map((cell, number) => {
        return this.renderSquare(cellId++, rowId, colId++);
      });
      return ( 
        <div key={rowId++} className="board-row">
          {cells}
        </div>
      );
    });
    
    return (
      <div className="board">
        {rows}
      </div>
    );
  }
}
