import React, { ReactElement } from "react";
// services
import { Item, SquaresService } from "services";
// components
import Blood from "./Blood";
import Items from "./Items";
// others
import "./Square.scss";

// TODO: This should really take less props
interface SquareProps {
  /**
   * Unique square id
   */
  squareId: number;
  /**
   * Optional CSS class name
   */
  className?: string;
  /**
   * Handler for this square click
   */
  onClick: (squareIndex: number) => void;
  /**
   * The amount of blood on this square
   */
  blood: number;
  /**
   * A list of items on this square
   */
  items: Item[];
  /**
   * A number of items on this square.
   * Here to trigger an update when list length changes.
   */
  itemsNumber: number;
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
export class SquareComponent extends React.PureComponent<SquareProps> {
  onClick = () => {
    this.props.onClick(this.props.squareId);
  };

  render() {
    // console.log("Render Square", this.props.squareId);
    // TODO: Extract into separate component
    function cuboid(classPrefix: string): ReactElement {
      let i = 6;
      const cuboidFaces: ReactElement[] = [];

      while (i--) {
        cuboidFaces.push(<div key={i} className={`${classPrefix}__cuboid-face`}></div>);
      }

      return <div className={`${classPrefix}__cuboid`}>{cuboidFaces}</div>;
    }

    const squareModel = SquaresService.squares[this.props.squareId];
    const icon = squareModel.icon;

    return (
      <button className={"square " + this.props.className} onClick={this.onClick}>
        <div className="square__content">{icon}</div>
        <Blood bloodAmount={this.props.blood} />
        <Items items={this.props.items} itemsNumber={this.props.itemsNumber} />
        {cuboid("square")}
      </button>
    );
  }
}
