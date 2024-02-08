import React from "react";
import { Cell } from "./Cell";
import "./Grid.scss";

interface GridProps {
  /** size of the grid square in pixels */
  cellSize?: number;
  /** size of the grid gap between squares in pixels */
  gapSize?: number;
  /** width of the grid in number of squares */
  width: number;
  /** height of the grid in number of squares */
  height: number;
  /** params given to the first square (top left one) */
  startAt: [number, number];
  /** color for the cell border */
  cellBorderColor?: string;
}

interface GridState {}
/**
 * Renders a grid X by Y, starting from a given position
 */
export class Grid extends React.Component<GridProps, GridState> {
  renderGrid() {
    const { cellSize, gapSize, width, height, startAt, cellBorderColor } = this.props;
    const rows = [];

    const cellStyle = cellSize > -1 ? { fontSize: `${cellSize}px` } : {};
    const gapStyle = gapSize > -1 ? { gridGap: `${gapSize}px ${gapSize}px` } : {};
    const rowStyle = {
      gridTemplateColumns: `repeat(${width + 1}, 1em)`,
      ...gapStyle,
    };
    const gridStyle = {
      gridTemplateRows: `repeat(${height + 1}, 1em)`,
      ...gapStyle,
      ...cellStyle,
    };
    const borderStyle = cellBorderColor ? { border: `1px solid ${cellBorderColor}` } : {};

    for (let y = 0; y <= height; y++) {
      const sourceY = startAt[1] + y;
      const currentRow = [];

      for (let x = 0; x <= width; x++) {
        const sourceX = startAt[0] + x;
        const currentCell = (
          <Cell key={`$key_${sourceX}_${sourceY}`} style={borderStyle}>
            {sourceX}, {sourceY}
          </Cell>
        );
        currentRow.push(currentCell);
      }

      rows.push(
        <div className="row" key={`$key_X_${sourceY}`} style={rowStyle}>
          {currentRow}
        </div>
      );
    }

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
