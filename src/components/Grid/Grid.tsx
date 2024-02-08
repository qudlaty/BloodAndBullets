import React from "react";
import { Cell } from "./Cell";
import "./Grid.scss";

interface GridProps {
  width: number;
  height: number;
  startAt: [number, number];
}

interface GridState {}
/**
 * Renders a grid starting from a certain position
 */
export class Grid extends React.Component<GridProps, GridState> {
  renderGrid() {
    const rows = [];
    for (let y = 0; y <= this.props.height; y++) {
      const sourceY = this.props.startAt[1] + y;
      const currentRow = [];

      for (let x = 0; x <= this.props.width; x++) {
        const sourceX = this.props.startAt[0] + x;
        const currentCell = (
          <Cell key={`$key_${sourceX}_${sourceY}`}>
            {sourceX}, {sourceY}
          </Cell>
        );
        currentRow.push(currentCell);
      }

      const rowStyle = { gridTemplateColumns: `repeat(${this.props.width + 1}, 40px)` };
      rows.push(
        <div className="row" key={`$key_X_${sourceY}`} style={rowStyle}>
          {currentRow}
        </div>
      );
    }
    const gridStyle = { gridTemplateRows: `repeat(${this.props.height + 1}, 40px)` };

    return (
      <div className="grid" style={gridStyle}>
        {rows}
      </div>
    );
  }

  render() {
    return this.renderGrid();
  }
}
