import React from "react";
// services
import { SquaresService, EntitiesService } from "services";
import { Entity, Square, Position } from "services";
// components
import { EntityCard, InventoryList } from "components";
// others
import { structures } from "resources";
import * as Helpers from "helpers";
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
    let { selected, targeted, squareNumber } = this.props;
    let targetedSquarePosition = SquaresService.getSquarePositionFromIndex(squareNumber);
    if (selected && targeted &&
      selected.position.x === targetedSquarePosition.x &&
      selected.position.y === targetedSquarePosition.y
      ) {
      let item = targeted.takeFromInventory(itemName);
      if (!item) {// We aren't picking up an item, we are picking up an Entity.

        item = targeted.entities.find(entity => entity.name === itemName);

        let square = SquaresService.getSquareFromPosition(targetedSquarePosition.x, targetedSquarePosition.y);
        //square.entity = null;
        EntitiesService.removeEntityFromListOfEntities(square.entities, item as Entity);
        EntitiesService.removeEntity(item as Entity);// TODO: Take this out of the component
      }
      selected.addToInventory(item);
    }
    this.props.processInterface();
  };

  onMoveClick(selected: Entity, targetedSquarePosition: Position): void {
    let targetedSquare: Square = SquaresService.getSquareFromPosition(targetedSquarePosition.x, targetedSquarePosition.y);
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
    let square = SquaresService.getSquareFromPosition(targetedSquarePosition.x, targetedSquarePosition.y);

    let newStructure = new Entity(box);

    // TODO: FIXME: Stop forcing types, make a new list for scenery items.
    //square.entity = newStructure;
    square.entities.push(newStructure);
    EntitiesService.entities.push(newStructure);

    //square.addToInventory(newStructure as Item);


    this.props.processInterface();
  }

  render() {
    let { targeted, selected, squareNumber } = this.props;

    if (!targeted) {
      return null;
    }

    let targetedSquarePosition = SquaresService.getSquarePositionFromIndex(squareNumber);

    let entityInfo = [];
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

    if (targeted.entities && targeted.entities.length){
      targeted.entities.forEach(i => {
        if (selected !== i) {
          entityInfo.push(
            <EntityCard
              key={i.name}
              onEntityClick={this.onItemClick}
              onInventoryClick={this.props.onInventoryClick}
              entity={i}
              processInterface={() => this.props.processInterface()}
            />
          );
        }
      });
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

    let square = SquaresService.getSquareFromPosition(targetedSquarePosition.x, targetedSquarePosition.y);

    return (
      <div className={this.props.className}>
        <strong className={GameStyles.targeted__label}>Target square Info</strong>
        <code>{square.icon} {square.name}</code>
        <p>{square.description}</p>
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
