import React from "react";
import * as Helpers from "../../helpers";
import { Item } from "../../services/EntitiesValues";
import Blood from "./Blood";
import Items from "./Items";
import "./Square.scss";

interface SquareProps {
  squareId: string;

  squareType: string;
  active: boolean;
  isDead: boolean;

  blood: number;
  items: Item[];

  isLit: boolean;
  isInTwilightZone: boolean;

  isAvailableDestination: boolean;
  isChosenDestination: boolean;
  isTargeted: boolean;

  onClick: (squareIndex: string) => void;
}

class Square extends React.Component<SquareProps> {
  shouldComponentUpdate = (
    nextProps: SquareProps // only update if props differ
  ) => JSON.stringify(nextProps) !== JSON.stringify(this.props);

  render() {
    let { squareId, isLit, items, blood } = this.props;
    let classNameBase = "square";
    let squareClassName = classNameBase;
    let localId = `${classNameBase}${squareId}`;
    let indicators = null;

    squareClassName += Helpers.turnFlagsIntoClasses(this.props, classNameBase);

    // This hsould be a switch-case statement ran on enum, but it didn't work, O.o
    if (this.props.squareType == "floor") {
      squareClassName += " floor";
    } else if (this.props.squareType == "wall") {
      squareClassName += " wall";
    } else if (this.props.squareType == "nothing") {
      squareClassName += " nothing";
    }

    if (true || isLit) {
      indicators = (
        <div>
          <Blood parentClassBase={localId} bloodAmount={blood} />
          <Items items={items} />
        </div>
      );
    } else {
      squareClassName += ` ${classNameBase}--dark`;
    }

    return (
      <button className={squareClassName} onClick={() => this.props.onClick(this.props.squareId)}>
        {indicators}
        <div className="square__content">&nbsp;</div>
      </button>
    );
  }
}

export default Square;
