import React from "react";
import Blood from "../Square/Blood";
import Items from "../Square/Items";
import { Item } from "../../services/Items";
import "./Square.scss";

// TODO: This should really take less props
interface SquareProps {
  squareId: number;
  className?: string;
  onClick: (squareIndex: number) => void;
  blood: number;
  items: Item[]; // collection of objects
  itemsNumber: number; // here to trigger update when list length changes
}

/**
 * @description Displays a square with blood and items on it.
 * @param squareId - unique numerical id
 * @param className - string with CSS clasess
 * @param onClick - callback to call when square is clicked
 * @param blood - amount of blood
 * @param items - array of items
 * @param itemsNumber - numberof items
 */
class SquareComponent extends React.PureComponent<SquareProps> {
  onClick = () => {
    this.props.onClick(this.props.squareId);
  };

  render() {
    // console.log("Render Square", this.props.squareId);
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
