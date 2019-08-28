import React from 'react';
import Board from './Board.js';
import EntitiesList from './EntitiesList.js';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arenaSize: 5,
      squares: Array(121).fill(null),
      entities: [{name: "John Rambo", age: 40, hp: 100}, {name: "Ellen Ripley", age: 30, hp: 65}],
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
          <EntitiesList
            entities={this.state.entities}
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
