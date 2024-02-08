import React from "react";
import "./Cell.scss";

interface CellProps {
  children?: any;
  style?: any;
}

interface CellState {}

/**
 * Renders children in a container with a "cell" CSS class
 */
export class Cell extends React.PureComponent<CellProps, CellState> {
  state = {};

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   }
  // }

  render() {
    //console.log(`Rendering [${this.props.children}]`);
    return (
      <div className="cell" style={this.props?.style}>
        <div className="cell__contents">{this.props?.children}</div>
      </div>
    );
  }
}
