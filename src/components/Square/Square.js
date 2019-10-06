import React, {PureComponent} from 'react';
import "./Square.css";

class Square extends PureComponent {
  /*
    We use PureComponent, so it compares new props with previous props,
    and only re-renders when props changed.
  */
  render() {
    console.log("Rendering Square");
    return (
      <button className="square" onClick={() => this.props.onClick(this.props.squareId)}>
        {this.props.value}
      </button>
    );
  }
}

export default Square;
