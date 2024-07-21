import React from "react";
import "./DragScrollArea.scss";

interface DragScrollAreaProps {
  children: JSX.Element;
}

interface DragScrollAreaState {}

/** Drag with right mouse button, to move content around */
export class DragScrollArea extends React.Component<DragScrollAreaProps, DragScrollAreaState> {
  areaReference;
  scroll = {
    x: 0,
    y: 0,
  };

  constructor(props) {
    super(props);
    this.areaReference = React.createRef();
  }

  scrollRelativeXY(deltaX: number, deltaY: number) {
    this.scroll.x -= deltaX;
    this.scroll.y -= deltaY;

    if (this.scroll.x <= 0) {
      this.scroll.x = 0;
    }
    if (this.scroll.y <= 0) {
      this.scroll.y = 0;
    }

    this.executeScroll();
  }

  onMouseDown = e => {
    if (e.button === 2) {
      document.addEventListener("mouseup", this.onMouseUp);
      document.addEventListener("mousemove", this.onMouseMove);
      e.preventDefault();
    }
  };

  onMouseMove = e => {
    this.scrollRelativeXY(e.movementX, e.movementY);
  };

  onMouseUp = e => {
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("mousemove", this.onMouseMove);
    e.preventDefault();
  };

  executeScroll() {
    this.areaReference.current.scroll({
      top: this.scroll.y,
      left: this.scroll.x,
    });
  }

  render() {
    return (
      <div
        className="drag-scroll-area drag-scroll-area-external"
        ref={this.areaReference}
        onMouseDown={e => this.onMouseDown(e)}
        onContextMenu={e => e.preventDefault()}
      >
        <div className="drag-scroll-area drag-scroll-area-internal">{this.props.children}</div>
      </div>
    );
  }
}
