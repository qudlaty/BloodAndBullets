import React from "react";
import * as Helpers from "../../helpers";
import "./Square.scss";
import { Position, Item } from "../../services/EntitiesValues";

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

const flagsToClassess = {
  active: "active",
  isAvailableDestination: "is-available-destination",
  isChosenDestination: "is-chosen-destination",
  isBreathing: "breathing",
  isDead: "dead",
  isShooting: "shooting",
  isTargeted: "targeted",
};

interface flagsToClassessInterface {
  active: string;
  isAvailableDestination: string;
  isChosenDestination: string;
  isBreathing: string;
  isDead: string;
  isShooting: string;
  isTargeted: string;
}

/** Adding classess apropriate to the flags passed in by props */
function turnFlagsIntoClasses(props: SquareProps, flagsToClasses: flagsToClassessInterface) {
  let className = "";

  Object.keys(flagsToClassess).forEach((key) => {
    if (props[key]) {
      className += ` ${flagsToClassess[key]} `;
    }
  });
  return className;
}

class Square extends React.Component<SquareProps> {
  renderCounter = 0;

  shouldComponentUpdate = (
    nextProps // only update if props differ
  ) => JSON.stringify(nextProps) !== JSON.stringify(this.props);

  render() {
    //this.renderCounter++;
    //console.log("Rendering Square", this.renderCounter, this.props);

    let className = "square";
    let localId = `Square${this.props.squareId}`;

    className += turnFlagsIntoClasses(this.props, flagsToClassess);

    let customStyle = "";
    let bloodClassName = `blood-${localId}`;
    let itemsClassName;
    let itemsNumber;
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

    let { blood, icon } = this.props;

    if (!this.props.isLit) {
    }

    if (!this.props.isLit && this.props.isInTwilightZone) {
      className += " is-in-twilight-zone ";
    }

    if (!this.props.isLit && !this.props.isInTwilightZone) {
      className += " dark ";
      blood = null;
      itemsNumber = null;
      bloodClassName = null;
    }

    return (
      <button className={className} onClick={() => this.props.onClick(this.props.squareId)}>
        <div className={bloodClassName}>{blood}</div>
        <div className={itemsClassName}>{itemsNumber}</div>
        <div
          className="content"
          style={{
            color: "transparent",
          }}
        >
          {icon}
        </div>
        <style>{customStyle}</style>
      </button>
    );
  }
}

export default Square;
