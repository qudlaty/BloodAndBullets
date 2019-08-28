import React from 'react';
import Board from './Board.js';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arenaSize: 11,
      squares: Array(121).fill(null),
      entities: Array(1).fill(null),
      stepNumber: 0,
      xIsNext: true,
      isLooping: false,
      cycle: 0,
    }

    this.loop = this.loop.bind(this);
    this.getSquare = this.getSquare.bind(this);
  }

  getSquare(x, y) {
    return this.state.squares[x * this.state.arenaSize + y];
  }

  setSquare(x, y, square) {
    let squares = this.state.squares.slice();
    squares[x* this.state.arenaSize + y] = square;
    this.setState({squares: squares});
  }

  loop() {
    this.state.isLooping = true;
    //this.handleBoardClick(this.state.cycle++);
    let squares = this.state.squares.slice();

    let newSquares = squares.map((square, number) => {
      if(square && square.value) {
        return square;
      }
    });
    this.setState({
      squares: newSquares
    });
    //requestAnimationFrame(this.loop);
    //setTimeout(this.loop, 500);
  }

  handleBoardClick(i) {
    let squares = this.state.squares.slice();
    if(!squares[i]) {
      squares[i] = {};
    }
    squares[i].value  = this.state.xIsNext ? '🤖' : '👨‍🚀';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
    if(!this.state.isLooping) {
      this.loop();
    }
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={(i) => this.handleBoardClick(i)}
            size={this.state.arenaSize}
          />
        </div>
        <div className="game-info">
          <ul>
            <li>Add an actual TODO list here.</li>
            <li>Make characters selectable</li>
            <li>Make selected characters movable</li>
          </ul>
        </div>
      </div>
    );
  }
};
