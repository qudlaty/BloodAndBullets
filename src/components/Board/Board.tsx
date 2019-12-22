import React from "react";
import Square from "../Square";
import "./Board.scss";
import { Entity } from "../../services/EntitiesValues";
import EntityPawn from "./EntityPawn";

interface BoardProps {
  onClick(i: number);
  squares: any;
  entities: Entity[];
  className: string;
  size: number;
}

export default class Board extends React.PureComponent<BoardProps> {
  renderCounter = 0;

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    console.log("Handles Click on Board", i);
    this.props.onClick(i);
  }

  renderSquare(i, rowId, colId) {
    /*
    We pass one and the same function to all the Squares when rendering,
    so they do not detect getting a new fat-arrow function as a change of props.

    This is CRUCIAL to only rerender squares with changed values.

    Additionally, we need to ensure that Unchanged squares have the same values of objects passed down here.
    */
    let square = this.props.squares[i];
    let entity = this.props.squares[i] && this.props.squares[i].entity;
    return (
      <Square
        key={i}
        squareId={i}
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
    // console.log("Rendering Board. #", this.renderCounter++);

    // Initial values for the Board
    let cellId = 0;
    let rowId = 0;
    let colId;

    let rows = Array(this.props.size)
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

    let className = "board " + this.props.className;

    let entityPawns = this.renderEntityPawns();
    return (
      <div className={className}>
        {rows}
        {entityPawns}
      </div>
    );
  }
}
