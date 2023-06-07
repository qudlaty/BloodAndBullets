import React from "react";
import { Cell } from "./Cell";
import "./Grid.scss";

interface GridProps {
  width: number;
  height: number;
  startAt: [number, number];
}

interface GridState {
}

export class Grid extends React.Component<GridProps, GridState> {

  renderGrid() {
    let rows = [];
    for(let y = 0; y <= this.props.height; y++) {
      let sourceY = this.props.startAt[1] + y;
      let currentRow = [];

      for(let x = 0; x <= this.props.width; x++) {
        let sourceX = this.props.startAt[0] + x;
        let currentCell = <Cell key={`$key_${sourceX}_${sourceY}`}>{sourceX}, {sourceY}</Cell>
        currentRow.push(currentCell);
      }
      rows.push(<div className="row"  key={`$key_X_${sourceY}`}>{currentRow}</div>);
    }
    return <div className="grid">
      {rows}
    </div>;
  }

  render() {
    return this.renderGrid();
  }
}