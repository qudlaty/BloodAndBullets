import React from "react";
//import "./Cell.scss";

interface CellProps {
  children?: any;
}

interface CellState {
}

export class Cell extends React.PureComponent<CellProps, CellState> {

  state = {};

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   }
  // }

  render() {
    //console.log(`Rendering [${this.props.children}]`);
    return <div className="cell">{this.props?.children}</div>;
  }
}