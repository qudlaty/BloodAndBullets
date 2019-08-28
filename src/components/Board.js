import React from 'react';
import Square from './Square.js';

export default class Board extends React.Component {
  renderSquare(i, rowId, colId) {
    return (
      <Square 
        key={i}
        value={this.props.squares[i] && this.props.squares[i].value} 
        rowNumber={rowId}
        colNumber={colId}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
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
