import React from "react";
import * as Helpers from "../../helpers";
import { Item } from "../../services/EntitiesValues";
import "./Square.scss";

interface SquareProps {
  squareId: string;
  rowId: number;
  colId: number;

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
  renderCounter = 0;

  shouldComponentUpdate = (
    nextProps: SquareProps // only update if props differ
  ) => JSON.stringify(nextProps) !== JSON.stringify(this.props);

  render() {
    // this.renderCounter++;
    // console.log("Rendering Square", this.renderCounter, this.props);

    let localId = `square${this.props.squareId}`;
    let classNameBase = "square";
    let squareClassName = classNameBase;
    squareClassName += Helpers.turnFlagsIntoClasses(this.props, classNameBase);

    let customStyle = "";
    let itemsNumber: number;

    let { isLit, items, blood, rowId, colId } = this.props;

    let bloodClassName = `blood-${localId}`;
    let itemsClassName = `items-${localId}`;
    let bloodStyle = `
      .${bloodClassName} {
        background: rgba(255,0,0, ${(this.props.blood / 30).toFixed(2)})
      }
    `;
    customStyle += bloodStyle;
    bloodClassName += " square__blood ";

    if (items && items.length) {
      itemsClassName += ` square__items `;
      itemsNumber = this.props.items.length;
    }

    if (!isLit) {
      squareClassName += ` ${classNameBase}--dark`;
      blood = null;
      itemsNumber = null;
      bloodClassName = null;
    }

    return (
      <button className={squareClassName} onClick={() => this.props.onClick(this.props.squareId)}>
        <div className={bloodClassName}>{blood}</div>
        <div className={itemsClassName}>{itemsNumber}</div>
        <div className="square__content">
          &nbsp;
          <small style={{ color: "transparent" }}>
            {colId},{rowId /* This just here for debugging */}
          </small>
        </div>
        <style>{customStyle}</style>
      </button>
    );
  }
}

export default Square;
