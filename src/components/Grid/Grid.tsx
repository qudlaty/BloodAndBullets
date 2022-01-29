import React from "react";
import { Cell } from "./Cell";
import "./Grid.scss";

interface GridProps {
  width: number;
  height: number;
  startAt: [number, number];
}

interface GridState {
  mapdrag: boolean,
  scroll: {
    x: number,
    y: number,
  }
}

export class Grid extends React.Component<GridProps, GridState> {
  gridReference;
  scroll = {
    x: 0,
    y: 0,
  }

  mapdrag = false;

  stateDriven = false;

  constructor(props) {
    super(props);
    this.state = {
      mapdrag: false,
      scroll: {
        x: 0,
        y: 0,
      }
    }

    this.gridReference = React.createRef();
  }

  scrollRelativeXY(deltaX: number, deltaY: number) {
    this.scroll.x -= deltaX;
    this.scroll.y -= deltaY;

    if(this.scroll.x <= 0) {
      this.scroll.x = 0;
    }
    if(this.scroll.y <= 0) {
      this.scroll.y = 0;
    }

    if(this.stateDriven) {
      this.setState({
        scroll: {
          x: this.scroll.x,
          y: this.scroll.y,
      }})
    }
    this.executeScroll();
  }

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
    return <div
      className="grid"
      ref={this.gridReference}
      onMouseDown={(e) => this.onMouseDown(e)}
      onMouseUp={(e) => this.onMouseUp(e)}
      onMouseMove={(e) => this.handleMove(e)}
      onContextMenu={(e)=>e.preventDefault()}
      onDrag={(e)=>this.onMouseDrag(e)}
      //onMouseOut={(e)=>this.onMouseOut(e)}
    >{rows}</div>;
  }

  handleMove(e) {
    if(!this.mapdrag) return;
    this.scrollRelativeXY(e.movementX, e.movementY);
  }

  onMouseDrag(e){
    console.log(e);
  }

  onMouseDown(e) {
    console.log(e.button);
    if(e.button === 2) {
      this.mapdrag = true;
    }
    e.preventDefault();
    console.log(this.mapdrag);
  }

  onMouseOut(e) {
    console.log("MOUSE OUT")
    this.mapdrag = false;
  }

  startDragging(e){
      this.mapdrag = true;
  }

  onMouseUp(e){
    console.log(e.button);
    if(e.button === 2) {
      this.mapdrag = false;
    }
    e.preventDefault();
    console.log(this.mapdrag);
  }

  onChangeScrollX(event) {
    console.log(event.target.value);
    this.scroll.x = event.target.value;
    this.executeScroll();
  }
  onChangeScrollY(event) {
    console.log(event.target.value)
    this.scroll.y = event.target.value;
    this.executeScroll();
  }

  executeScroll() {
    this.gridReference.current.scroll({
      top: this.scroll.y,
      left: this.scroll.x,
    });
  }

  switchStateDriven(e) {
    console.log(e.target.checked);
    this.stateDriven = e.target.checked;
  }

  render() {
    return <div className="grid-container">
      <pre className="gridDebugData">
        Width: {this.props.width}<br/>
        Height: {this.props.height}<br/>
        StartAt: {this.props.startAt[0]}, {this.props.startAt[1]}<br/>
        ScrollX: <input onChange={(e) => this.onChangeScrollX(e)}></input><br/>
        ScrollY: <input onChange={(e) => this.onChangeScrollY(e)}></input><br/>
        StateDriven: <input type="checkbox" onChange={(e)=>this.switchStateDriven(e)}></input><br/>

        State mapdrag: {this.state.mapdrag}<br/>
        State scrollX: {this.state.scroll.x}<br/>
        State scrollY: {this.state.scroll.y}<br/>
      </pre>
      {this.renderGrid()}
    </div>;
  }
}