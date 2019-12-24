import React from "react";
import * as Helpers from "../../helpers";
import { Position, Item } from "../../services/EntitiesValues";
import "./Square.scss";

interface SquareProps {
  squareId: string;
  icon: string;

  active: boolean;
  isAvailableDestination: boolean;
  isChosenDestination: boolean;
  isBreathing: boolean;
  isDead: boolean;
  isShooting: boolean;
  isTargeted: boolean;
  isLit: boolean;
  isInTwilightZone: boolean;

  position: Position;
  targetPosition: Position;
  blood: number;
  items: Item[];

  weaponType: string;
  onClick: (squareIndex: string) => void;
}

class Square extends React.Component<SquareProps> {
  renderCounter = 0;

  shouldComponentUpdate = (
    nextProps: SquareProps // only update if props differ
  ) => JSON.stringify(nextProps) !== JSON.stringify(this.props);

  render() {
    // this.renderCounter++;
    // console.log("Rendering Square", this.renderCounter, this.props);

    let squareClassName = "square";
    let localId = `Square${this.props.squareId}`;
    squareClassName += Helpers.turnFlagsIntoClasses(this.props);

    let customStyle = "";
    let itemsClassName: string;
    let itemsNumber: number;

    let { blood } = this.props;
    let bloodClassName = `blood-${localId}`;
    let bloodStyle = `

      .${bloodClassName} {
        background: rgba(255,0,0, ${(this.props.blood / 30).toFixed(2)})
      }

    `;
    customStyle += bloodStyle;
    bloodClassName += " blood ";

    if (this.props.items && this.props.items.length) {
      itemsClassName += ` has-items `;
      itemsNumber = this.props.items.length;
    }

    if (!this.props.isLit) {
      squareClassName += " dark ";
      blood = null;
      itemsNumber = null;
      bloodClassName = null;
    }

    return (
      <button className={squareClassName} onClick={() => this.props.onClick(this.props.squareId)}>
        <div className={bloodClassName}>{blood}</div>
        <div className={itemsClassName}>{itemsNumber}</div>
        <div className="content">&nbsp;</div>
        <style>{customStyle}</style>
      </button>
    );
  }
}

export default Square;
