import React, { ReactElement, DOMElement } from "react";
import * as Helpers from "../../helpers/Helpers";
import { SquaresService, EntitiesService } from "../../services";
import EntityCard from "../EntityCard/EntityCard";
import { Square } from "../../services/SquaresService";
import entities, { Entity, Position, structures } from "../../services/EntitiesValues";
import InventoryList from "../EntityCard/InventoryList";

interface TargetedSquareInfoProps {
  className: string;
  squareNumber: number;
  squares: Square[];
  selected: Entity;
  targeted: Square;
  onInventoryClick(entity: Entity, itemName: string);
  processInterface: Function;
}

export default class TargetedSquareInfo extends React.Component<TargetedSquareInfoProps> {
  boxSerialNumber: number = 0;

  onItemClick = (itemName: string) => {
    let { selected, targeted } = this.props;
    if (Helpers.isSelectedTargeted(selected, targeted)) {
      let item = targeted.takeFromInventory(itemName);
      selected.addToInventory(item);
    }
    this.props.processInterface();
  };

  onMoveClick(selected: Entity, targetedSquarePosition: Position) {
    //EntitiesService.setMoveDestinationOnASelectedEntity(selected, targetedSquarePosition);
    selected.setMoveDestinationPosition(targetedSquarePosition);
    let targetedSquare: Square = SquaresService.getSquare(targetedSquarePosition.x, targetedSquarePosition.y);

    targetedSquare.isChosenDestination = true;
    this.props.processInterface();
  }

  onAttackClick(selected: Entity, targetedSquarePosition: Position) {
    selected.attackPosition(targetedSquarePosition);
    this.props.processInterface();
  }

  onAddStructureClick(targetedSquarePosition: Position) {
    let { targeted } = this.props;
    
    let box = Object.assign({}, structures.box);
    let targetPosition = Object.assign({}, targetedSquarePosition);
    box.position = targetPosition;
    box.name += this.boxSerialNumber++;
    let newBox = new Entity(box);
    
    entities.push(newBox);
    console.log(entities);
    this.props.processInterface();
  }

  render() {
    if (!this.props.targeted) {
      return null;
    }

    //this.props.squareNumber
    let inspectedSquare = this.props.targeted;
    let selected: Entity = this.props.selected;
    let targeted: Square = this.props.targeted;

    let targetedSquarePosition = SquaresService.targetSquarePosition(this.props.squareNumber);

    let entityInfo;
    let distanceInfo;
    let positionInfo;
    let bloodInfo;
    let availableActions = [];
    let items;
    let editorButtons;

    editorButtons = (
      <button onClick={() => this.onAddStructureClick(targetedSquarePosition)} className="button">
        Add structure
      </button>
    );

    if (targeted && targeted.entity && !Helpers.isSelectedTargeted(this.props.selected, this.props.targeted)) {
      entityInfo = <EntityCard onInventoryClick={this.props.onInventoryClick} entity={targeted.entity} />;
    }

    if (targeted && targeted.items) {
      items = (
        <InventoryList
          label="Items in this location"
          title="On the floor"
          onClick={this.onItemClick}
          onDrop={null}
          inventory={targeted.items}
        />
      );
    }

    if (selected) {
      let distanceToSelected = Helpers.calculateDistance(
        targetedSquarePosition.x - selected.position.x,
        targetedSquarePosition.y - selected.position.y
      );

      distanceInfo = <li>Distance to selected: {~~distanceToSelected}</li>;

      if (distanceToSelected !== 0) {
        if (targeted && targeted.isAvailableDestination) {
          availableActions[0] = (
            <button onClick={() => this.onMoveClick(selected, targetedSquarePosition)} className="button">
              Move
            </button>
          );
        }
        if (targeted && targeted.entity) {
          availableActions[1] = (
            <button onClick={() => this.onAttackClick(selected, targetedSquarePosition)} className="button">
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

    if (inspectedSquare && inspectedSquare.blood) {
      bloodInfo = <li>Blood amount: {inspectedSquare.blood}</li>;
    }

    return (
      <div className={this.props.className}>
        <strong>Target square Info</strong>
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
