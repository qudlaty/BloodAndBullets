import React from "react";
import Blood from "../Square/Blood";
import Items from "../Square/Items";
import { Item } from "../../services/EntitiesValues";
import "./Square.scss";

interface SquareProps {
  squareId: number;
  className?: string;
  onClick: (squareIndex: number) => void;
  blood: number;
  items: Item[]; // collection of objects
  itemsNumber: number; // here to trigger update when list length changes
}

class SquareComponent extends React.PureComponent<SquareProps> {
  onClick = () => {
    this.props.onClick(this.props.squareId);
  };

  render() {
    console.log("Render Square", this.props.squareId);
    return (
      <button className={this.props.className} onClick={this.onClick}>
        <Blood bloodAmount={this.props.blood} />
        <Items items={this.props.items} itemsNumber={this.props.itemsNumber} />
        <div className="square__content">&nbsp;</div>
      </button>
    );
  }
}

export default SquareComponent;
