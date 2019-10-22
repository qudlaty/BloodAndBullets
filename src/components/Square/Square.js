import React from 'react';
import "./Square.css";

class Square extends React.PureComponent {
  /*
    We use PureComponent, so it compares new props with previous props,
    and only re-renders when props changed.
   */
  render() {
    console.log("Rendering Square");
    let className = "square";
    if(this.props.active) {
      className += " active";
    }
    return (
      <button className={className} onClick={() => this.props.onClick(this.props.squareId)}>
        {this.props.value}
      </button>
    );
  }
}

export default Square;
