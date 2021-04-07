import React from "react";
// services
import { SquaresService } from "../../services";
import { Entity, Square, Position, Item } from "../../services";
// components
import EntityCard from "../EntityCard/EntityCard";
import InventoryList from "../EntityCard/InventoryList";
// others
import { structures } from "../../resources";
import * as Helpers from "../../helpers";
import GameStyles from "./Game.module.scss";

interface TargetedSquareInfoProps {
  className: string;
  squareNumber: number;
  squares: Square[];
  selected: Entity;
  targeted: Square;
  onInventoryClick(entity: Entity, itemName: string): void;
  processInterface: Function;
}

// TODO: Refactor, does it really need all this logic.
export default class TargetedSquareInfo extends React.Component<TargetedSquareInfoProps> {
  boxSerialNumber: number = 0;

  onItemClick = (itemName: string): void => {
    let { selected, targeted } = this.props;
    if (Helpers.isSelectedTargeted(selected, targeted)) {
      let item = targeted.takeFromInventory(itemName);
      selected.addToInventory(item);
    }
    this.props.processInterface();
  };

  onMoveClick(selected: Entity, targetedSquarePosition: Position): void {
    let targetedSquare: Square = SquaresService.getSquare(targetedSquarePosition.x, targetedSquarePosition.y);
    selected.setMoveDestinationPosition(targetedSquarePosition);
    targetedSquare.isChosenDestination = true;
    this.props.processInterface();
  }

  onAttackClick(selected: Entity, targetedSquarePosition: Position): void {
    selected.attackPosition(targetedSquarePosition);
    this.props.processInterface();
  }

  onAddStructureClick(targetedSquarePosition: Position, structureType: string): void {
    let box = Object.assign({}, structures[structureType]);
    let targetPosition = Object.assign({}, targetedSquarePosition);
    box.position = targetPosition;
    box.name += this.boxSerialNumber++;
    let newStructure = new Entity(box);
    let square = SquaresService.getSquare(targetedSquarePosition.x, targetedSquarePosition.y);
    square.entity = newStructure;
    square.addToInventory(newStructure as Item); // TODO: FIXME: Stop forcing types, make a new list for scenery items.
    //EntitiesService.entities.push(newBox);
    this.props.processInterface();
  }

  render() {
    let { targeted, selected, squareNumber } = this.props;

    if (!targeted) {
      return null;
    }

    let targetedSquarePosition = SquaresService.targetSquarePosition(squareNumber);

    let entityInfo;
    let distanceInfo;
    let positionInfo;
    let bloodInfo;
    let availableActions = [];
    let items;

    let editorButtons = (
      <div>
        <button onClick={() => this.onAddStructureClick(targetedSquarePosition, "box")} className={GameStyles.button}>
          Add box
        </button>
        <button
          onClick={() => this.onAddStructureClick(targetedSquarePosition, "redBarrel")}
          className={GameStyles.button}
        >
          Add barrel
        </button>
      </div>
    );

    if (targeted.entity && !Helpers.isSelectedTargeted(selected, targeted)) {
      entityInfo = (
        <EntityCard
          onInventoryClick={this.props.onInventoryClick}
          entity={targeted.entity}
          processInterface={() => this.props.processInterface()}
        />
      );
    }

    if (targeted.items) {
      items = (
        <InventoryList
          label="Items in this location"
          title="On the floor"
          onClick={this.onItemClick}
          onDrop={null}
          onReload={null}
          inventory={targeted.items}
          processInterface={() => this.props.processInterface()}
        />
      );
    }

    if (selected) {
      let distanceToSelected = Helpers.calculateDistance(
        targetedSquarePosition.x - selected.position.x,
        targetedSquarePosition.y - selected.position.y
      );

      distanceInfo = <li>Distance to selected: {distanceToSelected.toFixed(2)}</li>;

      if (distanceToSelected !== 0) {
        if (targeted.isAvailableDestination) {
          availableActions[0] = (
            <button key="move" onClick={() => this.onMoveClick(selected, targetedSquarePosition)} className={GameStyles.button}>
              Move
            </button>
          );
        }
        if (targeted.entity) {
          availableActions[1] = (
            <button key="attack" onClick={() => this.onAttackClick(selected, targetedSquarePosition)} className={GameStyles.button}>
              Attack
            </button>
          );
        }
      }
    }

    if (targetedSquarePosition) {
      positionInfo = (
        <li>
          Position: [ {targetedSquarePosition.x}, {targetedSquarePosition.y} ]{" "}
        </li>
      );
    }

    if (targeted.blood) {
      bloodInfo = <li>Blood amount: {targeted.blood}</li>;
    }

    return (
      <div className={this.props.className}>
        <strong className={GameStyles.targeted__label}>Target square Info</strong>
        <div>{entityInfo}</div>
        <div>{availableActions}</div>
        <ul>
          {positionInfo}
          {distanceInfo}
          {bloodInfo}
          {items}
          {editorButtons}
        </ul>
      </div>
    );
  }
}
