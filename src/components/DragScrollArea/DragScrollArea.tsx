import React from "react";
import "./DragScrollArea.scss";

interface DragScrollAreaProps {
  children: JSX.Element;
  centeredOn?: string;
}

interface DragScrollAreaState {}

/** Drag with right mouse button, to move content around */
export class DragScrollArea extends React.Component<DragScrollAreaProps, DragScrollAreaState> {
  outerDivReference;
  innerDivReference;
  scroll = {
    x: 0,
    y: 0,
  };

  constructor(props) {
    super(props);
    this.outerDivReference = React.createRef();
    this.innerDivReference = React.createRef();
  }

  componentDidMount() {
    this.recalculateInnerDivSize();
    window.addEventListener("resize", this.recalculateInnerDivSize);
    if (this.props.centeredOn) {
      this.centerInnerDivOnATarget(this.props.centeredOn);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.recalculateInnerDivSize);
  }
  componentDidUpdate(prevProps) {
    if (this.props.centeredOn !== prevProps.centeredOn) {
      this.centerInnerDivOnATarget(this.props.centeredOn);
    }
  }
  recalculateInnerDivSize = () => {
    const innerDiv = this.innerDivReference.current;
    const outerDiv = this.outerDivReference.current;
    if (innerDiv) {
      const containedElement = innerDiv.firstChild;
      if (containedElement && containedElement.getBoundingClientRect) {
        const containedElementBoundingBox = containedElement.getBoundingClientRect();
        innerDiv.style.width = `${containedElementBoundingBox.width * 1.5}px`;
        innerDiv.style.height = `${containedElementBoundingBox.height * 1.5}px`;
      }
    }
    this.centerInnerDivAfterResize();
  };

  centerInnerDivAfterResize = () => {
    const innerDiv = this.innerDivReference.current;
    const outerDiv = this.outerDivReference.current;
    if (innerDiv && outerDiv) {
      const outerRect = outerDiv.getBoundingClientRect();
      const innerRect = innerDiv.getBoundingClientRect();
      const scrollX = (innerRect.width - outerRect.width) / 2;
      const scrollY = (innerRect.height - outerRect.height) / 2;
      this.scroll.x = scrollX;
      this.scroll.y = scrollY;
      this.executeScroll();
    }
  };
  centerInnerDivOnATarget(targetSelector: string) {
    const outerDiv = this.outerDivReference.current;
    const targetElement = outerDiv.querySelector(targetSelector);

    if (targetElement) {
      const outerDivRect = outerDiv.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();

      // Calculate positions
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const outerDivCenterX = outerDivRect.left + outerDivRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;
      const outerDivCenterY = outerDivRect.top + outerDivRect.height / 2;

      // Calculate scroll offsets
      const scrollOffsetX = targetCenterX - outerDivCenterX;
      const scrollOffsetY = targetCenterY - outerDivCenterY;

      // Apply scroll positions
      const currentScrollX = outerDiv.scrollLeft;
      const currentScrollY = outerDiv.scrollTop;

      this.scroll.x = currentScrollX + scrollOffsetX;
      this.scroll.y = currentScrollY + scrollOffsetY;
      this.executeScroll();
    }
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
    this.outerDivReference.current.scroll({
      top: this.scroll.y,
      left: this.scroll.x,
    });
  }

  render() {
    return (
      <div
        className="drag-scroll-area drag-scroll-area-external"
        ref={this.outerDivReference}
        onMouseDown={e => this.onMouseDown(e)}
        onContextMenu={e => e.preventDefault()}
      >
        <div
          className="drag-scroll-area drag-scroll-area-internal"
          ref={this.innerDivReference}
          //
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
