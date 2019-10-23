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
    if(this.props.isBreathing) {
      className += " breathing";
    }
    let randomTime = `${(Math.random()+0.5).toFixed(2)}s`
    let animationBreathing = `breathing ${randomTime} alternate infinite`;

    return (
      <button className={className} onClick={() => this.props.onClick(this.props.squareId)}>
        <div className="content" style={{
          animation: animationBreathing
        }}>{this.props.value}</div>
      </button>
    );
  }
}

export default Square;
