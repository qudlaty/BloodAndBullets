import React from "react";
import "./DragScrollArea.scss";

interface DragScrollAreaProps {
  children: JSX.Element;
}

interface DragScrollAreaState {
  mapdrag: boolean,
  scroll: {
    x: number,
    y: number,
  }
}

export class DragScrollArea extends
  React.Component<DragScrollAreaProps, DragScrollAreaState> {
  areaReference;
  scroll = {
    x: 0,
    y: 0,
  }

  mapdrag = false;

  constructor(props) {
    super(props);
    this.areaReference = React.createRef();
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

    this.executeScroll();
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

  executeScroll() {
    this.areaReference.current.scroll({
      top: this.scroll.y,
      left: this.scroll.x,
    });
  }

  render() {
    return <div
      className="drag-scroll-area drag-scroll-area-external"
      ref={this.areaReference}
      onMouseDown={(e) => this.onMouseDown(e)}
      onMouseUp={(e) => this.onMouseUp(e)}
      onMouseMove={(e) => this.handleMove(e)}
      onContextMenu={(e)=>e.preventDefault()}
      onDrag={(e)=>this.onMouseDrag(e)}
      //onMouseOut={(e)=>this.onMouseOut(e)}
    >
      <div className="drag-scroll-area drag-scroll-area-internal">
        {
          this.props.children
        }
      </div>
    </div>;
  }
}