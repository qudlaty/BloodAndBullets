import React from "react";
import "./Controls.scss";

interface ControlsProps {
  keys: string[];
  onKeyPress: Function;
}

interface ControlsState {
  w: boolean;
  s: boolean;
  a: boolean;
  d: boolean;
  space: boolean;
}

export class Controls extends React.Component<ControlsProps, ControlsState> {
  constructor(props) {
    super(props);
    this.state = {
      w: false,
      s: false,
      a: false,
      d: false,
      space: false,
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", e => this.onKeyDown(e), false);
    document.addEventListener("keyup", e => this.onKeyUp(e), false);
  }

  onKeyDown(event) {
    //console.log(event);
    switch (event.keyCode) {
      case 87: // W
        this.setState({ w: true });
        this.props.onKeyPress("w");
        break;
      case 83: // S
        this.setState({ s: true });
        this.props.onKeyPress("s");
        break;
      case 65: // A
        this.setState({ a: true });
        this.props.onKeyPress("a");
        break;
      case 68: // D
        this.setState({ d: true });
        this.props.onKeyPress("d");
        break;
      case 32: // space
        this.setState({ space: true });
        this.props.onKeyPress("space");
        break;
    }
    //event.preventDefault();
  }

  onKeyUp(event) {
    //console.log(event);
    switch (event.keyCode) {
      case 87: // W
        this.setState({ w: false });
        break;
      case 83: // S
        this.setState({ s: false });
        break;
      case 65: // A
        this.setState({ a: false });
        break;
      case 68: // D
        this.setState({ d: false });
        break;
      case 32: // space
        this.setState({ space: false });
        break;
    }
  }

  render() {
    return (
      <div className="controls">
        [<span className={`${this.state.w ? "pressed" : ""} key`}>W</span>] [
        <span className={`${this.state.s ? "pressed" : ""} key`}>S</span>] [
        <span className={`${this.state.a ? "pressed" : ""} key`}>A</span>] [
        <span className={`${this.state.d ? "pressed" : ""} key`}>D</span>] &nbsp; [
        <span className={`${this.state.space ? "pressed" : ""} key`}>space</span>]
      </div>
    );
  }
}
