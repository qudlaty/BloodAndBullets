import React, { ReactElement } from "react";
import { SquareComponent, EntityPawn } from "components";
import { Entity, Square } from "services";
import * as Helpers from "helpers";

import styles from "./Board.module.scss";

export interface BoardProps {
  onClick?(i: number): void;
  squares: Square[]; // updated every action
  entities: Entity[]; // updated every action
  size: number;
  isRotated: boolean;
  style: any;
}
/**
 * Board component renders the rectangular grid of Squares
 * and a layer of floating EntityPawns
 */
export class Board extends React.Component<BoardProps> {
  handleClick = (i: number) => {
    console.log("Handles Click on Board", i);
    this.props.onClick(i);
  };

  renderSquare(i: number, rowId: number, colId: number) {
    const square = this.props.squares[i];

    return (
      <SquareComponent // is a pureComponent
        key={`r${rowId}_c${i}`}
        squareId={i}
        className={Helpers.getCssClassesForAGivenSquare(square)}
        onClick={this.handleClick}
        blood={square && square.blood} // number
        items={square && square.items} // list of objects
        itemsNumber={square && square.items && square.items.length}
      ></SquareComponent>
    );
  }

  EntityPawns = (): ReactElement[] =>
    this.props.entities.map(entity => <EntityPawn key={entity.name} entity={entity} />);

  BoardSquares = () => {
    let cellId: number = 0;
    let rowId: number = 0;
    let colId: number;

    const rowsOfSquares = Array(this.props.size)
      .fill(null)
      .map((row, number) => {
        colId = 0;
        const cells = Array(this.props.size)
          .fill(null)
          .map((cell, number) => {
            return this.renderSquare(cellId++, rowId, colId++);
          });
        return (
          <div key={rowId++} className={styles["board__row"]}>
            {cells}
          </div>
        );
      });

    return rowsOfSquares;
  }; // Board Squares

  render() {
    let className: string = styles.board;
    if (this.props.isRotated) {
      className += ` ${styles["board--rotated"]} board--rotated`;
    }
    return (
      <div className={className} style={this.props.style}>
        {this.BoardSquares()}
        {this.EntityPawns()}
      </div>
    );
  }
}
