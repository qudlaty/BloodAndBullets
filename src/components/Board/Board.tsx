import React from "react";
import BoardSquare from "../Square";
import EntityPawn from "./EntityPawn";
import { Entity } from "../../services/EntitiesValues";
import { Square } from "../../services/SquaresService";

import "./Board.scss";

interface BoardProps {
  onClick(i: number): void;
  squares: Square[];
  entities: Entity[];
  className: string;
  size: number;
}

export default class Board extends React.PureComponent<BoardProps> {
  constructor(props: BoardProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    console.log("Handles Click on Board", i);
    this.props.onClick(i);
  }

  renderSquare(i: number, rowId: number, colId: number) {
    /*
    We pass one and the same function to all the Squares when rendering,
    so they do not detect getting a new fat-arrow function as a change of props.

    This is CRUCIAL to only rerender squares with changed values.

    Additionally, we need to ensure that Unchanged squares have the same values of objects passed down here.
    */
    let square = this.props.squares[i];
    let entity = this.props.squares[i] && this.props.squares[i].entity;
    return (
      <BoardSquare
        key={i}
        squareId={i + ""}
        onClick={this.handleClick}
        icon={entity && entity.icon}
        active={entity && entity.active}
        isBreathing={entity && entity.isBreathing}
        isDead={entity && entity.isDead}
        isShooting={entity && entity.isShooting}
        weaponType={entity && entity.equipment && entity.equipment.hands && entity.equipment.hands.type}
        position={entity && entity.position}
        targetPosition={entity && entity.targetPosition}
        blood={square && square.blood}
        items={square && square.items}
        isAvailableDestination={square && square.isAvailableDestination}
        isChosenDestination={square && square.isChosenDestination}
        isTargeted={square && square.isTargeted}
        isLit={square.isLit}
        isInTwilightZone={square.isInTwilightZone}
      />
    );
  }

  renderEntityPawns = () => this.props.entities.map((entity) => <EntityPawn entity={entity} />);

  render() {
    let cellId = 0;
    let rowId = 0;
    let colId;

    let rowsOfSquares = Array(this.props.size)
      .fill(null)
      .map((row, number) => {
        colId = 0;
        let cells = Array(this.props.size)
          .fill(null)
          .map((cell, number) => {
            return this.renderSquare(cellId++, rowId, colId++);
          });
        return (
          <div key={rowId++} className="board-row">
            {cells}
          </div>
        );
      });
    let entityPawns = this.renderEntityPawns();
    let className = "board " + this.props.className;
    return (
      <div className={className}>
        {rowsOfSquares}
        {entityPawns}
      </div>
    );
  }
}
